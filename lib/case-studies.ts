// Case studies shown on /case-studies.
//
// Everything here comes from what clients have said in their testimonials (lib/site-data.ts).
// RESULTS: add only real, client-approved numbers. A case study's "Results" box appears
// automatically once `results` has at least one entry, e.g.
// Logos live in /public/clients and are cropped tight so they fill their box evenly.
//   results: [{ value: "3.1x", label: "ROAS on Meta ads" }, { value: "40%", label: "Lower CPA in 60 days" }],

export type CaseStudy = {
  slug: string;
  brand: string;
  logo: string;
  /** Matches service page names so they can link to /services/... */
  services: string[];
  /** One line: what the client came to us for. */
  brief: string;
  /** What Dibiz actually did. */
  work: string[];
  results: { value: string; label: string }[];
  quote: string;
  quoteBy: string;
  /** How long we've worked together, only if known. */
  duration?: string;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "mindwise",
    brand: "Mindwise",
    logo: "/clients/mindwise.png",
    services: ["Website & App Development", "Content Production", "Performance Marketing"],
    brief: "A new D2C brand that needed everything built from the ground up: website, content and ads.",
    work: [
      "Designed and built the Shopify store",
      "Planned and produced product content and shoots",
      "Set up and ran Meta ads from launch",
    ],
    results: [],
    quote:
      "Dibiz has helped us build Mindwise from the ground up, from our website and content to production and Meta ads. We’ve started seeing sales, and it’s been great having them as our end-to-end growth partner.",
    quoteBy: "Founder, Mindwise",
  },
  {
    slug: "xyxx",
    brand: "XYXX",
    logo: "/clients/xyxx.png",
    services: ["Content Production", "Performance Marketing"],
    brief: "A brand running Meta ads at scale that needed a steady pipeline of fresh Meta ad creatives.",
    work: [
      "Deliver 20–30 Meta ad creatives every month",
      "Test new hooks, angles and formats in every batch",
      "Refresh creatives regularly so ads don't fatigue",
    ],
    results: [],
    quote:
      "Dibiz has been a great creative partner for us, consistently delivering 20–30 Meta ad creatives every month. The ads have been performing well, and the team has been great to work with.",
    quoteBy: "Team, XYXX",
  },
  {
    slug: "signature",
    brand: "Signature",
    logo: "/clients/signature.png",
    services: ["Brand & Community", "Content Production", "Performance Marketing", "Website & App Development"],
    brief: "A brand looking for one partner to run positioning, content, ads and the website together.",
    work: [
      "Brand positioning and messaging",
      "Content production and influencer marketing",
      "Performance ads",
      "Ongoing website management",
    ],
    results: [],
    quote:
      "Dibiz has been handling everything for us, from brand positioning and content to influencer marketing, performance ads, and website management. The team has played a big role in our growth, and it’s been a great partnership.",
    quoteBy: "Team, Signature",
  },
  {
    slug: "bloomastra",
    brand: "bloomastra",
    logo: "/clients/bloomastra.png",
    services: ["Content Production", "Performance Marketing", "Website & App Development"],
    brief: "A growing brand that wanted content, performance marketing and tech handled by one team.",
    work: ["Content production", "Performance marketing", "Website and tech support"],
    results: [],
    quote:
      "Dibiz has been handling everything from content to performance marketing and tech for almost a year now. Great team, great experience, and happy with the growth we’ve seen together.",
    quoteBy: "Founder, bloomastra",
    duration: "Almost a year",
  },
  {
    slug: "fuaark",
    brand: "Fuaark",
    logo: "/clients/fuaark.png",
    services: ["Content Production", "Performance Marketing"],
    brief: "A brand that wanted stronger brand recall from its top-of-funnel Meta ads.",
    work: [
      "Top-of-funnel and brand recall ad creatives",
      "Meta ads built around what makes creatives work",
    ],
    results: [],
    quote:
      "Dibiz really understands Meta and what makes creatives work. Their brand recall and top-of-funnel ads have been performing well, and it’s been great working with the team.",
    quoteBy: "Team, Fuaark",
  },
  {
    slug: "zouk",
    brand: "Zouk",
    logo: "/clients/zouk.png",
    services: ["Content Production"],
    brief: "A brand that wanted episodic content its audience would actually watch.",
    work: ["Concept, scripting and production of a micro-drama series", "Distribution-ready edits for social"],
    results: [],
    quote:
      "Working with Dibiz was a great experience. The micro-drama series turned out really well, our audience loved it, and the performance was great. Looking forward to doing more together!",
    quoteBy: "Founder, Zouk",
  },
];
