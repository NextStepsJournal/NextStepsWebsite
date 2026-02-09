const SITE_NAME = "NextSteps Journal";
const SITE_URL = "https://nextstepsjournal.org";
const EMBED_IMAGE_PATH = "/images/get-involved/NEXTSTEPSEMBED.png";
const EMBED_IMAGE_VERSION = "20260209";
const DEFAULT_IMAGE_PATH = `${EMBED_IMAGE_PATH}?v=${EMBED_IMAGE_VERSION}`;
const EMBED_IMAGE_WIDTH = 476;
const EMBED_IMAGE_HEIGHT = 157;
const TWITTER_HANDLE = "@nextstepsjournal";

type SchemaType = "WebPage" | "AboutPage" | "ContactPage" | "CollectionPage";

interface RouteSeo {
  title: string;
  description: string;
  keywords: string[];
  path: string;
  imagePath?: string;
  robots?: string;
  schemaType?: SchemaType;
}

const DEFAULT_ROBOTS =
  "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1";

const defaultSeo: RouteSeo = {
  title: "NextSteps Journal | Career Exploration & Mentorship for Students",
  description:
    "NextSteps Journal helps high school students discover career paths through professional interviews, mentorship, and research-based resources.",
  keywords: [
    "career exploration for students",
    "student mentorship",
    "career guidance for high school students",
    "professional interviews",
    "college and career readiness",
    "nextsteps journal",
  ],
  path: "/",
  imagePath: DEFAULT_IMAGE_PATH,
  robots: DEFAULT_ROBOTS,
  schemaType: "WebPage",
};

const routeSeo: Record<string, RouteSeo> = {
  "/": defaultSeo,
  "/team": {
    title: "Team | NextSteps Journal",
    description:
      "Meet the NextSteps Journal team of student leaders and staff building equitable access to career exploration resources.",
    keywords: [
      "nextsteps team",
      "student leadership team",
      "education nonprofit team",
      "career mentorship organization",
    ],
    path: "/team",
    imagePath: DEFAULT_IMAGE_PATH,
    robots: DEFAULT_ROBOTS,
    schemaType: "AboutPage",
  },
  "/journal": {
    title: "Journal | NextSteps Journal",
    description:
      "Explore the NextSteps Journal for career research, professional interviews, student stories, and practical career guides.",
    keywords: [
      "career journal",
      "student career research",
      "professional interview insights",
      "career planning guides",
    ],
    path: "/journal",
    imagePath: DEFAULT_IMAGE_PATH,
    robots: DEFAULT_ROBOTS,
    schemaType: "CollectionPage",
  },
  "/partners": {
    title: "Partners | NextSteps Journal",
    description:
      "Partner with NextSteps Journal to expand career access for students through mentorship, resources, and collaborative programs.",
    keywords: [
      "education partnerships",
      "nonprofit partnerships",
      "student mentorship partners",
      "career development collaborations",
    ],
    path: "/partners",
    imagePath: DEFAULT_IMAGE_PATH,
    robots: DEFAULT_ROBOTS,
    schemaType: "WebPage",
  },
  "/get-involved": {
    title: "Get Involved | NextSteps Journal",
    description:
      "Join NextSteps Journal as a volunteer, interview participant, partner, or donor to help students access career guidance.",
    keywords: [
      "volunteer for students",
      "career mentorship volunteer",
      "education nonprofit donate",
      "get involved nextsteps",
    ],
    path: "/get-involved",
    imagePath: DEFAULT_IMAGE_PATH,
    robots: DEFAULT_ROBOTS,
    schemaType: "WebPage",
  },
  "/contact": {
    title: "Contact | NextSteps Journal",
    description:
      "Contact NextSteps Journal for chapter support, partnerships, media requests, and questions about career exploration programs.",
    keywords: [
      "contact nextsteps journal",
      "student chapter support",
      "education partnership inquiry",
      "career mentorship contact",
    ],
    path: "/contact",
    imagePath: DEFAULT_IMAGE_PATH,
    robots: DEFAULT_ROBOTS,
    schemaType: "ContactPage",
  },
};

