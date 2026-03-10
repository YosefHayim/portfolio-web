import { Link } from "react-router";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/Components/ui/button";
import { ReportIssueContactCard } from "./ReportIssueContactCard";
import { cn } from "@/lib/utils";

type AppConfig = { id: string; name: string };

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
          "mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full border shadow-[0_0_0_1px_rgba(34,197,94,0.2)]",
        )}
        initial={{ scale: 0 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
      >
        <CheckCircle2 className="h-10 w-10 text-green-500" />
      </motion.div>

      <h1 className="mb-4 text-3xl font-bold text-foreground">
        Report Submitted!
      </h1>

      <p className="my-4 text-lg leading-relaxed text-muted-foreground">
        Thank you for your feedback. Your email client should have opened with
        the report details. We'll review your issue and get back to you as soon
        as possible.
      </p>

      <div className="my-4">
        <ReportIssueContactCard
          title="Alternative Contact Methods"
          variant="success"
        />
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
