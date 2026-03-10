import { Mail } from "lucide-react";
import { FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { DEVELOPER_INFO } from "@/data/apps/types";
import { cn } from "@/lib/utils";

type ReportIssueContactCardProps = {
  title: string;
  variant?: "form" | "success";
  className?: string;
};

const WHATSAPP_LINK = "https://wa.me/972546187549";
const LINKEDIN_LINK = "https://www.linkedin.com/in/yosef-hayim-sabag/";

const linkClass = cn(
  "flex items-center justify-center gap-2 rounded-lg border border-input bg-card px-4 py-3 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
);

const LABELS = {
  form: { whatsapp: "WhatsApp", email: "Email", linkedin: "LinkedIn" },
  success: {
    whatsapp: "Contact via WhatsApp",
    email: "Email Directly",
    linkedin: "Connect on LinkedIn",
  },
};

export function ReportIssueContactCard({
  title,
  variant = "form",
  className,
}: ReportIssueContactCardProps) {
  const labels = LABELS[variant];
  return (
    <Card className={cn("p-6", className)}>
      <CardHeader className="space-y-0 pb-4">
        <CardTitle className="text-center text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <a
            className={linkClass}
            href={WHATSAPP_LINK}
            rel="noopener noreferrer"
            target="_blank"
          >
            <FaWhatsapp className="h-5 w-5 text-green-500" />
            {labels.whatsapp}
          </a>
          <a className={linkClass} href={`mailto:${DEVELOPER_INFO.email}`}>
            <Mail className="h-5 w-5 text-blue-500" />
            {labels.email}
          </a>
          <a
            className={linkClass}
            href={LINKEDIN_LINK}
            rel="noopener noreferrer"
            target="_blank"
          >
            <FaLinkedin className="h-5 w-5 text-[#0077b5]" />
            {labels.linkedin}
          </a>
        </div>
      </CardContent>
    </Card>
  );
}
