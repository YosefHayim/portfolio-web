import { ReactNode } from 'react';
import { BsFileEarmarkPdfFill } from 'react-icons/bs';
import { FaAmazon, FaEbay } from 'react-icons/fa';
import { GiPopcorn } from 'react-icons/gi';
import { RiStockLine } from 'react-icons/ri';
import { SiAlwaysdata, SiBinance, SiOpenai, SiUdemy } from 'react-icons/si';
import { TbBrandReactNative } from 'react-icons/tb';
import amazonScreenshot from '/screenshots/amazon.png';
import binanceScreenshot from '/screenshots/binance.png';
import ebayScreenshot from '/screenshots/ebay.png';
import harABituahScreenshot from '/screenshots/har-a-bituah.png';
import interactiveBrokersScreenshot from '/screenshots/interactive-brokers.png';
import momToolScreenshot from '/screenshots/MomTool.png';
import quizAiOnBoardingScreenshot from '/screenshots/quiz-ai-on-boarding.png';
import telegramScreenshot from '/screenshots/telegram.png';
import timScreenshot from '/screenshots/tim-trailer.png';
import udemyScreenshot from '/screenshots/udemy.png';
import autoBaySaasScreenshot from '/screenshots/auto-bay-saas.png';

export interface ProjectCollaborator {
  name: string;
  githubProfileLink: string;
}

export interface ProjectData {
  id: string;
  name: string;
  description: string;
  techStack: string[];
  screenshot: string;
  deployedUrl?: string;
  repoUrl: string;
  icon?: ReactNode;
  collaborators?: ProjectCollaborator[];
  status?: 'development' | 'completed';
  category: 'saas' | 'ai' | 'web' | 'scraper' | 'trading';
  featured?: boolean;
}

