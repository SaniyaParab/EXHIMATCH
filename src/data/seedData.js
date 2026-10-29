// ========================================================
//              EXHIMATCH AI — SEED / DEMO DATA
// ========================================================

export const SEED_PROFILES = [
  {
    id: "prof-buyer-1",
    user_id: "user-buyer-1",
    email: "rajesh@sharmaindustries.com",
    full_name: "Rajesh Sharma",
    role: "buyer",
    phone: "+91 98201 44552",
    company_name: "Sharma Precision Fab Pvt Ltd",
    job_role: "Managing Director & Head of Procurement",
    city: "Mumbai",
    state: "Maharashtra",
    country: "India",
    business_category: "Industrial Machinery & Metal Fabrication",
    preferred_categories: ["Industrial Machinery", "Manufacturing", "Industrial Automation"],
    budget_min: 1500000,
    budget_max: 3500000,
    preferred_location: "Mumbai",
    max_travel_distance: 200,
    website: "https://sharmaprecision.example.com",
    about: "Specialized in high-precision automotive sheet metal stamping and heavy equipment fabrication in Maharashtra.",
    avatar_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&fit=crop&q=80"
  },
  {
    id: "prof-exhibitor-1",
    user_id: "user-exhibitor-1",
    email: "amit@abcmachinery.com",
    full_name: "Amit Patel",
    role: "exhibitor",
    phone: "+91 98220 98765",
    company_name: "ABC Machinery Ltd",
    job_role: "VP Sales & Commercial",
    city: "Pune",
    state: "Maharashtra",
    country: "India",
    business_category: "Industrial Machinery",
    preferred_categories: ["Industrial Machinery", "Manufacturing"],
    budget_min: 0,
    budget_max: 10000000,
    preferred_location: "Pune",
    max_travel_distance: 500,
    website: "https://abcmachinery.example.com",
    about: "Leading manufacturer of CNC fiber laser cutting systems, CNC press brakes and sheet metal automation.",
    avatar_url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&fit=crop&q=80"
  },
  {
    id: "prof-organizer-1",
    user_id: "user-organizer-1",
    email: "sunil@mahaexpo.com",
    full_name: "Sunil Verma",
    role: "organizer",
    phone: "+91 99300 11223",
    company_name: "Maharashtra Industrial Trade Expos (MITE)",
    job_role: "Chief Exhibition Director",
    city: "Mumbai",
    state: "Maharashtra",
    country: "India",
    business_category: "Trade Fair & Exhibition Management",
    preferred_categories: [],
    budget_min: 0,
    budget_max: 0,
    preferred_location: "Mumbai",
    max_travel_distance: 1000,
    website: "https://mahaexpo.example.com",
    about: "Organizers of premier global industrial exhibitions across Mumbai, Pune, and Ahmedabad.",
    avatar_url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&fit=crop&q=80"
  }
];

