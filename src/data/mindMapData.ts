import { MindMapData } from "../types";

export const PREBUILT_MIND_MAPS: MindMapData[] = [
  // 1. POLITY: Constitutional Amendment Flow (Article 368)
  {
    id: "mm-polity-art368",
    title: "Article 368: Constitutional Amendment Procedure & Types",
    subject: "Polity",
    topicId: "constitutional-amendments",
    description: "End-to-end procedural flow of introducing, voting, state ratification, and presidential assent under Art 368 vs Simple Majority.",
    examFocus: ["UPSC Prelims", "UPSC Mains", "UPPSC Prelims", "UPPSC Mains"],
    sources: ["NCERT Class 11 Constitution at Work (Ch 9)", "M. Laxmikanth (Ch 10)", "Supreme Court Judgments"],
    shortcutMnemonic: "Mnemonic: 'NO JOINT NO VETO' — No Joint Sitting under Art 108 allowed, and President has NO veto (must give assent under 24th AA 1971)!",
    flowchart: {
      title: "Article 368 Procedural Lifecycle Flowchart",
      steps: [
        {
          step: 1,
          label: "Introduction of Bill",
          description: "Can be introduced in EITHER Lok Sabha or Rajya Sabha by a Minister OR Private Member. NO prior presidential recommendation required.",
          tag: "Intro Stage",
          highlight: false,
        },
        {
          step: 2,
          label: "Separate House Passage",
          description: "Must be passed in EACH House separately by Special Majority: (a) 50%+ of total membership, AND (b) 2/3rd majority of members present and voting.",
          tag: "Voting Stage",
          highlight: true,
        },
        {
          step: 3,
          label: "Deadlock Handling Check",
          description: "If houses disagree, bill DIES immediately. Article 108 Joint Sitting is STRICTLY PROHIBITED for Constitutional Amendment Bills!",
          tag: "Crucial Trap",
          highlight: true,
        },
        {
          step: 4,
          label: "Federal Provision Check (If Applicable)",
          description: "If amending federal provisions (7th Schedule, Supreme Court/High Courts, Representation of States, Art 368 itself) -> Requires ratification by 50% of State Legislatures by SIMPLE MAJORITY.",
          tag: "Federal Ratification",
          highlight: false,
        },
        {
          step: 5,
          label: "Presidential Assent",
          description: "President MUST give assent. 24th Amendment Act 1971 made presidential assent mandatory. President CANNOT withhold or return the bill.",
          tag: "Final Law",
          highlight: true,
        },
      ],
    },
    rootNode: {
      id: "root-368",
      label: "Amendment of the Constitution (Art 368, Part XX)",
      type: "root",
      children: [
        {
          id: "node-types",
          label: "3 Ways of Amending (2 under Art 368)",
          type: "category",
          children: [
            {
              id: "n-simple",
              label: "Simple Majority (Outside Art 368)",
              type: "concept",
              notes: "Creation/abolition of Legislative Councils (Art 169), Citizenship, 2nd Schedule salaries, creation of new States (Art 2, 3, 4).",
            },
            {
              id: "n-special",
              label: "Special Majority alone (Art 368)",
              type: "concept",
              notes: "Fundamental Rights (Part III), Directive Principles (Part IV), all provisions not covered by categories 1 & 3.",
            },
            {
              id: "n-special-states",
              label: "Special Majority + 50% States Simple Ratification",
              type: "concept",
              notes: "Election of President (Art 54, 55), 7th Schedule lists, Executive power of Union/States, Representation of States in Parliament, Art 368 itself.",
            },
          ],
        },
        {
          id: "node-restrictions",
          label: "Judicial Restrictions & Traps",
          type: "trap",
          children: [
            {
              id: "n-basic-struct",
              label: "Basic Structure Doctrine",
              type: "mains_keyword",
              notes: "Kesavananda Bharati (1973): Parliament cannot alter the basic features (Rule of Law, Federalism, Judicial Review, Secularism).",
            },
            {
              id: "n-minerva",
              label: "Minerva Mills (1980)",
              type: "exam_fact",
              notes: "Struck down Section 4 & 55 of 42nd AA; held that limited amending power is itself a basic feature.",
            },
            {
              id: "n-trap-joint",
              label: "Trap: No Joint Sitting & Mandatory Assent",
              type: "trap",
              notes: "Joint sitting (Art 108) cannot be summoned. President has NO pocket or suspensive veto over Art 368 bills.",
            },
          ],
        },
        {
          id: "node-mains-dim",
          label: "Mains Answer Dimensions (GS-2)",
          type: "mains_keyword",
          children: [
            {
              id: "n-flex-rigid",
              label: "Synthesis of Rigidity & Flexibility",
              type: "concept",
              notes: "Not as rigid as USA (needs 3/4th states) nor as flexible as UK (ordinary law). Over 106+ amendments in 75 years prove adaptability.",
            },
            {
              id: "n-federal-conflict",
              label: "Federal Friction (GST 101st AA & NJAC 99th AA)",
              type: "concept",
              notes: "Balance between Union legislative dominance and States' fiscal/political autonomy.",
            },
          ],
        },
      ],
    },
  },

  // 2. GEOGRAPHY: Indian Monsoon Mechanism & ITCZ Flowchart
  {
    id: "mm-geo-monsoon",
    title: "Indian Southwest Monsoon Mechanism & Walker Cell",
    subject: "Geography",
    topicId: "monsoon-mechanism",
    description: "Dynamic drivers of the SW Monsoon: Thermal heating of Tibetan Plateau, Tropical Easterly Jet, Mascarene High, Somali Jet, El Niño & IOD.",
    examFocus: ["UPSC Prelims", "UPSC Mains", "UPPSC Prelims"],
    sources: ["NCERT Class 11 India Physical Environment (Ch 4)", "NCERT Physical Geography", "GC Leong"],
    shortcutMnemonic: "Mnemonic: 'TI-TE-MA-SO': Tibetan heating -> Tropical Easterly Jet -> Mascarene High pressure -> Somali low-level jet push!",
    flowchart: {
      title: "Step-by-Step Monsoon Inception & Surge Flow",
      steps: [
        {
          step: 1,
          label: "Intense Summer Insolation & Tibetan Heating",
          description: "May-June: Sun shines overhead Tropic of Cancer. Tibetan Plateau acts as high-level heat engine (2-3°C warmer than surrounding atmosphere).",
          tag: "Thermal Trigger",
          highlight: false,
        },
        {
          step: 2,
          label: "ITCZ Shifts Northward to Ganga Plains",
          description: "Inter-Tropical Convergence Zone (ITCZ) migrates to 20°-25°N (Monsoon Trough), creating intense thermal low pressure over NW India & Pakistan.",
          tag: "Low Pressure Creation",
          highlight: true,
        },
        {
          step: 3,
          label: "Establishment of Tropical Easterly Jet (TEJ)",
          description: "Rising air over Tibet diverges aloft and flows southwestward as upper-tropospheric TEJ (14°N), sinking over Mascarene Basin near Madagascar.",
          tag: "Upper Air Flow",
          highlight: false,
        },
        {
          step: 4,
          label: "Mascarene High & Somali Jet Surge",
          description: "Intense high pressure at Mascarene Islands pushes SE Trade winds across Equator. Deflected right by Coriolis force, becoming SW Monsoon and accelerated by low-level Somali Jet (Findlater Jet).",
          tag: "Oceanic Push",
          highlight: true,
        },
        {
          step: 5,
          label: "Bifurcation into Arabian Sea & Bay of Bengal Branches",
          description: "Strikes Western Ghats (orographic rainfall on windward side, rain-shadow on Deccan) and Bay of Bengal branch deflects along Arakan Yoma towards Ganga Plain.",
          tag: "Rainfall Delivery",
          highlight: false,
        },
      ],
    },
    rootNode: {
      id: "root-monsoon",
      label: "Indian SW Monsoon System",
      type: "root",
      children: [
        {
          id: "n-surface-drivers",
          label: "Surface Pressure & Thermal Drivers",
          type: "category",
          children: [
            {
              id: "n-tibetan",
              label: "Tibetan Plateau Heat Engine",
              type: "concept",
              notes: "Generates vertical ascending air column, driving TEJ aloft and strengthening thermal low over Thar.",
            },
            {
              id: "n-itcz",
              label: "Northward Migration of ITCZ",
              type: "concept",
              notes: "Attracts maritime tropical air masses from southern hemisphere across equator.",
            },
          ],
        },
        {
          id: "n-ocean-atmosphere",
          label: "Ocean-Atmospheric Teleconnections",
          type: "category",
          children: [
            {
              id: "n-enso",
              label: "ENSO (El Niño Southern Oscillation)",
              type: "trap",
              notes: "El Niño (warm Peruvian current + high pressure over Darwin) suppresses Indian monsoon; La Niña enhances it.",
            },
            {
              id: "n-iod",
              label: "Indian Ocean Dipole (IOD)",
              type: "concept",
              notes: "Positive IOD (warmer Western Indian Ocean near Arabian Sea) neutralizes El Niño and boosts monsoon rains.",
            },
            {
              id: "n-mjo",
              label: "Madden-Julian Oscillation (MJO)",
              type: "mains_keyword",
              notes: "Intra-seasonal eastward moving band of clouds and rain; active phase over Indian Ocean causes monsoon bursts.",
            },
          ],
        },
        {
          id: "n-prelims-traps",
          label: "Prelims Elimination Traps",
          type: "trap",
          children: [
            {
              id: "n-wg-rain",
              label: "Western Ghats: Orographic, NOT Convective",
              type: "trap",
              notes: "Heavy rainfall on windward side is due to mountain barrier forced ascent; interior Deccan is rain shadow.",
            },
            {
              id: "n-tn-coast",
              label: "Tamil Nadu Coast Dry in SW Monsoon",
              type: "exam_fact",
              notes: "Lies parallel to Bay of Bengal branch and in rain-shadow of Arabian Sea branch; receives rainfall from Retreating/NE Monsoon (Oct-Dec).",
            },
          ],
        },
      ],
    },
  },

  // 3. ECONOMY: Monetary Policy Transmission & Inflation Targeting
  {
    id: "mm-eco-monetary",
    title: "Monetary Policy Transmission & Flexible Inflation Targeting (FIT)",
    subject: "Economy",
    topicId: "monetary-policy-transmission",
    description: "How RBI Repo Rate adjustments flow through money market rates, bank lending rates, aggregate demand, and retail CPI inflation.",
    examFocus: ["UPSC Prelims", "UPSC Mains", "UPPSC Prelims"],
    sources: ["NCERT Class 12 Macroeconomics (Ch 3)", "Ramesh Singh (Ch: Banking)", "RBI Urjit Patel Committee Report"],
    shortcutMnemonic: "Mnemonic: '4+/-2 CPI' — Flexible Inflation Targeting under RBI Act Section 45ZB targets Headline CPI at 4% with tolerance of 2% to 6%.",
    flowchart: {
      title: "Monetary Policy Rate Transmission Channels Flowchart",
      steps: [
        {
          step: 1,
          label: "MPC Decisions on Policy Repo Rate",
          description: "6-member Monetary Policy Committee (3 RBI + 3 GoI external experts) raises or cuts the Repo Rate based on CPI forecasts.",
          tag: "Policy Step",
          highlight: false,
        },
        {
          step: 2,
          label: "Interbank & Money Market Adjustment",
          description: "Call money rate, TREPS, and commercial paper yields adjust immediately to the revised policy corridor (SDF to MSF).",
          tag: "Money Market",
          highlight: false,
        },
        {
          step: 3,
          label: "Bank Lending Rate Channel (EBLR)",
          description: "Commercial banks adjust External Benchmark Lending Rates (EBLR linked to Repo or T-bills) on retail and MSME loans. MCLR adjusts with a lag.",
          tag: "Banking Channel",
          highlight: true,
        },
        {
          step: 4,
          label: "Aggregate Demand & Investment Shift",
          description: "Higher loan rates discourage discretionary consumer EMI borrowing and capital expenditure; households increase bank deposits.",
          tag: "Real Economy",
          highlight: false,
        },
        {
          step: 5,
          label: "Cooling of Headline CPI Inflation",
          description: "Compressed demand dampens core inflation, restoring retail price stability and anchoring long-term inflation expectations.",
          tag: "Outcome Target",
          highlight: true,
        },
      ],
    },
    rootNode: {
      id: "root-monetary",
      label: "Monetary Policy Framework (RBI)",
      type: "root",
      children: [
        {
          id: "n-institutional",
          label: "Institutional Setup (RBI Act 1934)",
          type: "category",
          children: [
            {
              id: "n-mpc",
              label: "Monetary Policy Committee (Sec 45ZB)",
              type: "exam_fact",
              notes: "6 members; Governor has casting vote in case of tie. Meets at least 4 times a year. Quorum is 4 members.",
            },
            {
              id: "n-target",
              label: "Headline CPI Target (4% ± 2%)",
              type: "concept",
              notes: "Target set by GoI in consultation with RBI every 5 years. Target is Headline CPI, NOT Core CPI or WPI!",
            },
          ],
        },
        {
          id: "n-instruments",
          label: "Direct & Indirect Policy Tools",
          type: "category",
          children: [
            {
              id: "n-lafl-sdf",
              label: "Standing Deposit Facility (SDF)",
              type: "concept",
              notes: "Floor of LAF corridor (introduced in 2022). Allows RBI to absorb uncollateralized liquidity without offering G-Secs.",
            },
            {
              id: "n-msf",
              label: "Marginal Standing Facility (MSF)",
              type: "concept",
              notes: "Penal emergency borrowing facility for scheduled banks above the SLR quota.",
            },
            {
              id: "n-crr-slr",
              label: "Quantitative Reserve Ratios (CRR vs SLR)",
              type: "trap",
              notes: "CRR is kept in CASH with RBI (earns NO interest). SLR is held by bank itself in liquid assets (Gold, G-Secs, Cash).",
            },
          ],
        },
        {
          id: "n-transmission-hurdles",
          label: "Transmission Impediments (Mains GS-3)",
          type: "mains_keyword",
          children: [
            {
              id: "n-npa-overhang",
              label: "High Share of Fixed-Rate Liabilities",
              type: "concept",
              notes: "Small savings schemes offer sticky high administered rates, hindering banks from cutting deposit rates.",
            },
            {
              id: "n-twin-deficit",
              label: "Asymmetric Transmission",
              type: "mains_keyword",
              notes: "Rate hikes are passed on faster to borrowers than rate cuts (mitigated by mandatory EBLR linking since 2019).",
            },
          ],
        },
      ],
    },
  },

  // 4. ENVIRONMENT: Carbon Pricing & Kyoto/Paris Mitigation Mechanisms
  {
    id: "mm-env-carbon",
    title: "Carbon Markets, Offsetting & Article 6 of Paris Agreement",
    subject: "Environment",
    topicId: "carbon-markets-paris",
    description: "Comparison of Cap-and-Trade vs Carbon Tax, Certified Emission Reductions (CERs), Article 6.2 ITMOs, and India's Carbon Credit Trading Scheme (CCTS).",
    examFocus: ["UPSC Prelims", "UPSC Mains", "UPPSC Mains"],
    sources: ["NCERT Biology (Ch 16 Ecology)", "Shankar IAS (Ch: Climate Change)", "MoEFCC Bureau of Energy Efficiency (BEE)"],
    shortcutMnemonic: "Mnemonic: 'CAP & TRADE vs TAX' — Cap sets quantity limit and lets price fluctuate; Carbon tax sets fixed price and lets quantity adapt.",
    flowchart: {
      title: "Cap-and-Trade Emission Quota & Trading Mechanism",
      steps: [
        {
          step: 1,
          label: "Statutory Cap on Total Emissions",
          description: "Government/Regulator fixes a declining aggregate emissions cap for designated energy-intensive sectors (power, cement, steel).",
          tag: "Regulatory Cap",
          highlight: false,
        },
        {
          step: 2,
          label: "Issuance of Carbon Allowances",
          description: "Enterprises receive or purchase allowances (1 allowance = 1 metric ton of CO2 equivalent permitted).",
          tag: "Allowance Allocation",
          highlight: false,
        },
        {
          step: 3,
          label: "Enterprise Emission Audit at Year-End",
          description: "Entity A invests in green tech and emits 30% LESS than its quota. Entity B fails to decarbonize and EXCEEDS its quota.",
          tag: "MRV (Audit)",
          highlight: true,
        },
        {
          step: 4,
          label: "Market Trading on Exchange",
          description: "Entity A sells its surplus carbon credits to Entity B at market-determined price. Entity B surrenders credits to avoid heavy non-compliance penalties.",
          tag: "Market Cleansing",
          highlight: true,
        },
        {
          step: 5,
          label: "Incentivized Decarbonization",
          description: "Lowering emission becomes profitable; high polluters face persistent cost penalty, driving private capital towards Net Zero targets.",
          tag: "Net Zero Outcome",
          highlight: false,
        },
      ],
    },
    rootNode: {
      id: "root-carbon",
      label: "Carbon Pricing & Market Architecture",
      type: "root",
      children: [
        {
          id: "n-pricing-types",
          label: "Mechanisms: Market vs Non-Market",
          type: "category",
          children: [
            {
              id: "n-cap-trade",
              label: "Emission Trading System (ETS / Cap & Trade)",
              type: "concept",
              notes: "Examples: EU-ETS, California Carbon Market, India's Energy Saving Certificates (ESCerts) under PAT scheme.",
            },
            {
              id: "n-carbon-tax",
              label: "Carbon Tax (Direct Levy)",
              type: "concept",
              notes: "Fixed fee per ton of greenhouse gases emitted (e.g. earlier Clean Energy Cess on coal in India).",
            },
            {
              id: "n-cbam",
              label: "EU Carbon Border Adjustment Mechanism (CBAM)",
              type: "trap",
              notes: "Carbon tariff on carbon-intensive imports (steel, aluminum, fertilizer) into EU. High friction for Indian exports.",
            },
          ],
        },
        {
          id: "n-paris-art6",
          label: "Paris Agreement Article 6",
          type: "mains_keyword",
          children: [
            {
              id: "n-art62",
              label: "Article 6.2 (Bilateral ITMOs)",
              type: "concept",
              notes: "Internationally Transferred Mitigation Outcomes between sovereign states with Corresponding Adjustments.",
            },
            {
              id: "n-art64",
              label: "Article 6.4 (Global Carbon Crediting Mechanism)",
              type: "concept",
              notes: "Successor to Kyoto Protocol's Clean Development Mechanism (CDM). Supervised by UN supervisory body.",
            },
          ],
        },
        {
          id: "n-india-ccts",
          label: "India's Domestic Carbon Credit Trading Scheme (CCTS)",
          type: "exam_fact",
          children: [
            {
              id: "n-energy-act",
              label: "Energy Conservation (Amendment) Act 2022",
              type: "exam_fact",
              notes: "Empowers Central Govt to specify Carbon Credit Trading Scheme. Administered by Bureau of Energy Efficiency (BEE).",
            },
            {
              id: "n-green-credit",
              label: "Green Credit Programme (MoEFCC)",
              type: "concept",
              notes: "Voluntary market incentive for tree plantation, water conservation, and sustainable agriculture beyond carbon.",
            },
          ],
        },
      ],
    },
  },

  // 5. UP SPECIAL: Administrative Hierarchy & ODOP Cluster Value Chain
  {
    id: "mm-up-odop-admin",
    title: "UP Administrative Structure, Divisions & ODOP Value Chain",
    subject: "UP Special",
    topicId: "up-administration-odop",
    description: "Complete hierarchy of Uttar Pradesh (18 Divisions, 75 Districts, 826 Blocks) and the ODOP value addition & GI export cluster lifecycle for UPPSC GS Papers 5 & 6.",
    examFocus: ["UPPSC Prelims", "UPPSC Mains"],
    sources: ["UPPSC GS Papers 5 & 6 Official Syllabus", "Rakesh Saraswat (UP Special)", "UP Govt Annual Administrative Report"],
    shortcutMnemonic: "Mnemonic: '18-75-826': 18 Divisions -> 75 Districts -> 826 Development Blocks -> 59,000+ Gram Panchayats.",
    flowchart: {
      title: "UP ODOP Enterprise From Raw Craft to International Export Flow",
      steps: [
        {
          step: 1,
          label: "District Product Identification & Geo-Tagging",
          description: "Each of the 75 UP districts designates 1 indigenous craft/produce (e.g. Firozabad Glassware, Bhadohi Carpets, Kannauj Ittar, Saharanpur Wood carving).",
          tag: "Identification",
          highlight: false,
        },
        {
          step: 2,
          label: "Common Facility Center (CFC) Setup",
          description: "State co-funds up to 90% cost for high-tech testing, modern toolkits, and raw material banks to overcome artisan scale disadvantages.",
          tag: "Infrastructure",
          highlight: true,
        },
        {
          step: 3,
          label: "Financial Linkage & Margin Money Subsidy",
          description: "Artisans access collateral-free credit via MUDRA and UP ODOP Margin Money Scheme (up to 25% project cost subsidy).",
          tag: "Credit Access",
          highlight: false,
        },
        {
          step: 4,
          label: "GI Tag Registration & Quality Standardization",
          description: "Formal Geographical Indication (GI) certification acquired (UP has 54+ GI tagged crafts, highest in northern India), preventing counterfeit imitation.",
          tag: "Brand Protection",
          highlight: true,
        },
        {
          step: 5,
          label: "Expressway & Air Cargo Export Integration",
          description: "Goods linked via Purvanchal, Bundelkhand, and Ganga Expressways to Jewar Noida International Airport and dry ports for global shipment.",
          tag: "Global Export",
          highlight: false,
        },
      ],
    },
    rootNode: {
      id: "root-up-admin",
      label: "Uttar Pradesh Governance & Regional Geography (UPPSC GS-5)",
      type: "root",
      children: [
        {
          id: "n-admin-hierarchy",
          label: "Administrative Tier Hierarchy",
          type: "category",
          children: [
            {
              id: "n-divisions",
              label: "18 Administrative Divisions (headed by Commissioner)",
              type: "exam_fact",
              notes: "Largest divisions by area/districts: Lucknow, Kanpur, Meerut (6 districts each). Smallest: Mirzapur, Basti, Jhansi, Saharanpur (3 districts each).",
            },
            {
              id: "n-districts",
              label: "75 Districts (District Magistrate / Collector)",
              type: "exam_fact",
              notes: "Largest district by area: Lakhimpur Kheri (7,680 sq km). Smallest: Hapur (660 sq km). Highest population: Prayagraj. Lowest: Mahoba.",
            },
            {
              id: "n-blocks",
              label: "826 Development Blocks & Nyaya Panchayats",
              type: "concept",
              notes: "BDO (Block Development Officer) acts as key coordinator for rural schemes (MGNREGA, PMAY-G).",
            },
          ],
        },
        {
          id: "n-geo-regions",
          label: "Physiographic Tri-Division of UP",
          type: "category",
          children: [
            {
              id: "n-bhabhar-tarai",
              label: "1. Bhabhar & Tarai Northern Foothills",
              type: "concept",
              notes: "Bhabhar: Coarse gravel, porous subsoil, streams sink. Tarai: Dense forest, high moisture, Dudhwa National Park, sugarcane belt.",
            },
            {
              id: "n-ganga-plain",
              label: "2. Ganga-Yamuna Doab & Alluvial Plains",
              type: "concept",
              notes: "Bangar (older alluvium, higher terraces) vs Khadar (fresh silt floodplains). Intensive agriculture, high tube-well density.",
            },
            {
              id: "n-plateau",
              label: "3. Southern Bundelkhand & Baghelkhand Hills",
              type: "trap",
              notes: "7 Bundelkhand districts (Jhansi, Lalitpur, Jalaun, Hamirpur, Mahoba, Banda, Chitrakoot). Drought-prone, granite topography.",
            },
          ],
        },
        {
          id: "n-odop-flagship",
          label: "ODOP & GI Economy (UP GS-6)",
          type: "mains_keyword",
          children: [
            {
              id: "n-odop-examples",
              label: "High-Frequency Prelims Pairs",
              type: "trap",
              notes: "Chikankari -> Lucknow; Brassware -> Moradabad; Locks -> Aligarh; Wood Carving -> Saharanpur; Black Pottery -> Nizamabad (Azamgarh); Terracotta -> Gorakhpur.",
            },
            {
              id: "n-mains-eval",
              label: "Mains Answer Value (Employment & Rural Revival)",
              type: "mains_keyword",
              notes: "Countering unorganized artisan exploitation, generating 25 lakh+ micro jobs, and anchoring UP's drive towards a $1 Trillion Economy.",
            },
          ],
        },
      ],
    },
  },

  // 6. HISTORY: Indus Valley Civilization Urban Architecture & Culture
  {
    id: "mm-his-harappa",
    title: "Indus Valley Civilization: Urban Architecture, Trade & Decline",
    subject: "History & Culture",
    topicId: "harappan-art-architecture",
    description: "Grid pattern town planning, drainage networks, dockyards, bronze casting, seals, and decline hypotheses.",
    examFocus: ["UPSC Prelims", "UPSC Mains", "UPPSC Prelims", "UPPSC Mains"],
    sources: ["NCERT Class 11 An Introduction to Indian Art", "NCERT Class 12 Themes in Indian History Part I", "Upinder Singh"],
    shortcutMnemonic: "Mnemonic: 'L-D-K-R': Lothal = Dockyard, Dholavira = Reservoirs, Kalibangan = Ploughed Field, Rakhigarhi = Largest site!",
    flowchart: {
      title: "Harappan Site Specializations & Geographical Extent",
      steps: [
        {
          step: 1,
          label: "Territorial Extent & Outposts",
          description: "Northernmost: Manda (J&K) & Shortugai (Afghanistan, lapis lazuli). Southernmost: Daimabad (Maharashtra). Easternmost: Alamgirpur (UP, Hindon River). Westernmost: Sutkagen Dor (Makran coast, Pakistan).",
          tag: "Geography",
          highlight: false,
        },
        {
          step: 2,
          label: "Town Planning Grid & Citadel Architecture",
          description: "Grid-iron layout, burnt bricks in standard 4:2:1 ratio. Raised Citadel mound on West, Lower Town on East. Covered drainage network with soak pits.",
          tag: "Urbanism",
          highlight: true,
        },
        {
          step: 3,
          label: "Specialized Economic & Maritime Clusters",
          description: "Lothal: Tidal brick dockyard connected to Bhogavo river. Chanhudaro: Factory town specialized in bead-making, seal-making, and shell-working.",
          tag: "Economy",
          highlight: false,
        },
        {
          step: 4,
          label: "Ritual & Civic Features (Absence of Royal Palaces)",
          description: "Great Bath at Mohenjo-daro lined with gypsum mortar; Granaries with air-vents; Fire altars at Kalibangan and Lothal.",
          tag: "Civic Life",
          highlight: true,
        },
        {
          step: 5,
          label: "Decline Theories & Mature to Late Phase Transition",
          description: "Multiple converging factors: Tectonic shifts diverting Saraswati/Ghaggar, ecological degradation, shifting monsoons, and trade disruption with Mesopotamia (Dilmun/Magan).",
          tag: "Decline",
          highlight: false,
        },
      ],
    },
    rootNode: {
      id: "root-harappa",
      label: "Harappan Civilization (c. 2600 - 1900 BCE)",
      type: "root",
      children: [
        {
          id: "n-urban-features",
          label: "Unique Urban Features",
          type: "category",
          children: [
            {
              id: "n-drainage",
              label: "Sub-surface Drainage & Manholes",
              type: "concept",
              notes: "Domestic wastewater led into street drains covered with dressed stone slabs or bricks. Cleaning sumps spaced regularly.",
            },
            {
              id: "n-dholavira-water",
              label: "Dholavira Rock-Cut Reservoirs",
              type: "exam_fact",
              notes: "UNESCO Heritage site; unique 3-part town planning (Citadel, Middle Town, Lower Town) + 16 water storage reservoirs.",
            },
          ],
        },
        {
          id: "n-art-artifacts",
          label: "Art & Material Culture",
          type: "category",
          children: [
            {
              id: "n-bronze-girl",
              label: "Dancing Girl (Lost-Wax Casting)",
              type: "exam_fact",
              notes: "Found at Mohenjo-daro; cast in bronze using Cire Perdue; stands in Tribhanga posture.",
            },
            {
              id: "n-pashupati",
              label: "Pashupati Seal (Steatite)",
              type: "trap",
              notes: "Seated in yogic posture; surrounded by 4 animals: Elephant, Tiger, Rhinoceros, Buffalo, and two Deer at feet.",
            },
          ],
        },
        {
          id: "n-prelims-elim-traps",
          label: "High-Frequency Prelims Traps",
          type: "trap",
          children: [
            {
              id: "n-iron-horse-trap",
              label: "Trap: Iron & Horse were NOT widespread",
              type: "trap",
              notes: "Harappans knew Bronze, Copper, Gold, Silver, Lead, but NOT IRON! Horse remains at Surkotada are controversial, not a horse-centric society.",
            },
            {
              id: "n-temple-trap",
              label: "Trap: NO dedicated stone temples found",
              type: "trap",
              notes: "Unlike Egypt and Mesopotamia, Harappa had NO grand temples, tombs, or monumental royal palaces.",
            },
          ],
        },
      ],
    },
  },
];
