import { Layers } from "lucide-react";
import type { AppConfig } from "./types";

export const gqminiConfig: AppConfig = {
  id: "gqmini",
  name: "Gqmini",
  tagline: "Bulk Image Generation & Automation for Gemini",
  description:
    "Transform Google Gemini into a batch processing powerhouse. Queue multiple prompts, attach reference images, and let the extension automate your creative workflow.",
  brandColor: "#ffffff",
  logoBgColor: "#ffffff",
  chromeStoreUrl: "https://chromewebstore.google.com/detail/gemini-nano-flow/lidnnjbepijjbbphbdhcchgpckpcbgfm",
  logoIcon: <Layers className="h-5 w-5 text-[#0a0a0b]" />,
  features: [
    {
      icon: <Layers className="h-6 w-6" />,
      title: "Batch Queue Processing",
      description:
        "Add multiple prompts and process them automatically through Gemini. No more copy-pasting one prompt at a time.",
    },
    {
      icon: <Layers className="h-6 w-6" />,
      title: "Multi-Tool Support",
      description:
        "Generate with Imagen, Veo, Canvas, Deep Research, Learning, or Visual Layout tools. Each prompt can use a different tool.",
    },
    {
      icon: <Layers className="h-6 w-6" />,
      title: "Reference Images",
      description:
        "Attach multiple images per prompt as references for better generation results. Perfect for style transfer and visual guidance.",
    },
    {
      icon: <Layers className="h-6 w-6" />,
      title: "CSV Import",
      description:
        "Upload CSV files with prompts, tool types, and image references for massive batch operations. Support for cloud URLs and local files.",
    },
    {
      icon: <Layers className="h-6 w-6" />,
      title: "Template Library",
      description:
        "Save and reuse your favorite prompts with attached images. Organize into folders and optimize with AI assistance.",
    },
    {
      icon: <Layers className="h-6 w-6" />,
      title: "Prompt Enhancement",
      description:
        "Add global prefix/suffix, negative prompts, and text weighting. Apply emphasis to selected text for better results.",
    },
  ],
  privacyPolicy: {
    lastUpdated: "January 25, 2025",
    intro:
      'This Privacy Policy describes how Gqmini ("we", "us", or "our") collects, uses, and protects your information when you use our Chrome extension. Gqmini is developed and operated by Yosef Hayim Sabag.',
    googleApiDisclosure:
      "Gqmini's use and transfer to any other app of information received from Google APIs will adhere to the Google API Services User Data Policy, including the Limited Use requirements.",
    sections: [
      {
        title: "1. Information We Collect",
        content:
          "Gqmini collects prompt data you enter for batch processing, reference images you upload for generation, usage analytics to improve the service, and account information when you sign in.",
      },
      {
        title: "2. How We Use Your Data",
        content:
          "We use your data to process prompts through Google Gemini, provide batch generation features, improve our service through anonymized analytics, and communicate with you about updates and support.",
      },
      {
        title: "3. Data Storage and Security",
        content:
          "Your data is stored securely using industry-standard encryption. We do not sell, rent, or share your personal data with third parties except as necessary to provide our services through Google Gemini.",
      },
      {
        title: "4. Data Retention",
        content:
          "Account data is retained while your account is active. You can request deletion of all your data at any time by contacting us. Upon deletion request, we will remove all personal data within 30 days.",
      },
      {
        title: "5. Contact Us",
        content:
          "If you have any questions about this Privacy Policy, please contact us:",
      },
    ],
  },
  termsOfService: {
    lastUpdated: "January 25, 2025",
    intro:
      'Please read these Terms of Service ("Terms") carefully before using Gqmini. By accessing or using our Chrome extension, you agree to be bound by these Terms. Gqmini is developed and operated by Yosef Hayim Sabag.',
    sections: [
      {
        title: "1. Acceptance of Terms",
        content:
          "By installing or using Gqmini, you acknowledge that you have read, understood, and agree to be bound by these Terms. If you do not agree to these Terms, you may not use the extension.",
      },
      {
        title: "2. Description of Service",
        content:
          "Gqmini is a Chrome extension that provides bulk image generation and automation capabilities for Google Gemini. It enables batch queue processing, reference image attachment, CSV import, and template management for creative workflows.",
      },
      {
        title: "3. User Responsibilities",
        content:
          "You are responsible for your use of the extension and any content you generate. You agree to use Gqmini only for lawful purposes and in accordance with Google Gemini's terms of service and usage policies.",
      },
      {
        title: "4. Intellectual Property",
        content:
          "Gqmini and its original content, features, and functionality are owned by Yosef Hayim Sabag and are protected by international copyright, trademark, and other intellectual property laws.",
      },
      {
        title: "5. Limitation of Liability",
        content:
          "In no event shall Gqmini or its developer be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or relating to your use of the extension.",
      },
      {
        title: "6. Contact Us",
        content:
          "If you have any questions about these Terms, please contact us:",
      },
    ],
  },
};