export const SEED_EXHIBITIONS = [
  {
    id: "exh-1",
    name: "Manufacturing Expo Mumbai 2026",
    tagline: "India's Premier Advanced Manufacturing & Machine Tool Fair",
    description: "The flagship B2B exhibition bringing together 1,200+ global machinery builders, CNC equipment makers, industrial automation innovators, and industrial buyers under one roof.",
    venue: "Bombay Exhibition Centre (NESCO), Goregaon East",
    city: "Mumbai",
    state: "Maharashtra",
    country: "India",
    distance_km: 62,
    latitude: 19.1485,
    longitude: 72.8543,
    start_date: "2026-11-12",
    end_date: "2026-11-15",
    categories: ["Industrial Machinery", "Manufacturing", "Industrial Automation", "Automotive"],
    banner_image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&auto=format&fit=crop&q=80",
    logo_image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=200&auto=format&fit=crop&q=80",
    total_halls: 3,
    total_stalls: 80,
    exhibitor_count: 127,
    status: "upcoming",
    featured: true
  },
  {
    id: "exh-2",
    name: "Bharat Automation & Robotics Expo",
    tagline: "Smart Factory & Industrial Robotics Showcase",
    description: "Discover the latest Industry 4.0 innovations, collaborative robots, PLC systems, SCADA, and IoT sensors.",
    venue: "Yashobhoomi (IICC), Dwarka",
    city: "New Delhi",
    state: "Delhi",
    country: "India",
    distance_km: 1150,
    start_date: "2026-12-04",
    end_date: "2026-12-07",
    categories: ["Industrial Automation", "Electronics", "Logistics"],
    banner_image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&auto=format&fit=crop&q=80",
    logo_image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200&auto=format&fit=crop&q=80",
    total_halls: 3,
    total_stalls: 75,
    exhibitor_count: 98,
    status: "upcoming",
    featured: true
  },
  {
    id: "exh-3",
    name: "TechBuild India Expo",
    tagline: "Heavy Construction & Infrastructure Engineering Meet",
    description: "South Asia's largest trade fair for heavy earthmoving machines, concrete batching plants, and pre-cast structures.",
    venue: "BIEC (Bangalore International Exhibition Centre)",
    city: "Bengaluru",
    state: "Karnataka",
    country: "India",
    distance_km: 980,
    start_date: "2026-10-18",
    end_date: "2026-10-21",
    categories: ["Construction", "Industrial Machinery"],
    banner_image: "https://images.unsplash.com/photo-1541888946425-d0fbb186c5f9?w=1200&auto=format&fit=crop&q=80",
    logo_image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=200&auto=format&fit=crop&q=80",
    total_halls: 3,
    total_stalls: 60,
    exhibitor_count: 84,
    status: "upcoming",
    featured: false
  },
  {
    id: "exh-4",
    name: "Delhi AutoMach & Components Show",
    tagline: "Automotive Precision & OEM Engineering",
    description: "Dedicated to powertrain components, auto dies, stamping presses, and automotive robotic assembly lines.",
    venue: "Pragati Maidan",
    city: "New Delhi",
    state: "Delhi",
    country: "India",
    distance_km: 1140,
    start_date: "2026-11-25",
    end_date: "2026-11-28",
    categories: ["Automotive", "Manufacturing"],
    banner_image: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=1200&auto=format&fit=crop&q=80",
    logo_image: "https://images.unsplash.com/photo-1563720223185-11003d516935?w=200&auto=format&fit=crop&q=80",
    total_halls: 3,
    total_stalls: 70,
    exhibitor_count: 110,
    status: "upcoming",
    featured: true
  },
  {
    id: "exh-5",
    name: "FoodPack & Pharma Machinery Expo Pune",
    tagline: "Advanced Packaging, Bottling & Processing Expo",
    description: "Focusing on aseptic food packaging lines, blister sealers, pharmaceutical granulation machines, and rotary fillers.",
    venue: "Auto Cluster Exhibition Centre, Chinchwad",
    city: "Pune",
    state: "Maharashtra",
    country: "India",
    distance_km: 145,
    start_date: "2026-12-15",
    end_date: "2026-12-18",
    categories: ["Packaging", "Manufacturing"],
    banner_image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1200&auto=format&fit=crop&q=80",
    logo_image: "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=200&auto=format&fit=crop&q=80",
    total_halls: 2,
    total_stalls: 50,
    exhibitor_count: 65,
    status: "upcoming",
    featured: false
  },
  {
    id: "exh-6",
    name: "ChemTech Gujarat International Expo",
    tagline: "Chemical Processing & Heavy Industrial Valves",
    description: "Meeting ground for reactor vessels, corrosion-resistant pumps, industrial centrifuges, and pipeline equipment.",
    venue: "Helipad Exhibition Centre",
    city: "Gandhinagar",
    state: "Gujarat",
    country: "India",
    distance_km: 510,
    start_date: "2027-01-10",
    end_date: "2027-01-13",
    categories: ["Industrial Machinery", "Manufacturing"],
    banner_image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=1200&auto=format&fit=crop&q=80",
    logo_image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=200&auto=format&fit=crop&q=80",
    total_halls: 3,
    total_stalls: 65,
    exhibitor_count: 92,
    status: "upcoming",
    featured: false
  },
  {
    id: "exh-7",
    name: "AgriTech & Farm Machinery Expo",
    tagline: "Smart Agriculture Tractors & Irrigation Tech",
    description: "Leading exhibition showcasing combine harvesters, laser land levelers, solar submersible pumps, and drone sprayers.",
    venue: "Indore Exhibition Ground",
    city: "Indore",
    state: "Madhya Pradesh",
    country: "India",
    distance_km: 580,
    start_date: "2027-01-22",
    end_date: "2027-01-25",
    categories: ["Agriculture", "Industrial Machinery"],
    banner_image: "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=1200&auto=format&fit=crop&q=80",
    logo_image: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=200&auto=format&fit=crop&q=80",
    total_halls: 2,
    total_stalls: 50,
    exhibitor_count: 55,
    status: "upcoming",
    featured: false
  },
  {
    id: "exh-8",
    name: "GreenEnergy & Electrical Tech Summit",
    tagline: "Power Transmission, Switchgear & Renewable Energy",
    description: "B2B platform for high-voltage transformers, switchgears, solar inverters, and battery energy storage systems.",
    venue: "Chennai Trade Centre (CTC), Nandambakkam",
    city: "Chennai",
    state: "Tamil Nadu",
    country: "India",
    distance_km: 1320,
    start_date: "2027-02-05",
    end_date: "2027-02-08",
    categories: ["Electronics", "Manufacturing"],
    banner_image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=1200&auto=format&fit=crop&q=80",
    logo_image: "https://images.unsplash.com/photo-1509391365360-2e959784a276?w=200&auto=format&fit=crop&q=80",
    total_halls: 3,
    total_stalls: 60,
    exhibitor_count: 78,
    status: "upcoming",
    featured: false
  },
  {
    id: "exh-9",
    name: "IntraLogistics & Material Handling Expo",
    tagline: "Automated Warehousing & Conveyor Systems",
    description: "Showcasing autonomous mobile robots (AMRs), electric forklifts, high-density racking, and sortation conveyors.",
    venue: "HITEX Exhibition Centre",
    city: "Hyderabad",
    state: "Telangana",
    country: "India",
    distance_km: 710,
    start_date: "2027-02-18",
    end_date: "2027-02-21",
    categories: ["Logistics", "Industrial Automation"],
    banner_image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&auto=format&fit=crop&q=80",
    logo_image: "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?w=200&auto=format&fit=crop&q=80",
    total_halls: 2,
    total_stalls: 55,
    exhibitor_count: 68,
    status: "upcoming",
    featured: false
  },
  {
    id: "exh-10",
    name: "MachineTools & Engineering Kolkata",
    tagline: "Eastern India's Heavy Metal & Tooling Show",
    description: "Covering CNC lathes, milling centers, foundry equipment, surface grinders, and metal forming tools.",
    venue: "Biswa Bangla Mela Prangan",
    city: "Kolkata",
    state: "West Bengal",
    country: "India",
    distance_km: 1950,
    start_date: "2027-03-05",
    end_date: "2027-03-08",
    categories: ["Industrial Machinery", "Manufacturing"],
    banner_image: "https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?w=1200&auto=format&fit=crop&q=80",
    logo_image: "https://images.unsplash.com/photo-1513828583688-c52646db42da?w=200&auto=format&fit=crop&q=80",
    total_halls: 2,
    total_stalls: 50,
    exhibitor_count: 52,
    status: "upcoming",
    featured: false
  }
];

