import { useRef, type ChangeEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Upload, X, FileImage, FileVideo } from "lucide-react";
import { Button } from "@/Components/ui/button";
import { Label } from "@/Components/ui/label";
import { type AttachedFile } from "../reportIssueConstants";
import { cn } from "@/lib/utils";

type ReportIssueFileUploadProps = {
  attachedFiles: AttachedFile[];
  error?: string;
  onFileSelect: (e: ChangeEvent<HTMLInputElement>) => void;
  onRemoveFile: (index: number) => void;
};

export function ReportIssueFileUpload({
  attachedFiles,
  error,
  onFileSelect,
  onRemoveFile,
}: ReportIssueFileUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div>
      <Label className="mb-2 block">
        Attachments <span className="text-muted-foreground">(optional)</span>
      </Label>
      <div
        className={cn(
          "flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-input bg-muted/30 px-6 py-8 outline-none transition-colors focus-within:ring-2 focus-within:ring-ring hover:border-primary/50",
          error && "border-destructive focus-within:ring-destructive/20",
        )}
        onClick={() => fileInputRef.current?.click()}
      >
        <Upload className="mb-3 h-8 w-8 text-muted-foreground" />
        <p className="mb-1 text-sm">Click to upload or drag and drop</p>
        <p className="text-xs text-muted-foreground">
          PNG, JPEG, JPG, GIF, MP4 (max 25MB)
        </p>
      </div>
      <input
        accept=".png,.jpeg,.jpg,.gif,.mp4"
        className="hidden"
        multiple
        onChange={(e) => {
          onFileSelect(e);
          if (fileInputRef.current) fileInputRef.current.value = "";
        }}
        ref={fileInputRef}
        type="file"
      />
      {error && <p className="mt-1 text-sm text-destructive">{error}</p>}

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
                className="group relative aspect-video overflow-hidden rounded-lg border border-input bg-card"
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
                  <div className="flex h-full w-full items-center justify-center bg-muted">
                    <FileVideo className="h-8 w-8 text-muted-foreground" />
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
                <Button
                  aria-label="Remove attachment"
                  className="absolute top-2 right-2 z-10 size-8 rounded-full p-0"
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemoveFile(index);
                  }}
                  type="button"
                  variant="destructive"
                  size="icon"
                >
                  <X className="h-4 w-4" strokeWidth={2.5} />
                </Button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

