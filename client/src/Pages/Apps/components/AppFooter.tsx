import { Link } from "react-router";
import type { AppConfig } from "@/data/apps/types";
import { DEVELOPER_INFO } from "@/data/apps/types";

type AppFooterProps = {
  config: AppConfig;
};

const CURRENT_YEAR = new Date().getFullYear();

export const AppFooter = ({ config }: AppFooterProps) => {
  return (
    <footer className="w-full border-t border-white/5 bg-[#0a0a0b]">
      <div className="mx-auto max-w-7xl px-6 py-12 md:px-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div
                className="flex h-8 w-8 items-center justify-center rounded-md"
                style={{ backgroundColor: config.logoBgColor }}
              >
                {config.logoIcon}
              </div>
              <span className="font-semibold text-[#eeeef0]">{config.name}</span>
            </div>
            <p className="text-sm text-[#6b6878]">{config.tagline}</p>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[#9896a3]">
              Legal
            </h3>
            <nav className="flex flex-col gap-2">
              <Link
                className="text-sm text-[#6b6878] transition-colors hover:text-[#eeeef0]"
                to={`/${config.id}/privacy`}
              >
                Privacy Policy
              </Link>
              <Link
                className="text-sm text-[#6b6878] transition-colors hover:text-[#eeeef0]"
                to={`/${config.id}/terms`}
              >
                Terms of Service
              </Link>
            </nav>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[#9896a3]">
              Support
            </h3>
            <nav className="flex flex-col gap-2">
              <a
                className="text-sm text-[#6b6878] transition-colors hover:text-[#eeeef0]"
                href={`mailto:${DEVELOPER_INFO.email}`}
              >
                {DEVELOPER_INFO.email}
              </a>
              <a
                className="text-sm text-[#6b6878] transition-colors hover:text-[#eeeef0]"
                href={DEVELOPER_INFO.website}
                rel="noopener noreferrer"
                target="_blank"
              >
                {DEVELOPER_INFO.website.replace("https://", "")}
              </a>
            </nav>
          </div>
        </div>
      </div>

      <div className="border-t border-white/5 px-6 py-4 md:px-12">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 text-xs text-[#4a4857] md:flex-row">
          <p>
            {CURRENT_YEAR} {config.name}. All rights reserved.
          </p>
          <p>Developed by {DEVELOPER_INFO.name}</p>
        </div>
      </div>
    </footer>
  );
};

export default AppFooter;