export const SEED_HALLS = [
  // Halls for Manufacturing Expo Mumbai (exh-1)
  { id: "hall-1", exhibition_id: "exh-1", name: "Hall A - Precision Machinery & Laser Systems", code: "A", floor: 1, capacity: 30 },
  { id: "hall-2", exhibition_id: "exh-1", name: "Hall B - Industrial Automation & Robotics", code: "B", floor: 1, capacity: 30 },
  { id: "hall-3", exhibition_id: "exh-1", name: "Hall C - Tooling, Dies & Metal Forming", code: "C", floor: 1, capacity: 25 },

  // Halls for Bharat Automation Expo (exh-2)
  { id: "hall-4", exhibition_id: "exh-2", name: "Hall 1 - Robotics & Motion Control", code: "A", floor: 1, capacity: 25 },
  { id: "hall-5", exhibition_id: "exh-2", name: "Hall 2 - SCADA, Sensors & IoT", code: "B", floor: 1, capacity: 25 }
];

export const SEED_EXHIBITORS = [
  // 1. ABC Machinery (The Key Demo Exhibitor in Stall A24)
  {
    id: "exh-comp-1",
    profile_id: "prof-exhibitor-1",
    company_name: "ABC Machinery Ltd",
    logo_url: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=160&auto=format&fit=crop&q=80",
    description: "ABC Machinery is a premier ISO 9001:2015 certified manufacturer of high-power CNC Fiber Laser Cutting Machines, CNC Plasma Tables, and Electro-Hydraulic Press Brakes. Over 1,500 installations across automotive, aerospace, and general fabrication industries.",
    business_category: "Industrial Machinery",
    email: "amit@abcmachinery.com",
    phone: "+91 98220 98765",
    website: "https://abcmachinery.example.com",
    city: "Pune",
    state: "Maharashtra",
    year_established: 2008,
    rating: 4.8,
    review_count: 127,
    verified: true
  },
  // 2. XYZ Automation (Stall B17)
  {
    id: "exh-comp-2",
    profile_id: "prof-exhibitor-2",
    company_name: "XYZ Automation Systems",
    logo_url: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=160&auto=format&fit=crop&q=80",
    description: "Pioneering robotic laser welding, 6-axis articulated material handling arms, and CNC laser tube cutting cells engineered for maximum factory uptime.",
    business_category: "Industrial Automation",
    email: "contact@xyzautomation.example.com",
    phone: "+91 98231 66778",
    website: "https://xyzautomation.example.com",
    city: "Mumbai",
    state: "Maharashtra",
    year_established: 2012,
    rating: 4.7,
    review_count: 89,
    verified: true
  },
  // 3. PQR Engineering (Stall C08)
  {
    id: "exh-comp-3",
    profile_id: "prof-exhibitor-3",
    company_name: "PQR Engineering Works",
    logo_url: "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=160&auto=format&fit=crop&q=80",
    description: "Manufacturers of heavy-duty metal fabrication machinery, CNC turret punch presses, and laser cutting equipment with German Raytools laser heads.",
    business_category: "Manufacturing",
    email: "info@pqrengineering.example.com",
    phone: "+91 98212 33445",
    website: "https://pqrengineering.example.com",
    city: "Navi Mumbai",
    state: "Maharashtra",
    year_established: 2004,
    rating: 4.6,
    review_count: 64,
    verified: true
  },
  // 4. Apex Laser Systems
  {
    id: "exh-comp-4",
    profile_id: "prof-exhibitor-4",
    company_name: "Apex Laser Systems",
    logo_url: "https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=160&auto=format&fit=crop&q=80",
    description: "High-precision 12kW - 30kW fiber laser cutters with automatic shuttle tables and dual exhaust extraction systems.",
    business_category: "Industrial Machinery",
    email: "sales@apexlaser.example.com",
    phone: "+91 98110 55442",
    website: "https://apexlaser.example.com",
    city: "Ahmedabad",
    state: "Gujarat",
    year_established: 2015,
    rating: 4.9,
    review_count: 142,
    verified: true
  },
  // 5. Precision CNC Works
  {
    id: "exh-comp-5",
    profile_id: "prof-exhibitor-5",
    company_name: "Precision CNC Works",
    logo_url: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=160&auto=format&fit=crop&q=80",
    description: "5-axis vertical machining centers (VMC), CNC turning centers, and horizontal boring mills.",
    business_category: "Industrial Machinery",
    email: "sales@precisioncnc.example.com",
    phone: "+91 98205 11998",
    website: "https://precisioncnc.example.com",
    city: "Thane",
    state: "Maharashtra",
    year_established: 2010,
    rating: 4.5,
    review_count: 53,
    verified: true
  },
  // 6. Titan Robotic Arms
  {
    id: "exh-comp-6",
    profile_id: "prof-exhibitor-6",
    company_name: "Titan Robotic Arms",
    logo_url: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=160&auto=format&fit=crop&q=80",
    description: "Industrial payload handling robots, machine tending cobots, and spot welding end-effectors.",
    business_category: "Industrial Automation",
    email: "sales@titanrobotics.example.com",
    phone: "+91 98200 44321",
    website: "https://titanrobotics.example.com",
    city: "Bengaluru",
    state: "Karnataka",
    year_established: 2017,
    rating: 4.8,
    review_count: 76,
    verified: true
  },
  // 7. Zenith Hydraulics
  {
    id: "exh-comp-7",
    profile_id: "prof-exhibitor-7",
    company_name: "Zenith Hydraulics & Presses",
    logo_url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&auto=format&fit=crop&q=80",
    description: "Deep drawing hydraulic presses, 4-pillar trim presses, and scrap metal baling machines.",
    business_category: "Manufacturing",
    email: "contact@zenithpresses.example.com",
    phone: "+91 98450 77112",
    website: "https://zenithpresses.example.com",
    city: "Coimbatore",
    state: "Tamil Nadu",
    year_established: 2001,
    rating: 4.6,
    review_count: 48,
    verified: true
  },
  // 8. Paramount Pack Systems
  {
    id: "exh-comp-8",
    profile_id: "prof-exhibitor-8",
    company_name: "Paramount Pack Systems",
    logo_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&auto=format&fit=crop&q=80",
    description: "Form-Fill-Seal (FFS) multihead weigher packaging machines, shrink wrapping tunnels, and case packers.",
    business_category: "Packaging",
    email: "info@paramountpack.example.com",
    phone: "+91 98202 99881",
    website: "https://paramountpack.example.com",
    city: "Pune",
    state: "Maharashtra",
    year_established: 2011,
    rating: 4.7,
    review_count: 94,
    verified: true
  }
];

