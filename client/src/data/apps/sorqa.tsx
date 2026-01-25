import { Sparkles, ListTodo, FileUp, Settings, Shield, Zap } from "lucide-react";
import type { AppConfig } from "./types";

export const sorqaConfig: AppConfig = {
  id: "sorqa",
  name: "Sorqa",
  tagline: "Automate Prompt Generation & Queueing for Sora AI",
  description:
    "Supercharge your Sora AI workflow with automated prompt generation and queue management. Generate creative prompts using AI and automatically queue them for Sora video/image generation.",
  brandColor: "#ffffff",
  logoBgColor: "#ffffff",
  chromeStoreUrl: "https://chrome.google.com/webstore",
  logoIcon: <Zap className="h-5 w-5 text-[#0a0a0b]" />,
  features: [
    {
      icon: <Sparkles className="h-6 w-6" />,
      title: "AI-Powered Prompt Generation",
      description:
        "Generate high-quality prompts using OpenAI GPT models. Customize context and style for your specific needs. Batch generate 10, 50, or 100+ prompts at once.",
    },
    {
      icon: <ListTodo className="h-6 w-6" />,
      title: "Smart Queue Management",
      description:
        "Automatically queue prompts for Sora processing. Drag-and-drop to reorder, start, pause, resume, and stop queue at any time with real-time progress tracking.",
    },
    {
      icon: <FileUp className="h-6 w-6" />,
      title: "Import & Export",
      description:
        "Import prompts from CSV files and export your prompts to CSV or JSON. Manual prompt entry option available for quick additions.",
    },
    {
      icon: <Settings className="h-6 w-6" />,
      title: "Customizable Settings",
      description:
        "Choose AI model (GPT-3.5-turbo, GPT-4, GPT-4-turbo). Adjust prompt length, style, and configure batch processing delays. Dark/Light theme support.",
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Privacy Focused",
      description:
        "Your API key is stored locally and never transmitted to our servers. No tracking or analytics. All data stays on your device.",
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Automated Processing",
      description:
        "Watch as prompts are submitted to Sora automatically. Perfect for AI artists, video generation enthusiasts, and anyone who needs bulk prompt processing.",
    },
  ],
  privacyPolicy: {
    lastUpdated: "January 26, 2025",
    intro:
      'This Privacy Policy describes how Sorqa ("we", "us", or "our") collects, uses, and protects your information when you use our browser extension. Sorqa is developed and operated by Yosef Hayim Sabag.',
    googleApiDisclosure:
      "Sorqa uses the OpenAI API to generate prompts. Your OpenAI API key is stored locally on your device and is only used to communicate directly with OpenAI's servers. We do not collect, store, or transmit your API key to any other servers.",
    sections: [
      {
        title: "1. Information We Collect",
        content:
          "Sorqa stores your OpenAI API key locally on your device, prompt data you generate or import for queue processing, and your extension settings and preferences. All data is stored locally in your browser.",
      },
      {
        title: "2. How We Use Your Data",
        content:
          "We use your locally stored data to generate prompts via OpenAI API, manage your prompt queue for Sora processing, and maintain your preferences between sessions. No data is sent to our servers.",
      },
      {
        title: "3. Data Storage and Security",
        content:
          "All data is stored locally in your browser's storage. Your OpenAI API key is never transmitted to our servers. We do not collect analytics or tracking data. Your prompts and settings remain entirely on your device.",
      },
      {
        title: "4. Third-Party Services",
        content:
          "Sorqa interacts with OpenAI's API (for prompt generation) and Sora AI (for queue automation). Your use of these services is subject to their respective privacy policies and terms of service.",
      },
      {
        title: "5. Contact Us",
        content:
          "If you have any questions about this Privacy Policy, please contact us:",
      },
    ],
  },
  termsOfService: {
    lastUpdated: "January 26, 2025",
    intro:
      'Please read these Terms of Service ("Terms") carefully before using Sorqa. By accessing or using our browser extension, you agree to be bound by these Terms. Sorqa is developed and operated by Yosef Hayim Sabag.',
    sections: [
      {
        title: "1. Acceptance of Terms",
        content:
          "By installing or using Sorqa, you acknowledge that you have read, understood, and agree to be bound by these Terms. If you do not agree to these Terms, you may not use the extension.",
      },
      {
        title: "2. Description of Service",
        content:
          "Sorqa is a browser extension that automates prompt generation using OpenAI GPT models and queue management for Sora AI. It enables batch prompt generation, import/export functionality, and automated queue processing.",
      },
      {
        title: "3. Requirements and API Keys",
        content:
          "You must provide your own OpenAI API key to use the prompt generation features. You are responsible for any charges incurred through your OpenAI account. Access to Sora AI (sora.com) is required for queue automation features.",
      },
      {
        title: "4. User Responsibilities",
        content:
          "You are responsible for your use of the extension and any content you generate. You agree to use Sorqa only for lawful purposes and in accordance with OpenAI's and Sora AI's terms of service and usage policies.",
      },
      {
        title: "5. Limitation of Liability",
        content:
          "In no event shall Sorqa or its developer be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or relating to your use of the extension, including API costs incurred.",
      },
      {
        title: "6. Contact Us",
        content:
          "If you have any questions about these Terms, please contact us:",
      },
    ],
  },
};
