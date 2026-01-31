import { useState, useRef, type ChangeEvent, type FormEvent } from "react";
import { useParams, Navigate, Link } from "react-router";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  Upload,
  X,
  CheckCircle2,
  MessageCircle,
  Mail,
  Linkedin,
  AlertCircle,
  ChevronDown,
  FileImage,
  FileVideo,
} from "lucide-react";
import { getAppConfig, getAllAppIds } from "@/data/apps/registry";
import { appRegistry } from "@/data/apps/registry";
import { AppHeader } from "./components/AppHeader";
import { AppFooter } from "./components/AppFooter";
import { DEVELOPER_INFO } from "@/data/apps/types";
import { cn } from "@/lib/utils";

const POPULAR_ISSUES = [
  "Extension not loading",
  "Login/Authentication issue",
  "Feature not working as expected",
  "Slow performance",
  "UI/Display bug",
  "Data not saving",
  "Crash or freeze",
  "Missing feature request",
  "Billing/Subscription issue",
  "Other (Custom)",
] as const;

const ACCEPTED_FILE_TYPES = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/gif",
  "video/mp4",
];
const MAX_FILE_SIZE = 25 * 1024 * 1024; // 25MB
const MAX_DESCRIPTION_LENGTH = 1000;

type AttachedFile = {
  file: File;
  preview: string;
  type: "image" | "video";
};