// Add simulated exhibitors to reach 50 companies with rich profiles
const cities = ["Mumbai", "Pune", "Bengaluru", "New Delhi", "Ahmedabad", "Chennai", "Coimbatore", "Hyderabad", "Faridabad", "Indore", "Rajkot", "Vadodara"];
const industries = ["Industrial Machinery", "Manufacturing", "Automotive", "Electronics", "Construction", "Packaging", "Agriculture", "Industrial Automation", "Logistics"];

for (let i = 9; i <= 50; i++) {
  const city = cities[i % cities.length];
  const cat = industries[i % industries.length];
  SEED_EXHIBITORS.push({
    id: `exh-comp-${i}`,
    profile_id: `prof-exhibitor-${i}`,
    company_name: `${['Vanguard', 'Omni', 'Sterling', 'Nexus', 'Delta', 'Nova', 'Pinnacle', 'Bharat', 'Kirlos', 'Shakti', 'Dynamic', 'Matrix', 'Techno', 'Aero', 'Superb'][i % 15]} ${cat.split(' ')[0]} ${['Corp', 'Works', 'India Ltd', 'Systems', 'Tech'][i % 5]}`,
    logo_url: `https://images.unsplash.com/photo-${1500000000000 + (i * 1234567) % 90000000}?w=160&auto=format&fit=crop&q=80`,
    description: `Leading provider of ${cat} solutions with state-of-the-art facilities in ${city}. Trusted by tier-1 and tier-2 enterprises nationwide.`,
    business_category: cat,
    email: `sales@corp${i}.example.com`,
    phone: `+91 98${(20000000 + i * 4321).toString().slice(0, 8)}`,
    website: `https://corp${i}.example.com`,
    city: city,
    state: city === "Mumbai" || city === "Pune" ? "Maharashtra" : city === "Bengaluru" ? "Karnataka" : "Delhi",
    year_established: 2000 + (i % 22),
    rating: Number((4.3 + ((i % 7) * 0.1)).toFixed(1)),
    review_count: 20 + (i * 3) % 150,
    verified: i % 4 !== 0
  });
}

