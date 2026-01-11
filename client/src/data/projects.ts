export type Collaborator = {
  name: string;
  githubProfileLink: string;
};

export type Project = {
  id: string;
  name: string;
  description: string;
  longDescription?: string;
  techStack: string[];
  deployedUrl: string;
  telegramBotUrl?: string;
  repoUrl: string;
  image: string;
  collaborators?: Collaborator[];
  status?: "live" | "development" | "completed";
  highlights?: string[];
};

export const projects: Project[] = [
  {
    id: "ebay-mcp",
    name: "eBay MCP API Server",
    description:
      "A local MCP server providing AI assistants with comprehensive access to eBay's Sell APIs - 387 tools, 100% API coverage, OAuth 2.0 support.",
    longDescription:
      "A local MCP server providing AI assistants with comprehensive access to eBay's Sell APIs across 270 unique endpoints. Features 387 purpose-built tools for seller operations including inventory, orders, marketing, and analytics. Supports 9 AI clients including Claude Desktop, Cursor, Zed, Cline, Continue.dev, Windsurf, Roo Code, Claude Code CLI, and Amazon Q. Includes OAuth 2.0 with automatic token refresh, TypeScript implementation with Zod validation, and 958+ passing tests.",
    techStack: [
      "modelcontextprotocol",
      "axios",
      "cors",
      "dotenv",
      "express",
      "jose",
      "jsonwebtoken",
      "TypeScript",
      "Node.js",
      "Vitest",
      "OAuth 2.0",
      "Zod",
    ],
    deployedUrl: "https://www.npmjs.com/package/ebay-mcp",
    repoUrl: "https://github.com/YosefHayim/ebay-mcp",
    image: "/screenshots/ebay-mcp.png",
    status: "live",
    highlights: [
      "387 tools across 270 unique eBay endpoints",
      "100% API coverage with 958+ passing tests",
      "Supports 9 AI clients (Claude, Cursor, Zed, etc.)",
      "OAuth 2.0 with automatic token refresh",
    ],
  },
  {
    id: "autobay-saas",
    name: "AutoBay DropShipping Saas Platform",
    description:
      "Amazon to eBay dropshipping SaaS platform engineered to mitigate common pain points encountered by sellers.",
    longDescription:
      "Leveraging my prior experience as an eBay seller, I am developing an Amazon to eBay dropshipping SaaS platform. This platform is engineered to mitigate common pain points encountered by sellers, integrating advanced optimizations and novel features to enhance the dropshipping workflow and maximize profit margins.",
    techStack: [
      "Next.js",
      "TypeScript",
      "Zod",
      "Playwright",
      "AWS",
      "GitHub Actions",
      "Jest",
      "Firebase",
      "Nodemailer",
      "OAuth",
      "eBay API",
      "Amazon SP-API",
      "USA USPTO Trademarks API",
      "International WIPO Patents API",
      "Stripe API",
      "PayPal API",
      "Postman",
    ],
    deployedUrl: "projects",
    repoUrl: "https://github.com/orgs/AutoBay/repositories",
    image: "/screenshots/auto-bay-saas.png",
    status: "development",
    highlights: [
      "Multi-marketplace integration",
      "Trademark & patent verification",
      "Automated pricing optimization",
      "Real-time inventory sync",
    ],
  },
  {
    id: "extension-sora-auto-queue",
    name: "Sora Auto Queue Prompts Extension",
    description:
      "A browser extension that introduces an automated prompt-queuing system for AI-driven workflows with clarity, flow, and openness.",
    longDescription:
      "A browser extension that introduces an automated prompt-queuing system inspired by the concept of 'Sora'—clarity, flow, and openness. It streamlines how prompts are submitted, organizes them into a controlled queue, and ensures consistent, uninterrupted task execution for AI-driven workflows. Features a complete UI redesign in v2.0.0 with reusable components.",
    techStack: [
      "TypeScript",
      "WXT",
      "Tailwind CSS",
      "Jest",
      "Playwright",
      "pnpm",
      "GitHub Actions",
      "Husky",
    ],
    deployedUrl: "https://chromewebstore.google.com/detail/sora-auto-queue-prompts/kbpbdckjechbjmnjagfkgcplmhdkkgph",
    repoUrl: "https://github.com/YosefHayim/extension-sora-auto-queue-prompts",
    image: "/screenshots/sora-extension.png",
    status: "live",
    highlights: [
      "Automated prompt queuing system",
      "Complete UI redesign in v2.0.0",
      "E2E testing with Playwright",
      "CI/CD with GitHub Actions",
    ],
  },
  {
    id: "extension-ai-conversation-navigator",
    name: "AI Conversation Navigator Extension",
    description:
      "Advanced navigation and analytics for ChatGPT, Claude, and Gemini conversations.",
    longDescription:
      "A browser extension providing advanced navigation and analytics for ChatGPT, Claude, and Gemini conversations. Enables users to better organize and analyze their AI chat interactions across multiple platforms with comprehensive testing (90%+ coverage) and automated CI/CD pipelines.",
    techStack: [
      "TypeScript",
      "JavaScript",
      "esbuild",
      "Jest",
      "GitHub Actions",
      "pnpm",
    ],
    deployedUrl: "https://chromewebstore.google.com/detail/gemini-nano-flow/lidnnjbepijjbbphbdhcchgpckpcbgfm",
    repoUrl: "https://github.com/YosefHayim/extension-ai-conversation-navigator",
    image: "/screenshots/ai-navigator-extension.png",
    status: "live",
    highlights: [
      "Multi-platform support (ChatGPT, Claude, Gemini)",
      "90%+ test coverage requirement",
      "Chrome/Edge and Firefox support",
      "Automated security audits",
    ],
  },
  {
    id: "ally-ai-calendar",
    name: "Ally AI Calendar",
    description:
      "An intelligent calendar management platform that converts natural language into Google Calendar events across web, Telegram, and WhatsApp.",
    longDescription:
      "An intelligent calendar management platform that converts natural language into Google Calendar events across multiple interfaces including web dashboard, Telegram bot, and WhatsApp. Features a multi-agent AI architecture using OpenAI's framework for specialized calendar operations, AI-powered detection and automatic filling of untracked calendar gaps, voice input capabilities, analytics dashboards, and support for six languages with RTL text handling.",
    techStack: [
      "Next.js",
      "React",
      "TypeScript",
      "Express",
      "Supabase",
      "Bun",
      "OAuth 2.0",
      "Grammy.js",
      "Google Calendar API",
      "Zod",
      "OpenAI Agents",
      "GitHub Actions",
    ],
    deployedUrl: "https://niicspurpm.eu-central-1.awsapprunner.com/",
    telegramBotUrl: "https://t.me/ai_schedule_event_server_bot",
    repoUrl: "https://github.com/YosefHayim/ai-google-calendar-assistant",
    image: "/screenshots/ally-ai-calendar.png",
    status: "live",
    highlights: [
      "Multi-platform support (Web, Telegram, WhatsApp)",
      "Multi-agent AI architecture with OpenAI",
      "Voice input & 6 language support with RTL",
      "AI-powered calendar gap detection & filling",
    ],
  },
  {
    id: "udemy-clone",
    name: "Udemy Clone",
    description:
      "Full-stack implementation of a Udemy-style learning platform covering course management, user enrollment, and media handling.",
    longDescription:
      "Full-stack implementation of a Udemy-style learning platform based on Ron Ben's IITC curriculum, covering course management, user enrollment, media handling, and instructor workflows. Built as the final capstone for our course at IITC to showcase full-stack proficiency.",
    techStack: [
      "React",
      "Node.js",
      "TypeScript",
      "Express",
      "MongoDB",
      "Tailwind",
      "Redux",
    ],
    deployedUrl: "https://udemy-clone-ron-ben-iitc.onrender.com/",
    repoUrl: "https://github.com/YosefHayim/udemy-clone-ron-ben-iitc",
    image: "/screenshots/udemy.png",
    status: "completed",
    collaborators: [
      { name: "Ron Sherling", githubProfileLink: "https://github.com/ron959" },
      {
        name: "Ben Klinski",
        githubProfileLink: "https://github.com/Ben-Kilinski",
      },
    ],
    highlights: [
      "Full authentication system",
      "Course management",
      "Video streaming",
      "Payment integration",
    ],
  },
  {
    id: "tim-trailers",
    name: "Tim Trailers",
    description:
      "A comprehensive movie database application built from scratch with Vanilla JavaScript to master web development fundamentals.",
    longDescription:
      "A comprehensive movie database application built from scratch to master web development fundamentals. Constructed entirely with Vanilla JavaScript (no frameworks) to demonstrate deep understanding of the DOM, state management, and API integration, featuring a custom AI-driven asset pipeline.",
    techStack: ["JavaScript", "TMDB API"],
    deployedUrl: "https://iitc-b-frontend-vanilla-tim-trailers.onrender.com/",
    repoUrl: "https://github.com/YosefHayim/tim-trailers-vanilla-js",
    image: "/screenshots/tim-trailer.png",
    status: "completed",
    highlights: [
      "TMDB API integration",
      "Responsive design",
      "Pure vanilla JS",
      "Custom animations",
    ],
  },
  {
    id: "ocr-parse-ai",
    name: "OCR Parse AI",
    description:
      "Automated tool that extracts data from PDF invoices using AI, converting messy paperwork into organized data.",
    longDescription:
      "Developed an automated tool that extracts data from PDF invoices using AI. By leveraging OpenAI technology, the system accurately identifies and pulls key details—like total quantities, prices, and supplier names—converting messy paperwork into organized data. This solves a major workflow bottleneck and significantly speeds up invoice processing.",
    techStack: [
      "React",
      "Tailwind",
      "Axios",
      "TanStack Query",
      "Socket.io",
      "Playwright",
      "Husky",
      "Node.js",
      "Express",
      "Multer",
      "Sharp",
      "Tesseract.js(OCR)",
      "OpenAI API",
      "Morgan",
    ],
    deployedUrl: "https://pdf-extractor-data-helping-mom-fronted.onrender.com/",
    repoUrl: "https://github.com/YosefHayim/ai-ocr-parser-web",
    image: "/screenshots/MomTool.png",
    status: "completed",
    highlights: [
      "PDF to image conversion",
      "OCR text extraction",
      "AI-powered data parsing",
      "Real-time processing with WebSockets",
    ],
  },
  {
    id: "amazon-asin-scraper",
    name: "Amazon ASIN Scraper W/CAPTCHA",
    description:
      "Python bot using Selenium to grab ASINs from Amazon with CAPTCHA bypass.",
    longDescription:
      "Python bot using Selenium to grab ASINs from Amazon, bypass CAPTCHAs with 2Captcha, switch ZIP codes, and export to CSV.",
    techStack: ["Selenium", "2Captcha API", "Python"],
    deployedUrl: "projects",
    repoUrl:
      "https://github.com/YosefHayim/projects-with-chatgpt/tree/main/Python/09.08.2024%20-%20Amazon%20ASIN%20Collector%20%2B%20normal%20captcha",
    image: "/screenshots/amazon.png",
    status: "completed",
    highlights: [
      "Automated CAPTCHA solving",
      "ZIP code switching",
      "CSV export",
      "Bulk ASIN collection",
    ],
  },
  {
    id: "ebay-title-scraper",
    name: "eBay Sellers Title Scraper",
    description: "Python bot that scrapes product titles across pages.",
    longDescription:
      "Python bot that scrapes product titles across pages and saves them to CSV.",
    techStack: ["Selenium", "Python"],
    deployedUrl: "projects",
    repoUrl:
      "https://github.com/YosefHayim/projects-with-chatgpt/tree/main/Python/11.08.2024%20-%20eBay%20Titles%20Collector",
    image: "/screenshots/ebay.png",
    status: "completed",
    highlights: [
      "Multi-page scraping",
      "CSV export",
      "Seller title extraction",
    ],
  },
  {
    id: "harabituah-scraper",
    name: "HarABituah Government Scraper",
    description:
      "Python automation for extracting and processing customer files from government site.",
    longDescription:
      "At an insurance company in Holon, I spotted a manual process slowing things down. With zero coding background, I used ChatGPT to guide me in building a Python automation that extracted and processed customer files—saving time and cutting costs for the business.",
    techStack: ["Selenium", "Python"],
    deployedUrl: "projects",
    repoUrl:
      "https://github.com/YosefHayim/projects-with-chatgpt/tree/main/Python/19.02.2024%20-%20HarABituh-data%20read%20and%20extraction%20with%20manual%20captcha%20automation",
    image: "/screenshots/har-a-bituah.png",
    status: "completed",
    highlights: [
      "Manual CAPTCHA handling",
      "Customer data extraction",
      "Business process automation",
      "Cost savings for company",
    ],
  },
  {
    id: "stocks-trading-bots",
    name: "Stocks Trading Bots",
    description:
      "Modular Python bots running MACD, RSI, SMA, and Wyckoff strategies.",
    longDescription:
      "Started with zero coding—used ChatGPT to build modular Python bots running MACD, RSI, SMA, and Wyckoff strategies. Fully automated for live trading via Interactive Brokers API.",
    techStack: [
      "Selenium",
      "Interactive Brokers API",
      "Telegram API",
      "Python",
    ],
    deployedUrl: "projects",
    repoUrl:
      "https://github.com/YosefHayim/projects-with-chatgpt/tree/main/Python/19.11.2023%20-%20Interactive%20broker%20API%20trading%20bots",
    image: "/screenshots/interactive-brokers.png",
    status: "completed",
    highlights: [
      "Multiple trading strategies",
      "Interactive Brokers integration",
      "Telegram notifications",
      "Fully automated trading",
    ],
  },
  {
    id: "crypto-trading-bots",
    name: "Crypto Trading Bots",
    description:
      "Python bots for automated trading on Binance with RSI, MACD, and SMA strategies.",
    longDescription:
      "With no coding background, I built Python bots using ChatGPT to automate trading on Binance. Strategies included RSI, MACD, and SMA—fully hands-off and data-driven.",
    techStack: ["Selenium", "Binance API", "Telegram API", "Python"],
    deployedUrl: "projects",
    repoUrl:
      "https://github.com/YosefHayim/projects-with-chatgpt/tree/main/Python/10.28.2023%20-%20Binance%20API%20trading%20bots",
    image: "/screenshots/binance.png",
    status: "completed",
    highlights: [
      "Binance API integration",
      "Multiple trading strategies",
      "Telegram alerts",
      "Data-driven decisions",
    ],
  },
];

export const getProjectById = (id: string): Project | undefined => {
  return projects.find((project) => project.id === id);
};
