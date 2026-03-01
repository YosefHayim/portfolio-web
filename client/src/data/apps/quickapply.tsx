import { Zap, FileText, BarChart3, Rocket, Lock, Sparkles } from "lucide-react";
import type { AppConfig } from "./types";

export const quickApplyConfig: AppConfig = {
  id: "quick-apply",
  name: "QuickApply",
  tagline: "Streamline Your Job Application Process with AI",
  description:
    "Automate and accelerate your job search with AI-powered form filling, resume customization, and application tracking. Apply to jobs faster and smarter.",
  brandColor: "#10b981",
  logoBgColor: "#10b981",
  logoIcon: <Zap className="h-5 w-5 text-white" />,
  features: [
    {
      icon: <Zap className="h-6 w-6" />,
      title: "AI-Powered Form Filling",
      description:
        "Auto-fill job applications using your profile data. Save time by letting AI populate common fields with your information.",
    },
    {
      icon: <FileText className="h-6 w-6" />,
      title: "Smart Resume Matching",
      description:
        "Customize your resume for each job posting. AI analyzes job descriptions and tailors your resume to highlight relevant skills.",
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: "Application Tracking",
      description:
        "Track all your applications in one place. Monitor status, deadlines, and follow-ups for every job you apply to.",
    },
    {
      icon: <Rocket className="h-6 w-6" />,
      title: "One-Click Apply",
      description:
        "Apply to multiple jobs with a single click. Batch apply to similar positions and save hours of repetitive work.",
    },
    {
      icon: <Lock className="h-6 w-6" />,
      title: "Privacy Focused",
      description:
        "Your data stays on your device. No tracking, no analytics, and no sharing with third parties. Complete control over your information.",
    },
    {
      icon: <Sparkles className="h-6 w-6" />,
      title: "Job Recommendations",
      description:
        "Get AI-powered job suggestions based on your profile and preferences. Discover opportunities that match your skills and goals.",
    },
  ],
  privacyPolicy: {
    lastUpdated: "March 1, 2025",
    intro:
      'This Privacy Policy describes how QuickApply ("we", "us", or "our") collects, uses, and protects your information when you use our browser extension. QuickApply is developed and operated by Yosef Hayim Sabag.',
    sections: [
      {
        title: "1. Information We Collect",
        content:
          "QuickApply stores your profile information, resume data, job application history, and extension settings locally on your device. We collect information about job postings you interact with to provide personalized recommendations. All data is stored locally in your browser.",
      },
      {
        title: "2. How We Use Your Data",
        content:
          "We use your locally stored data to auto-fill job applications, customize your resume for job postings, track your applications, and provide personalized job recommendations. No data is sent to our servers without your explicit consent.",
      },
      {
        title: "3. Data Storage and Security",
        content:
          "All data is stored locally in your browser's storage. We do not collect analytics or tracking data. Your personal information, resume, and application history remain entirely on your device. We use industry-standard security practices to protect your data.",
      },
      {
        title: "4. Third-Party Services",
        content:
          "QuickApply may interact with job boards and career websites to provide application tracking and recommendations. Your use of these services is subject to their respective privacy policies and terms of service.",
      },
      {
        title: "5. Contact Us",
        content:
          "If you have any questions about this Privacy Policy, please contact us:",
      },
    ],
  },
  termsOfService: {
    lastUpdated: "March 1, 2025",
    intro:
      'Please read these Terms of Service ("Terms") carefully before using QuickApply. By accessing or using our browser extension, you agree to be bound by these Terms. QuickApply is developed and operated by Yosef Hayim Sabag.',
    sections: [
      {
        title: "1. Acceptance of Terms",
        content:
          "By installing or using QuickApply, you acknowledge that you have read, understood, and agree to be bound by these Terms. If you do not agree to these Terms, you may not use the extension.",
      },
      {
        title: "2. Description of Service",
        content:
          "QuickApply is a browser extension that automates job application processes using AI-powered form filling, resume customization, and application tracking. It enables users to apply to jobs faster and manage their job search more efficiently.",
      },
      {
        title: "3. User Responsibilities",
        content:
          "You are responsible for the accuracy of the information you provide and your use of the extension. You agree to use QuickApply only for lawful purposes and in accordance with the terms of service of job boards and career websites you interact with.",
      },
      {
        title: "4. Limitation of Liability",
        content:
          "In no event shall QuickApply or its developer be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or relating to your use of the extension, including any job applications submitted or opportunities missed.",
      },
      {
        title: "5. Contact Us",
        content:
          "If you have any questions about these Terms, please contact us:",
      },
    ],
  },
};