// 100+ Realistic Products
export const SEED_PRODUCTS = [
  // 1. ABC Machinery Products (Matched in Demo)
  {
    id: "prod-1",
    exhibitor_id: "exh-comp-1",
    name: "CNC Laser Cutting Machine (Fiber 3kW - 12kW)",
    category: "Industrial Machinery",
    description: "High-precision CNC Fiber Laser Cutting Machine designed for mild steel (up to 25mm), stainless steel (up to 16mm), aluminum and brass. Equipped with CypCut CNC controller, Raytools autofocus head, and dual exchange shuttle table for non-stop metal sheet fabrication.",
    price_min: 2200000,
    price_max: 2850000,
    currency: "INR",
    moq: 1,
    specifications: {
      "Laser Power": "3000W - 6000W IPG / Maxphotonics",
      "Working Area": "1500mm x 3000mm (5ft x 10ft)",
      "Positioning Accuracy": "±0.03 mm",
      "Max Acceleration": "1.5G",
      "Controller": "CypCut FSCUT2000E",
      "Cooling": "Industrial Dual-circuit Chiller"
    },
    image_url: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80",
    is_featured: true
  },
  {
    id: "prod-2",
    exhibitor_id: "exh-comp-1",
    name: "CNC Hydraulic Press Brake (160 Ton x 3200mm)",
    category: "Industrial Machinery",
    description: "4-Axis Delem DA-53T CNC synchronised hydraulic press brake with Crowning compensation system and rapid clamping tool adapters.",
    price_min: 1800000,
    price_max: 2400000,
    currency: "INR",
    moq: 1,
    specifications: {
      "Bending Force": "1600 kN (160 Ton)",
      "Bending Length": "3200 mm",
      "Axis Control": "Y1, Y2, X, R + V-Crowning",
      "Backgauge Speed": "300 mm/sec"
    },
    image_url: "https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?w=800&auto=format&fit=crop&q=80",
    is_featured: false
  },
  {
    id: "prod-3",
    exhibitor_id: "exh-comp-1",
    name: "Fiber Laser Tube & Pipe Cutting Machine",
    category: "Industrial Machinery",
    description: "Pneumatic full-stroke chuck CNC tube laser machine for round, square, rectangular, and oval pipes with automatic bundle loader.",
    price_min: 2700000,
    price_max: 3400000,
    currency: "INR",
    moq: 1,
    specifications: {
      "Pipe Diameter": "20mm - 220mm",
      "Laser Source": "Raycus 3000W",
      "Tail Chuck Clamping": "Zero-tailing dual pneumatic chuck"
    },
    image_url: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=800&auto=format&fit=crop&q=80",
    is_featured: true
  },

  // 2. XYZ Automation Products (Matched in Demo)
  {
    id: "prod-4",
    exhibitor_id: "exh-comp-2",
    name: "Robotic CNC Laser Cutting & Welding Cell",
    category: "Industrial Automation",
    description: "Turnkey 6-axis robot coupled with 3kW fiber laser generator and seam tracking vision camera for 3D curved metal component fabrication.",
    price_min: 2400000,
    price_max: 2950000,
    currency: "INR",
    moq: 1,
    specifications: {
      "Robot Reach": "2010 mm radius",
      "Laser Power": "3000W Wobble Laser",
      "Payload": "20 kg",
      "Safety": "Complete CE Class 1 Enclosure"
    },
    image_url: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&auto=format&fit=crop&q=80",
    is_featured: true
  },
  {
    id: "prod-5",
    exhibitor_id: "exh-comp-2",
    name: "Laser Cleaning & Rust Removal System (2000W)",
    category: "Industrial Machinery",
    description: "Handheld continuous fiber laser cleaner for oxide layer, paint, rust, and oil removal from metal surfaces prior to welding.",
    price_min: 750000,
    price_max: 1100000,
    currency: "INR",
    moq: 1,
    specifications: {
      "Power": "2000W Continuous Wave",
      "Scanning Width": "10 - 150 mm",
      "Fiber Length": "10 meters armored"
    },
    image_url: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=800&auto=format&fit=crop&q=80",
    is_featured: false
  },

  // 3. PQR Engineering Products (Matched in Demo)
  {
    id: "prod-6",
    exhibitor_id: "exh-comp-3",
    name: "Heavy Duty Sheet Metal CNC Laser Cutter",
    category: "Manufacturing",
    description: "High-rigidity gantry dual-drive fiber laser cutter with heavy annealing bed for vibration-free 24/7 cutting of structural steel plates.",
    price_min: 2150000,
    price_max: 2750000,
    currency: "INR",
    moq: 1,
    specifications: {
      "Table Size": "2000mm x 4000mm",
      "Laser Power": "4000W",
      "Bed Structure": "Welded Steel Plate Heat-Treated",
      "Drive System": "Yaskawa Servo Motors & Shimpo Reducers"
    },
    image_url: "https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?w=800&auto=format&fit=crop&q=80",
    is_featured: true
  },

  // 4. Apex Laser Systems
  {
    id: "prod-7",
    exhibitor_id: "exh-comp-4",
    name: "Ultra-High Power 15kW CNC Fiber Laser Machine",
    category: "Industrial Machinery",
    description: "Groundbreaking high-speed laser cutting center engineered for 40mm thick carbon steel and 30mm stainless steel processing.",
    price_min: 5200000,
    price_max: 7500000,
    currency: "INR",
    moq: 1,
    specifications: {
      "Laser Source": "15000W IPG Photonics",
      "Max Speed": "140 m/min combined",
      "Gas Assist": "Nitrogen / High-pressure Oxygen / Air"
    },
    image_url: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80",
    is_featured: true
  },

  // 5. Precision CNC Works
  {
    id: "prod-8",
    exhibitor_id: "exh-comp-5",
    name: "5-Axis Vertical Machining Center (VMC 850)",
    category: "Industrial Machinery",
    description: "High-torque BT40 spindle 5-axis simultaneous VMC with 24-pocket arm type tool changer and Fanuc 0i-MF Plus CNC controller.",
    price_min: 3200000,
    price_max: 4200000,
    currency: "INR",
    moq: 1,
    specifications: {
      "X/Y/Z Travel": "850 / 550 / 550 mm",
      "Spindle Speed": "12,000 RPM Direct Drive",
      "Rotary Table": "400mm Tilting-Rotary Axis"
    },
    image_url: "https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?w=800&auto=format&fit=crop&q=80",
    is_featured: true
  },

  // 6. Paramount Pack Systems
  {
    id: "prod-9",
    exhibitor_id: "exh-comp-8",
    name: "Automatic Multi-Track Packaging & Pouch Sealing Machine",
    category: "Packaging",
    description: "Continuous high-speed pouch packing machine with servo volumetric filler, nitrogen flushing, and thermal batch printing for granules and powders.",
    price_min: 1200000,
    price_max: 1650000,
    currency: "INR",
    moq: 1,
    specifications: {
      "Speed": "120 - 180 pouches/min",
      "Pouch Type": "Center seal, 3-side seal, gusset",
      "Control": "Siemens 7-inch Touchscreen PLC"
    },
    image_url: "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=800&auto=format&fit=crop&q=80",
    is_featured: true
  },
  {
    id: "prod-10",
    exhibitor_id: "exh-comp-8",
    name: "Semi-Automated Liquid Bottling & Capping Line",
    category: "Packaging",
    description: "Monoblock 4-head piston filler with automatic torque capping unit for viscous liquids, oils, and chemical solutions.",
    price_min: 850000,
    price_max: 1400000,
    currency: "INR",
    moq: 1,
    specifications: {
      "Filling Range": "100 ml to 1000 ml",
      "Output": "30 to 45 bottles/min",
      "Material": "SS 316 Contact Parts"
    },
    image_url: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80",
    is_featured: false
  }
];

