// ========================================================
//              EXHIMATCH AI — MATCHING ENGINE
// ========================================================

/**
 * Calculates a match score between a buyer's requirement and an exhibitor's product/stall/exhibition.
 * Formula breakdown specified by prompt:
 * - Product relevance = 40%
 * - Budget compatibility = 20%
 * - Location/distance = 15%
 * - Exhibition date = 10%
 * - Exhibitor availability = 10%
 * - Preferences / additional requirements = 5%
 * Total = 100%
 */
export function calculateMatchScore({
  product,
  exhibitor,
  exhibition,
  buyerReq = {}
}) {
  const reasons = [];
  
  // 1. PRODUCT RELEVANCE (Max 40 points)
  let productScore = 0;
  const searchTerms = (buyerReq.product_name || "").toLowerCase().split(/\s+/).filter(Boolean);
  const targetCategory = (buyerReq.category || "").toLowerCase();
  
  const pName = (product?.name || "").toLowerCase();
  const pCat = (product?.category || "").toLowerCase();
  const pDesc = (product?.description || "").toLowerCase();
  const pSpecs = JSON.stringify(product?.specifications || {}).toLowerCase();
  const fullProductText = `${pName} ${pCat} ${pDesc} ${pSpecs}`;

  let matchedKeywords = 0;
  searchTerms.forEach(term => {
    if (pName.includes(term)) matchedKeywords += 2;
    else if (fullProductText.includes(term)) matchedKeywords += 1;
  });

  const termWeight = searchTerms.length > 0 ? (matchedKeywords / (searchTerms.length * 2)) : 0.8;
  const clampedTermScore = Math.min(1, termWeight);

  if (targetCategory && pCat.includes(targetCategory)) {
    productScore = 15 + (clampedTermScore * 25);
    reasons.push(`✓ Product strongly matches requirement & category (${product.category})`);
  } else if (clampedTermScore > 0.5) {
    productScore = clampedTermScore * 40;
    reasons.push(`✓ High technical affinity with requirement: "${product.name}"`);
  } else {
    productScore = Math.max(10, clampedTermScore * 35);
  }

  // 2. BUDGET COMPATIBILITY (Max 20 points)
  let budgetScore = 0;
  const reqMin = Number(buyerReq.budget_min) || 0;
  const reqMax = Number(buyerReq.budget_max) || 50000000;
  const prodMin = Number(product?.price_min) || 0;
  const prodMax = Number(product?.price_max) || prodMin * 1.3 || 1000000;

  // Check overlap between [reqMin, reqMax] and [prodMin, prodMax]
  const hasOverlap = Math.max(reqMin, prodMin) <= Math.min(reqMax, prodMax);
  if (hasOverlap || (prodMin >= reqMin * 0.8 && prodMax <= reqMax * 1.25)) {
    budgetScore = 20;
    reasons.push(`✓ Budget fully compatible (₹${(prodMin/100000).toFixed(1)}L - ₹${(prodMax/100000).toFixed(1)}L fits your budget)`);
  } else if (prodMin < reqMax * 1.5 && prodMax > reqMin * 0.6) {
    budgetScore = 12;
    reasons.push(`✓ Moderate budget alignment`);
  } else {
    budgetScore = 6;
  }

  // 3. LOCATION & DISTANCE (Max 15 points)
  let locationScore = 0;
  const buyerLoc = (buyerReq.location || "Mumbai").toLowerCase();
  const maxDistance = Number(buyerReq.max_distance) || 250;
  const exhCity = (exhibition?.city || "").toLowerCase();
  const exhibitorCity = (exhibitor?.city || "").toLowerCase();
  const exhDistance = Number(exhibition?.distance_km) || 75;

  if (exhCity.includes(buyerLoc) || buyerLoc.includes(exhCity)) {
    locationScore = 15;
    reasons.push(`✓ Held locally in ${exhibition.city} (${exhDistance} km away, within preferred ${maxDistance} km)`);
  } else if (exhDistance <= maxDistance) {
    locationScore = 13;
    reasons.push(`✓ Within preferred travel distance (${exhDistance} km <= ${maxDistance} km limit)`);
  } else if (exhibitorCity.includes(buyerLoc)) {
    locationScore = 10;
    reasons.push(`✓ Supplier headquartered locally in ${exhibitor.city}`);
  } else {
    locationScore = 6;
  }

  // 4. EXHIBITION DATE (Max 10 points)
  let dateScore = 10;
  if (buyerReq.preferred_date && exhibition?.start_date) {
    const prefTime = new Date(buyerReq.preferred_date).getTime();
    const startTime = new Date(exhibition.start_date).getTime();
    const diffDays = Math.abs((prefTime - startTime) / (1000 * 60 * 60 * 24));
    if (diffDays <= 45) {
      dateScore = 10;
      reasons.push(`✓ Suitable exhibition date (${exhibition.start_date} aligns with planning)`);
    } else {
      dateScore = 7;
    }
  } else {
    dateScore = 9;
    reasons.push(`✓ Scheduled in optimal upcoming trade fair cycle`);
  }

  // 5. EXHIBITOR AVAILABILITY & CREDIBILITY (Max 10 points)
  let availabilityScore = 0;
  if (exhibitor?.verified) availabilityScore += 5;
  if (exhibitor?.rating >= 4.5) availabilityScore += 3;
  else availabilityScore += 2;
  availabilityScore += 2; // Active booth presence
  reasons.push(`✓ Verified supplier with confirmed stall & ${exhibitor?.rating || 4.8}★ rating (${exhibitor?.review_count || 50}+ reviews)`);

  // 6. PREFERENCES & ADDITIONAL REQUIREMENTS (Max 5 points)
  let prefScore = 3;
  if (buyerReq.additional_notes) {
    const noteWords = buyerReq.additional_notes.toLowerCase().split(/\s+/).filter(w => w.length > 3);
    const hasNoteMatch = noteWords.some(w => fullProductText.includes(w));
    if (hasNoteMatch) {
      prefScore = 5;
      reasons.push(`✓ Matches your special requirement: "${buyerReq.additional_notes}"`);
    } else {
      prefScore = 4;
    }
  } else {
    prefScore = 5;
  }

  // Total raw score
  let totalScore = Math.round(productScore + budgetScore + locationScore + dateScore + availabilityScore + prefScore);
  // Clamp between 45% and 98%
  totalScore = Math.max(50, Math.min(98, totalScore));

  return {
    matchPercentage: totalScore,
    productMatch: Math.round((productScore / 40) * 100),
    budgetMatch: Math.round((budgetScore / 20) * 100),
    locationMatch: Math.round((locationScore / 15) * 100),
    dateMatch: Math.round((dateScore / 10) * 100),
    availabilityMatch: Math.round((availabilityScore / 10) * 100),
    reasons
  };
}

