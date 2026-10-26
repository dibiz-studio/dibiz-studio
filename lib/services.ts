// Content for the /services/[slug] pages.
// `category` must match the blog category name exactly so related articles show up.

export type ServicePage = {
  slug: string;
  category: string; // matches SERVICES[].name in lib/blog-shared.ts and post `category`
  navLabel: string;
  img: string;
  /** <title> — lead with the search phrase people type. */
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  h1: string;
  intro: string[];
  included: { title: string; desc: string }[];
  approach: { title: string; desc: string }[];
  forWho: string[];
  proof?: { quote: string; brand: string };
  faqs: { q: string; a: string }[];
};

export const servicePages: ServicePage[] = [
  {
    slug: "content-production",
    category: "Content Production",
    navLabel: "Content Production",
    img: "/content-production.png",
    metaTitle: "Content Production & Ad Creatives Agency in Mumbai",
    metaDescription:
      "Ad creatives, UGC videos, reels and brand shoots for D2C and fashion brands, built to test hooks and angles so you learn what actually sells. Mumbai-based, working across India.",
    eyebrow: "Content Production",
    h1: "Content production and ad creatives for D2C brands",
    intro: [
      "Most brands make content that looks good but doesn't tell them anything. We produce content built to test decisions: different hooks, angles, formats and narratives, so every batch shows you what actually persuades your customer.",
      "From our studio in Mumbai we shoot and edit ad creatives, UGC-style videos, reels and micro-drama series for D2C and fashion brands, and feed what wins straight back into your ads, website and social.",
    ],
    included: [
      { title: "Meta & YouTube ad creatives", desc: "Static and video ads in batches, each one built around a clear hook and angle so results are easy to read." },
      { title: "UGC and creator videos", desc: "Briefing creators, scripting, and editing UGC so it feels native to Instagram and converts like an ad." },
      { title: "Reels and short-form social", desc: "A consistent publishing rhythm of reels and short-form content for your brand's Instagram." },
      { title: "Brand shoots and series", desc: "Product shoots, lifestyle shoots and episodic content such as micro-drama series that build recall." },
    ],
    approach: [
      { title: "Brief from data", desc: "We start from your ad account, reviews and customer language, not a mood board." },
      { title: "Shoot for variation", desc: "Every shoot is planned to produce many hooks and angles, not one hero video." },
      { title: "Read the results", desc: "We track which creatives win on thumb-stop, click-through and purchase, then brief the next batch from that." },
    ],
    forWho: [
      "D2C and fashion brands running Meta ads who need a steady flow of fresh creatives",
      "Brands whose content looks polished but isn't driving sales",
      "Founders who want one team for scripting, shooting and editing",
    ],
    proof: {
      quote: "Dibiz has been a great creative partner for us, consistently delivering 20–30 Meta ad creatives every month.",
      brand: "XYXX",
    },
    faqs: [
      { q: "What kind of content do you produce?", a: "Ad creatives for Meta and YouTube, UGC-style videos, reels and short-form social content, product and lifestyle shoots, and episodic brand content such as micro-drama series." },
      { q: "How many creatives can you deliver each month?", a: "It depends on your ad spend and testing plan. For brands running Meta ads at scale we regularly deliver 20–30 ad creatives a month." },
      { q: "Do you work with brands outside Mumbai?", a: "Yes. Our studio is in Malad West, Mumbai, and we work with D2C brands across India. Products can be shipped to us for shoots." },
      { q: "Can you also run the ads for this content?", a: "Yes. Content production works best alongside our performance marketing service, so winning creatives are scaled quickly and losing ones are cut." },
    ],
  },
  {
    slug: "performance-marketing",
    category: "Performance Marketing",
    navLabel: "Performance Marketing",
    img: "/performance-marketing.png",
    metaTitle: "Performance Marketing Agency for D2C Brands | Meta & Google Ads",
    metaDescription:
      "Meta and Google ads for D2C and fashion brands in India. We test fast, scale only proven winners, and set clear CAC, ROAS and payback targets before spending more.",
    eyebrow: "Performance Marketing",
    h1: "Performance marketing for D2C brands: Meta & Google ads",
    intro: [
      "Ads amplify what already works. They can't fix a weak offer, a confusing website or tired creatives. That's why we scale only what has proven demand: spend follows clarity, so your budget goes into winners instead of funding experiments.",
      "We run Meta (Facebook and Instagram) and Google ads for D2C and fashion brands across India, with creative testing, landing-page alignment and clear CAC, ROAS and payback targets agreed up front.",
    ],
    included: [
      { title: "Meta ads", desc: "Account structure, audience strategy, creative testing and scaling on Facebook and Instagram." },
      { title: "Google ads", desc: "Search, Shopping and Performance Max campaigns that capture people already looking for your product." },
      { title: "Creative testing", desc: "Structured micro-tests on hooks, formats and angles so you know which ads deserve more budget." },
      { title: "Reporting you can act on", desc: "Weekly numbers on CAC, ROAS and payback, plus what we're changing next and why." },
    ],
    approach: [
      { title: "Audit", desc: "We find where money is leaking across your ads, website and retention before adding spend." },
      { title: "Test", desc: "We run small, fast tests across high-variance ad directions to find what customers respond to." },
      { title: "Scale", desc: "We increase budget only on proven directions, and refresh creatives weekly to keep results stable." },
    ],
    forWho: [
      "D2C brands spending on Meta or Google with low or unstable ROAS",
      "Fashion and apparel brands that need a steady creative pipeline behind their ads",
      "Founders who want spend tied to clear targets, not guesswork",
    ],
    proof: {
      quote: "Dibiz really understands Meta and what makes creatives work. Their brand recall and top-of-funnel ads have been performing well.",
      brand: "Fuaark",
    },
    faqs: [
      { q: "Which ad platforms do you manage?", a: "We manage Meta (Facebook and Instagram) and Google ads, including Search, Shopping and Performance Max." },
      { q: "Why is my D2C brand's ROAS low?", a: "Low ROAS is rarely just an ads problem. Common causes are tired creatives, a weak offer, slow or confusing product pages, and no retention. We audit all of these before increasing spend." },
      { q: "Do you also make the ad creatives?", a: "Yes. We produce ad creatives in-house, which makes creative testing much faster than working with a separate production team." },
      { q: "Do you work with new brands?", a: "Yes. For new brands we focus first on finding a winning offer and creative angle with small tests, then scale once there's proof of demand." },
    ],
  },
  {
    slug: "website-development",
    category: "Website & App Development",
    navLabel: "Website & App Development",
    img: "/website-app.png",
    metaTitle: "Shopify & Custom Website Development for D2C Brands",
    metaDescription:
      "Fast, conversion-first Shopify stores, custom Next.js websites and web apps for D2C brands in India. We design buying journeys that help customers decide faster.",
    eyebrow: "Website & App Development",
    h1: "Website and app development for D2C brands",
    intro: [
      "Your website is where ad spend turns into revenue, or leaks away. We design buying journeys, not just pages: clear messaging, less friction, and a structure that helps customers decide faster.",
      "We build Shopify stores, custom Next.js websites and web apps for D2C brands, and keep improving them with conversion rate optimisation once they're live.",
    ],
    included: [
      { title: "Shopify stores", desc: "Theme customisation and builds focused on product pages, speed and a smooth checkout." },
      { title: "Custom websites", desc: "Fast Next.js websites and headless stores when your brand needs more flexibility than a theme allows." },
      { title: "Landing pages", desc: "Campaign pages matched to your ads, so the message a customer clicks is the message they land on." },
      { title: "CRO and website management", desc: "Ongoing testing, fixes and updates to lift conversion rate after launch." },
    ],
    approach: [
      { title: "Map the buying journey", desc: "We start from how your customer decides: their questions, doubts and objections." },
      { title: "Design and build", desc: "Clear messaging, strong product pages and fast load times on mobile." },
      { title: "Optimise", desc: "We use real traffic and sales data to keep improving the pages that matter most." },
    ],
    forWho: [
      "D2C brands launching their first store",
      "Brands whose ads get clicks but the website doesn't convert",
      "Growing brands deciding between Shopify and a custom website",
    ],
    proof: {
      quote: "Dibiz has helped us build Mindwise from the ground up, from our website and content to production and Meta ads. We’ve started seeing sales.",
      brand: "Mindwise",
    },
    faqs: [
      { q: "Should my D2C brand use Shopify or a custom website?", a: "Shopify is usually the fastest and most cost-effective way to launch and grow. A custom or headless website makes sense when you need features, speed or design control a theme can't provide." },
      { q: "Do you build mobile apps?", a: "We build web apps and app-like mobile web experiences. Talk to us about your requirements and we'll recommend the right approach." },
      { q: "Do you manage the website after launch?", a: "Yes. We offer ongoing website management and conversion rate optimisation, so your store keeps improving." },
      { q: "Can you work on our existing Shopify store?", a: "Yes. We can redesign key pages, fix speed and UX issues, or rebuild the theme, depending on what your store needs." },
    ],
  },
  {
    slug: "brand-community",
    category: "Brand & Community",
    navLabel: "Brand & Community",
    img: "/brand-community.png",
    metaTitle: "Brand Building & Community Marketing for D2C Brands",
    metaDescription:
      "Brand positioning, influencer marketing and community building on Instagram and WhatsApp for D2C brands in India. Earn trust before you try to capture demand.",
    eyebrow: "Brand & Community",
    h1: "Brand building and community for D2C brands",
    intro: [
      "Followers are cheap; a community is a moat. We help brands earn trust before they try to capture demand, through sharp positioning, the language your audience actually uses, and conversations that make people care, not just follow.",
      "For D2C brands across India we work on positioning, social media, influencer marketing and community on Instagram, WhatsApp and beyond, so every rupee spent on ads works harder.",
    ],
    included: [
      { title: "Brand positioning", desc: "Who you're for, what makes you different, and how to say it in your customer's words." },
      { title: "Social media management", desc: "Content calendars, publishing and community management for your brand's channels." },
      { title: "Influencer marketing", desc: "Finding, briefing and managing creators who fit your brand and audience." },
      { title: "Community and retention", desc: "WhatsApp and Instagram communities and programmes that turn first-time buyers into repeat customers." },
    ],
    approach: [
      { title: "Listen", desc: "We study reviews, comments and DMs to find what your audience cares about and how they talk." },
      { title: "Position", desc: "We sharpen your story and voice so it stands out in a crowded feed." },
      { title: "Engage", desc: "We build regular touchpoints that keep customers talking to you, and about you." },
    ],
    forWho: [
      "D2C brands with followers but few repeat customers",
      "New brands that need a clear position before scaling ads",
      "Brands that want influencer marketing tied to real business outcomes",
    ],
    proof: {
      quote: "Dibiz has been handling everything for us, from brand positioning and content to influencer marketing, performance ads, and website management.",
      brand: "Signature",
    },
    faqs: [
      { q: "What's the difference between followers and a community?", a: "Followers see your posts; a community talks back, buys again and recommends you. We focus on the conversations and touchpoints that build the second." },
      { q: "Do you run influencer marketing campaigns?", a: "Yes. We find creators who fit your brand, brief them, manage the collaboration and reuse the best content in your ads." },
      { q: "Which platforms do you build communities on?", a: "Mainly Instagram and WhatsApp, which is where most D2C customers in India already spend their time." },
      { q: "Can brand building really affect sales?", a: "Yes. A clear position and an engaged audience make ads cheaper, raise conversion rates and bring customers back for repeat purchases." },
    ],
  },
];

export function getServicePage(slug: string) {
  return servicePages.find((s) => s.slug === slug) ?? null;
}

export function serviceHrefByTitle(title: string) {
  const s = servicePages.find((p) => p.category === title);
  return s ? `/services/${s.slug}` : "/#services";
}