// Generate remainder up to 105 products covering all categories
const sampleProductsMeta = [
  { name: "Servo-Driven Surface Grinding Machine", cat: "Manufacturing", min: 1400000, max: 1900000 },
  { name: "Heavy Duty 4-Pillar Hydraulic Press 250 Ton", cat: "Manufacturing", min: 2800000, max: 3600000 },
  { name: "Automated Guided Vehicle (AGV) 1 Ton Payload", cat: "Logistics", min: 1100000, max: 1650000 },
  { name: "Industrial SCARA Pick-and-Place Robot", cat: "Industrial Automation", min: 850000, max: 1250000 },
  { name: "Automatic Blister Packaging Machine for Tablets", cat: "Packaging", min: 1750000, max: 2350000 },
  { name: "Solar Powered Submersible Agricultural Pump 10HP", cat: "Agriculture", min: 280000, max: 420000 },
  { name: "Concrete Boom Pump Truck 36m", cat: "Construction", min: 8500000, max: 12500000 },
  { name: "CNC Wire Cut EDM High Precision", cat: "Industrial Machinery", min: 1650000, max: 2200000 },
  { name: "SMT Pick and Place PCB Assembly Line", cat: "Electronics", min: 3800000, max: 5400000 },
  { name: "Automotive Transmission Test Rig", cat: "Automotive", min: 4500000, max: 6200000 },
  { name: "Intelligent Warehouse Pallet Shuttle System", cat: "Logistics", min: 2400000, max: 3200000 },
  { name: "Rotary Tablet Compression Press 45-Station", cat: "Manufacturing", min: 2100000, max: 2900000 },
  { name: "Industrial Vacuum Emulsifying Mixer 500L", cat: "Manufacturing", min: 1350000, max: 1950000 },
  { name: "Laser Marker 50W MOPA Color Engraving", cat: "Industrial Machinery", min: 320000, max: 480000 },
  { name: "Automated Optical Inspection (AOI) System", cat: "Electronics", min: 2900000, max: 3900000 },
  { name: "Heavy Crawler Excavator 21 Ton", cat: "Construction", min: 4800000, max: 6500000 },
  { name: "Laser Land Leveler with Dual Slope Transmitter", cat: "Agriculture", min: 410000, max: 590000 },
  { name: "End-of-Line Robotic Carton Palletizer", cat: "Packaging", min: 2800000, max: 3750000 },
  { name: "High Speed Multi-Axis Swiss CNC Lathe", cat: "Industrial Machinery", min: 3400000, max: 4600000 },
  { name: "Modular Aluminium Belt Conveyor Line 20m", cat: "Industrial Automation", min: 480000, max: 750000 }
];

for (let i = 11; i <= 105; i++) {
  const meta = sampleProductsMeta[(i - 11) % sampleProductsMeta.length];
  const exhibitorId = `exh-comp-${(i % 50) + 1}`;
  SEED_PRODUCTS.push({
    id: `prod-${i}`,
    exhibitor_id: exhibitorId,
    name: `${meta.name} (Series ${(i * 7) % 900 + 100})`,
    category: meta.cat,
    description: `High-durability ${meta.name.toLowerCase()} featuring programmable digital logic controllers, precision bearing assemblies, and integrated predictive maintenance telemetry.`,
    price_min: meta.min,
    price_max: meta.max,
    currency: "INR",
    moq: 1 + (i % 3),
    specifications: {
      "Operating Voltage": "415V / 50Hz 3-Phase",
      "Certification": "ISO 9001 / CE Compliant",
      "Warranty": "24 Months Comprehensive",
      "Control Architecture": "EtherCAT / Modbus TCP"
    },
    image_url: `https://images.unsplash.com/photo-${1581091226825 + (i * 13579) % 100000}?w=800&auto=format&fit=crop&q=80`,
    is_featured: i % 7 === 0
  });
}

// 100+ Stalls across Halls A, B, C for Manufacturing Expo Mumbai (exh-1)
// Explicitly placing:
// Stall A24 -> ABC Machinery (exh-comp-1) - OCCUPIED
// Stall B17 -> XYZ Automation (exh-comp-2) - OCCUPIED
// Stall C08 -> PQR Engineering (exh-comp-3) - OCCUPIED
export const SEED_STALLS = [];

const hallsConfig = [
  { hallId: "hall-1", code: "A", name: "Hall A", total: 30, cat: "Machinery" },
  { hallId: "hall-2", code: "B", name: "Hall B", total: 30, cat: "Automation" },
  { hallId: "hall-3", code: "C", name: "Hall C", total: 25, cat: "Tooling" }
];

