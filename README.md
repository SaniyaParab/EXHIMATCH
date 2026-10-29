# ExhiMatch AI — AI-Powered B2B Product Discovery & Exhibition Matching Platform

> **"Find the Right Exhibition. Find the Right Supplier."**  
> *Built for OpsGenie AI Hackathon Track*

---

## 🌟 Executive Summary

**ExhiMatch AI** transforms the traditional B2B capital machinery procurement process. 

When a factory owner or procurement manager needs to procure specialized industrial machinery (e.g., a *₹25 Lakh CNC Fiber Laser Cutting Machine*), they face months of fragmented vendor calls, unverified brokers, and wasted travel across disparate cities.

**ExhiMatch AI solves this by connecting buyers to the exact trade fair and physical booth stall** where verified OEM machinery makers will physically demonstrate the equipment they need.

```
BUYER REQUIREMENT (Specs, Budget, Travel Radius)
       ↓
AI 6-FACTOR WEIGHTED MATCHING ENGINE
       ↓
RELEVANT EXHIBITION (e.g., Manufacturing Expo Mumbai - 92% Match)
       ↓
RELEVANT EXHIBITORS (e.g., ABC Machinery, XYZ Automation, PQR Engineering)
       ↓
TOP STALL RECOMMENDATIONS (⭐ Stall A24 - 96% Match)
       ↓
INTERACTIVE SVG/GRID FLOOR MAP (Hall A, B, C)
       ↓
APPOINTMENT BOOKING (Generates Booking ID: EXH-2026-00124)
       ↓
AUTOMATIC QUALIFIED B2B LEAD (Enriched in Exhibitor CRM Pipeline)
       ↓
EXHIBITOR & ORGANIZER ANALYTICS & ROI
```

---

## 🚀 Key Features

### 1. 🎯 Stall-Level AI Matching (Core Differentiating Feature)
Unlike generic event portals that only recommend cities or events, ExhiMatch AI recommends **exact booth stalls** (e.g., *Stall A24 in Hall A*) where verified manufacturers have confirmed equipment on display.

### 2. 🧮 Algorithmic 6-Factor Scoring
Scores are calculated dynamically using real data:
- **Product Relevance (40%)**: Keyword token matches, technical specifications, and category alignment.
- **Budget Compatibility (20%)**: Machine price overlap with buyer budget.
- **Location & Distance (15%)**: Proximity of exhibition and vendor to buyer headquarters.
- **Exhibition Date & Schedule (10%)**: Proximity to buyer's procurement timeline.
- **Supplier Credibility & Stall (10%)**: Verified OEM status, assigned stall presence, and ratings.
- **Custom Specifications (5%)**: Match on notes (e.g., *16mm sheet piercing, autofocus heads*).

### 3. 🗺️ Interactive Floor Map (Hall A, Hall B, Hall C)
- Live SVG/CSS grid floor plan for trade fairgrounds.
- Real-time status indicators: **Available (Green)**, **Occupied (Blue)**, **Pending Approval (Yellow)**, and **⭐ AI Recommended (Purple)**.
- Interactive stall drawer with machine specs and instant booking.

### 4. 💼 3 Connected Workflows & Roles

| Role | Workflow |
| :--- | :--- |
| **Buyer** | Requirement intake → AI matching → Top stall discovery → Floor map navigation → 1-click booth demo booking → Supplier review. |
| **Exhibitor** | Company onboarding → Machinery catalog management → Exhibition applications → Stall allocation request → Live CRM Qualified Leads → Appointment calendar. |
| **Organizer** | Trade fair creation → Multi-hall layout configuration → Stall availability grid → Exhibitor request approvals → Traffic & lead analytics. |

---

## 🛠️ Technology Stack

- **Frontend Core**: React.js (JavaScript, JSX) + Vite
- **Styling**: Tailwind CSS + Custom Design System
- **Icons**: Lucide React Icons
- **Charts & Visualizations**: Recharts
- **Database & Backend**: Supabase (PostgreSQL, Storage, Auth, RLS)
- **Routing**: React Router v6
- **Celebration UX**: Canvas Confetti

---

## 🗄️ Database Architecture (Supabase PostgreSQL)

