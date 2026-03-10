import { type FormEvent } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { Button } from "@/Components/ui/button";
import { ReportIssueFormFields } from "./ReportIssueFormFields";
import { type AttachedFile } from "../reportIssueConstants";

type ExtensionOption = { id: string; name: string };

type ReportIssueFormProps = {
  allExtensions: ExtensionOption[];
  selectedExtension: string;
  setSelectedExtension: (v: string) => void;
  issueType: string;
  setIssueType: (v: string) => void;
  customIssue: string;
  setCustomIssue: (v: string) => void;
  description: string;
  setDescription: (v: string) => void;
  attachedFiles: AttachedFile[];
  errors: Record<string, string>;
  setErrors: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  isSubmitting: boolean;
  onFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveFile: (index: number) => void;
  onSubmit: (e: FormEvent) => void;
};

export function ReportIssueForm({
  allExtensions,
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
  isSubmitting,
  onFileSelect,
  onRemoveFile,
  onSubmit,
}: ReportIssueFormProps) {
  return (
    <motion.form
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8 rounded-2xl border border-input p-6 shadow-sm transition-colors md:p-8"
      initial={{ opacity: 0, y: 20 }}
      onSubmit={onSubmit}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <ReportIssueFormFields
        allExtensions={allExtensions}
        attachedFiles={attachedFiles}
        customIssue={customIssue}
        description={description}
        errors={errors}
        issueType={issueType}
        selectedExtension={selectedExtension}
        setCustomIssue={setCustomIssue}
        setDescription={setDescription}
        setErrors={setErrors}
        setIssueType={setIssueType}
        setSelectedExtension={setSelectedExtension}
        onFileSelect={onFileSelect}
        onRemoveFile={onRemoveFile}
      />

      <Button
        className="w-full"
        disabled={isSubmitting}
        size="lg"
        type="submit"
      >
        {isSubmitting ? (
          <>
            <span className="h-5 w-5 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
            Submitting...
          </>
        ) : (
          <>
            <Send className="h-5 w-5" />
            Submit Report
          </>
        )}
      </Button>
    </motion.form>
  );
}
