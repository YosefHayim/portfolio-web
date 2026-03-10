import { Link } from "react-router";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/Components/ui/button";
import { SocialIcons } from "@/Components/ui/social-icons";
import { cn } from "@/lib/utils";
import type { AppConfig } from "@/data/apps/types";

type ReportIssueSuccessProps = {
  config: AppConfig;
  onReset: () => void;
};

export function ReportIssueSuccess({ config, onReset }: ReportIssueSuccessProps) {
  return (
    <motion.div
      animate={{ opacity: 1, scale: 1 }}
      className="mx-auto max-w-lg text-center"
      initial={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        animate={{ scale: 1 }}
        className={cn(
          "mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full border border-white/10 shadow-[0_0_0_1px_rgba(34,197,94,0.2)]",
        )}
        initial={{ scale: 0 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
      >
        <CheckCircle2 className="h-10 w-10 text-green-500" />
      </motion.div>

      <h1 className="mb-4 text-3xl font-bold text-[#eeeef0]">
        Report Submitted!
      </h1>

      <p className="my-4 text-lg leading-relaxed text-[#9896a3]">
        Thank you for your feedback. Your email client should have opened with
        the report details. We'll review your issue and get back to you as soon
        as possible.
      </p>

      <div className="my-4 flex flex-col items-center space-y-2">
        <p className="text-sm font-semibold uppercase tracking-wider text-[#9896a3]">
          Alternative Contact Methods
        </p>
        <SocialIcons labelSides={["top", "bottom", "left", "right"]} showLabels />
      </div>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Button variant="outline" onClick={onReset} type="button">
          Submit Another Report
        </Button>
        <Button asChild variant="default">
          <Link to={`/${config.id}`}>Back to {config.name}</Link>
        </Button>
      </div>
    </motion.div>
  );
}
