export const EXTENSIONS_LEGAL_BASE_URL =
  "https://extensions.yosefhayimsabag.com/legal";

export const portfolioProductFacts = [
  {
    id: "prompt-queue",
    pagePath: "/prompt-queue",
    staticFile: "prompt-queue/index.html",
    legalSlug: "batchbeam-prompt-queue",
    legal: {
      privacy: [
        "/prompt-queue/privacy",
        "/prompt-queue/privacy/",
        "/promptqueue-privacy",
        "/promptqueue-privacy.html",
      ],
      terms: [
        "/prompt-queue/terms",
        "/prompt-queue/terms/",
        "/promptqueue-terms",
        "/promptqueue-terms.html",
      ],
    },
  },
  {
    id: "quick-apply",
    pagePath: "/quick-apply",
  },
  {
    id: "sorqa",
    pagePath: "/sorqa",
    staticFile: "sorqa/index.html",
    legalSlug: "scenequeue-sora",
    legal: {
      privacy: [
        "/sorqa/privacy",
        "/sorqa/privacy/",
        "/sorqa-privacy",
        "/sorqa-privacy.html",
      ],
      terms: [
        "/sorqa/terms",
        "/sorqa/terms/",
        "/sorqa-terms",
        "/sorqa-terms.html",
      ],
    },
  },
  {
    id: "audio-transcriber",
    legalSlug: "sidescribe-audio-transcriber",
    legal: {
      privacy: [
        "/audio-transcriber/privacy",
        "/audio-transcriber/privacy/",
        "/audio-transcriber-privacy",
        "/audio-transcriber-privacy.html",
      ],
    },
  },
  {
    id: "jts",
    pagePath: "/jts",
    staticFile: "jts/index.html",
  },
];

const API_WORKER_FIRST_ROUTES = ["/api/*", "/health"];

export const productRoutes = portfolioProductFacts.map((product) => ({
  id: product.id,
  pagePaths: product.pagePath ? [product.pagePath, `${product.pagePath}/`] : [],
  staticFile: product.staticFile,
  legal: createLegalRouteEntries(product),
}));

const legalRedirects = new Map(
  productRoutes.flatMap((product) =>
    Object.values(product.legal).flatMap((entry) =>
      entry.paths.map((path) => [path, entry.target]),
    ),
  ),
);

const staticPages = new Map(
  productRoutes.flatMap((product) =>
    product.staticFile
      ? product.pagePaths.map((path) => [path, product.staticFile])
      : [],
  ),
);

export function getPortfolioProductFact(id) {
  return portfolioProductFacts.find((product) => product.id === id);
}

export function requirePortfolioProductFact(id) {
  const product = getPortfolioProductFact(id);
  if (!product) {
    throw new Error(`Unknown portfolio product: ${id}`);
  }

  return product;
}

export function findExtensionLegalRedirect(pathname) {
  return legalRedirects.get(pathname) ?? null;
}

export function findStaticProductPage(pathname) {
  return staticPages.get(pathname) ?? null;
}

export function getStaticProductPageRoutes() {
  return [...staticPages.keys()];
}

export function getExtensionLegalRedirectRoutes() {
  return [...legalRedirects.keys()];
}

export function getWorkerFirstRoutes() {
  return [
    ...API_WORKER_FIRST_ROUTES,
    ...getStaticProductPageRoutes(),
    ...getExtensionLegalRedirectRoutes(),
  ];
}

function createLegalRouteEntries(product) {
  if (!product.legalSlug || !product.legal) {
    return {};
  }

  return Object.fromEntries(
    Object.entries(product.legal).map(([kind, paths]) => [
      kind,
      {
        target: `${EXTENSIONS_LEGAL_BASE_URL}/${product.legalSlug}/${kind}`,
        paths,
      },
    ]),
  );
}
