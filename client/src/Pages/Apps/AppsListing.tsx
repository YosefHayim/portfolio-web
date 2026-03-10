import { Link } from "react-router";
import { ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { AnimatedPage } from "@/Components/AnimatedPage/AnimatedPage";
import { SEO } from "@/Components/SEO/SEO";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import { getAllApps } from "@/data/apps/registry";
import { staggerContainer, staggerItem } from "@/animations/variants";
import type { AppConfig } from "@/data/apps/types";
import { FaChrome } from "react-icons/fa";

function AppCard({ app }: { app: AppConfig }) {
  return (
    <motion.article
      variants={staggerItem}
      className="group relative flex flex-col rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-6 transition-all duration-300 hover:border-[#05df72]/30 hover:shadow-lg hover:shadow-[#05df72]/5"
    >
      <div
        className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl"
        style={{ backgroundColor: app.logoBgColor }}
      >
        {app.logoIcon}
      </div>

      <h3 className="mb-1 text-lg font-semibold text-[var(--text-primary)]">
        {app.name}
      </h3>

      <p className="mb-3 text-sm font-medium text-(--text-secondary)">
        {app.tagline}
      </p>

      <p className="mb-6 line-clamp-2 text-sm leading-relaxed text-[var(--text-muted)]">
        {app.description}
      </p>

      <div className="mt-auto flex items-center gap-3">
        <Link
          to={`/${app.id}`}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-[#05df72] transition-colors hover:text-[#05df72]/80"
        >
          View App
          <span
            aria-hidden
            className="transition-transform group-hover:translate-x-0.5"
          >
            {"\u2192"}
          </span>
        </Link>

        {app.chromeStoreUrl && (
          <a
            href={app.chromeStoreUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-auto inline-flex items-center gap-1 rounded-lg border border-[var(--border-subtle)] px-3 py-1.5 text-xs font-medium text-[var(--text-dim)] transition-all hover:border-[var(--text-dim)] hover:text-[var(--text-muted)]"
          >
            <FaChrome className="h-3 w-3 text-[#05df72]" />

            Chrome Store
            <ExternalLink className="h-3 w-3 text-[#05df72]" />
          </a>
        )}
      </div>
    </motion.article>
  );
}

const AppsListing = () => {
  useScrollToTop();
  const apps = getAllApps();

  return (
    <>
      <SEO
        title="Apps"
        description="Digital products and Chrome extensions built by Joseph Sabag"
        url="/apps"
      />
      <AnimatedPage className="flex w-full flex-col items-center px-4 pb-20">
        <motion.header
          animate="visible"
          className="mb-12 pt-32 text-center"
          initial="hidden"
          variants={staggerContainer}
        >
          <motion.h1
            className="mb-4 text-4xl font-medium tracking-tight text-[var(--text-primary)] md:text-5xl"
            variants={staggerItem}
          >
            Apps
          </motion.h1>

          <motion.p
            className="mx-auto max-w-lg text-lg text-(--text-secondary)"
            variants={staggerItem}
          >
            Chrome extensions and digital products I've built
          </motion.p>
        </motion.header>

        <motion.div
          animate="visible"
          className="grid w-full max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 pt-4"
          initial="hidden"
          variants={staggerContainer}
        >
          {apps.map((app) => (
            <AppCard key={app.id} app={app} />
          ))}
        </motion.div>
      </AnimatedPage>
    </>
  );
};

export default AppsListing;