export const projectsData: ProjectData[] = [
  {
    id: 'autobay-saas',
    name: 'AutoBay DropShipping Saas Platform',
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
    screenshot: autoBaySaasScreenshot,
    repoUrl: 'https://github.com/orgs/AutoBay/repositories',
    status: 'development',
    category: 'saas',
    featured: true,
  },
  {
    id: 'quiz-ai-native',
    name: 'Quiz AI React Native',
    description:
      'Quiz AI application for IOS and android using React native framework with expo. Users can upload image, pdf files and even urls of youtube to parse and get american quiz based on the context provided to the ai. With a tracking system to maintain high motivation.',
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
    screenshot: quizAiOnBoardingScreenshot,
    repoUrl: 'https://github.com/YosefHayim/Quizio-AI-App',
    icon: <TbBrandReactNative className="rounded-sm bg-white p-1 text-black" size={30} />,
    status: 'development',
    category: 'ai',
    featured: true,
  },
  {
    id: 'telegram-ai-calendar',
    name: 'Telegram AI Calendar Assistant',
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
    screenshot: telegramScreenshot,
    repoUrl: 'https://github.com/YosefHayim/AI-Calendar-Agent',
    icon: <SiOpenai className="rounded-sm bg-white p-1 text-black" size={30} />,
    status: 'development',
    category: 'ai',
    featured: true,
  },
  {
    id: 'udemy-clone',
    name: 'Udemy Clone',
    description:
      "This project is a full-featured Udemy clone, built as the final capstone for our course at IITC to showcase everything we've learned.",
    techStack: ['React', 'Node.js', 'TypeScript', 'Express', 'MongoDB', 'Tailwind', 'Redux'],
    screenshot: udemyScreenshot,
    deployedUrl: 'https://udemy-clone-ron-and-ben-front.onrender.com/',
    repoUrl: 'https://github.com/YosefHayim/Udemy-Clone-Ron-Ben-IITC-2025',
    icon: <SiUdemy className="rounded-sm bg-white p-1 text-purple-500" size={30} />,
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
    category: 'web',
  },
  {
    id: 'tim-trailers',
    name: 'Tim Trailers',
    description:
      'Tim Trailers is a quirky, vanilla HTML/CSS movie trailer site where you join Tim—a popcorn prophet with a love for laughs—on a cinematic ride through curated picks, cozy vibes, and festival flair.',
    techStack: ['JavaScript', 'TMDB API'],
    screenshot: timScreenshot,
    deployedUrl: 'https://iitc-b-frontend-vanilla-tim-trailers.onrender.com/',
    repoUrl:
      'https://github.com/YosefHayim/iitc-b/tree/main/full-stack-2024/october-2024/14-10-2024/sukot-assigment',
    icon: <GiPopcorn className="rounded-sm bg-white p-1 text-red-700" size={30} />,
    status: 'completed',
    category: 'web',
  },
  {
    id: 'ocr-parse-ai',
    name: 'OCR Parse AI',
    description:
      "Built an AI-powered OCR tool to help my mom extract structured data from messy PDF invoices. Converted PDFs to images using Sharp, ran OCR with Tesseract.js, and parsed invoice data via OpenAI.",
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
    screenshot: momToolScreenshot,
    deployedUrl: 'https://pdf-extractor-data-helping-mom-fronted.onrender.com/',
    repoUrl: 'https://github.com/YosefHayim/OCR-Parse-AI',
    icon: <BsFileEarmarkPdfFill className="rounded-sm bg-white p-1 text-black" size={30} />,
    status: 'completed',
    category: 'ai',
  },
  {
    id: 'amazon-asin-scraper',
    name: 'Amazon ASIN Scraper W/CAPTCHA',
    description:
      'Developed a Python-based web scraper using Selenium to automate the collection of Amazon ASIN (Amazon Standard Identification Number) data. Integrated 2Captcha API for automatic CAPTCHA solving to ensure uninterrupted scraping operations.',
    techStack: ['Selenium', '2Captcha API'],
    screenshot: amazonScreenshot,
    repoUrl:
      'https://github.com/YosefHayim/p-w-gpt/tree/main/Python/09.08.2024%20-%20Amazon%20ASIN%20Collector%20%2B%20normal%20captcha',
    icon: <FaAmazon className="rounded-sm bg-white p-1 text-black" size={30} />,
    status: 'completed',
    category: 'scraper',
  },
  {
    id: 'ebay-sellers-scraper',
    name: 'eBay Sellers Title Scraper',
    description:
      'Engineered a Python automation tool leveraging Selenium to streamline the extraction of item titles from eBay seller listings. Designed to efficiently gather large volumes of title data for market research and competitive analysis.',
    techStack: ['Selenium'],
    screenshot: ebayScreenshot,
    repoUrl:
      'https://github.com/YosefHayim/p-w-gpt/tree/main/Python/08.08.2024%20-%20Auto%20get%20seller%20titles%20from%20ebay',
    icon: <FaEbay className="rounded-sm bg-white p-1 text-black" size={30} />,
    status: 'completed',
    category: 'scraper',
  },
  {
    id: 'har-abituah-scraper',
    name: 'HarABituah Government Scraper',
    description:
      'Created a specialized web scraping solution using Playwright for Python to automate data extraction from the HarABituah government website. Implemented to facilitate efficient collection of insurance-related information and regulatory data.',
    techStack: ['Playwright'],
    screenshot: harABituahScreenshot,
    repoUrl:
      'https://github.com/YosefHayim/p-w-gpt/tree/main/Python/har-abituah%20data%20files%20scraper%20using%20playwright',
    icon: <SiAlwaysdata className="rounded-sm bg-white p-1 text-black" size={30} />,
    status: 'completed',
    category: 'scraper',
  },
  {
    id: 'stocks-trading-bots',
    name: 'Stocks Trading Bots',
    description:
      'Developed multiple algorithmic trading bots in Python for Interactive Brokers utilizing the ib_insync library. Implemented various trading strategies including momentum-based, mean-reversion, and technical indicator-driven approaches to automate stock market trading decisions.',
    techStack: ['ib_insync'],
    screenshot: interactiveBrokersScreenshot,
    repoUrl: 'https://github.com/YosefHayim/L-S',
    icon: <RiStockLine className="rounded-sm bg-white p-1 text-black" size={30} />,
    status: 'completed',
    category: 'trading',
  },
  {
    id: 'crypto-trading-bots',
    name: 'Crypto Trading Bots',
    description:
      'Built automated cryptocurrency trading bots for Binance using Python and the python-binance library. Designed and deployed strategies focused on technical analysis, price action patterns, and market microstructure to execute trades on digital asset markets.',
    techStack: ['python-binance'],
    screenshot: binanceScreenshot,
    repoUrl: 'https://github.com/YosefHayim/L-S',
    icon: <SiBinance className="rounded-sm bg-white p-1 text-black" size={30} />,
    status: 'completed',
    category: 'trading',
  },
];

// Helper functions
export const getFeaturedProjects = () => projectsData.filter((p) => p.featured);

export const getProjectsByCategory = (category: ProjectData['category']) =>
  projectsData.filter((p) => p.category === category);

export const getProjectsByStatus = (status: ProjectData['status']) =>
  projectsData.filter((p) => p.status === status);
