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
  price: string;
  description: string;
  features: string[];
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
    price: "Custom Retainer",
    description:
      "We don't guess. We test, optimize, and scale across the channels that drive measurable revenue.",
    features: [
      "Meta Ads (Facebook & Instagram)",
      "Google Ads (Search, Display, YouTube)",
      "TikTok Ads + retargeting audiences",
      "Creative strategy, ad copy, weekly reporting",
    ],
  },
  {
    title: "Website Design & Development",
    price: "Starting at $500",
    description:
      "Conversion-first websites built to turn clicks into customers and support lead generation from day one.",
    features: [
      "Mobile-first and built for speed",
      "SEO-optimized from launch",
      "CRM-ready forms and integrations",
      "Conversion-focused layout and CTA structure",
    ],
  },
  {
    title: "Full-Service Digital Marketing",
    price: "$3,500/mo",
    description:
      "One team handling strategy, creative, media buying, analytics, and optimization under one roof.",
    features: [
      "Strategy, creative, media buying, reporting",
      "Dedicated account manager",
      "Monthly strategy calls",
      "Performance optimization across campaigns",
    ],
  },
  {
    title: "White-Label Media Buying",
    price: "$500/mo per account",
    description:
      "Agency partners can outsource media buying to our team while keeping the client relationship and branding.",
    features: [
      "For agencies that need backend fulfillment",
      "Your branding, our media buying expertise",
      "Slack communication + weekly reporting",
      "Built to retain clients through performance",
    ],
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
