export type SeoFields = {
  title: string;
  description: string;
  ogImage?: CmsImage;
  noIndex?: boolean;
};

export type CmsImage = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
};

export type SocialLinks = {
  googleBusiness?: string;
  facebook?: string;
  instagram?: string;
  booking?: string;
};

export type BusinessHoursEntry = {
  days: string;
  hours: string;
};

export type SiteSettings = {
  businessName: string;
  tagline: string;
  logo?: CmsImage;
  phone: string;
  textNumber: string;
  email: string;
  address: string;
  hours: BusinessHoursEntry[];
  hoursSummary: string;
  serviceAreaLine: string;
  social: SocialLinks;
  announcement?: {
    enabled: boolean;
    text: string;
    href?: string;
  };
  footerNote: string;
  analytics?: {
    googleAnalyticsId?: string;
    plausibleDomain?: string;
  };
  cookieBannerEnabled: boolean;
  googleReviewUrl: string;
  googleReviewButtonLabel: string;
  seo: SeoFields;
};

export type Highlight = {
  title: string;
  description: string;
};

export type HowItWorksStep = {
  title: string;
  description: string;
};

export type HomePageContent = {
  seo: SeoFields;
  heroEyebrow: string;
  heroHeadline: string;
  heroSubheadline: string;
  heroPrimaryCta: string;
  heroSecondaryCta: string;
  heroImage: CmsImage;
  highlights: Highlight[];
  introHeading: string;
  introBody: string;
  featuredServiceSlugs: string[];
  howItWorksHeading: string;
  howItWorksIntro: string;
  howItWorksSteps: HowItWorksStep[];
  beforeAfterHeading: string;
  beforeAfterIntro: string;
  featuredBeforeAfterId: string;
  reviewsHeading: string;
  serviceAreaHeading: string;
  serviceAreaBody: string;
  faqHeading: string;
  closingHeading: string;
  closingBody: string;
};

export type Service = {
  slug: string;
  name: string;
  shortDescription: string;
  overview: string;
  included: string[];
  notIncluded?: string[];
  idealFor?: string[];
  image: CmsImage;
  gallery?: CmsImage[];
  relatedFaqIds?: string[];
  featured?: boolean;
  order: number;
  published: boolean;
  pricingNote: string;
  updatedAt?: string;
  seo: SeoFields;
};

export type GalleryCategory =
  "kitchens" | "bathrooms" | "homes" | "commercial" | "move-out" | "before-after" | "other";

export type GalleryItem = {
  id: string;
  image: CmsImage;
  caption?: string;
  category: GalleryCategory;
  order: number;
};

export type BeforeAfterPair = {
  id: string;
  title: string;
  caption?: string;
  category?: GalleryCategory;
  before: CmsImage;
  after: CmsImage;
  order: number;
  isSample?: boolean;
};

export type Review = {
  id: string;
  displayName: string;
  rating: number;
  text: string;
  serviceType?: string;
  date?: string;
  isSample: boolean;
  showOnHomepage: boolean;
  order: number;
};

export type Faq = {
  id: string;
  question: string;
  answer: string;
  category: string;
  order: number;
};

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  bio: string;
  photo?: CmsImage;
  order: number;
};

export type BlogCategory = {
  slug: string;
  title: string;
};

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  body: string[];
  author: string;
  category: string;
  publishedAt: string;
  featuredImage: CmsImage;
  relatedSlugs?: string[];
  isPlaceholder: boolean;
  published: boolean;
  updatedAt?: string;
  seo: SeoFields;
};

export type ServiceAreaItem = {
  name: string;
  note?: string;
};

export type ServiceAreasPage = {
  seo: SeoFields;
  heading: string;
  intro: string;
  areas: ServiceAreaItem[];
  outsideAreaNote: string;
  mapEmbedHtml?: string;
};

export type AboutPage = {
  seo: SeoFields;
  heading: string;
  storyHeading: string;
  story: string[];
  whyHeading: string;
  whyItems: Highlight[];
  valuesHeading: string;
  values: Highlight[];
  communityHeading: string;
  community: string;
};

export type LegalPage = {
  slug: "privacy" | "terms";
  title: string;
  lastUpdated: string;
  isTemplate: boolean;
  body: string[];
  seo: SeoFields;
};

export type SiteContent = {
  settings: SiteSettings;
  home: HomePageContent;
  about: AboutPage;
  services: Service[];
  gallery: GalleryItem[];
  beforeAfter: BeforeAfterPair[];
  reviews: Review[];
  faqs: Faq[];
  team: TeamMember[];
  posts: BlogPost[];
  blogCategories: BlogCategory[];
  serviceAreas: ServiceAreasPage;
  legal: LegalPage[];
};
