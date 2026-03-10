import { useState, type ChangeEvent, type FormEvent } from "react";
import {
  ACCEPTED_FILE_TYPES,
  MAX_FILE_SIZE,
  type AttachedFile,
} from "./reportIssueConstants";

type ExtensionOption = { id: string; name: string };

export function useReportIssueForm(
  appId: string | undefined,
  allExtensions: ExtensionOption[],
  config: { name: string },
  developerEmail: string,
) {
  const [selectedExtension, setSelectedExtension] = useState(appId || "");
  const [issueType, setIssueType] = useState("");
  const [customIssue, setCustomIssue] = useState("");
  const [description, setDescription] = useState("");
  const [attachedFiles, setAttachedFiles] = useState<AttachedFile[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!selectedExtension) newErrors.extension = "Please select an extension";
    if (!issueType) newErrors.issueType = "Please select an issue type";
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
      newFiles.push({
        file,
        preview: URL.createObjectURL(file),
        type: isVideo ? "video" : "image",
      });
    });
    setAttachedFiles((prev) => [...prev, ...newFiles]);
    setErrors((prev) => {
      const { files: _, ...rest } = prev;
      return rest;
    });
  };

  const removeFile = (index: number) => {
    setAttachedFiles((prev) => {
      const next = [...prev];
      URL.revokeObjectURL(next[index].preview);
      next.splice(index, 1);
      return next;
    });
  };

  const handleSubmit = async (e: FormEvent): Promise<void> => {
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
        (attachedFiles.length > 0
          ? `Attachments: ${attachedFiles.length} file(s) - Please note: Files cannot be attached via email link. Please reply to this email with your screenshots/recordings attached.\n\n`
          : "") +
        `---\nSent from ${config.name} Issue Reporter`,
    );
    const mailtoLink = `mailto:${developerEmail}?subject=${subject}&body=${body}`;
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

  return {
    selectedExtension,
    setSelectedExtension,
    issueType,
    setIssueType,
    customIssue,
    setCustomIssue,
    description,
    setDescription,
    attachedFiles,
    errors,
    setErrors,
    isSubmitted,
    isSubmitting,
    validateForm,
    handleFileSelect,
    removeFile,
    handleSubmit,
    resetForm,
  };
}
