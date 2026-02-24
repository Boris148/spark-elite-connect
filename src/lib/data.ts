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

export const services: Service[] = [
  {
    title: "Media Buying (Meta / Google / TikTok)",
    price: "Custom Retainer",
    description:
      "Performance-focused campaign management built to scale qualified leads and sales across paid channels.",
    features: [
      "Audience strategy and campaign architecture",
      "Creative testing roadmap",
      "Weekly optimization and reporting",
      "Funnel KPI monitoring and scaling",
    ],
  },
  {
    title: "White Label Media Buying",
    price: "$500/mo per ad account",
    description:
      "Reliable paid media execution for agencies that need backend fulfillment without sacrificing results.",
    features: [
      "Meta campaign setup and management",
      "Agency-friendly communication cadence",
      "Optimization and budget pacing",
      "Performance reporting for your clients",
    ],
  },
  {
    title: "Full-Service Digital Marketing",
    price: "$3,500/mo",
    description:
      "End-to-end growth support combining paid media, strategy, creative direction, and funnel optimization.",
    features: [
      "Cross-channel marketing plan",
      "Lead flow and conversion optimization",
      "Creative and messaging guidance",
      "Monthly strategy reviews",
    ],
  },
  {
    title: "Website Development",
    price: "$500/site",
    description:
      "High-converting, mobile-first websites designed to support campaigns and turn traffic into opportunities.",
    features: [
      "Responsive landing page or site build",
      "Conversion-focused layout",
      "Lead capture forms and CTA placement",
      "Fast turnaround and revisions",
    ],
  },
  {
    title: "Lead Generation",
    price: "Custom Engagement",
    description:
      "Pipeline-first lead generation systems tailored to your sales process, offer, and target market.",
    features: [
      "Offer positioning and lead magnet planning",
      "Lead capture funnel setup",
      "CRM-ready lead delivery options",
      "Performance tracking by source",
    ],
  },
  {
    title: "Marketing Strategy",
    price: "Custom / Advisory",
    description:
      "Strategic planning for businesses that need clarity on channels, messaging, budget allocation, and growth priorities.",
    features: [
      "Market positioning review",
      "Channel and budget recommendations",
      "Campaign roadmap and priorities",
      "Execution oversight guidance",
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