export const ReportIssue = () => {
  const { appId } = useParams<{ appId: string }>();
  const config = appId ? getAppConfig(appId) : undefined;
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [selectedExtension, setSelectedExtension] = useState(appId || "");
  const [issueType, setIssueType] = useState("");
  const [customIssue, setCustomIssue] = useState("");
  const [description, setDescription] = useState("");
  const [attachedFiles, setAttachedFiles] = useState<AttachedFile[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!config) {
    return <Navigate replace to="/404" />;
  }

  const allExtensions = getAllAppIds().map((id) => ({
    id,
    name: appRegistry[id].name,
  }));

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!selectedExtension) {
      newErrors.extension = "Please select an extension";
    }
    if (!issueType) {
      newErrors.issueType = "Please select an issue type";
    }
    if (issueType === "Other (Custom)" && !customIssue.trim()) {
      newErrors.customIssue = "Please describe your issue";
    }
    if (!description.trim()) {
      newErrors.description = "Please provide a description";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newFiles: AttachedFile[] = [];

    Array.from(files).forEach((file) => {
      if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
        setErrors((prev) => ({
          ...prev,
          files: "Only PNG, JPEG, JPG, GIF, and MP4 files are allowed",
        }));
        return;
      }

      if (file.size > MAX_FILE_SIZE) {
        setErrors((prev) => ({
          ...prev,
          files: "File size must be less than 25MB",
        }));
        return;
      }

      const isVideo = file.type.startsWith("video/");
      const preview = URL.createObjectURL(file);

      newFiles.push({
        file,
        preview,
        type: isVideo ? "video" : "image",
      });
    });

    setAttachedFiles((prev) => [...prev, ...newFiles]);
    setErrors((prev) => {
      const { files: _, ...rest } = prev;
      return rest;
    });

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removeFile = (index: number) => {
    setAttachedFiles((prev) => {
      const newFiles = [...prev];
      URL.revokeObjectURL(newFiles[index].preview);
      newFiles.splice(index, 1);
      return newFiles;
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    const extensionName =
      allExtensions.find((ext) => ext.id === selectedExtension)?.name ||
      selectedExtension;
    const issueSubject =
      issueType === "Other (Custom)" ? customIssue : issueType;

    const subject = encodeURIComponent(
      `[${extensionName}] Issue Report: ${issueSubject}`,
    );
    const body = encodeURIComponent(
      `Extension: ${extensionName}\n` +
        `Issue Type: ${issueSubject}\n\n` +
        `Description:\n${description}\n\n` +
        `${attachedFiles.length > 0 ? `Attachments: ${attachedFiles.length} file(s) - Please note: Files cannot be attached via email link. Please reply to this email with your screenshots/recordings attached.\n\n` : ""}` +
        `---\nSent from ${config.name} Issue Reporter`,
    );

    const mailtoLink = `mailto:${DEVELOPER_INFO.email}?subject=${subject}&body=${body}`;

    await new Promise((resolve) => setTimeout(resolve, 500));

    window.location.href = mailtoLink;

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1000);
  };

  const resetForm = () => {
    setSelectedExtension(appId || "");
    setIssueType("");
    setCustomIssue("");
    setDescription("");
    attachedFiles.forEach((f) => URL.revokeObjectURL(f.preview));
    setAttachedFiles([]);
    setIsSubmitted(false);
    setErrors({});
  };

  if (isSubmitted) {
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
          <motion.div
            animate={{ opacity: 1, scale: 1 }}
            className="mx-auto max-w-lg text-center"
            initial={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              animate={{ scale: 1 }}
              className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full border border-white/10 bg-[#111112] shadow-[0_0_0_1px_rgba(34,197,94,0.2)]"
              initial={{ scale: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            >
              <CheckCircle2 className="h-10 w-10 text-green-500" />
            </motion.div>

            <h1 className="mb-4 text-3xl font-bold text-[#eeeef0]">
              Report Submitted!
            </h1>

            <p className="my-4 text-lg leading-relaxed text-[#9896a3]">
              Thank you for your feedback. Your email client should have opened
              with the report details. We'll review your issue and get back to
              you as soon as possible.
            </p>

            <div className="my-4 rounded-xl border border-white/10 bg-[#111112] p-6 shadow-sm">
              <h2 className="mb-4 text-sm font-semibold tracking-wider text-[#9896a3] uppercase">
                Alternative Contact Methods
              </h2>
              <div className="flex flex-col gap-3">
                <a
                  className="flex items-center justify-center gap-2 rounded-lg border border-white/10 bg-[#18181a] px-4 py-3 text-sm font-medium text-[#eeeef0] transition-colors hover:border-green-500/50 hover:bg-green-500/10"
                  href="https://wa.me/972546187549"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <MessageCircle className="h-5 w-5 text-green-500" />
                  Contact via WhatsApp
                </a>
                <a
                  className="flex items-center justify-center gap-2 rounded-lg border border-white/10 bg-[#18181a] px-4 py-3 text-sm font-medium text-[#eeeef0] transition-colors hover:border-blue-500/50 hover:bg-blue-500/10"
                  href={`mailto:${DEVELOPER_INFO.email}`}
                >
                  <Mail className="h-5 w-5 text-blue-500" />
                  Email Directly
                </a>
                <a
                  className="flex items-center justify-center gap-2 rounded-lg border border-white/10 bg-[#18181a] px-4 py-3 text-sm font-medium text-[#eeeef0] transition-colors hover:border-[#0077b5]/50 hover:bg-[#0077b5]/10"
                  href="https://www.linkedin.com/in/yosefhayim/"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <Linkedin className="h-5 w-5 text-[#0077b5]" />
                  Connect on LinkedIn
                </a>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <button
                className="rounded-lg border border-white/10 bg-[#111112] px-6 py-3 text-sm font-medium text-[#eeeef0] transition-colors hover:border-white/20"
                onClick={resetForm}
                type="button"
              >
                Submit Another Report
              </button>
              <Link
                className="rounded-lg bg-white px-6 py-3 text-sm font-semibold text-[#0a0a0b] transition-colors hover:bg-[#e5e5e5]"
                to={`/${config.id}`}
              >
                Back to {config.name}
              </Link>
            </div>
          </motion.div>
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
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#111112] px-4 py-2 shadow-sm">
              <AlertCircle className="h-4 w-4 text-amber-400" />
              <span className="text-sm font-medium text-[#e5e5e5]">
                Issue Reporter
              </span>
            </div>
            <h1 className="mb-4 text-4xl font-bold text-[#eeeef0] md:text-5xl">
              Report an Issue
            </h1>
            <p className="text-lg leading-relaxed text-[#9896a3]">
              Having trouble? Let us know and we'll help you as soon as
              possible.
            </p>
          </motion.div>

          <motion.form
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border border-white/10 bg-[#111112] p-6 shadow-sm transition-colors hover:border-white/15 md:p-8"
            initial={{ opacity: 0, y: 20 }}
            onSubmit={handleSubmit}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="my-5">
              <label
                className="mb-2 block text-sm font-medium text-[#e5e5e5]"
                htmlFor="extension"
              >
                Extension <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  className={cn(
                    "w-full appearance-none rounded-lg border border-white/10 bg-[#18181a] px-4 py-3 pr-10 text-[#eeeef0] transition-colors outline-none focus:border-white/30 focus:ring-2 focus:ring-white/10",
                    errors.extension &&
                      "border-red-500/50 focus:border-red-500/50 focus:ring-red-500/20",
                  )}
                  id="extension"
                  onChange={(e) => {
                    setSelectedExtension(e.target.value);
                    setErrors((prev) => ({ ...prev, extension: "" }));
                  }}
                  value={selectedExtension}
                >
                  <option value="">Select extension...</option>
                  {allExtensions.map((ext) => (
                    <option key={ext.id} value={ext.id}>
                      {ext.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-5 w-5 -translate-y-1/2 text-[#6b6878]" />
              </div>
              {errors.extension && (
                <p className="mt-1 text-sm text-red-500">{errors.extension}</p>
              )}
            </div>

            <div className="my-5">
              <label
                className="mb-2 block text-sm font-medium text-[#e5e5e5]"
                htmlFor="issueType"
              >
                Issue Type <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  className={cn(
                    "w-full appearance-none rounded-lg border border-white/10 bg-[#18181a] px-4 py-3 pr-10 text-[#eeeef0] transition-colors outline-none focus:border-white/30 focus:ring-2 focus:ring-white/10",
                    errors.issueType &&
                      "border-red-500/50 focus:border-red-500/50 focus:ring-red-500/20",
                  )}
                  id="issueType"
                  onChange={(e) => {
                    setIssueType(e.target.value);
                    setErrors((prev) => ({ ...prev, issueType: "" }));
                  }}
                  value={issueType}
                >
                  <option value="">Select issue type...</option>
                  {POPULAR_ISSUES.map((issue) => (
                    <option key={issue} value={issue}>
                      {issue}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-5 w-5 -translate-y-1/2 text-[#6b6878]" />
              </div>
              {errors.issueType && (
                <p className="mt-1 text-sm text-red-500">{errors.issueType}</p>
              )}
            </div>

            <AnimatePresence>
              {issueType === "Other (Custom)" && (
                <motion.div
                  animate={{ opacity: 1, height: "auto" }}
                  className="my-5 overflow-hidden"
                  exit={{ opacity: 0, height: 0 }}
                  initial={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <label
                    className="mb-2 block text-sm font-medium text-[#e5e5e5]"
                    htmlFor="customIssue"
                  >
                    Describe your issue <span className="text-red-500">*</span>
                  </label>
                  <input
                    className={cn(
                      "w-full rounded-lg border border-white/10 bg-[#18181a] px-4 py-3 text-[#eeeef0] transition-colors outline-none placeholder:text-[#6b6878] focus:border-white/30 focus:ring-2 focus:ring-white/10",
                      errors.customIssue &&
                        "border-red-500/50 focus:border-red-500/50 focus:ring-red-500/20",
                    )}
                    id="customIssue"
                    onChange={(e) => {
                      setCustomIssue(e.target.value);
                      setErrors((prev) => ({ ...prev, customIssue: "" }));
                    }}
                    placeholder="Brief description of your issue..."
                    type="text"
                    value={customIssue}
                  />
                  {errors.customIssue && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.customIssue}
                    </p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="my-5">
              <div className="mb-2 flex items-center justify-between">
                <label
                  className="text-sm font-medium text-[#e5e5e5]"
                  htmlFor="description"
                >
                  Description <span className="text-red-500">*</span>
                </label>
                <span
                  className={cn(
                    "text-xs",
                    description.length > MAX_DESCRIPTION_LENGTH
                      ? "text-red-500"
                      : "text-[#6b6878]",
                  )}
                >
                  {description.length}/{MAX_DESCRIPTION_LENGTH}
                </span>
              </div>
              <textarea
                className={cn(
                  "min-h-[150px] w-full resize-none rounded-lg border border-white/10 bg-[#18181a] px-4 py-3 text-[#eeeef0] transition-colors outline-none placeholder:text-[#6b6878] focus:border-white/30 focus:ring-2 focus:ring-white/10",
                  errors.description &&
                    "border-red-500/50 focus:border-red-500/50 focus:ring-red-500/20",
                )}
                id="description"
                maxLength={MAX_DESCRIPTION_LENGTH}
                onChange={(e) => {
                  setDescription(e.target.value);
                  setErrors((prev) => ({ ...prev, description: "" }));
                }}
                placeholder="Please describe the issue in detail. Include steps to reproduce if possible..."
                value={description}
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.description}
                </p>
              )}
            </div>

            <div className="my-5">
              <label className="mb-2 block text-sm font-medium text-[#e5e5e5]">
                Attachments <span className="text-[#6b6878]">(optional)</span>
              </label>
              <div
                className={cn(
                  "flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-white/10 bg-[#18181a]/50 px-6 py-8 transition-colors outline-none focus-within:ring-2 focus-within:ring-white/10 hover:border-white/20",
                  errors.files &&
                    "border-red-500/50 focus-within:ring-red-500/20",
                )}
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="mb-3 h-8 w-8 text-[#6b6878]" />
                <p className="mb-1 text-sm text-[#e5e5e5]">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-[#6b6878]">
                  PNG, JPEG, JPG, GIF, MP4 (max 25MB)
                </p>
              </div>
              <input
                accept=".png,.jpeg,.jpg,.gif,.mp4"
                className="hidden"
                multiple
                onChange={handleFileSelect}
                ref={fileInputRef}
                type="file"
              />
              {errors.files && (
                <p className="mt-1 text-sm text-red-500">{errors.files}</p>
              )}

              <AnimatePresence>
                {attachedFiles.length > 0 && (
                  <motion.div
                    animate={{ opacity: 1, height: "auto" }}
                    className="mt-6 grid grid-cols-2 gap-4 overflow-hidden sm:grid-cols-3"
                    exit={{ opacity: 0, height: 0 }}
                    initial={{ opacity: 0, height: 0 }}
                  >
                    {attachedFiles.map((file, index) => (
                      <motion.div
                        key={file.preview}
                        animate={{ opacity: 1, scale: 1 }}
                        className="group relative aspect-video overflow-hidden rounded-lg border border-white/10 bg-[#18181a]"
                        exit={{ opacity: 0, scale: 0.8 }}
                        initial={{ opacity: 0, scale: 0.8 }}
                      >
                        {file.type === "image" ? (
                          <img
                            alt={file.file.name}
                            className="h-full w-full object-cover"
                            src={file.preview}
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center bg-[#18181a]">
                            <FileVideo className="h-8 w-8 text-[#6b6878]" />
                          </div>
                        )}
                        <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 to-transparent p-2 opacity-0 transition-opacity group-hover:opacity-100">
                          <div className="flex w-full items-center gap-2">
                            {file.type === "image" ? (
                              <FileImage className="h-4 w-4 shrink-0 text-white/80" />
                            ) : (
                              <FileVideo className="h-4 w-4 shrink-0 text-white/80" />
                            )}
                            <span className="truncate text-xs text-white/80">
                              {file.file.name}
                            </span>
                          </div>
                        </div>
                        <button
                          aria-label="Remove attachment"
                          className="absolute top-2 right-2 z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-white/90 bg-red-600 text-white shadow-lg transition-colors hover:bg-red-500 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#18181a] focus:outline-none"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeFile(index);
                          }}
                          type="button"
                        >
                          <X className="h-4 w-4" strokeWidth={2.5} />
                        </button>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-white px-6 py-4 text-base font-semibold text-[#0a0a0b] shadow-sm transition-colors hover:bg-[#e5e5e5] focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#111112] focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
              disabled={isSubmitting}
              type="submit"
            >
              {isSubmitting ? (
                <>
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-[#0a0a0b] border-t-transparent" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="h-5 w-5" />
                  Submit Report
                </>
              )}
            </button>
          </motion.form>

          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="mt-10 flex flex-col gap-2 rounded-xl border border-white/10 bg-[#111112] p-6 shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-center text-sm font-semibold tracking-wider text-[#9896a3] uppercase">
              Or reach out directly
            </h2>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <a
                className="flex items-center justify-center gap-2 rounded-lg border border-white/10 bg-[#18181a] px-4 py-3 text-sm font-medium text-[#eeeef0] transition-colors hover:border-green-500/50 hover:bg-green-500/10"
                href="https://wa.me/972546187549"
                rel="noopener noreferrer"
                target="_blank"
              >
                <MessageCircle className="h-5 w-5 text-green-500" />
                WhatsApp
              </a>
              <a
                className="flex items-center justify-center gap-2 rounded-lg border border-white/10 bg-[#18181a] px-4 py-3 text-sm font-medium text-[#eeeef0] transition-colors hover:border-blue-500/50 hover:bg-blue-500/10"
                href={`mailto:${DEVELOPER_INFO.email}`}
              >
                <Mail className="h-5 w-5 text-blue-500" />
                Email
              </a>
              <a
                className="flex items-center justify-center gap-2 rounded-lg border border-white/10 bg-[#18181a] px-4 py-3 text-sm font-medium text-[#eeeef0] transition-colors hover:border-[#0077b5]/50 hover:bg-[#0077b5]/10"
                href="https://www.linkedin.com/in/yosefhayim/"
                rel="noopener noreferrer"
                target="_blank"
              >
                <Linkedin className="h-5 w-5 text-[#0077b5]" />
                LinkedIn
              </a>
            </div>
          </motion.div>
        </div>
      </main>

      <AppFooter config={config} />
    </div>
  );
};

export default ReportIssue;
