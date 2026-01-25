import { Link } from "react-router";
import type { AppConfig } from "@/data/apps/types";

type AppHeaderProps = {
  config: AppConfig;
  currentPage?: "landing" | "privacy" | "terms";
};

export const AppHeader = ({ config, currentPage = "landing" }: AppHeaderProps) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#0a0a0b]/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 md:px-12">
        <Link className="flex items-center gap-3" to={`/${config.id}`}>
          <div
            className="flex h-8 w-8 items-center justify-center rounded-md"
            style={{ backgroundColor: config.logoBgColor }}
          >
            {config.logoIcon}
          </div>
          <span className="text-lg font-semibold text-[#eeeef0]">{config.name}</span>
        </Link>

        <nav className="flex items-center gap-6">
          {currentPage !== "landing" && (
            <Link
              className="text-sm text-[#9896a3] transition-colors hover:text-[#eeeef0]"
              to={`/${config.id}`}
            >
              Home
            </Link>
          )}
          <Link
            className={`text-sm transition-colors ${
              currentPage === "privacy"
                ? "text-[#eeeef0]"
                : "text-[#9896a3] hover:text-[#eeeef0]"
            }`}
            to={`/${config.id}/privacy`}
          >
            Privacy Policy
          </Link>
          <Link
            className={`text-sm transition-colors ${
              currentPage === "terms"
                ? "text-[#eeeef0]"
                : "text-[#9896a3] hover:text-[#eeeef0]"
            }`}
            to={`/${config.id}/terms`}
          >
            Terms of Service
          </Link>
          {currentPage === "landing" && config.chromeStoreUrl && (
            <a
              className="rounded-md bg-white px-4 py-2 text-sm font-medium text-[#0a0a0b] transition-colors hover:bg-[#e5e5e5]"
              href={config.chromeStoreUrl}
              rel="noopener noreferrer"
              target="_blank"
            >
              Add to Chrome
            </a>
          )}
        </nav>
      </div>
    </header>
  );
};

export default AppHeader;
