import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";

const LAST_UPDATED = "March 30, 2026";

const sections = [
  {
    title: "Information We Collect",
    content:
      "This website does not collect personal information beyond what is voluntarily provided through contact forms or the AI chat feature. Usage data such as page views may be collected anonymously through analytics.",
  },
  {
    title: "How We Use Information",
    content:
      "Any information provided is used solely to respond to inquiries or improve the website experience. We do not sell, trade, or otherwise transfer your information to third parties.",
  },
  {
    title: "Cookies",
    content:
      "This site may use cookies to enhance the user experience. You can choose to disable cookies through your browser settings without affecting your ability to use the site.",
  },
  {
    title: "Third-Party Links",
    content:
      "This website may contain links to third-party sites. We are not responsible for the privacy practices of those sites and encourage you to review their privacy policies.",
  },
  {
    title: "Google OAuth",
    content:
      "If this site integrates with Google services, any data obtained through Google APIs is used only to provide the requested functionality and is not stored beyond the session unless explicitly stated. We comply with Google's Limited Use requirements.",
  },
  {
    title: "Changes to This Policy",
    content:
      "We may update this privacy policy from time to time. Any changes will be reflected on this page with an updated date.",
  },
  {
    title: "Contact",
    content:
      "If you have any questions about this privacy policy, you can contact us at yosefhayimsabag@gmail.com.",
  },
];

const PrivacyPolicy = () => {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Helmet>
        <title>Privacy Policy — Josrade</title>
        <meta
          content="Privacy policy for Josrade (yosefhayimsabag.com), the personal portfolio of Joseph Sabag."
          name="description"
        />
      </Helmet>

      <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-16 md:px-8 md:py-24">
        <motion.h1
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 text-4xl font-bold text-[var(--text-primary)] md:text-5xl"
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          Privacy Policy
        </motion.h1>

        <motion.p
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-sm text-[var(--text-dim)]"
          initial={{ opacity: 0, y: 20 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          Last updated: {LAST_UPDATED}
        </motion.p>

        <motion.p
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-base leading-relaxed text-[var(--text-secondary)]"
          initial={{ opacity: 0, y: 20 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          This privacy policy applies to the personal portfolio website of
          Joseph Sabag ("Josrade"), accessible at yosefhayimsabag.com. Your
          privacy is important to us and we are committed to protecting it.
        </motion.p>

        <div className="space-y-10">
          {sections.map((section, index) => (
            <motion.section
              key={section.title}
              animate={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 20 }}
              transition={{ delay: 0.3 + index * 0.08, duration: 0.5 }}
            >
              <h2 className="mb-3 text-xl font-semibold text-[var(--text-primary)]">
                {section.title}
              </h2>
              <p className="text-base leading-relaxed text-[var(--text-secondary)]">
                {section.content}
              </p>
            </motion.section>
          ))}
        </div>
      </main>
    </div>
  );
};

export default PrivacyPolicy;
