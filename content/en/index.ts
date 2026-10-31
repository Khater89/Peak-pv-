import type { Certification, Metric, Partner, Project, Service } from "@/content/shared";
import type { Locale } from "@/lib/locales";

/**
 * English content and UI strings. content/ar/index.ts mirrors this shape exactly.
 * VERIFY: anything set to null / [] is intentionally empty until Peak PV supplies verified facts.
 */
export const en = {
  lang: "en" as Locale,
  languageName: "English",

  company: {
    brandName: "Peak PV",
    brandTagline: "Solar Energy",
    tagline: "Solar PV systems — supplied, designed and installed.",
    about:
      "Peak PV is a solar photovoltaic company. We supply PV equipment, design systems around each site, and install them — so homeowners and businesses work with one team from first conversation to switch-on.",
    mission:
      "Make the move to solar clear and dependable: honest advice, engineering that fits the site, and installation done right the first time.",
    /** Inferred from the Jordanian phone numbers and projects — confirm exact cities. */
    serviceArea: "Jordan" as string | null,
    metrics: [] as Metric[],
    certifications: [] as Certification[],
    partners: [] as Partner[],
  },

  meta: {
    siteTitle: "Peak PV — Solar PV Supply, Design & Installation",
    siteDescription:
      "Peak PV supplies, designs and installs photovoltaic solar systems and EV charging points for homes and businesses in Jordan. Request a quote.",
    services: {
      title: "Solar PV Services — Supply, Design & Installation",
      description:
        "Solar PV equipment supply, system design, professional installation and EV charging points for residential and commercial properties from Peak PV.",
    },
    projects: {
      title: "Solar Projects — Residential & Commercial PV",
      description: "Residential and commercial solar PV projects supplied, designed and installed by Peak PV.",
    },
    about: {
      title: "About Peak PV — Solar PV Specialists",
      description: "Peak PV is a solar photovoltaic company supplying, designing and installing PV systems for homes and businesses.",
    },
    contact: {
      title: "Request a Solar PV Quote",
      description: "Request a quote or consultation for a residential or commercial solar PV system from Peak PV.",
    },
    projectSuffix: "Solar Project",
  },

  whatsappMessage: "Hello Peak PV, I'd like to ask about a solar PV system.",
  whatsappProjectMessage: (title: string) => `Hello Peak PV, I saw the "${title}" project and would like a similar system.`,

  nav: {
    home: "Home",
    services: "Services",
    projects: "Projects",
    about: "About",
    contact: "Contact",
  },

  header: {
    homeAria: "Peak PV — home",
    skip: "Skip to content",
    mainNav: "Main",
    mobileNav: "Mobile",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    requestQuote: "Request a Quote",
    quoteShort: "Quote",
    switchTo: "العربية",
    switchToAria: "عرض الموقع بالعربية",
  },

  topBar: {
    call: "Call",
    serving: (area: string) => `Serving ${area}`,
    whatsapp: "WhatsApp",
  },

  footer: {
    company: "Company",
    services: "Services",
    getInTouch: "Get in touch",
    requestQuote: "Request a quote →",
    rights: "All rights reserved.",
    line: "Solar PV supply · design · installation",
    contactLabels: { phone: "Phone", whatsapp: "WhatsApp", email: "Email" },
  },

  hero: {
    eyebrow: "Peak PV · Solar Energy",
    coords: "Jordan",
    titleBefore: "Solar power,",
    titleEm: "engineered",
    titleAfter: "for your property.",
    lead: "Supply, design and installation of photovoltaic systems and EV charging points for homes, businesses, farms and off-grid sites — one team from first survey to switch-on.",
    highlights: ["Supply, design & installation", "On-grid, hybrid & off-grid", "EV charging points", "Serving Jordan"],
    requestQuote: "Request a Quote",
    whatsapp: "WhatsApp",
    imageAlt: "Long row of solar panels under a blue sky with clouds",
  },

  pillarsAria: "Why Peak PV",
  /** Statements of scope, not performance claims. */
  pillars: [
    { title: "One team, end to end", body: "Supply, design and installation handled together — one point of contact." },
    { title: "Designed per site", body: "Every system is sized around your roof, your consumption and your goals." },
    { title: "Homes and businesses", body: "Residential rooftops through to commercial and industrial installations." },
    { title: "Clear proposals", body: "Equipment, layout and scope set out in writing before any work starts." },
  ],

  servicesSection: {
    eyebrow: "What we do",
    title: "Our Core Services",
    intro: "Complete solar PV delivery by qualified engineers and installers — or just the part you need.",
    learnMore: "Learn more",
    turnkeyEyebrow: "Turnkey",
    turnkeyTitle: "Complete PV Project",
    turnkeyBody: "Design, supply and installation under one contract — for on-grid, hybrid and off-grid systems.",
    requestQuote: "Request a quote",
  },

  services: [
    {
      slug: "supply",
      title: "Supply",
      summary: "PV panels, inverters, mounting structures, batteries and balance-of-system components.",
      description:
        "We source the equipment your system needs and match components so they work together — panels, inverters, mounting, protection, cabling and storage.",
      icon: "package",
      audience: "Homeowners, businesses and installers who need equipment sourced for a project.",
      benefits: [
        "Components selected to be compatible with each other",
        "Specifications documented before purchase",
        "Delivery coordinated with the installation schedule",
      ],
      enabled: true,
    },
    {
      slug: "design",
      title: "Design",
      summary: "System engineering based on your site, consumption profile and goals.",
      description:
        "Our design work turns a site survey into a buildable system: array layout, string configuration, inverter selection, protection and single-line diagrams.",
      icon: "ruler",
      audience: "Property owners and project teams who need an engineered system design.",
      benefits: [
        "Layout based on real roof or ground measurements",
        "Shading and orientation considered from the start",
        "Drawings and equipment list you can review",
      ],
      enabled: true,
    },
    {
      slug: "installation",
      title: "Installation",
      summary: "Mounting, panel installation, wiring, testing and commissioning.",
      description:
        "Our installation team builds the system to the approved design, tests it and commissions it — then walks you through operation at handover.",
      icon: "wrench",
      audience: "Anyone ready to put a designed system on their roof or land.",
      benefits: ["Installed to the approved design", "Tested and commissioned before handover", "Tidy, safe work on site"],
      enabled: true,
    },
    {
      slug: "ev-charging",
      title: "EV Charging Points",
      summary: "Supply and installation of electric-vehicle charging points for homes, businesses and car parks.",
      description:
        "We install EV charging points — wall-mounted units at home or pedestal chargers for workplaces and car parks — including the cabling and protection they need. Paired with a solar system, your vehicles can charge from your own solar power.",
      icon: "ev-charger",
      audience: "EV owners, businesses, hotels, residential buildings and car-park operators.",
      benefits: [
        "Site check of the electrical supply before installation",
        "Dedicated cabling and protection for the charger",
        "Can be integrated with your solar PV system",
      ],
      enabled: true,
    },
    {
      slug: "maintenance",
      title: "Maintenance & support",
      summary: "Inspections, cleaning and troubleshooting after installation.",
      description: "Periodic inspection and support to keep the system performing as designed.",
      icon: "life-buoy",
      audience: "Owners of existing PV systems.",
      benefits: ["Scheduled inspections", "Fault diagnosis", "Panel cleaning"],
      // Open decision: not stated in the brief. Flip to true once confirmed.
      enabled: false,
    },
  ] as Service[],

  evSection: {
    eyebrow: "EV charging",
    title: "Charging Points, Installed Right",
    intro: "We install electric-vehicle charging points for homes, charging stations and car parks — and can power them from your solar system.",
    requestCharger: "Request a charger quote",
  },
  /** Photos are Unsplash stock (illustrative, not Peak PV installations). */
  evSettings: [
    {
      title: "Homes & Villas",
      body: "A wall-mounted charger in your garage or driveway, wired safely to your home — and charging from your rooftop solar where possible.",
      type: "residential",
      img: "evHome",
      alt: "Electric car plugged into a charging cable at home",
    },
    {
      title: "Charging Stations",
      body: "Pedestal and public charging points for petrol stations, hotels, malls and roadside sites, with the supply and protection they need.",
      type: "commercial",
      img: "evStation",
      alt: "Public EV charging station next to a parked car",
    },
    {
      title: "Car Parks & Parking",
      body: "Multiple charging bays for office buildings, residential towers and car parks — planned around the available electrical capacity.",
      type: "commercial",
      img: "evParking",
      alt: "Electric cars charging in a parking garage",
    },
  ],

  facts: {
    eyebrow: "Engineered systems",
    title: "On-grid, hybrid or fully off-grid.",
    body: "Every system starts with a load study — each appliance, its rating and its hours — so the array, inverter and batteries are sized to how the building actually runs.",
    arrayLabel: "PV array designed",
    storageLabel: "Battery storage",
    inverterLabel: "Hybrid inverter",
    simValue: "30 yrs",
    simLabel: "Simulated performance",
    seeProject: "See the full project",
  },

  processSection: {
    eyebrow: "How it works",
    title: "From First Call to Switch-on",
    intro: "A clear, accountable process from your request to a commissioned system.",
    stepSr: (n: number) => `Step ${n}: `,
  },
  processSteps: [
    { title: "Consultation", body: "Tell us about your property, your electricity use and what you want solar to achieve." },
    { title: "Site survey", body: "We assess roof or ground space, orientation, shading and the existing electrical setup." },
    { title: "System design", body: "Our engineers select equipment and lay out the array, inverter and protection for your site." },
    { title: "Proposal", body: "You receive the design, equipment list and scope of work to review before you commit." },
    { title: "Supply & installation", body: "We deliver the equipment and install mounting, panels, inverter and cabling." },
    { title: "Testing & handover", body: "The system is tested and commissioned, and we walk you through how it works." },
  ],

  sectorsSection: {
    eyebrow: "Who we work with",
    title: "Sectors We Serve",
    intro: "Solar PV solutions designed for a wide range of property types.",
  },
  sectors: [
    { title: "Homes & Villas", type: "residential", img: "homes", alt: "Installer placing a solar panel on a house roof" },
    { title: "Commercial Buildings", type: "commercial", img: "commercial", alt: "Solar array in front of a commercial building at dusk" },
    { title: "Factories & Warehouses", type: "industrial", img: "industrial", alt: "Large rooftop solar installation at sunset" },
    { title: "Farms & Agriculture", type: "agricultural", img: "farms", alt: "Solar panels in a field surrounded by trees" },
    { title: "Solar Farms", type: "commercial", img: "solarFarms", alt: "Aerial view of rows of solar panels" },
    { title: "Off-grid Sites", type: "other", img: "offGrid", alt: "Ground-mounted solar panels on open grassland" },
  ],

  projectsSection: {
    eyebrow: "Projects",
    title: "Featured Work",
    intro: "Real systems engineered by Peak PV, with full specifications.",
    viewAll: "View all projects",
  },

  project: {
    featuredBadge: "Featured project",
    viewProject: "View project",
    similar: "Get a similar system",
    capacity: "Capacity",
    panels: "Panels",
    inverter: "Inverter",
    storage: "Storage",
    rendersSoon: "Project renders coming soon",
    render: "3D render",
    photo: "Site photo",
    segments: { residential: "Residential", commercial: "Commercial" },
    status: { completed: "Completed", "in-progress": "In progress", designed: "Design complete" },
    allProjects: "All projects",
    imagesAria: "Project images",
    moreImages: (n: number) => `+${n} more images`,
    about: "About the project",
    specs: "Technical specifications",
    scope: "Our scope",
    contactAria: "Contact Peak PV about this project",
    ctaTitle: "Want a system like this?",
    ctaBody: "Tell us about your site and loads — we'll design a system around them.",
  },

  gallery: {
    filterAria: "Filter projects by segment",
    all: "All projects",
    count: (n: number) => `${n} ${n === 1 ? "project" : "projects"}`,
    empty: "No projects in this category yet.",
  },

  faqSection: {
    eyebrow: "FAQ",
    title: "Questions, Answered",
    intro: "The things people usually ask before going solar.",
  },
  faqs: [
    {
      q: "What does Peak PV do?",
      a: "We supply, design and install photovoltaic (PV) solar systems and EV charging points for homes and businesses. You can come to us for the full project or for a specific part of it.",
    },
    {
      q: "How is the size of my system decided?",
      a: "Sizing depends on your electricity consumption, the usable roof or ground area, orientation, shading and your goals. We work it out during the site survey and design stage rather than from a generic formula.",
    },
    {
      q: "Can a system include battery storage?",
      a: "Yes — hybrid systems combine panels with battery storage. Whether storage makes sense for you is something we discuss during design.",
    },
    {
      q: "What happens after I send a quote request?",
      a: "Our team reviews your details and contacts you to arrange a consultation. Your request is stored securely and only used to respond to you.",
    },
    {
      q: "Do you install EV charging points?",
      a: "Yes. We supply and install electric-vehicle charging points for homes, businesses and car parks, including the cabling and protection they need — and we can connect them to your solar system so you charge from your own solar power.",
    },
    {
      q: "Do you work on commercial projects?",
      a: "Yes. We handle commercial and industrial rooftops and facilities as well as residential properties.",
    },
  ],

  contactSection: {
    eyebrow: "Request a quote",
    title: "Tell Us About Your Project",
    body: "Share your property type, location and what you need. Our engineers review every request and get back to you to arrange a consultation.",
    whatsapp: "WhatsApp",
    serving: (area: string) => `Serving ${area}`,
  },

  cta: {
    title: "Ready to see what solar can do for your property?",
    body: "Tell us about your site and what you need. Our team will review it and get back to you to arrange a consultation.",
    button: "Get a quote",
  },

  agent: {
    team: "Peak PV engineering team",
    sub: "Solar PV supply · design · installation",
    chat: "Chat on WhatsApp",
    request: "Request a quote",
  },

  servicesPage: {
    eyebrow: "Services",
    title: "Solar PV, handled end to end",
    intro: "Supply, design, installation and EV charging — choose the full project or just the part you need.",
    imageAlt: "Installer's gloved hands connecting a solar panel",
    onThisPage: "Services on this page",
    detailsSr: "Service details",
    whoFor: "Who it's for: ",
    whatYouGet: "What you get",
    request: (title: string) => `Request ${title}`,
    typesEyebrow: "System types",
    typesTitle: "The right system for the site",
    typesIntro: "The main types of PV system, and when each one fits.",
    compareCaption: "Comparing system types",
    feature: "Feature",
    segmentsEyebrow: "Solutions",
    segmentsTitle: "Residential and commercial",
    capabilitiesEyebrow: "Technical capabilities",
    capabilitiesTitle: "Engineering behind every system",
    capabilitiesIntro: "The design and installation work that goes into a dependable PV system.",
    ctaTitle: "Not sure which service you need?",
    ctaBody: "Describe your property and goals — we'll recommend the right approach during a consultation.",
  },

  solutions: [
    {
      segment: "residential" as "residential" | "commercial",
      title: "Residential solar",
      body: "Rooftop systems for villas, houses and apartment buildings — designed around your household's consumption and roof.",
      points: ["Rooftop PV arrays", "On-grid or hybrid with battery storage", "Neat, low-profile installation"],
      alt: "Installer placing a solar panel on a house roof",
    },
    {
      segment: "commercial" as "residential" | "commercial",
      title: "Commercial & industrial",
      body: "Larger systems for offices, factories, warehouses, farms and facilities — engineered around operating hours and load.",
      points: ["Flat-roof, carport and ground-mount arrays", "Designed around daytime operating load", "Staged delivery for live sites"],
      alt: "Large rooftop solar installation at sunset",
    },
  ],

  /** Generic PV system categories. VERIFY which ones Peak PV offers. */
  systemTypes: [
    { title: "On-grid", body: "Connected to the utility grid. Solar power is used first; the grid covers the rest." },
    { title: "Hybrid", body: "Grid-connected with battery storage, so solar energy can be used later or during outages." },
    { title: "Off-grid", body: "Standalone system with batteries for sites without a reliable grid connection." },
    { title: "Solar water pumping", body: "PV-powered pumps for agriculture and water supply in remote locations." },
  ],

  /** Standard PV engineering scope. VERIFY against Peak PV's actual capabilities. */
  capabilities: [
    "Site survey and roof / ground assessment",
    "Shading and orientation analysis",
    "Array layout and string configuration",
    "Inverter and battery selection",
    "Mounting structure selection",
    "Electrical protection and single-line diagrams",
    "Installation and cable management",
    "Testing, commissioning and handover",
    "EV charging point installation",
  ],

  comparison: {
    columns: ["On-grid", "Hybrid", "Off-grid"],
    rows: [
      { label: "Grid connection", values: ["Yes", "Yes", "No"] },
      { label: "Battery storage", values: ["No", "Yes", "Yes"] },
      { label: "Power during outages", values: ["No", "Yes, from batteries", "Yes"] },
      { label: "Typical use", values: ["Reduce grid consumption", "Savings plus backup", "Remote or unreliable grid"] },
    ],
  },

  projectsPage: {
    eyebrow: "Projects",
    title: "Solar installations",
    intro: "Real systems designed and delivered by Peak PV — with specifications, renders and site photos.",
    imageAlt: "Rows of ground-mounted solar panels",
    ctaTitle: "Have a similar project in mind?",
    ctaBody: "Share a few details about your site and we'll take it from there.",
  },

  aboutPage: {
    eyebrow: "About us",
    title: "Solar specialists, start to finish",
    imageAlt: "Solar array under a clear sky",
    storyEyebrow: "Our story",
    storyTitle: "Why Peak PV",
    storyP1:
      "Going solar involves many decisions — which equipment, what size, how it is mounted and connected. We set up Peak PV so property owners could get all of that from one specialist team.",
    storyP2:
      "We focus on photovoltaic systems: supplying the right components, designing around each site and installing to a high standard — and the EV charging points that go with them.",
    storyImageAlt: "Installer placing a solar panel on a house roof",
    mission: "Our mission",
    valuesEyebrow: "What we stand for",
    valuesTitle: "Our values",
    values: [
      { title: "Honest advice", body: "We recommend what fits your site and goals — and say so when solar isn't the right fit." },
      { title: "Engineered to fit", body: "Systems designed from real measurements, not a one-size-fits-all package." },
      { title: "Safety and quality", body: "Careful installation practice and testing before every handover." },
      { title: "One accountable team", body: "The same team takes your project from consultation to commissioning." },
    ],
    trustEyebrow: "Quality & partners",
    trustTitle: "Certifications and partners",
    viewCertificate: "View certificate",
    processEyebrow: "How we work",
    processTitle: "A process built on clarity",
  },

  contactPage: {
    eyebrow: "Contact",
    title: "Request a quote",
    intro: "Tell us about your property and what you're looking for. It takes about two minutes.",
    imageAlt: "Close-up of solar panels in a field",
    detailsTitle: "Project details",
    detailsSub: "The more you tell us, the better we can prepare.",
    nextTitle: "What happens next",
    nextSteps: [
      { title: "We review your details", body: "Our team looks at your property type, location and what you need." },
      { title: "We contact you", body: "We get in touch to discuss your goals and arrange a consultation." },
      { title: "Site survey & proposal", body: "After the survey, you receive a design and scope to review." },
    ],
    serviceArea: "Service area",
  },

  notFound: {
    title: "Page not found",
    body: "The page you're looking for doesn't exist or has moved.",
    home: "Back to home",
    quote: "Request a quote",
  },

  form: {
    projectTypes: {
      residential: "Residential (home, villa, apartment)",
      commercial: "Commercial (office, shop, hotel)",
      industrial: "Industrial (factory, warehouse)",
      agricultural: "Agricultural (farm, water pumping)",
      other: "Other",
    },
    fullProject: "Full project — design, supply & installation",
    notSure: "Not sure yet",
    labels: {
      name: "Full name",
      phone: "Phone",
      email: "Email",
      company: "Company",
      projectType: "Property type",
      serviceInterest: "Service needed",
      location: "Project location",
      message: "Project details",
      consent: "Contact consent",
    },
    requiredNote: "Fields marked",
    requiredNoteSr: "with an asterisk",
    requiredNoteEnd: "are required.",
    optional: "(optional)",
    required: "Required.",
    hints: {
      phone: "Include the country code if outside Jordan.",
      location: "City or area is enough.",
      message: "E.g. roof type and size, monthly electricity bill, whether you want battery backup.",
    },
    placeholders: { phone: "079 000 0000", email: "name@company.com" },
    selectType: "Select property type",
    selectService: "Select a service",
    consentText: "I agree that Peak PV may contact me about this request.",
    submit: "Send quote request",
    sending: "Sending…",
    sendingSr: "Sending your request…",
    privacy: "We only use your details to respond to this request.",
    summary: (n: number) => `Please fix ${n === 1 ? "1 field" : `${n} fields`} before sending:`,
    notSent: "Your request was not sent",
    keptAnswers: "Your answers are still filled in below.",
    successTitle: "Thank you — your request has been received",
    successBefore: "Your reference number is",
    successAfter:
      "Our team will review your details and contact you to arrange a consultation. Please keep the reference for any follow-up.",
    sendAnother: "Send another request",
    errors: {
      name: "Please enter your full name.",
      phone_required: "Please enter a phone number.",
      phone_invalid: "Enter a valid phone number, e.g. 079 000 0000.",
      email_required: "Please enter your email address.",
      email_invalid: "Enter a valid email address, e.g. name@company.com.",
      projectType: "Choose the type of property.",
      serviceInterest: "Choose the service you need.",
      consent: "Please confirm we may contact you about this request.",
      too_long: "Please shorten this entry.",
    } as Record<string, string>,
    api: {
      invalid: "Please correct the highlighted fields.",
      rate_limited: "Too many requests from this connection. Please try again in a few minutes.",
      too_large: "Your message is too long. Please shorten it and try again.",
      bad_request: "We couldn't read your request. Please try again.",
      rejected: "Your request could not be accepted.",
      unsupported: "Unsupported request format.",
      store_failed: "We couldn't save your request right now. Nothing was sent — please try again shortly.",
      generic: "Something went wrong and your request was not saved. Please try again.",
      timeout: "The request took too long and may not have been saved. Please check your connection and try again.",
      network: "We couldn't reach our server, so your request was not sent. Please check your connection and try again.",
    } as Record<string, string>,
  },

  projects: [
    {
      slug: "madama",
      title: "Madama — 68.4 kWp off-grid system",
      segment: "commercial",
      systemType: "Off-grid",
      location: "Yajouz 2 – Rusaifa, Jordan",
      status: "designed",
      year: 2026,
      summary:
        "A fully off-grid PV and battery system sized to carry Madama's daytime and evening loads without a grid connection.",
      description: [
        "Peak PV carried out the full load study and system design for Madama: every appliance was listed with its rating, load factor and operating hours to build a month-by-month consumption profile.",
        "The design pairs a 68.4 kWp array with a 50 kW hybrid inverter and 184 kWh of battery storage, so evening loads are carried from solar energy stored during the day. The system was checked against a 30-year simulation that includes cloudy days.",
      ],
      capacityKwp: 68.4,
      keyFacts: { panels: "114 × 600 W", inverter: "50 kW", storage: "184.3 kWh" },
      specs: [
        { label: "System type", value: "Off-grid (standalone)" },
        { label: "PV array", value: "68.4 kWp — 114 × 600 W modules" },
        { label: "String layout", value: "2 strings × 15 + 6 strings × 14" },
        { label: "Inverter", value: "SOFAR HYD-50K-T1, 50 kW" },
        { label: "Battery storage", value: "3 × CBS5000-H12 — 184.3 kWh nominal / 165.9 kWh usable" },
        { label: "Average daily load", value: "191.9 kWh / day" },
        { label: "Peak simultaneous load", value: "16.8 kW" },
      ],
      scope: ["Load study", "System design", "Equipment selection", "3D rendering"],
      images: [],
    },
  ] as Project[],
};

export type Content = typeof en;
