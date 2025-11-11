/**
 * Project data for 3D Solar System visualization
 * Each project becomes a planet with unique characteristics
 */

export interface ProjectData {
  id: string;
  name: string;
  shortName: string; // For labels in 3D space
  description: string;
  techStack: string[];
  orbitRadius: number; // Distance from center (sun)
  planetSize: number; // Planet scale
  orbitSpeed: number; // Rotation speed around sun
  color: string; // Primary color for planet
  glowColor: string; // Atmospheric glow
  githubUrl: string;
  deployedUrl?: string;
  screenshot: string;
  icon?: React.ReactNode;
  collaborators?: Array<{
    name: string;
    githubProfileLink: string;
  }>;
  status: 'live' | 'development' | 'completed';
  year: number;
}

export const projectsData: ProjectData[] = [
  {
    id: 'autobay-saas',
    name: 'AutoBay DropShipping Saas Platform',
    shortName: 'AutoBay',
    description:
      'Leveraging my prior experience as an eBay seller, I am developing an Amazon to eBay dropshipping SaaS platform. This platform is engineered to mitigate common pain points encountered by sellers, integrating advanced optimizations and novel features to enhance the dropshipping workflow and maximize profit margins.',
    techStack: [
      'Next.js',
      'TypeScript',
      'Zod',
      'Playwright',
      'AWS',
      'GitHub Actions',
      'Jest',
      'Firebase',
      'Nodemailer',
      'OAuth',
      'eBay API',
      'Amazon SP-API',
      'USA USPTO Trademarks API',
      'International WIPO Patents API',
      'Stripe API',
      'PayPal API',
      'Postman',
    ],
    orbitRadius: 8,
    planetSize: 1.2,
    orbitSpeed: 0.15,
    color: '#FF9900', // Amazon orange
    glowColor: '#FFB84D',
    githubUrl: 'https://github.com/orgs/AutoBay/repositories',
    screenshot: '/screenshots/auto-bay-saas.png',
    status: 'development',
    year: 2025,
  },
  {
    id: 'quiz-ai',
    name: 'Quiz AI React Native',
    shortName: 'Quiz AI',
    description:
      'Quiz AI application for IOS and android using React native framework with expo. Users can upload image, pdf files and even urls of youtube to parse and get american quiz based on the context provided to the ai. with a tracking system to maintain high motivation.',
    techStack: [
      'React Native',
      'Native Tailwind',
      'Supabase',
      'Pdf Parse',
      'Axios',
      'Open AI Agents',
      'Open AI API',
      'Zod',
      'Express',
      'Expo',
      'TanStack',
    ],
    orbitRadius: 6.5,
    planetSize: 0.9,
    orbitSpeed: 0.2,
    color: '#61DAFB', // React blue
    glowColor: '#97E7FF',
    githubUrl: 'https://github.com/YosefHayim/Quizio-AI-App',
    screenshot: '/screenshots/quiz-ai-on-boarding.png',
    status: 'development',
    year: 2025,
  },
  {
    id: 'telegram-ai',
    name: 'Telegram AI Calendar Assistant',
    shortName: 'AI Calendar',
    description:
      'A Telegram-based AI assistant that integrates with Google Calendar to manage schedules, create events, send reminders, and provide personal productivity support directly through chat.',
    techStack: [
      'Node.js',
      'TypeScript',
      'Express',
      'Supabase',
      'OAuth',
      'Jest',
      'Grammy.js',
      'Google API',
      'Zod',
      'Validator',
      'Open AI Agents',
      'GitHub Actions',
    ],
    orbitRadius: 7,
    planetSize: 0.85,
    orbitSpeed: 0.18,
    color: '#0088CC', // Telegram blue
    glowColor: '#33A3D9',
    githubUrl: 'https://github.com/YosefHayim/AI-Calendar-Agent',
    screenshot: '/screenshots/telegram.png',
    status: 'development',
    year: 2025,
  },
  {
    id: 'udemy-clone',
    name: 'Udemy Clone',
    shortName: 'Udemy',
    description:
      "This project is a full-featured Udemy clone, built as the final capstone for our course at IITC to showcase everything we've learned.",
    techStack: [
      'React',
      'Node.js',
      'TypeScript',
      'Express',
      'MongoDB',
      'Tailwind',
      'Redux',
    ],
    orbitRadius: 5.5,
    planetSize: 0.95,
    orbitSpeed: 0.22,
    color: '#A435F0', // Udemy purple
    glowColor: '#BC5FFF',
    githubUrl: 'https://github.com/YosefHayim/Udemy-Clone-Ron-Ben-IITC-2025',
    deployedUrl: 'https://udemy-clone-ron-and-ben-front.onrender.com/',
    screenshot: '/screenshots/udemy.png',
    collaborators: [
      {
        name: 'Ron Sherling',
        githubProfileLink: 'https://github.com/ron959',
      },
      {
        name: 'Ben Klinski',
        githubProfileLink: 'https://github.com/Ben-Kilinski',
      },
    ],
    status: 'completed',
    year: 2025,
  },
  {
    id: 'tim-trailers',
    name: 'Tim Trailers',
    shortName: 'Tim',
    description:
      'Tim Trailers is a quirky, vanilla HTML/CSS movie trailer site where you join Tim—a popcorn prophet with a love for laughs—on a cinematic ride through curated picks, cozy vibes, and festival flair.',
    techStack: ['JavaScript', 'TMDB API'],
    orbitRadius: 4,
    planetSize: 0.7,
    orbitSpeed: 0.28,
    color: '#E50914', // Netflix red
    glowColor: '#FF4757',
    githubUrl:
      'https://github.com/YosefHayim/iitc-b/tree/main/full-stack-2024/october-2024/14-10-2024/sukot-assigment',
    deployedUrl: 'https://iitc-b-frontend-vanilla-tim-trailers.onrender.com/',
    screenshot: '/screenshots/tim-trailer.png',
    status: 'completed',
    year: 2024,
  },
  {
    id: 'ocr-parse-ai',
    name: 'OCR Parse AI',
    shortName: 'OCR AI',
    description:
      "Built an AI-powered OCR tool to help my mom extract structured data from messy PDF invoices. Flow: Converted PDFs to images using Sharp, Ran OCR with Tesseract.js, Parsed invoice data via OpenAI.",
    techStack: [
      'React',
      'Tailwind',
      'Axios',
      'TanStack Query',
      'Socket.io',
      'Playwright',
      'Husky',
      'Node.js',
      'Express',
      'Multer',
      'Sharp',
      'Tesseract.js(OCR)',
      'OpenAI API',
      'Morgan',
    ],
    orbitRadius: 5,
    planetSize: 0.8,
    orbitSpeed: 0.25,
    color: '#10A37F', // OpenAI green
    glowColor: '#1FBF9A',
    githubUrl: 'https://github.com/YosefHayim/OCR-Parse-AI',
    deployedUrl:
      'https://pdf-extractor-data-helping-mom-fronted.onrender.com/',
    screenshot: '/screenshots/MomTool.png',
    status: 'completed',
    year: 2024,
  },
  {
    id: 'amazon-scraper',
    name: 'Amazon ASIN Scraper W/CAPTCHA',
    shortName: 'Amazon Bot',
    description:
      'Python bot using Selenium to grab ASINs from Amazon, bypass CAPTCHAs with 2Captcha, switch ZIP codes, and export to CSV.',
    techStack: ['Selenium', '2Captcha API'],
    orbitRadius: 6,
    planetSize: 0.65,
    orbitSpeed: 0.2,
    color: '#FF9900',
    glowColor: '#FFB84D',
    githubUrl:
      'https://github.com/YosefHayim/p-w-gpt/tree/main/Python/09.08.2024%20-%20Amazon%20ASIN%20Collector%20%2B%20normal%20captcha',
    screenshot: '/screenshots/amazon.png',
    status: 'completed',
    year: 2024,
  },
  {
    id: 'ebay-scraper',
    name: 'eBay Sellers Title Scraper',
    shortName: 'eBay Bot',
    description:
      'Python bot that scrapes product titles across pages and saves them to CSV.',
    techStack: ['Selenium'],
    orbitRadius: 3.5,
    planetSize: 0.6,
    orbitSpeed: 0.32,
    color: '#E53238', // eBay red
    glowColor: '#FF5A5F',
    githubUrl:
      'https://github.com/YosefHayim/p-w-gpt/tree/main/Python/11.08.2024%20-%20eBay%20Titles%20Collector',
    screenshot: '/screenshots/ebay.png',
    status: 'completed',
    year: 2024,
  },
  {
    id: 'har-a-bituah',
    name: 'HarABituah Government Scraper',
    shortName: 'Insurance Bot',
    description:
      'At an insurance company in Holon, I spotted a manual process slowing things down. With zero coding background, I used ChatGPT to guide me in building a Python automation that extracted and processed customer files—saving time and cutting costs for the business.',
    techStack: ['Selenium'],
    orbitRadius: 4.5,
    planetSize: 0.7,
    orbitSpeed: 0.26,
    color: '#0052CC', // Blue
    glowColor: '#3383FF',
    githubUrl:
      'https://github.com/YosefHayim/p-w-gpt/tree/main/Python/19.02.2024%20-%20HarABituh-data%20read%20and%20extraction%20with%20manual%20captcha%20automation',
    screenshot: '/screenshots/har-a-bituah.png',
    status: 'completed',
    year: 2024,
  },
  {
    id: 'stock-trading-bots',
    name: 'Stocks Trading Bots',
    shortName: 'Stock Bots',
    description:
      'Started with zero coding—used ChatGPT to build modular Python bots running MACD, RSI, SMA, and Wyckoff strategies. Fully automated for live trading via Interactive Brokers API.',
    techStack: ['Selenium', 'Interactive Brokers API', 'Telegram API'],
    orbitRadius: 9,
    planetSize: 0.75,
    orbitSpeed: 0.13,
    color: '#00C853', // Green for stocks
    glowColor: '#00E676',
    githubUrl:
      'https://github.com/YosefHayim/p-w-gpt/tree/main/Python/19.11.2023%20-%20Interactive%20broker%20API%20trading%20bots',
    screenshot: '/screenshots/interactive-brokers.png',
    status: 'completed',
    year: 2023,
  },
  {
    id: 'crypto-trading-bots',
    name: 'Crypto Trading Bots',
    shortName: 'Crypto Bots',
    description:
      'With no coding background, I built Python bots using ChatGPT to automate trading on Binance. Strategies included RSI, MACD, and SMA—fully hands-off and data-driven.',
    techStack: ['Selenium', 'Binance API', 'Telegram API'],
    orbitRadius: 10,
    planetSize: 0.8,
    orbitSpeed: 0.12,
    color: '#F0B90B', // Binance yellow
    glowColor: '#FDD835',
    githubUrl:
      'https://github.com/YosefHayim/p-w-gpt/tree/main/Python/10.28.2023%20-%20Binance%20API%20trading%20bots',
    screenshot: '/screenshots/binance.png',
    status: 'completed',
    year: 2023,
  },
];

// Central "sun" representing core skills
export const sunData = {
  size: 2,
  color: '#05df72', // Neon green
  glowColor: '#05df72',
  glowIntensity: 2,
  name: 'Core Skills',
  skills: [
    'Full-Stack Development',
    'Problem Solving',
    'Automation',
    'AI Integration',
    'API Development',
  ],
};