The schema is defined in [`supabase/schema.sql`](file:///d:/PROJECT%20FILE/EXIAI/supabase/schema.sql) with the following relational models:
- `profiles` — Buyer, exhibitor, and organizer user profiles
- `exhibitions` — Trade fairs, dates, venue coordinates, and categories
- `halls` — Exhibition halls, floors, and zoning
- `stalls` — Stall numbers (A01 - A30), dimensions, categories, fee, and status
- `exhibitors` — Registered manufacturing companies, ratings, and certifications
- `products` — Industrial equipment catalog with price ranges and specifications
- `stall_requests` — Booth applications awaiting organizer approval
- `appointments` — Confirmed buyer booth demonstration slots
- `leads` — Qualified B2B CRM leads automatically created from appointments
- `reviews` — Audited buyer performance reviews and ratings
- `notifications` — Role-specific alerts for appointments, leads, and stall status

---

## 🎬 Official Demo Scenario for Judges

1. **Buyer Persona** (Rajesh Sharma, *Sharma Precision Fab*):
   - Navigate to `/buyer/discover` or click **"1-Click Demo Flow"** on the top banner.
   - Enter:
     - **Product**: `CNC Laser Cutting Machine`
     - **Budget**: `₹20–30 Lakhs`
     - **Location**: `Mumbai` (`200 km` radius)
   - Click **"Find My Matches"**.
   - Result: **Manufacturing Expo Mumbai** (92% Match) and **Top Stalls**:
     - ⭐ **Stall A24** — ABC Machinery (**96% Match**, 4.8★ rating)
     - ⭐ **Stall B17** — XYZ Automation (**91% Match**)
     - ⭐ **Stall C08** — PQR Engineering (**87% Match**)
   - Open the **Interactive Floor Map** (`/buyer/map/exh-1`) and click **Stall A24**.
   - Click **"Book Appointment"** for *13 Nov at 11:30 AM*.
   - Confirmed booking generates unique token: **`EXH-2026-00124`**.

2. **Exhibitor Persona** (Amit Patel, *ABC Machinery*):
   - Switch persona to **Exhibitor** via the top banner.
   - Go to `/exhibitor/leads` (CRM):
     - Notice the newly generated **Qualified Lead** from *Rajesh Sharma* for `CNC Laser Cutting Machine` with `96% Match` and `₹20-30L` budget.
     - Update lead stage from **New** to **Meeting Scheduled** or **Contacted**.
   - Go to `/exhibitor/stall` to view confirmed **Stall A24** in Hall A.

3. **Organizer Persona** (Sunil Verma, *MITE Trade Expos*):
   - Switch persona to **Organizer** via the top banner.
   - Go to `/organizer/stall-requests`:
     - View pending booth requests (e.g., *Apex Laser Systems for Stall A14*).
     - Click **"Approve"** — notice the stall status dynamically updates to **Occupied** on the live floor map.
   - View macro attendance and lead metrics in `/organizer/analytics`.

---

## 💻 Local Setup & Development

### Prerequisites
- Node.js (v18 or v22)
- npm or pnpm

### Quick Start
```bash
# 1. Clone repository and install dependencies
cd "d:/PROJECT FILE/EXIAI"
npm install

# 2. Run local development server
npm run dev
```

Visit `http://localhost:5173` in your browser.

> **Zero Configuration Required**: ExhiMatch AI includes an integrated local persistence & seed engine with 10+ exhibitions, 50+ exhibitors, 105+ products, and 100+ stalls. It works 100% out of the box even before configuring external Supabase credentials!

---

## 🌐 Supabase Integration (Optional Live Cloud Database)

To connect with a live cloud Supabase database:
1. Create a free project at [supabase.com](https://supabase.com).
2. Go to **SQL Editor** in Supabase and run the SQL code from [`supabase/schema.sql`](file:///d:/PROJECT%20FILE/EXIAI/supabase/schema.sql).
3. Copy your **Project URL** and **Anon Key** from Project Settings > API.
4. Update `.env`:
   ```env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGciOiJI...
   ```
5. Restart Vite with `npm run dev`.

---

## 📦 Production Deployment

### Netlify / Vercel
```bash
# Build production bundle
npm run build
```
- **Build command**: `npm run build`
- **Publish directory**: `dist`
- **Environment variables**: Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` if using cloud Supabase.

---

## 🏆 Hackathon Submission Checklist

- [x] Complete React.js + Tailwind CSS full-stack architecture (No TypeScript)
- [x] 10+ detailed exhibitions across India
- [x] 50+ realistic equipment exhibitors
- [x] 105+ industrial machinery products with prices in Lakhs
- [x] 100+ stalls across Hall A, Hall B, Hall C
- [x] Algorithmic 6-factor weighted AI scoring engine
- [x] Interactive SVG/Grid Floor Map with stall selection modal
- [x] Complete Buyer, Exhibitor, and Organizer flows
- [x] Instant 1-click test scenario for hackathon judges
- [x] Real-time appointment booking & CRM qualified lead creation
- [x] Recharts analytics for exhibitor and organizer dashboards
- [x] Supabase SQL schema with RLS policies

---

*Developed for the OpsGenie AI Hackathon.*