hallsConfig.forEach(hall => {
  for (let i = 1; i <= hall.total; i++) {
    const numStr = i < 10 ? `0${i}` : `${i}`;
    const stallNumber = `${hall.code}${numStr}`;
    const row = Math.ceil(i / 5);
    const col = ((i - 1) % 5) + 1;
    
    let status = "available";
    let exhibitorId = null;
    let size = "3m x 3m";
    let basePrice = 85000;

    // Special matched demo stalls:
    if (stallNumber === "A24") {
      status = "occupied";
      exhibitorId = "exh-comp-1"; // ABC Machinery
      size = "6m x 3m";
      basePrice = 160000;
    } else if (stallNumber === "B17") {
      status = "occupied";
      exhibitorId = "exh-comp-2"; // XYZ Automation
      size = "6m x 3m";
      basePrice = 160000;
    } else if (stallNumber === "C08") {
      status = "occupied";
      exhibitorId = "exh-comp-3"; // PQR Engineering
      size = "3m x 3m";
      basePrice = 90000;
    } else if (stallNumber === "A14" || stallNumber === "B09" || stallNumber === "C12") {
      status = "pending"; // Pending organizer approval
      exhibitorId = null;
    }

    SEED_STALLS.push({
      id: `stall-${hall.code}-${stallNumber}`,
      exhibition_id: "exh-1",
      hall_id: hall.hallId,
      stall_number: stallNumber,
      hall_code: hall.code,
      row_num: row,
      col_num: col,
      size: size,
      category: hall.cat,
      base_price: basePrice,
      status: status,
      current_exhibitor_id: exhibitorId
    });
  }
});

// Also add stalls for Bharat Automation (exh-2) to ensure variety
for (let i = 1; i <= 20; i++) {
  const numStr = i < 10 ? `0${i}` : `${i}`;
  SEED_STALLS.push({
    id: `stall-exh2-A-${numStr}`,
    exhibition_id: "exh-2",
    hall_id: "hall-4",
    stall_number: `A${numStr}`,
    hall_code: "A",
    row_num: Math.ceil(i / 5),
    col_num: ((i - 1) % 5) + 1,
    size: "3m x 3m",
    category: "Robotics",
    base_price: 95000,
    status: i === 5 ? "occupied" : "available",
    current_exhibitor_id: i === 5 ? "exh-comp-6" : null
  });
}

// Initial Appointments
export const SEED_APPOINTMENTS = [
  {
    id: "app-1",
    booking_id: "EXH-2026-00124",
    buyer_id: "prof-buyer-1",
    exhibitor_id: "exh-comp-1",
    exhibition_id: "exh-1",
    stall_id: "stall-A-A24",
    product_id: "prod-1",
    date: "2026-11-13",
    time_slot: "11:30 AM",
    purpose: "Live demonstration of CNC Laser Cutting Machine & Sheet metal piercing speeds",
    requirement_notes: "Looking to replace our existing plasma cutting station. Need quotation for 6kW laser source with dual table.",
    status: "confirmed",
    created_at: "2026-09-20T10:30:00Z"
  },
  {
    id: "app-2",
    booking_id: "EXH-2026-00188",
    buyer_id: "prof-buyer-1",
    exhibitor_id: "exh-comp-2",
    exhibition_id: "exh-1",
    stall_id: "stall-B-B17",
    product_id: "prod-4",
    date: "2026-11-13",
    time_slot: "02:30 PM",
    purpose: "Robotic laser cell feasibility study for automotive chassis brackets",
    requirement_notes: "Requirement for 3D laser trimming cell. Budget approx ₹25 Lakhs.",
    status: "confirmed",
    created_at: "2026-09-21T14:15:00Z"
  }
];

// Initial Qualified Leads (Connected to Exhibitor CRM)
export const SEED_LEADS = [
  {
    id: "lead-1",
    appointment_id: "app-1",
    buyer_id: "prof-buyer-1",
    exhibitor_id: "exh-comp-1",
    exhibition_id: "exh-1",
    stall_id: "stall-A-A24",
    product_name: "CNC Laser Cutting Machine (Fiber 3kW - 12kW)",
    buyer_company: "Sharma Precision Fab Pvt Ltd",
    buyer_name: "Rajesh Sharma",
    buyer_email: "rajesh@sharmaindustries.com",
    buyer_phone: "+91 98201 44552",
    budget_range: "₹20–30 Lakhs",
    buyer_location: "Mumbai, Maharashtra (62 km)",
    match_percentage: 96,
    status: "New",
    notes: "High intent buyer. Looking for 6kW fiber laser. Scheduled booth demo at Stall A24 on Nov 13, 11:30 AM.",
    created_at: "2026-09-20T10:30:00Z"
  },
  {
    id: "lead-2",
    appointment_id: "app-2",
    buyer_id: "prof-buyer-1",
    exhibitor_id: "exh-comp-2",
    exhibition_id: "exh-1",
    stall_id: "stall-B-B17",
    product_name: "Robotic CNC Laser Cutting & Welding Cell",
    buyer_company: "Sharma Precision Fab Pvt Ltd",
    buyer_name: "Rajesh Sharma",
    buyer_email: "rajesh@sharmaindustries.com",
    buyer_phone: "+91 98201 44552",
    budget_range: "₹20–30 Lakhs",
    buyer_location: "Mumbai, Maharashtra (62 km)",
    match_percentage: 91,
    status: "Meeting Scheduled",
    notes: "Discussing turnkey robotic cell for chassis fabrication.",
    created_at: "2026-09-21T14:15:00Z"
  },
  {
    id: "lead-3",
    appointment_id: null,
    buyer_id: "prof-buyer-2",
    exhibitor_id: "exh-comp-1",
    exhibition_id: "exh-1",
    stall_id: "stall-A-A24",
    product_name: "CNC Hydraulic Press Brake (160 Ton)",
    buyer_company: "Apex Enclosures LLP",
    buyer_name: "Vikram Malhotra",
    buyer_email: "vikram@apex-enc.com",
    buyer_phone: "+91 98199 88776",
    budget_range: "₹18–25 Lakhs",
    buyer_location: "Pune, Maharashtra",
    match_percentage: 88,
    status: "Contacted",
    notes: "Requires quick delivery for electrical cabinet bending line.",
    created_at: "2026-09-22T16:00:00Z"
  }
];

