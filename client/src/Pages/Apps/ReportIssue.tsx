import { useParams, Navigate } from "react-router";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { getAppConfig, getAllAppIds, appRegistry } from "@/data/apps/registry";
import { AppHeader } from "./components/AppHeader";
import { AppFooter } from "./components/AppFooter";
import { ReportIssueSuccess } from "./components/ReportIssueSuccess";
import { ReportIssueForm } from "./components/ReportIssueForm";
import { SocialIcons } from "@/Components/ui/social-icons";
import { useReportIssueForm } from "./useReportIssueForm";
import { DEVELOPER_INFO } from "@/data/apps/types";

export const ReportIssue = () => {
  const { appId } = useParams<{ appId: string }>();
  const config = appId ? getAppConfig(appId) : undefined;
  const allExtensions = config
    ? getAllAppIds().map((id) => ({ id, name: appRegistry[id].name }))
    : [];

  const form = useReportIssueForm(
    appId,
    allExtensions,
    config ?? { name: "" },
    DEVELOPER_INFO.email,
  );

  if (!config) {
    return <Navigate replace to="/404" />;
  }

  if (form.isSubmitted) {
    return (
      <div className="flex min-h-screen w-full flex-col bg-[#0a0a0b] font-['Space_Grotesk']">
        <Helmet>
          <title>Report Submitted - {config.name}</title>
          <link
            href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap"
            rel="stylesheet"
          />
        </Helmet>
        <AppHeader config={config} />
        <main className="flex flex-1 items-center justify-center px-6 py-24">
          <ReportIssueSuccess config={config} onReset={form.resetForm} />
        </main>
        <AppFooter config={config} />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-[#0a0a0b] font-['Space_Grotesk']">
      <Helmet>
        <title>Report an Issue - {config.name}</title>
        <meta
          content={`Report a bug or issue with ${config.name}`}
          name="description"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Helmet>
      <AppHeader config={config} />
      <main className="flex flex-1 flex-col items-center px-6 py-16 md:px-12 md:py-24">
        <div className="flex w-full max-w-2xl flex-col gap-6">
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center space-y-2 text-center"
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            <div
              className="flex h-14 w-14 items-center justify-center rounded-xl"
              style={{ backgroundColor: config.logoBgColor }}
            >
              {config.logoIcon}
            </div>
            <h1 className="py-2 text-4xl font-bold text-[#eeeef0] md:text-5xl">
              Report an Issue
            </h1>
            <p className="text-lg leading-relaxed text-[#9896a3]">
              Having trouble with {config.name}? Let us know and we'll help you as soon as possible.
            </p>
          </motion.div>

          <ReportIssueForm
            allExtensions={allExtensions}
            attachedFiles={form.attachedFiles}
            customIssue={form.customIssue}
            description={form.description}
            errors={form.errors}
            isSubmitting={form.isSubmitting}
            issueType={form.issueType}
            selectedExtension={form.selectedExtension}
            setCustomIssue={form.setCustomIssue}
            setDescription={form.setDescription}
            setErrors={form.setErrors}
            setIssueType={form.setIssueType}
            setSelectedExtension={form.setSelectedExtension}
            onFileSelect={form.handleFileSelect}
            onRemoveFile={form.removeFile}
            onSubmit={form.handleSubmit}
          />

          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center space-y-2"
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p className="text-sm font-semibold uppercase tracking-wider text-[#9896a3]">
              Or reach out directly
            </p>
            <SocialIcons labelSides={["bottom"]} showLabels />
          </motion.div>
        </div>
      </main>
      <AppFooter config={config} />
    </div>
  );
};

export default ReportIssue;