const notFoundSeo: RouteSeo = {
  title: "Page Not Found | NextSteps Journal",
  description: "The page you are looking for could not be found.",
  keywords: ["nextsteps journal"],
  path: "/404",
  imagePath: DEFAULT_IMAGE_PATH,
  robots: "noindex, nofollow",
  schemaType: "WebPage",
};

const toAbsoluteUrl = (path: string) => new URL(path, SITE_URL).toString();

const normalizePath = (pathname: string) => pathname.replace(/\/+$/, "") || "/";

const upsertMetaTag = (attribute: "name" | "property", key: string, content: string) => {
  const selector = `meta[${attribute}="${key}"]`;
  let tag = document.head.querySelector(selector) as HTMLMetaElement | null;
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attribute, key);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
};

const upsertCanonicalLink = (href: string) => {
  let link = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!link) {
    link = document.createElement("link");
    link.rel = "canonical";
    document.head.appendChild(link);
  }
  link.href = href;
};

const upsertHrefLangLink = (href: string) => {
  let link = document.head.querySelector(
    'link[rel="alternate"][hreflang="en-US"]',
  ) as HTMLLinkElement | null;
  if (!link) {
    link = document.createElement("link");
    link.rel = "alternate";
    link.hreflang = "en-US";
    document.head.appendChild(link);
  }
  link.href = href;
};

const upsertJsonLd = (id: string, payload: Record<string, unknown>) => {
  let script = document.getElementById(id) as HTMLScriptElement | null;
  if (!script) {
    script = document.createElement("script");
    script.id = id;
    script.type = "application/ld+json";
    document.head.appendChild(script);
  }
  script.text = JSON.stringify(payload);
};

const buildWebPageSchema = (seo: RouteSeo, canonicalUrl: string, imageUrl: string) => ({
  "@context": "https://schema.org",
  "@type": seo.schemaType ?? "WebPage",
  name: seo.title,
  description: seo.description,
  url: canonicalUrl,
  inLanguage: "en-US",
  isPartOf: {
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
  },
  primaryImageOfPage: {
    "@type": "ImageObject",
    url: imageUrl,
    width: EMBED_IMAGE_WIDTH,
    height: EMBED_IMAGE_HEIGHT,
  },
});

export const applyRouteSeo = (pathname: string) => {
  const normalizedPath = normalizePath(pathname);
  const seo = routeSeo[normalizedPath] ?? notFoundSeo;
  const canonicalUrl = toAbsoluteUrl(seo.path);
  const imageUrl = toAbsoluteUrl(seo.imagePath ?? DEFAULT_IMAGE_PATH);
  const robots = seo.robots ?? DEFAULT_ROBOTS;
  const keywords = seo.keywords.join(", ");

  document.title = seo.title;

  upsertCanonicalLink(canonicalUrl);
  upsertHrefLangLink(canonicalUrl);

  upsertMetaTag("name", "title", seo.title);
  upsertMetaTag("name", "description", seo.description);
  upsertMetaTag("name", "keywords", keywords);
  upsertMetaTag("name", "robots", robots);
  upsertMetaTag("name", "googlebot", robots);
  upsertMetaTag("name", "twitter:card", "summary_large_image");
  upsertMetaTag("name", "twitter:site", TWITTER_HANDLE);
  upsertMetaTag("name", "twitter:title", seo.title);
  upsertMetaTag("name", "twitter:description", seo.description);
  upsertMetaTag("name", "twitter:image", imageUrl);

  upsertMetaTag("property", "og:type", "website");
  upsertMetaTag("property", "og:site_name", SITE_NAME);
  upsertMetaTag("property", "og:locale", "en_US");
  upsertMetaTag("property", "og:title", seo.title);
  upsertMetaTag("property", "og:description", seo.description);
  upsertMetaTag("property", "og:url", canonicalUrl);
  upsertMetaTag("property", "og:image", imageUrl);
  upsertMetaTag(
    "property",
    "og:image:alt",
    "NextSteps Journal white logo",
  );
  upsertMetaTag("property", "og:image:width", EMBED_IMAGE_WIDTH.toString());
  upsertMetaTag("property", "og:image:height", EMBED_IMAGE_HEIGHT.toString());

  upsertJsonLd("route-webpage-schema", buildWebPageSchema(seo, canonicalUrl, imageUrl));
};
