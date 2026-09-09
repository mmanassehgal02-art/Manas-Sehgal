import { ModuleCategory } from "../types";

export const SYLLABUS_MODULES: ModuleCategory[] = [
  // =========================================================================
  // 1. INDIAN POLITY & GOVERNANCE
  // =========================================================================
  {
    id: "indian-polity-governance",
    subject: "Polity",
    title: "Indian Polity & Constitutional Governance",
    description: "Constitution at Work: Preamble, Fundamental Rights, Federal Structure, Parliamentary System, Judicial Review & Article 368 Amendment Procedure.",
    iconName: "Scale",
    badge: "Core GS-2 • 12-16 Qs in Prelims",
    sourcesCount: "NCERT Class 11 + Laxmikanth 7th Ed + SC Cases",
    topics: [
      {
        id: "constitutional-amendments-basic-structure",
        moduleId: "indian-polity-governance",
        subject: "Polity",
        title: "Constitutional Amendment (Art 368) & Basic Structure Doctrine",
        subtitle: "Procedures, Three Categories of Amendments, Landmark Jurisprudence & Federal Ratification",
        readTimeMinutes: 9,
        sources: ["NCERT Class 11 Constitution at Work (Ch 9)", "M. Laxmikanth (Ch 10 & 11)", "Kesavananda Bharati (1973)"],
        examRelevance: {
          upscPrelims: true,
          upscMains: true,
          uppscPrelims: true,
          uppscMains: true,
          mainsPaper: "GS-2",
          priority: "Very High",
        },
        highYieldPoints: [
          "Article 368 in Part XX provides for TWO types of amendments by Parliament: (1) Special majority, and (2) Special majority + 50% State legislatures ratification by simple majority.",
          "Amendments by Simple Majority of Parliament (e.g., Art 2, 3, 4, 169, 2nd Schedule) fall OUTSIDE the purview of Article 368.",
          "Joint Sitting under Article 108 is STRICTLY NOT APPLICABLE to Constitutional Amendment Bills.",
          "The President MUST give assent to a Constitutional Amendment Bill (24th Amendment Act, 1971 made assent mandatory; President has no veto).",
          "Basic Structure Doctrine emerged in Kesavananda Bharati (1973), overruling Golak Nath (1967) and holding that judicial review, federalism, and secularism cannot be amended."
        ],
        pyqReferences: [
          "UPSC Prelims 2020 (Parliament's constituent power)",
          "UPSC Prelims 2019 (Basic Structure definition in Constitution — Trap: Not defined!)",
          "UPPSC Prelims 2022 (Article 368 states ratification provisions)",
          "UPSC Mains 2021 GS-2 (Constitutional morality & Basic Structure)",
          "UPPSC Mains 2023 GS-2 (Procedure of Constitutional Amendment)"
        ],
        flowchart: {
          title: "Constitutional Amendment (Art 368) Procedural Flowchart",
          steps: [
            { step: 1, label: "Introduction", detail: "Introduced in either House by Minister or Private Member (No prior Presidential sanction required).", tag: "Parliament" },
            { step: 2, label: "Special Majority", detail: "Passed in each House separately: 50% of total membership + 2/3rd of members present & voting.", tag: "Voting", highlight: true },
            { step: 3, label: "Deadlock Rule", detail: "No provision for Joint Sitting (Art 108). If one House rejects, bill lapses immediately.", tag: "Strict Rule", highlight: true },
            { step: 4, label: "Federal Check", detail: "If altering federal provisions (7th Schedule, Supreme Court, Art 368), 50% of States must ratify by simple majority.", tag: "Federalism" },
            { step: 5, label: "Mandatory Assent", detail: "President must give assent. Cannot withhold or return the bill (24th CAA 1971).", tag: "Final Act", highlight: true }
          ]
        },
        sections: [
          {
            heading: "Three Classes of Amendments: Art 368 vs Non-Art 368",
            content: [
              "1. Simple Majority of Parliament: Admission of new states (Art 2), re-organization of boundaries (Art 3), abolition or creation of Legislative Councils (Art 169), official language, 5th and 6th Schedules. These are deemed NOT to be amendments under Article 368.",
              "2. Special Majority of Parliament under Art 368: Required for Fundamental Rights (Part III), Directive Principles of State Policy (Part IV), and all other provisions not covered in the first or third category.",
              "3. Special Majority + Consent of Half of the States: Required when provisions affect the federal structure: election of the President (Art 54, 55), executive power of Union and States, Supreme Court and High Courts, distribution of legislative powers (7th Schedule), representation of states in Parliament, and Article 368 itself."
            ],
            table: {
              headers: ["Amendment Category", "Majority in Parliament", "State Ratification Needed?", "Subject Examples"],
              rows: [
                ["Outside Art 368", "Simple Majority (>50% present & voting)", "No", "State boundaries (Art 3), Leg. Council (Art 169), 5th/6th Schedule"],
                ["Under Art 368 (Alone)", "Special Majority (50% total + 2/3rd P&V)", "No", "Fundamental Rights, Directive Principles"],
                ["Under Art 368 (Federal)", "Special Majority in both Houses", "Yes (Simple majority of 50% states)", "7th Schedule, Supreme Court/HC, President election, Art 368"]
              ]
            },
            callout: {
              type: "trap",
              title: "UPSC & UPPSC Prelims Trap Alert",
              text: "The Constitution does NOT prescribe any time limit within which state legislatures must ratify or reject an amendment bill sent to them. Also, states cannot initiate a proposal for constitutional amendment."
            }
          },
          {
            heading: "Judicial Evolution of the Basic Structure Doctrine",
            content: [
              "Shankari Prasad (1951) & Sajjan Singh (1965): SC held Parliament can amend any part of the Constitution including Fundamental Rights under Art 368.",
              "Golak Nath (1967): SC reversed its stance, ruling that Fundamental Rights are given a transcendental position and Parliament cannot abridge them.",
              "24th Amendment Act (1971): Parliament amended Art 13 and Art 368, stating that nothing in Art 13 shall apply to any amendment made under Art 368.",
              "Kesavananda Bharati (1973): Historic 13-judge bench ruled that Parliament can amend any part including FRs, BUT cannot alter the 'Basic Structure' of the Constitution.",
              "Minerva Mills (1980): SC invalidated clauses (4) & (5) of Art 368 inserted by 42nd Amendment, holding that limited amending power is itself a basic feature."
            ],
            callout: {
              type: "mnemonic",
              title: "Shortcut Mnemonic for Basic Structure Cases",
              text: "Mnemonic: 'S-G-K-M' -> Shankari Prasad (1951) -> Golak Nath (1967) -> Kesavananda (1973) -> Minerva Mills (1980)."
            }
          }
        ],
        keyTerms: [
          { term: "Special Majority (Art 368)", meaning: "Majority of total membership of the House + two-thirds of members present and voting.", examTip: "Tested in both UPSC and UPPSC. Total membership includes vacancies and absentees." },
          { term: "Basic Structure", meaning: "Organic judicial principle prohibiting Parliament from destroying core constitutional tenets (Secularism, Rule of Law, Federalism).", examTip: "Never defined in the Constitution text." }
        ]
      },
      {
        id: "federalism-interstate-relations",
        moduleId: "indian-polity-governance",
        subject: "Polity",
        title: "Indian Federalism, Centre-State Relations & 7th Schedule",
        subtitle: "Legislative, Administrative, and Financial Ties; Asymmetric Federalism; Inter-State Council",
        readTimeMinutes: 8,
        sources: ["NCERT Class 11 (Ch 7 Federalism)", "M. Laxmikanth (Ch 14 & 15)", "Sarkaria & Punchhi Commissions"],
        examRelevance: {
          upscPrelims: true,
          upscMains: true,
          uppscPrelims: true,
          uppscMains: true,
          mainsPaper: "GS-2",
          priority: "Very High",
        },
        highYieldPoints: [
          "Article 1 describes India as a 'Union of States' rather than a 'Federation of States' (indestructible Union of destructible States).",
          "Seventh Schedule divides legislative competence into Union List (100 items), State List (61 items), and Concurrent List (52 items). Residuary powers vest in Parliament (Art 248).",
          "Parliament can legislate on State List matters under 5 special situations: Art 249 (National Interest via Rajya Sabha resolution), Art 250 (National Emergency), Art 252 (Request of 2+ States), Art 253 (International Agreements), and Art 356 (President's Rule).",
          "Inter-State Council (Art 263) is a constitutional body established on Sarkaria Commission recommendations (1990) headed by the Prime Minister."
        ],
        pyqReferences: [
          "UPSC Prelims 2021 (Definition of Indian Federalism)",
          "UPSC Mains 2022 GS-2 (Cooperative vs Confrontational Federalism)",
          "UPPSC Prelims 2023 (Inter-State Council constitutional provision Art 263)",
          "UPPSC Mains 2022 GS-2 (Role of Governor in Centre-State conflicts)"
        ],
        sections: [
          {
            heading: "Seventh Schedule & Legislative Predominance",
            content: [
              "Union List: Foreign affairs, defence, atomic energy, banking, citizenship, railways, inter-state trade.",
              "State List: Public order, police, public health and sanitation, agriculture, local government, fisheries.",
              "Concurrent List: Criminal law and procedure, civil procedure, marriage and divorce, education, forests, trade unions. In case of conflict, Union law prevails over State law (Art 254), unless the state law was reserved for and received the President's assent."
            ],
            callout: {
              type: "tip",
              title: "42nd Constitutional Amendment 1976 Shift",
              text: "Five subjects were transferred from State List to Concurrent List by 42nd CAA 1976: (1) Education, (2) Forests, (3) Weights and Measures, (4) Protection of wild animals and birds, (5) Administration of justice (constitution of all courts except SC and HCs)."
            }
          }
        ],
        keyTerms: [
          { term: "Doctrine of Pith and Substance", meaning: "Judicial test to determine the true nature of a statute when it appears to encroach upon another legislature's list." },
          { term: "Cooperative Federalism", meaning: "Collaboration between Centre and States via bodies like NITI Aayog, GST Council, and Inter-State Council." }
        ]
      }
    ]
  },

  // =========================================================================
  // 2. INDIAN ECONOMY & DEVELOPMENT
  // =========================================================================
  {
    id: "indian-economy-development",
    subject: "Economy",
    title: "Indian Economy & Macro-Financial Systems",
    description: "Monetary Policy Transmission, Inflation Targeting, Fiscal Policy, Banking & NPA resolution, External Sector & Balance of Payments.",
    iconName: "TrendingUp",
    badge: "High Yield • 14-18 Qs in Prelims",
    sourcesCount: "NCERT Class 11 & 12 + Ramesh Singh + Economic Survey",
    topics: [
      {
        id: "monetary-policy-inflation-targeting",
        moduleId: "indian-economy-development",
        subject: "Economy",
        title: "Monetary Policy Framework, RBI Instruments & Inflation Targeting",
        subtitle: "Repo, Reverse Repo, SDF, MSF, LAF Corridor, Headline vs Core CPI, Money Supply Aggregates",
        readTimeMinutes: 8,
        sources: ["NCERT Class 12 Macroeconomics (Ch 3)", "Ramesh Singh (Banking in India)", "RBI Annual Report"],
        examRelevance: {
          upscPrelims: true,
          upscMains: true,
          uppscPrelims: true,
          uppscMains: true,
          mainsPaper: "GS-3",
          priority: "Very High",
        },
        highYieldPoints: [
          "Monetary Policy Framework Agreement (2015) and statutory backing via Section 45ZB of RBI Act 1934 established the 6-member Monetary Policy Committee (MPC).",
          "Flexible Inflation Targeting (FIT) targets Headline Consumer Price Index (CPI-Combined) at 4% with a tolerance band of +/- 2% (2% to 6%).",
          "Standing Deposit Facility (SDF) introduced in 2022 serves as the floor of the LAF corridor without requiring collateral (G-Secs) from the RBI.",
          "Cash Reserve Ratio (CRR) is maintained in CASH with RBI and earns ZERO interest; Statutory Liquidity Ratio (SLR) is maintained by banks in liquid assets (Gold, G-Secs, Cash).",
          "Sterilization refers to RBI operations (via Open Market Operations or Market Stabilization Scheme) to neutralize domestic money supply surges caused by foreign exchange inflows."
        ],
        pyqReferences: [
          "UPSC Prelims 2021 (Money multiplier effect and banking habits)",
          "UPSC Prelims 2020 (Standing Deposit Facility & LAF corridor)",
          "UPSC Prelims 2019 (Sterilization through OMO)",
          "UPPSC Prelims 2021 (Inflation index used for inflation targeting)",
          "UPSC Mains 2023 GS-3 (Macroeconomic stability during global monetary tightening)"
        ],
        flowchart: {
          title: "RBI Monetary Policy Transmission Flowchart",
          steps: [
            { step: 1, label: "MPC Policy Decision", detail: "MPC alters Policy Repo Rate based on CPI inflation forecast.", tag: "Policy Move" },
            { step: 2, label: "Money Market Shift", detail: "Inter-bank call money rate, SDF, and MSF corridor automatically align with repo.", tag: "Liquidity" },
            { step: 3, label: "EBLR Bank Transmission", detail: "Banks adjust External Benchmark Lending Rates (linked to Repo/T-bill) on retail loans.", tag: "Credit Rates", highlight: true },
            { step: 4, label: "Demand & Borrowing Shift", detail: "Higher lending rates disincentivize credit expansion, curbing speculative aggregate demand.", tag: "Real Economy" },
            { step: 5, label: "Inflation Deceleration", detail: "Demand compression reduces non-food/non-fuel core inflation, anchoring expectations.", tag: "Target Met", highlight: true }
          ]
        },
        sections: [
          {
            heading: "Quantitative vs Qualitative Tools of RBI",
            content: [
              "Quantitative / General Tools: Repo Rate (rate at which RBI lends short-term funds against G-Sec collateral), Reverse Repo Rate, Standing Deposit Facility (SDF), Marginal Standing Facility (MSF), CRR, SLR, Open Market Operations (OMOs).",
              "Qualitative / Selective Tools: Margin requirements (LTV ratio), moral suasion, credit rationing, direct action. These regulate direction of credit rather than overall volume."
            ],
            table: {
              headers: ["Tool", "Full Form", "Mechanism", "Impact on Market Liquidity"],
              rows: [
                ["Repo Rate", "Repurchasing Option", "Rate at which RBI lends overnight to banks against collateral", "Hike absorbs liquidity; Cut injects liquidity"],
                ["SDF", "Standing Deposit Facility", "Floor rate to absorb liquidity with NO collateral given by RBI", "Absorbs excess funds without depleting G-Secs"],
                ["MSF", "Marginal Standing Facility", "Ceiling rate for emergency bank borrowing above SLR limit", "Sets upper band of liquidity adjustment facility"],
                ["CRR", "Cash Reserve Ratio", "Mandatory % of NDTL parked as cash with RBI", "Increases reserves, decreases loanable funds"]
              ]
            }
          }
        ],
        keyTerms: [
          { term: "Core Inflation", meaning: "Headline CPI minus volatile food and fuel components; reflects sticky underlying demand.", examTip: "UPSC tested the difference between Headline and Core CPI in 2020." },
          { term: "Money Multiplier", meaning: "Ratio of broad money (M3) to reserve money (M0); increases when banking habit improves.", examTip: "Prelims 2019/2021 repeat question." }
        ]
      }
    ]
  },

  // =========================================================================
  // 3. GEOGRAPHY (PHYSICAL & INDIAN)
  // =========================================================================
  {
    id: "geography-climate-drainage",
    subject: "Geography",
    title: "Geography: Physical Systems & Indian Environment",
    description: "Geomorphology, Climatology, Indian Southwest & Northeast Monsoons, Drainage Systems, and Physiographic Divisions.",
    iconName: "Globe",
    badge: "Core GS-1 • 8-12 Qs in Prelims",
    sourcesCount: "NCERT Class 11 Physical Geography & India Physical Environment + GC Leong",
    topics: [
      {
        id: "monsoon-mechanism-el-nino",
        moduleId: "geography-climate-drainage",
        subject: "Geography",
        title: "Indian Monsoon Mechanism, Walker Cell & Teleconnections (ENSO/IOD)",
        subtitle: "Tibetan Heat Engine, Somali Jet, Tropical Easterly Jet, El Niño, La Niña, and Indian Ocean Dipole",
        readTimeMinutes: 8,
        sources: ["NCERT Class 11 India Physical Environment (Ch 4 Climate)", "NCERT Physical Geography", "IMD"],
        examRelevance: {
          upscPrelims: true,
          upscMains: true,
          uppscPrelims: true,
          uppscMains: true,
          mainsPaper: "GS-1",
          priority: "Very High",
        },
        highYieldPoints: [
          "Thermal concept (Halley): Differential heating of land and sea creates seasonal reversal of pressure and wind systems.",
          "Dynamic concept (Flohn): Seasonal migration of the Inter-Tropical Convergence Zone (ITCZ) northwards to the Ganga Plain (Monsoon Trough) in summer.",
          "Upper Tropospheric Jet Streams: Sub-Tropical Westerly Jet (STWJ) must withdraw from south of Himalayas for onset of SW monsoon; Tropical Easterly Jet (TEJ) establishes over peninsular India.",
          "El Niño suppresses the Indian monsoon by shifting the rising limb of Walker circulation eastward to central/eastern Pacific.",
          "Positive Indian Ocean Dipole (IOD) warms the western Indian Ocean near the Arabian Sea, enhancing monsoon rainfall and offsetting El Niño."
        ],
        pyqReferences: [
          "UPSC Prelims 2017 (Indian Ocean Dipole and El Niño relationship)",
          "UPSC Prelims 2019 (Western Ghats orographic precipitation)",
          "UPPSC Prelims 2021 (Characteristics of Tropical Easterly Jet)",
          "UPSC Mains 2020 GS-1 (Impact of climate change on Indian monsoon variability)"
        ],
        flowchart: {
          title: "Southwest Monsoon Genesis and Inception Sequence",
          steps: [
            { step: 1, label: "Intense Solar Insolation", detail: "Sun shines vertically over Tropic of Cancer; heats Tibetan Plateau 2-3°C above surrounding air.", tag: "Thermal Engine" },
            { step: 2, label: "ITCZ Migration to 25°N", detail: "Monsoon trough establishes over Indo-Gangetic plains, creating intense surface low pressure.", tag: "Low Pressure", highlight: true },
            { step: 3, label: "STWJ Withdrawal & TEJ Birth", detail: "Subtropical Westerly Jet shifts north of Himalayas; Tropical Easterly Jet forms at 14°N.", tag: "Upper Air Flow" },
            { step: 4, label: "Mascarene High & Cross-Equatorial Surge", detail: "SE trades cross equator, deflected right by Coriolis force, accelerated by low-level Somali Jet.", tag: "Oceanic Push", highlight: true },
            { step: 5, label: "Bifurcation into Two Branches", detail: "Arabian Sea branch strikes Western Ghats; Bay of Bengal branch deflects along Himalayas.", tag: "Precipitation" }
          ]
        },
        sections: [
          {
            heading: "Factors Governing Southwest Monsoon Onset & Intensity",
            content: [
              "1. Heating of the Tibetan Plateau: The plateau acts as an elevated heat source, generating an ascending air column that diverges aloft and strengthens the Tropical Easterly Jet.",
              "2. Mascarene High: Located south of the equator near Madagascar (approx 20°S-35°S). A strong Mascarene high pressure cell provides stronger thrust to cross-equatorial monsoon winds.",
              "3. Somali Jet (Findlater Jet): A low-level southwesterly jet off the coast of Somalia that funnels oceanic moisture rapidly across the Arabian Sea to the west coast of India.",
              "4. Western Ghats Orographic Barrier: The windward slope receives 250-400 cm rainfall; the leeward Deccan plateau sits in the rain-shadow zone (receiving <60 cm)."
            ],
            callout: {
              type: "trap",
              title: "Prelims Elimination Trap: Tamil Nadu Coast",
              text: "Coromandel / Tamil Nadu coast remains relatively dry during the SW Monsoon (June-Sept) because: (1) It lies parallel to the Bay of Bengal branch, and (2) It falls in the rain-shadow of the Arabian Sea branch. It receives majority rainfall from the Northeast / Retreating Monsoon (Oct-Dec)."
            }
          }
        ],
        keyTerms: [
          { term: "Walker Circulation", meaning: "Zonal atmospheric circulation across the equatorial Pacific; weakens during El Niño.", examTip: "Tested in UPSC 2014 & 2017." },
          { term: "Indian Ocean Dipole (IOD)", meaning: "Difference in sea surface temperature between the western tropical Indian Ocean and eastern Indian Ocean south of Indonesia." }
        ]
      }
    ]
  },

  // =========================================================================
  // 4. ENVIRONMENT, ECOLOGY & BIODIVERSITY
  // =========================================================================
  {
    id: "environment-ecology-biodiversity",
    subject: "Environment",
    title: "Environment, Ecology & Climate Action",
    description: "Ecosystem dynamics, Biodiversity conservation acts, Wildlife Protection Act amendments, Ramsar wetlands, Carbon markets & COP outcomes.",
    iconName: "Trees",
    badge: "Prelims Heavyweight • 15-20 Qs",
    sourcesCount: "NCERT Class 12 Biology (Ecology) + Shankar IAS + MoEFCC",
    topics: [
      {
        id: "carbon-markets-paris-article-6",
        moduleId: "environment-ecology-biodiversity",
        subject: "Environment",
        title: "Carbon Markets, Offsetting, Article 6 & India's CCTS",
        subtitle: "Cap-and-Trade vs Carbon Tax, ITMOs (Art 6.2), Global Crediting (Art 6.4), and Carbon Credit Trading Scheme",
        readTimeMinutes: 8,
        sources: ["UNFCCC Paris Agreement", "Shankar IAS (Climate Change)", "BEE India CCTS Guidelines"],
        examRelevance: {
          upscPrelims: true,
          upscMains: true,
          uppscPrelims: true,
          uppscMains: true,
          mainsPaper: "GS-3",
          priority: "Very High",
        },
        highYieldPoints: [
          "Article 6 of Paris Agreement establishes rules for international carbon compliance and voluntary carbon trading.",
          "Article 6.2 allows bilateral trading of Internationally Transferred Mitigation Outcomes (ITMOs) between sovereign countries.",
          "Article 6.4 creates a multilateral carbon crediting mechanism overseen by a UN supervisory body, succeeding Kyoto Protocol's Clean Development Mechanism (CDM).",
          "India amended the Energy Conservation Act in 2022 to empower the Central Government to establish the domestic Carbon Credit Trading Scheme (CCTS), managed by Bureau of Energy Efficiency (BEE).",
          "EU Carbon Border Adjustment Mechanism (CBAM) imposes a carbon tariff on carbon-intensive imports (steel, aluminum, cement), impacting Indian exports."
        ],
        pyqReferences: [
          "UPSC Prelims 2022 (Carbon credit definitions & voluntary carbon markets)",
          "UPSC Prelims 2020 (Kyoto mechanisms & CDM)",
          "UPPSC Prelims 2023 (Paris Agreement commitments & NDC targets)",
          "UPSC Mains 2023 GS-3 (Impact of CBAM on developing world and climate justice)"
        ],
        flowchart: {
          title: "Carbon Market Cap-and-Trade Operational Flowchart",
          steps: [
            { step: 1, label: "Statutory Cap Set", detail: "Government caps aggregate emissions limit across energy-intensive industries.", tag: "Regulation" },
            { step: 2, label: "Allowance Allocation", detail: "Firms receive or buy emission permits (1 allowance = 1 ton of CO2 equivalent).", tag: "Permit Issue" },
            { step: 3, label: "Annual Emissions Audit", detail: "Firms audit actual emissions: Green firms produce surplus; lagging firms produce deficits.", tag: "MRV Audit", highlight: true },
            { step: 4, label: "Market Exchange Trade", detail: "Surplus green firms sell credits to deficit firms at market prices; non-compliant face penal fines.", tag: "Market", highlight: true },
            { step: 5, label: "Systemic Decarbonization", detail: "Polluters face financial penalties, channeling capital toward clean tech & renewable energy.", tag: "Net Zero" }
          ]
        },
        sections: [
          {
            heading: "Carbon Tax vs Cap-and-Trade: Core Distinctions",
            content: [
              "Carbon Tax: Fixes the PRICE of carbon directly by levying a statutory tax per metric ton of greenhouse gas emitted. The quantity of emissions reduction is determined by market response.",
              "Cap-and-Trade (ETS): Fixes the QUANTITY of total allowed emissions (the cap). The market determines the price of carbon allowances through supply and demand dynamics."
            ],
            callout: {
              type: "tip",
              title: "India's Panchamrit Climate Targets (COP26 Glasgow)",
              text: "(1) Reach 500 GW non-fossil energy capacity by 2030; (2) Meet 50% of energy requirements from renewables by 2030; (3) Reduce total projected carbon emissions by 1 billion tonnes by 2030; (4) Reduce carbon intensity of GDP by 45% by 2030; (5) Achieve Net Zero emissions by 2070."
            }
          }
        ],
        keyTerms: [
          { term: "CBDR-RC", meaning: "Common But Differentiated Responsibilities and Respective Capabilities; foundational principle of international climate negotiations.", examTip: "Standard phrase for UPSC Mains GS-3." },
          { term: "Additionality", meaning: "Criterion in carbon credits certifying that emission reductions would not have occurred without the project's intervention." }
        ]
      }
    ]
  },

  // =========================================================================
  // 5. UTTAR PRADESH SPECIAL (FOR UPPSC PRELIMS & MAINS GS 5 & 6)
  // =========================================================================
  {
    id: "uttar-pradesh-special",
    subject: "UP Special",
    title: "Uttar Pradesh Special (UPPSC GS Papers 5 & 6)",
    description: "UP Administrative setup, Physiography (Bhabhar, Tarai, Bundelkhand), Economy & ODOP clusters, Defence Corridor, Folk culture & Heritage.",
    iconName: "MapPin",
    badge: "UPPSC Mandatory • GS-5 & GS-6",
    sourcesCount: "UPPSC GS 5 & 6 Syllabus + Rakesh Saraswat + UP Govt Reports",
    topics: [
      {
        id: "up-administration-geography-odop",
        moduleId: "uttar-pradesh-special",
        subject: "UP Special",
        title: "UP Administrative Hierarchy, Physiographic Zones & ODOP Ecosystem",
        subtitle: "18 Divisions, 75 Districts, Bhabhar-Tarai-Bundelkhand, ODOP Clusters, and Defence Corridor",
        readTimeMinutes: 9,
        sources: ["UPPSC GS Papers 5 & 6 Curriculum", "UP Directorate of Industries", "UP Irrigation Department"],
        examRelevance: {
          upscPrelims: false,
          upscMains: true,
          uppscPrelims: true,
          uppscMains: true,
          mainsPaper: "UP GS-5",
          priority: "Very High",
        },
        highYieldPoints: [
          "Administrative Setup: 18 Divisions, 75 Districts, 826 Development Blocks, and 351 Tehsils. Largest division by area/districts: Lucknow, Kanpur, Meerut.",
          "Physiographic Division: Divided into three zones: (1) Bhabhar and Tarai in the north, (2) Ganga-Yamuna Alluvial Plains in the center, and (3) Southern Bundelkhand and Vindhyan Plateau.",
          "Bundelkhand Region comprises 7 UP districts: Jhansi, Lalitpur, Jalaun, Hamirpur, Mahoba, Banda, and Chitrakoot. Characterized by granite topography, low water table, and frequent droughts.",
          "UP Defence Industrial Corridor features 6 nodes: Lucknow, Kanpur, Jhansi, Agra, Aligarh, and Chitrakoot.",
          "UP has 54+ GI (Geographical Indication) tagged goods, ranking highest in north India for handicraft GI tags (e.g. Nizamabad Black Pottery, Varanasi Silk, Bhadohi Carpets)."
        ],
        pyqReferences: [
          "UPPSC Prelims 2023 (Match district with ODOP product: Aligarh-Locks, Bhadohi-Carpet)",
          "UPPSC Prelims 2022 (Nodes in UP Defence Corridor — which is NOT a node?)",
          "UPPSC Prelims 2021 (Characteristics of Bhabhar vs Tarai belt)",
          "UPPSC Mains 2023 GS-5 (Administrative reforms and e-governance in UP)",
          "UPPSC Mains 2023 GS-6 (ODOP scheme's role in propelling UP towards $1 Trillion economy)"
        ],
        flowchart: {
          title: "UP Administrative Hierarchy & District Coordination Flow",
          steps: [
            { step: 1, label: "18 Administrative Divisions", detail: "Headed by Divisional Commissioner; coordinates law & order and multi-district development.", tag: "Regional Tier" },
            { step: 2, label: "75 District Administrations", detail: "Led by District Magistrate (DM) / Collector; acts as CEO of development and district magistrate.", tag: "District Core", highlight: true },
            { step: 3, label: "351 Tehsils / Sub-Divisions", detail: "Sub-Divisional Magistrate (SDM) & Tehsildar oversee land revenue, mutation, and local disputes.", tag: "Sub-Division" },
            { step: 4, label: "826 Development Blocks", detail: "Block Development Officer (BDO) coordinates rural schemes (MGNREGA, PMAY-G, NRLM).", tag: "Rural Dev", highlight: true },
            { step: 5, label: "59,000+ Gram Panchayats", detail: "Gram Pradhan & Gram Panchayat Secretary (VDO) implement village-level planning under 73rd CAA.", tag: "Grassroots" }
          ]
        },
        sections: [
          {
            heading: "Physiographic Tri-Division of Uttar Pradesh",
            content: [
              "1. Bhabhar Belt: Runs along the foothills of the Shivalik range in Saharanpur, Bijnor, and Lakhimpur Kheri. Made of coarse gravel, pebbles, and porous boulder scree. Rivers descending from the Himalayas disappear underground in the Bhabhar tract.",
              "2. Tarai Belt: South of Bhabhar; marshy, damp, ill-drained flat land with tall grasses (elephant grass) and sal forests. The rivers that disappeared in Bhabhar re-emerge here. Major sugarcane, paddy, and jute belt. Contains Dudhwa National Park (Lakhimpur Kheri).",
              "3. Central Alluvial Plains: Formed by the Ganga, Yamuna, Ghaghara, and Gomti rivers. Subdivided into Bangar (older, less fertile alluvium with kankar nodules) and Khadar (newer, highly fertile floodplains enriched annually by floods).",
              "4. Southern Plateau (Bundelkhand & Baghelkhand): Pre-Cambrian crystalline rocks; thin red and black (karail) soils. High runoff and recurrent agrarian distress, addressed via Ken-Betwa river interlinking."
            ],
            table: {
              headers: ["Zone", "Soil Type", "Key Districts", "Major Crops / Economic Significance"],
              rows: [
                ["Bhabhar", "Porous gravel & pebbles", "Saharanpur, Bijnor", "Forestry; low agriculture (rivers sink underground)"],
                ["Tarai", "Clayey, rich humus alluvial", "Lakhimpur Kheri, Pilibhit, Bahraich", "Sugarcane, Paddy; Dudhwa National Park"],
                ["Alluvial Plains", "Bangar & Khadar loam", "Lucknow, Kanpur, Prayagraj, Meerut", "Wheat, Rice, Pulses, intensive tube-well farming"],
                ["Bundelkhand", "Red soils & black karail", "Jhansi, Mahoba, Banda, Lalitpur", "Gram, pulses, oilseeds; Ken-Betwa link; minerals"]
              ]
            }
          },
          {
            heading: "One District One Product (ODOP) Master Match List",
            content: [
              "Launched on UP Diwas (24 January 2018), ODOP seeks to preserve indigenous crafts, foster micro-entrepreneurship, and boost exports.",
              "Lucknow: Chikankari and Zari-Zardozi embroidery.",
              "Varanasi: Banarasi Silk Sarees, Pink Meenakari, Wooden Lacquerware.",
              "Moradabad: Metal Craft and Brassware ('Pital Nagari').",
              "Firozabad: Glassware and Bangles ('Suhag Nagari').",
              "Kannauj: Attar and Natural Perfumes ('Perfume Capital of India').",
              "Bhadohi: Hand-knotted Carpets and Rugs ('Carpet City').",
              "Aligarh: Locks, Hardware, and Metal Sculptures.",
              "Saharanpur: Wood Carving and Wooden Handicrafts.",
              "Gorakhpur: Terracotta sculptures and pottery.",
              "Nizamabad (Azamgarh): Black Clay Pottery (GI Tagged)."
            ],
            callout: {
              type: "uppsc_focus",
              title: "UPPSC High-Frequency Prelims Question",
              text: "UPPSC repeats direct matching questions on ODOP products every year. Ensure you distinguish Nizamabad (Azamgarh - Black Pottery) from Khurja (Bulandshahr - Ceramic Pottery)."
            }
          }
        ],
        keyTerms: [
          { term: "Karail Soil", meaning: "Local UP name for black cotton soil found in parts of Bundelkhand (Jalaun, Hamirpur); moisture-retentive.", examTip: "Repeatedly asked in UPPSC Prelims." },
          { term: "Ken-Betwa Link", meaning: "India's first river interlinking project transferring surplus water from Ken river in MP to water-deficit Betwa basin in UP Bundelkhand." }
        ]
      }
    ]
  },

  // =========================================================================
  // 6. HISTORY, ART & CULTURE
  // =========================================================================
  {
    id: "architecture-sculpture",
    subject: "History & Culture",
    title: "Art & Culture: Architecture, Caves & Sculpture",
    description: "From Harappan town planning to Rock-cut caves, Classical Temple Architecture (Nagara, Dravida, Vesara), and Indo-Islamic monuments.",
    iconName: "Landmark",
    badge: "Core GS-1 • 5-8 Qs in Prelims",
    sourcesCount: "NCERT Class 11 Fine Arts + CCRT + Nitin Singhania",
    topics: [
      {
        id: "harappan-art-architecture",
        moduleId: "architecture-sculpture",
        subject: "History & Culture",
        title: "Harappan Architecture, Town Planning & Sculpture",
        subtitle: "Bronze Age urban planning, Great Bath, Dockyard, seals, and iconic sculptures",
        readTimeMinutes: 7,
        sources: ["NCERT Class 11 An Introduction to Indian Art", "NCERT Class 12 Themes in Indian History I", "ASI"],
        examRelevance: {
          upscPrelims: true,
          upscMains: true,
          uppscPrelims: true,
          uppscMains: true,
          mainsPaper: "GS-1",
          priority: "Very High",
        },
        highYieldPoints: [
          "Grid iron pattern (chessboard layout) with streets intersecting at 90 degrees.",
          "Burnt mud bricks used in 4:2:1 ratio (Length : Breadth : Thickness).",
          "Advanced underground drainage system with inspection manholes covered with stone slabs.",
          "Citadel (Western raised mound for administrative/ritual buildings) vs Lower Town (residential areas).",
          "Absence of stone temples or dedicated religious palaces throughout the Indus Valley."
        ],
        pyqReferences: ["UPSC Prelims 2019 (Harappan sites)", "UPSC Prelims 2021 (Dholavira water reservoir)", "UPSC Mains 2014 (Urban planning)"],
        flowchart: {
          title: "Harappan Town Planning & Civic Drainage Flowchart",
          steps: [
            { step: 1, label: "Bipartite Town Settlement", detail: "Western Citadel (raised mound for public buildings) + Eastern Lower Town (residential blocks).", tag: "Layout" },
            { step: 2, label: "Grid-Iron Street Network", detail: "Broad thoroughfares intersecting at 90 degrees, dividing city into rectangular insulae.", tag: "Streets" },
            { step: 3, label: "Standardized Brick Masonry", detail: "Burnt mud bricks in exact 4:2:1 ratio; laid in alternating headers and stretchers (English bond).", tag: "Masonry", highlight: true },
            { step: 4, label: "Underground Drainage Link", detail: "House bathrooms drained through terracotta pipes into covered roadside stone-slab drains.", tag: "Sanitation", highlight: true },
            { step: 5, label: "Civic Reservoirs & Docks", detail: "Rock-cut water cascades at Dholavira and tidal dockyard at Lothal.", tag: "Water Mgmt" }
          ]
        },
        sections: [
          {
            heading: "Salient Features of Town Planning",
            content: [
              "Citadel (Acropolis): Built on raised mud-brick platforms in the west. Housed public structures such as the Great Bath at Mohenjo-daro, granaries with air ducts, and administrative assembly halls.",
              "Lower Town: Situated in the east, divided into rectangular residential blocks. Houses were built around central courtyards without windows opening directly onto main thoroughfares, ensuring privacy and dust prevention.",
              "Sanitation & Drainage: Domestic wastewater drained into covered roadside sewers through terracotta pipes. Sump pits and limestone inspection chambers were spaced at regular intervals.",
              "Water Harvesting at Dholavira (Rann of Kutch): UNESCO World Heritage Site featuring unique cascade reservoirs cut in rock, a stadium, and a signboard with ten Indus script glyphs."
            ],
            callout: {
              type: "trap",
              title: "UPSC Prelims Trap Alert",
              text: "Lothal had an artificial tidal dockyard connected to the Bhogavo River, whereas Kalibangan is renowned for ploughed agricultural fields and fire altars. Do not confuse Lothal with Dholavira (famous for grand stone reservoirs, not tidal dock)."
            }
          },
          {
            heading: "Harappan Sculptural Traditions",
            content: [
              "Bronze Dancing Girl (Mohenjo-daro): Cast using the Lost-Wax technique (Cire Perdue). Depicts a tribal girl in tribhanga stance, right hand on hip, left arm adorned with 24-25 bangles made of bone/shell.",
              "Priest-King (Steatite, Mohenjo-daro): Bearded male wearing a fillet headband and an ornate shawl draped over the left shoulder, adorned with trefoil motifs.",
              "Red Sandstone Male Torso (Harappa): Features socket holes in the neck and shoulders for movable attachments, showing sophisticated anatomical realism.",
              "Terracotta Figurines: Hand-modelled using pinching methods; includes Mother Goddess and toy carts with spoked/solid wheels."
            ],
            table: {
              headers: ["Sculpture/Artifact", "Material", "Key Site", "Special Technique / Feature"],
              rows: [
                ["Dancing Girl", "Bronze", "Mohenjo-daro", "Lost-Wax casting; Tribhanga posture"],
                ["Priest King", "Steatite", "Mohenjo-daro", "Shawl with trefoil motifs over left shoulder"],
                ["Pashupati Seal", "Steatite", "Mohenjo-daro", "Yogic posture; surrounded by Rhino, Buffalo, Elephant, Tiger"],
                ["Mother Goddess", "Terracotta", "Mohenjo-daro / Banawali", "Pinching technique; ornate applique jewelry"]
              ]
            }
          }
        ],
        keyTerms: [
          { term: "Lost-Wax Casting (Cire Perdue)", meaning: "Method of metal casting where molten metal replaces a melted wax model." },
          { term: "Trefoil Motif", meaning: "Ornamental design of three overlapping rings found on the Priest-King shawl." }
        ]
      },
      {
        id: "temple-architecture-nagara-dravida",
        moduleId: "architecture-sculpture",
        subject: "History & Culture",
        title: "Classical Temple Architecture: Nagara, Dravida & Vesara",
        subtitle: "Evolution of Shikhara, Vimana, Gopuram, Mandapa, and Regional Sub-styles",
        readTimeMinutes: 9,
        sources: ["NCERT Class 11 Fine Arts (Ch 6)", "Nitin Singhania", "CCRT"],
        examRelevance: {
          upscPrelims: true,
          upscMains: true,
          uppscPrelims: true,
          uppscMains: true,
          mainsPaper: "GS-1",
          priority: "Very High",
        },
        highYieldPoints: [
          "Nagara (North India): Curvilinear tower (Shikhara / Latina), raised plinth (Jagati), crowned by Amalaka and Kalasha, absence of grand boundary walls or water tanks.",
          "Dravida (South India): Pyramidal stepped tower (Vimana), crowned by octagonal Shikhara, monumental gateway (Gopuram), enclosed boundary walls and mandatory temple water tank (Kalyani).",
          "Vesara / Karnataka Style: Hybrid style flourishing under Chalukyas of Badami/Kalyani and Hoysalas; star-shaped (stellate) ground plans and soapstone carvings.",
          "Panchayatana Layout: Subsidiary shrines located at four corners of the central main shrine (e.g., Dashavatara Temple Deogarh UP, Kandariya Mahadeva Khajuraho)."
        ],
        pyqReferences: ["UPSC Prelims 2012 (Nagara vs Dravida definition)", "UPSC Prelims 2019 (Kalyana Mandapa Vijayanagara)", "UPPSC Prelims 2022 (Dashavatara Temple Deogarh UP)"],
        sections: [
          {
            heading: "Architectural Comparison: Nagara vs Dravida Styles",
            content: [
              "Nagara Style: Developed between Himalayas and Vindhyas. Features sanctum sanctorum (Garbhagriha), vestibule (Antarala), pillared assembly hall (Mandapa), and curvilinear shikhara.",
              "Dravida Style: Developed between Krishna and Kaveri rivers. The Garbhagriha is surmounted by a stepped pyramidal tower called Vimana. Features grand multi-tiered gateway towers called Gopurams and pillared halls (Mandapas) for rituals.",
              "Vesara Style: Combined elements of both, developed under Badami Chalukyas (Aihole, Pattadakal) and perfected by Hoysalas (Belur, Halebidu)."
            ],
            table: {
              headers: ["Feature", "Nagara Style (North)", "Dravida Style (South)", "Vesara Style (Deccan)"],
              rows: [
                ["Superstructure", "Curvilinear Shikhara (Latina/Phamsana)", "Stepped Pyramidal Vimana", "Hybrid barrel-vault or stellate tower"],
                ["Boundary Wall", "Generally absent", "Prominent high compound walls", "Mixed; frequently enclosed"],
                ["Entrance Gateway", "Modest doorway / Torana", "Monumental Gopuram", "Intricately carved dwarpalas"],
                ["Water Tank", "Not a mandatory temple feature", "Mandatory inside temple compound", "Present in later medieval shrines"],
                ["Classic Example", "Sun Temple Konark, Khajuraho, Modhera", "Brihadisvara Thanjavur, Meenakshi Madurai", "Hoysaleswara Halebidu, Chennakeshava Belur"]
              ]
            }
          }
        ],
        keyTerms: [
          { term: "Garbhagriha", meaning: "Sanctum sanctorum housing the principal deity icon." },
          { term: "Gopuram", meaning: "Monumental entrance gateway characteristic of Dravidian temple complexes." },
          { term: "Amalaka", meaning: "Segmented stone disc crowning the shikhara in Nagara architecture." }
        ]
      }
    ]
  }
];
