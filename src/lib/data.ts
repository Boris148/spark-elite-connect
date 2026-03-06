export const site = {
  name: "Social Elite Marketing Group, LLC",
  shortName: "Social Elite Marketing Group",
  tagline: "Where Strategy Meets Results",
  phone: "(210) 442-9987",
  phoneHref: "tel:+12104429987",
  email: "info@socialelitemarketinggroup.com",
  emailHref: "mailto:info@socialelitemarketinggroup.com",
};

export type Service = {
  title: string;
  description: string;
  features: string[];
  image: string;
};

export const industriesServed = [
  "Home Services",
  "Real Estate",
  "Med Spas",
  "Restaurants",
  "E-Commerce",
  "Fitness",
  "Legal",
  "Financial Services",
  "SaaS",
  "Construction",
  "Roofing",
  "HVAC",
  "Dental",
  "Automotive",
  "Insurance",
  "Education",
];

export const services: Service[] = [
  {
    title: "Paid Media Management",
    description: "We don't guess — we test, optimize, and scale. Every dollar of ad spend is tracked and accountable.",
    features: [
      "Meta Ads (Facebook & Instagram)",
      "Google Ads (Search, Display, YouTube)",
      "TikTok Ads",
      "Retargeting & Lookalike Audiences",
      "Creative Strategy & Ad Copy",
      "Weekly Reporting & Optimization",
    ],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
  },
  {
    title: "Website Design & Development",
    description: "Conversion-first websites that look great and actually generate leads.",
    features: [
      "Built for speed and mobile-first",
      "SEO-optimized from day one",
      "Integrated with your CRM",
      "Launch-ready within four weeks",
    ],
    image: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&q=80",
  },
  {
    title: "Full-Service Digital Marketing",
    description: "For businesses that want one team handling everything.",
    features: [
      "Strategy, creative, media buying, reporting",
      "Dedicated account manager",
      "Monthly strategy calls",
      "Executive dashboards with ROI clarity",
    ],
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
  },
  {
    title: "White-Label Media Buying",
    description:
      "For agencies: Stop losing clients over ad performance. We handle the media buying, you keep the client.",
    features: [
      "Your branding, our expertise",
      "Slack channel for real-time communication",
      "Weekly reports under your brand",
      "Client-facing strategy support",
    ],
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80",
  },
];

export type ResultCard = {
  industry: string;
  title: string;
  image: string;
  metric: string;
  summary: string;
};

export const resultCards: ResultCard[] = [
  {
    industry: "Pool Contracting",
    title: "Lead Volume Growth With Better Cost Control",
    image: "/images/meta-ads/pool-contracting.png",
    metric: "Consistent Qualified Leads",
    summary:
      "Campaign structure and creative testing improved lead quality while maintaining efficient acquisition costs.",
  },
  {
    industry: "Real Estate Wholesale",
    title: "Higher Intent Seller Leads",
    image: "/images/meta-ads/real-estate-wholesale.png",
    metric: "Improved Lead Intent",
    summary:
      "Audience segmentation and ad messaging focused on motivated sellers and cleaner pipeline opportunities.",
  },
  {
    industry: "GLP / Wellness",
    title: "Offer-Driven Meta Campaign Performance",
    image: "/images/meta-ads/ozempic-glp.png",
    metric: "Scalable Appointment Demand",
    summary:
      "Compliance-aware copy angles and landing page alignment supported stronger inquiry flow for wellness offers.",
  },
  {
    industry: "Personal Injury",
    title: "Competitive Market Lead Acquisition",
    image: "/images/meta-ads/personal-injury.png",
    metric: "High-Value Case Opportunities",
    summary:
      "Targeting refinement and creative rotation produced better response quality in a high-CPC vertical.",
  },
  {
    industry: "SaaS",
    title: "Demand Generation for Software Offers",
    image: "/images/meta-ads/saas.png",
    metric: "Qualified Demo Pipeline",
    summary:
      "Full-funnel messaging mapped to awareness and consideration stages to support more sales conversations.",
  },
  {
    industry: "Events / Festival",
    title: "Fast-Moving Promotion Campaigns",
    image: "/images/meta-ads/music-festival.png",
    metric: "Ticket Sales Momentum",
    summary:
      "Time-sensitive campaign pacing and creative variations helped sustain conversion momentum near event dates.",
  },
];

export const testimonials = [
  {
    name: "Agency Partner",
    role: "White Label Client",
    quote:
      "Jeremy delivers dependable media buying execution and communicates clearly. It feels like having a senior buyer on our team.",
  },
  {
    name: "Service Business Owner",
    role: "Lead Generation Client",
    quote:
      "We needed a strategy that actually turned into booked calls. The campaigns were organized, measurable, and results-driven.",
  },
  {
    name: "Growth Operator",
    role: "Multi-Channel Marketing Client",
    quote:
      "What stood out was the blend of strategy and action. We got a real plan, cleaner reporting, and better decision-making.",
  },
];
