import { useParams, Navigate } from "react-router";
import { useParams, Navigate } from "react-router";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { getAppConfig } from "@/data/apps/registry";
import { DEVELOPER_INFO } from "@/data/apps/types";
import { AppHeader } from "./components/AppHeader";
import { AppFooter } from "./components/AppFooter";

export const TermsOfService = () => {
  const { appId } = useParams<{ appId: string }>();
  const config = appId ? getAppConfig(appId) : undefined;

  if (!config) {
    return <Navigate replace to="/404" />;
  }

  const { termsOfService } = config;

  return (
    <div className="flex min-h-screen w-full flex-col bg-[#0a0a0b]">
      <Helmet>
        <title>{config.name} - Terms of Service</title>
      </Helmet>
      <AppHeader config={config} />

      <main className="flex-1 px-6 py-16 md:px-12 md:py-24">
        <article className="mx-auto max-w-3xl">
          <motion.h1
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 font-['Space_Grotesk'] text-4xl font-bold text-[#eeeef0] md:text-5xl"
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            Terms of Service
          </motion.h1>

          <motion.p
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 text-sm text-[#6b6878]"
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Last updated: {termsOfService.lastUpdated}
          </motion.p>

          <motion.p
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 text-base leading-relaxed text-[#9896a3]"
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {termsOfService.intro}
          </motion.p>

          <div className="space-y-10">
            {termsOfService.sections.map((section, index) => (
              <motion.section
                key={section.title}
                animate={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              >
                <h2 className="mb-4 font-['Space_Grotesk'] text-2xl font-semibold text-[#eeeef0]">
                  {section.title}
                </h2>
                <p className="text-base leading-relaxed text-[#9896a3]">
                  {section.content}
                </p>
              </motion.section>
            ))}
          </div>

          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="mt-12 rounded-xl border border-white/10 bg-[#111112] p-6"
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.9 }}
          >
            <p className="mb-2 font-medium text-[#eeeef0]">
              Developer: {DEVELOPER_INFO.name}
            </p>
            <p className="text-sm text-[#9896a3]">
              Email:{" "}
              <a
                className="text-[#9896a3] underline transition-colors hover:text-[#eeeef0]"
                href={`mailto:${DEVELOPER_INFO.email}`}
              >
                {DEVELOPER_INFO.email}
              </a>
            </p>
            <p className="text-sm text-[#9896a3]">
              Website:{" "}
              <a
                className="text-[#9896a3] underline transition-colors hover:text-[#eeeef0]"
                href={DEVELOPER_INFO.website}
                rel="noopener noreferrer"
                target="_blank"
              >
                {DEVELOPER_INFO.website.replace("https://", "")}
              </a>
            </p>
          </motion.div>
        </article>
      </main>

      <AppFooter config={config} />
    </div>
  );
};

export default TermsOfService;
