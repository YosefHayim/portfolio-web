import { useParams, Navigate } from "react-router";
import { motion } from "framer-motion";
import { getAppConfig } from "@/data/apps/registry";
import { AppHeader } from "./components/AppHeader";
import { AppFooter } from "./components/AppFooter";

export const AppLanding = () => {
  const { appId } = useParams<{ appId: string }>();
  const config = appId ? getAppConfig(appId) : undefined;

  if (!config) {
    return <Navigate replace to="/404" />;
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-[#0a0a0b]">
      <AppHeader config={config} />

      <main className="flex-1">
        <section className="relative overflow-hidden px-6 py-24 md:px-12 md:py-32">
          <div className="mx-auto max-w-4xl text-center">
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#111112] px-4 py-2"
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-sm font-medium text-[#e5e5e5]">
                Chrome Extension for Gemini
              </span>
            </motion.div>

            {/* H1 must exactly match app name in Google Cloud Console for OAuth verification */}
            <motion.h1
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 font-['Space_Grotesk'] text-5xl font-bold text-[#eeeef0] md:text-7xl"
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {config.name}
            </motion.h1>

            <motion.p
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 text-xl font-medium text-[#e5e5e5] md:text-2xl"
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {config.tagline}
            </motion.p>

            <motion.p
              animate={{ opacity: 1, y: 0 }}
              className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-[#9896a3]"
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {config.description}
            </motion.p>

            {config.chromeStoreUrl && (
              <motion.a
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 rounded-lg bg-white px-8 py-4 text-base font-semibold text-[#0a0a0b] transition-colors hover:bg-[#e5e5e5]"
                href={config.chromeStoreUrl}
                initial={{ opacity: 0, y: 20 }}
                rel="noopener noreferrer"
                target="_blank"
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                Add to Chrome - Free
              </motion.a>
            )}
          </div>
        </section>

        <section className="px-6 py-24 md:px-12">
          <div className="mx-auto max-w-7xl">
            <motion.h2
              animate={{ opacity: 1, y: 0 }}
              className="mb-16 text-center font-['Space_Grotesk'] text-3xl font-semibold text-[#eeeef0] md:text-4xl"
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              Automate your Gemini creative workflow
            </motion.h2>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {config.features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  className="rounded-xl border border-white/10 bg-[#111112] p-6 transition-colors hover:border-white/20"
                  initial={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileInView={{ opacity: 1, y: 0 }}
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg border border-white/10 bg-[#18181a] text-white">
                    {feature.icon}
                  </div>
                  <h3 className="mb-2 font-['Space_Grotesk'] text-xl font-semibold text-[#eeeef0]">
                    {feature.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-[#9896a3]">
                    {feature.description}
                  </p>
                </motion.div>
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
