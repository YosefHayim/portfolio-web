export type PortfolioProductId =
  | "prompt-queue"
  | "quick-apply"
  | "sorqa"
  | "audio-transcriber"
  | "jts";

export type LegalRouteKind = "privacy" | "terms";

export type PortfolioProductFact = {
  id: PortfolioProductId;
  pagePath?: string;
  staticFile?: string;
  legalSlug?: string;
  legal?: Partial<Record<LegalRouteKind, string[]>>;
};

export type ProductRouteEntry = {
  id: PortfolioProductId;
  pagePaths: string[];
  staticFile?: string;
  legal: Partial<
    Record<
      LegalRouteKind,
      {
        target: string;
        paths: string[];
      }
    >
  >;
};

export declare const EXTENSIONS_LEGAL_BASE_URL: string;
export declare const portfolioProductFacts: PortfolioProductFact[];
export declare const productRoutes: ProductRouteEntry[];
export declare function getPortfolioProductFact(
  id: string,
): PortfolioProductFact | undefined;
export declare function requirePortfolioProductFact(
  id: string,
): PortfolioProductFact;
export declare function findExtensionLegalRedirect(
  pathname: string,
): string | null;
export declare function findStaticProductPage(pathname: string): string | null;
export declare function getStaticProductPageRoutes(): string[];
export declare function getExtensionLegalRedirectRoutes(): string[];
export declare function getWorkerFirstRoutes(): string[];
