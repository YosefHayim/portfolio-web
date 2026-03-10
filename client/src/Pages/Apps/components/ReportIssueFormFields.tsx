import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";
import { Textarea } from "@/Components/ui/textarea";
import { ReportIssueFileUpload } from "./ReportIssueFileUpload";
import {
  MAX_DESCRIPTION_LENGTH,
  POPULAR_ISSUES,
  type AttachedFile,
} from "../reportIssueConstants";
import { cn } from "@/lib/utils";

type ExtensionOption = { id: string; name: string };

type ReportIssueFormFieldsProps = {
  allExtensions: ExtensionOption[];
  selectedExtension: string;
  setSelectedExtension: (v: string) => void;
  issueType: string;
  setIssueType: (v: string) => void;
  customIssue: string;
  setCustomIssue: (v: string) => void;
  description: string;
  setDescription: (v: string) => void;
  errors: Record<string, string>;
  setErrors: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  attachedFiles: AttachedFile[];
  onFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveFile: (index: number) => void;
};

export function ReportIssueFormFields({
  allExtensions,
  selectedExtension,
  setSelectedExtension,
  issueType,
  setIssueType,
  customIssue,
  setCustomIssue,
  description,
  setDescription,
  errors,
  setErrors,
  attachedFiles,
  onFileSelect,
  onRemoveFile,
}: ReportIssueFormFieldsProps) {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="extension">
          Extension <span className="text-destructive">*</span>
        </Label>
        <Select
          value={selectedExtension || undefined}
          onValueChange={(v) => {
            setSelectedExtension(v);
            setErrors((prev) => ({ ...prev, extension: "" }));
          }}
        >
          <SelectTrigger
            id="extension"
            aria-invalid={Boolean(errors.extension)}
            className={errors.extension ? "border-destructive" : undefined}
          >
            <SelectValue placeholder="Select extension..." />
          </SelectTrigger>
          <SelectContent>
            {allExtensions.map((ext) => (
              <SelectItem key={ext.id} value={ext.id}>
                {ext.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.extension && (
          <p className="text-sm text-destructive">{errors.extension}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="issueType">
          Issue Type <span className="text-destructive">*</span>
        </Label>
        <Select
          value={issueType || undefined}
          onValueChange={(v) => {
            setIssueType(v);
            setErrors((prev) => ({ ...prev, issueType: "" }));
          }}
        >
          <SelectTrigger
            id="issueType"
            aria-invalid={Boolean(errors.issueType)}
            className={errors.issueType ? "border-destructive" : undefined}
          >
            <SelectValue placeholder="Select issue type..." />
          </SelectTrigger>
          <SelectContent>
            {POPULAR_ISSUES.map((issue) => (
              <SelectItem key={issue} value={issue}>
                {issue}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.issueType && (
          <p className="text-sm text-destructive">{errors.issueType}</p>
        )}
      </div>

      <AnimatePresence>
        {issueType === "Other (Custom)" && (
          <motion.div
            animate={{ opacity: 1, height: "auto" }}
            className="space-y-2 overflow-hidden"
            exit={{ opacity: 0, height: 0 }}
            initial={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Label htmlFor="customIssue">
              Describe your issue <span className="text-destructive">*</span>
            </Label>
            <Input
              id="customIssue"
              placeholder="Brief description of your issue..."
              value={customIssue}
              onChange={(e) => {
                setCustomIssue(e.target.value);
                setErrors((prev) => ({ ...prev, customIssue: "" }));
              }}
              aria-invalid={Boolean(errors.customIssue)}
              className={errors.customIssue ? "border-destructive" : undefined}
            />
            {errors.customIssue && (
              <p className="text-sm text-destructive">
                {errors.customIssue}
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="description">
            Description <span className="text-destructive">*</span>
          </Label>
          <span
            className={cn(
              "text-xs",
              description.length > MAX_DESCRIPTION_LENGTH
                ? "text-red-400"
                : "text-[#9896a3]",
            )}
          >
            {description.length}/{MAX_DESCRIPTION_LENGTH}
          </span>
        </div>
        <Textarea
          id="description"
          placeholder="Please describe the issue in detail. Include steps to reproduce if possible..."
          value={description}
          maxLength={MAX_DESCRIPTION_LENGTH}
          onChange={(e) => {
            setDescription(e.target.value);
            setErrors((prev) => ({ ...prev, description: "" }));
          }}
          aria-invalid={Boolean(errors.description)}
          className={cn(
            "min-h-[150px] resize-none",
            errors.description && "border-destructive",
          )}
        />
        {errors.description && (
          <p className="text-sm text-destructive">{errors.description}</p>
        )}
      </div>

      <ReportIssueFileUpload
        attachedFiles={attachedFiles}
        error={errors.files}
        onFileSelect={onFileSelect}
        onRemoveFile={onRemoveFile}
      />
    </>
  );
}