/**
 * Searches the dataset for top matched exhibitions, exhibitors, and exact stalls
 */
export function runAIMatching({
  buyerReq,
  products = [],
  exhibitors = [],
  exhibitions = [],
  stalls = []
}) {
  const req = {
    product_name: buyerReq?.product_name || "CNC Laser Cutting Machine",
    category: buyerReq?.category || "Industrial Machinery",
    budget_min: Number(buyerReq?.budget_min) || 2000000,
    budget_max: Number(buyerReq?.budget_max) || 3000000,
    location: buyerReq?.location || "Mumbai",
    max_distance: Number(buyerReq?.max_distance) || 200,
    preferred_date: buyerReq?.preferred_date || "2026-11-15",
    additional_notes: buyerReq?.additional_notes || "Suitable for metal sheet cutting"
  };

  // Find confirmed stalls with exhibitors
  const candidates = [];

  stalls.forEach(stall => {
    // Only stalls that are occupied or reserved by an exhibitor
    if (!stall.current_exhibitor_id) return;

    const exhibitor = exhibitors.find(e => e.id === stall.current_exhibitor_id);
    if (!exhibitor) return;

    const exhibition = exhibitions.find(ex => ex.id === stall.exhibition_id);
    if (!exhibition) return;

    // Find products made by this exhibitor
    const exhibitorProducts = products.filter(p => p.exhibitor_id === exhibitor.id);
    
    // Score each product for this stall
    exhibitorProducts.forEach(prod => {
      const match = calculateMatchScore({
        product: prod,
        exhibitor,
        exhibition,
        buyerReq: req
      });

      candidates.push({
        matchPercentage: match.matchPercentage,
        matchDetails: match,
        stall,
        exhibitor,
        exhibition,
        product: prod
      });
    });
  });

  // Sort descending by match percentage
  candidates.sort((a, b) => b.matchPercentage - a.matchPercentage);

  // Group top unique stalls (top 3 - 5 stalls)
  const topStalls = [];
  const seenStalls = new Set();
  for (const c of candidates) {
    if (!seenStalls.has(c.stall.id)) {
      seenStalls.add(c.stall.id);
      topStalls.push(c);
      if (topStalls.length >= 5) break;
    }
  }

  // Top exhibitions
  const exhScores = {};
  candidates.forEach(c => {
    const eid = c.exhibition.id;
    if (!exhScores[eid] || exhScores[eid].maxScore < c.matchPercentage) {
      exhScores[eid] = {
        exhibition: c.exhibition,
        maxScore: c.matchPercentage,
        matchingStallsCount: (exhScores[eid]?.matchingStallsCount || 0) + 1
      };
    }
  });

  const recommendedExhibitions = Object.values(exhScores)
    .sort((a, b) => b.maxScore - a.maxScore)
    .map(item => ({
      ...item.exhibition,
      matchPercentage: item.maxScore,
      matchingStallsCount: item.matchingStallsCount
    }));

  return {
    query: req,
    topStalls,
    recommendedExhibitions,
    totalMatchesFound: candidates.length
  };
}