// Stall Requests (Organizer Approval Workflow)
export const SEED_STALL_REQUESTS = [
  {
    id: "req-1",
    exhibition_id: "exh-1",
    exhibitor_id: "exh-comp-4",
    stall_id: "stall-A-A14",
    company_name: "Apex Laser Systems",
    stall_number: "A14",
    hall_code: "A",
    requested_size: "6m x 3m",
    status: "pending",
    requested_at: "2026-09-24T09:00:00Z",
    notes: "Requesting corner booth for live 15kW demonstration."
  },
  {
    id: "req-2",
    exhibition_id: "exh-1",
    exhibitor_id: "exh-comp-6",
    stall_id: "stall-B-B09",
    company_name: "Titan Robotic Arms",
    stall_number: "B09",
    hall_code: "B",
    requested_size: "3m x 3m",
    status: "pending",
    requested_at: "2026-09-25T11:30:00Z",
    notes: "Stall for material handling robot cell display."
  }
];

// Initial Reviews
export const SEED_REVIEWS = [
  {
    id: "rev-1",
    buyer_id: "prof-buyer-1",
    exhibitor_id: "exh-comp-1",
    buyer_name: "Rajesh Sharma",
    buyer_company: "Sharma Precision Fab",
    rating: 5,
    review_text: "Outstanding live demonstration at Stall A24! Their 6kW CNC fiber laser cutting machine had remarkable edge precision on 16mm plates. Excellent team.",
    created_at: "2026-08-15T12:00:00Z"
  },
  {
    id: "rev-2",
    buyer_id: "prof-buyer-3",
    exhibitor_id: "exh-comp-1",
    buyer_name: "Manish Kothari",
    buyer_company: "Kothari Auto Components",
    rating: 5,
    review_text: "Procured a 3kW machine from ABC Machinery last year. Zero breakdown in 14 months and the after-sales support in Maharashtra is rapid.",
    created_at: "2026-07-10T14:30:00Z"
  },
  {
    id: "rev-3",
    buyer_id: "prof-buyer-4",
    exhibitor_id: "exh-comp-2",
    buyer_name: "Sandeep Rao",
    buyer_company: "Rao Automation",
    rating: 4,
    review_text: "Great robotic cell integration expertise. Highly knowledgeable automation engineers.",
    created_at: "2026-08-28T09:15:00Z"
  }
];

// Initial Notifications
export const SEED_NOTIFICATIONS = [
  {
    id: "notif-1",
    user_id: "user-buyer-1",
    role: "buyer",
    title: "Appointment Confirmed",
    message: "Your appointment with ABC Machinery at Stall A24 is confirmed for 13 Nov 2026 at 11:30 AM (Booking ID: EXH-2026-00124).",
    type: "appointment",
    is_read: false,
    created_at: "2026-09-20T10:30:00Z",
    link: "/buyer/appointments"
  },
  {
    id: "notif-2",
    user_id: "user-buyer-1",
    role: "buyer",
    title: "AI Match Found",
    message: "We found 3 high-affinity suppliers for 'CNC Laser Cutting Machine' at Manufacturing Expo Mumbai!",
    type: "info",
    is_read: false,
    created_at: "2026-09-21T08:00:00Z",
    link: "/buyer/results"
  },
  {
    id: "notif-3",
    user_id: "user-exhibitor-1",
    role: "exhibitor",
    title: "New Qualified Lead Generated",
    message: "Rajesh Sharma (Sharma Precision Fab) booked an appointment for CNC Laser Cutting Machine. Match: 96%.",
    type: "lead",
    is_read: false,
    created_at: "2026-09-20T10:30:00Z",
    link: "/exhibitor/leads"
  },
  {
    id: "notif-4",
    user_id: "user-exhibitor-1",
    role: "exhibitor",
    title: "Stall A24 Confirmed",
    message: "Your stall request for Stall A24 at Manufacturing Expo Mumbai 2026 has been approved by the organizer.",
    type: "stall",
    is_read: true,
    created_at: "2026-09-18T16:00:00Z",
    link: "/exhibitor/stall"
  },
  {
    id: "notif-5",
    user_id: "user-organizer-1",
    role: "organizer",
    title: "Pending Stall Request",
    message: "Apex Laser Systems has requested Stall A14 for Manufacturing Expo Mumbai 2026.",
    type: "stall",
    is_read: false,
    created_at: "2026-09-24T09:00:00Z",
    link: "/organizer/stall-requests"
  }
];

export const SEED_SAVED_EXHIBITIONS = ["exh-1", "exh-4"];
export const SEED_SAVED_EXHIBITORS = ["exh-comp-1", "exh-comp-2"];
