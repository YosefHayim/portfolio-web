import { Link, Navigate, useParams } from "react-router";

import { AppFooter } from "./components/AppFooter";
import { AppHeader } from "./components/AppHeader";
import { ExternalLink } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { getAppConfig } from "@/data/apps/registry";
import { motion } from "framer-motion";

const HERO_STAGGER = 0.08;
const FEATURE_STAGGER = 0.06;

export const AppLanding = () => {
  const { appId } = useParams<{ appId: string }>();
  const config = appId ? getAppConfig(appId) : undefined;

  if (!config) {
    return <Navigate replace to="/404" />;
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-[#0a0a0b] font-['Space_Grotesk']">
      <Helmet>
        <title>{config.name}</title>
        <meta name="description" content={config.description} />
        <meta property="og:title" content={config.name} />
        <meta property="og:description" content={config.description} />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Helmet>
      <AppHeader config={config} />

      <main className="flex-1">
        {/* Hero: subtle radial gradient for depth */}
        <section className="relative flex flex-col items-center overflow-hidden px-6 pt-20 pb-24 md:pt-28 md:pb-32 lg:pt-36 lg:pb-40">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(255,255,255,0.06),transparent)]"
          />
          <div className="relative flex w-full max-w-4xl shrink-0 flex-col items-center gap-2 text-center">
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              className="mb-2 inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#111112] px-4 py-2 text-sm font-medium text-[#e5e5e5] shadow-sm"
              initial={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.4, delay: 0 }}
            >
              Chrome Extension for Gemini
            </motion.div>

            {/* H1 must exactly match app name in Google Cloud Console for OAuth verification */}
            <motion.h1
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 max-w-3xl text-4xl font-bold tracking-tight text-[#eeeef0] sm:text-5xl md:text-6xl lg:text-7xl"
              initial={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.45, delay: HERO_STAGGER }}
            >
              {config.name}
            </motion.h1>

            <motion.p
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 text-lg font-medium text-[#c4c3cc] sm:text-xl md:text-2xl"
              initial={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.45, delay: HERO_STAGGER * 2 }}
            >
              {config.tagline}
            </motion.p>

            <motion.p
              animate={{ opacity: 1, y: 0 }}
              className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-[#9896a3] sm:text-lg"
              initial={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.45, delay: HERO_STAGGER * 3 }}
            >
              {config.description}
            </motion.p>

            <motion.div
              animate={{ opacity: 1, y: 0 }}
              className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:gap-4"
              initial={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.45, delay: HERO_STAGGER * 4 }}
            >
              {config.chromeStoreUrl && (
                <a
                  className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 text-base font-semibold text-[#0a0a0b] shadow-md transition-all hover:bg-[#e8e8e8] hover:shadow-lg hover:shadow-white/5 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#0a0a0b] focus:outline-none"
                  href={config.chromeStoreUrl}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Add to Chrome — Free
                  <ExternalLink className="h-4 w-4 opacity-70" />
                </a>
              )}
            </motion.div>

            <motion.nav
              animate={{ opacity: 1 }}
              aria-label="Legal and support"
              className="mt-16 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-sm text-[#6b6878]"
              initial={{ opacity: 0 }}
              transition={{ duration: 0.4, delay: HERO_STAGGER * 5 }}
            >
              <Link
                className="transition-colors hover:text-[#eeeef0] hover:underline"
                to={`/${config.id}/privacy`}
              >
                Privacy Policy
              </Link>
              <span className="text-white/20" aria-hidden>
                ·
              </span>
              <Link
                className="transition-colors hover:text-[#eeeef0] hover:underline"
                to={`/${config.id}/terms`}
              >
                Terms of Service
              </Link>
              <span className="text-white/20" aria-hidden>
                ·
              </span>
              <Link
                className="transition-colors hover:text-[#eeeef0] hover:underline"
                to={`/${config.id}/report`}
              >
                Report an Issue
              </Link>
            </motion.nav>
          </div>
        </section>

        {/* Features */}
        <section className="relative border-t border-white/5 bg-[#080809] px-6 pt-20 pb-24 md:pt-28 md:pb-32">
          <div className="mx-auto max-w-6xl">
            <motion.header
              animate={{ opacity: 1, y: 0 }}
              className="mb-16 text-center md:mb-20"
              initial={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <h2 className="text-2xl font-semibold tracking-tight text-[#eeeef0] sm:text-3xl md:text-4xl">
                Automate your Gemini creative workflow
              </h2>
              <p className="mt-5 max-w-full text-sm text-[#9896a3] sm:text-base">
                Everything you need to scale prompts and images without the
                manual work.
              </p>
            </motion.header>

            <div className="grid grid-cols-1 gap-8 pt-4 sm:grid-cols-2 lg:grid-cols-3">
              {config.features.map((feature, index) => (
                <motion.article
                  key={feature.title}
                  className="group relative flex flex-col rounded-2xl border border-white/10 bg-[#0f0f10] p-6 shadow-sm transition-all duration-300 hover:border-white/15 hover:bg-[#111112] hover:shadow-md sm:p-8"
                  initial={{ opacity: 0, y: 16 }}
                  transition={{
                    duration: 0.35,
                    delay: index * FEATURE_STAGGER,
                  }}
                  viewport={{ once: true, margin: "-24px" }}
                  whileInView={{ opacity: 1, y: 0 }}
                >
                  <div className="mb-5 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-[#18181a] text-[#e5e5e5] transition-colors group-hover:border-white/15 group-hover:bg-[#1c1c1e]">
                    {feature.icon}
                  </div>
                  <h3 className="mb-3 text-lg font-semibold text-[#eeeef0]">
                    {feature.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-[#9896a3]">
                    {feature.description}
                  </p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <AppFooter config={config} />
    </div>
  );
};

export default AppLanding;
