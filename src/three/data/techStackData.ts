/**
 * Tech Stack data for 3D Constellation visualization
 * Technologies positioned as stars in 3D space, grouped by category
 */

import { ReactNode } from 'react';

export type TechnologySize = 'small' | 'medium' | 'large';
export type TechnologyCategory = 'languages' | 'frontend' | 'backend' | 'databases' | 'devops' | 'tools';

export interface Technology {
  id: string;
  name: string;
  category: TechnologyCategory;
  proficiencyLevel: number; // 1-10
  yearsExperience: number;
  size: TechnologySize;
  position: [number, number, number]; // x, y, z in 3D space
  icon?: string; // Icon component name
  iconLibrary?: string; // react-icons library
  customIconPath?: string; // For custom SVGs
  description?: string;
  projectsUsed?: string[]; // Project IDs that use this tech
}

export interface CategoryData {
  name: TechnologyCategory;
  color: string;
  glowColor: string;
  centerPosition: [number, number, number];
  technologies: Technology[];
}

export interface TechConnection {
  from: string; // Technology ID
  to: string; // Technology ID
  strength: 'primary' | 'secondary'; // Line brightness
}

// Technology definitions
const technologies: Technology[] = [
  // LANGUAGES (Center)
  {
    id: 'javascript',
    name: 'JavaScript',
    category: 'languages',
    proficiencyLevel: 9,
    yearsExperience: 3,
    size: 'large',
    position: [-2, 0, 0],
    icon: 'FaJs',
    iconLibrary: 'react-icons/fa',
  },
  {
    id: 'python',
    name: 'Python',
    category: 'languages',
    proficiencyLevel: 7,
    yearsExperience: 2,
    size: 'medium',
    position: [2, 0, 0],
    icon: 'SiPython',
    iconLibrary: 'react-icons/si',
  },

  // FRONTEND (Left-front cluster)
  {
    id: 'react',
    name: 'React',
    category: 'frontend',
    proficiencyLevel: 9,
    yearsExperience: 2,
    size: 'large',
    position: [-15, 5, -10],
    icon: 'FaReact',
    iconLibrary: 'react-icons/fa',
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    category: 'frontend',
    proficiencyLevel: 9,
    yearsExperience: 2,
    size: 'large',
    position: [-13, 7, -8],
    icon: 'SiTypescript',
    iconLibrary: 'react-icons/si',
  },
  {
    id: 'react-native',
    name: 'React Native',
    category: 'frontend',
    proficiencyLevel: 7,
    yearsExperience: 1,
    size: 'medium',
    position: [-17, 3, -12],
    icon: 'FaReact',
    iconLibrary: 'react-icons/fa',
  },
  {
    id: 'tailwind',
    name: 'Tailwind',
    category: 'frontend',
    proficiencyLevel: 9,
    yearsExperience: 2,
    size: 'medium',
    position: [-12, 6, -13],
    icon: 'RiTailwindCssFill',
    iconLibrary: 'react-icons/ri',
  },
  {
    id: 'html',
    name: 'HTML',
    category: 'frontend',
    proficiencyLevel: 9,
    yearsExperience: 3,
    size: 'medium',
    position: [-18, 7, -9],
    icon: 'SiHtml5',
    iconLibrary: 'react-icons/si',
  },
  {
    id: 'css',
    name: 'CSS',
    category: 'frontend',
    proficiencyLevel: 8,
    yearsExperience: 3,
    size: 'medium',
    position: [-16, 8, -11],
    icon: 'IoLogoCss3',
    iconLibrary: 'react-icons/io5',
  },
  {
    id: 'axios',
    name: 'Axios',
    category: 'frontend',
    proficiencyLevel: 8,
    yearsExperience: 2,
    size: 'small',
    position: [-14, 4, -9],
    icon: 'SiAxios',
    iconLibrary: 'react-icons/si',
  },
  {
    id: 'shadcn-ui',
    name: 'Shadcn UI',
    category: 'frontend',
    proficiencyLevel: 8,
    yearsExperience: 1,
    size: 'small',
    position: [-11, 8, -12],
    icon: 'SiShadcnui',
    iconLibrary: 'react-icons/si',
  },
  {
    id: 'react-router',
    name: 'React Router',
    category: 'frontend',
    proficiencyLevel: 9,
    yearsExperience: 2,
    size: 'small',
    position: [-13, 3, -11],
    icon: 'SiReactrouter',
    iconLibrary: 'react-icons/si',
  },
  {
    id: 'zustand',
    name: 'Zustand',
    category: 'frontend',
    proficiencyLevel: 7,
    yearsExperience: 1,
    size: 'small',
    position: [-16, 5, -8],
    icon: 'GiBearFace',
    iconLibrary: 'react-icons/gi',
  },
  {
    id: 'react-query',
    name: 'React Query',
    category: 'frontend',
    proficiencyLevel: 7,
    yearsExperience: 1,
    size: 'small',
    position: [-14, 7, -13],
    icon: 'SiReactquery',
    iconLibrary: 'react-icons/si',
  },
  {
    id: 'redux',
    name: 'Redux',
    category: 'frontend',
    proficiencyLevel: 7,
    yearsExperience: 1,
    size: 'small',
    position: [-17, 6, -10],
    icon: 'SiRedux',
    iconLibrary: 'react-icons/si',
  },
  {
    id: 'mui',
    name: 'MUI',
    category: 'frontend',
    proficiencyLevel: 6,
    yearsExperience: 1,
    size: 'small',
    position: [-12, 4, -10],
    icon: 'SiMui',
    iconLibrary: 'react-icons/si',
  },
  {
    id: 'storybook',
    name: 'Storybook',
    category: 'frontend',
    proficiencyLevel: 6,
    yearsExperience: 1,
    size: 'small',
    position: [-15, 9, -12],
    icon: 'SiStorybook',
    iconLibrary: 'react-icons/si',
  },
  {
    id: 'playwright',
    name: 'Playwright',
    category: 'frontend',
    proficiencyLevel: 7,
    yearsExperience: 1,
    size: 'small',
    position: [-13, 9, -9],
    icon: 'FaTheaterMasks',
    iconLibrary: 'react-icons/fa',
  },
  {
    id: 'zod',
    name: 'Zod',
    category: 'frontend',
    proficiencyLevel: 8,
    yearsExperience: 1,
    size: 'small',
    position: [-11, 5, -11],
    icon: 'SiZod',
    iconLibrary: 'react-icons/si',
  },

  // BACKEND (Right-center cluster)
  {
    id: 'nodejs',
    name: 'Node.js',
    category: 'backend',
    proficiencyLevel: 9,
    yearsExperience: 2,
    size: 'large',
    position: [15, 0, -5],
    icon: 'FaNodeJs',
    iconLibrary: 'react-icons/fa',
  },
  {
    id: 'express',
    name: 'Express',
    category: 'backend',
    proficiencyLevel: 9,
    yearsExperience: 2,
    size: 'large',
    position: [17, 2, -7],
    icon: 'SiExpress',
    iconLibrary: 'react-icons/si',
  },
  {
    id: 'jwt',
    name: 'JWT',
    category: 'backend',
    proficiencyLevel: 8,
    yearsExperience: 2,
    size: 'small',
    position: [16, -2, -6],
    icon: 'SiJsonwebtokens',
    iconLibrary: 'react-icons/si',
  },
  {
    id: 'bcrypt',
    name: 'Bcrypt',
    category: 'backend',
    proficiencyLevel: 7,
    yearsExperience: 2,
    size: 'small',
    position: [14, 2, -4],
    icon: 'SiLetsencrypt',
    iconLibrary: 'react-icons/si',
  },
  {
    id: 'mongoose',
    name: 'Mongoose',
    category: 'backend',
    proficiencyLevel: 8,
    yearsExperience: 2,
    size: 'small',
    position: [18, 1, -5],
    icon: 'SiMongoose',
    iconLibrary: 'react-icons/si',
  },
  {
    id: 'sharp',
    name: 'Sharp',
    category: 'backend',
    proficiencyLevel: 6,
    yearsExperience: 1,
    size: 'small',
    position: [15, -3, -7],
    icon: 'SiSharp',
    iconLibrary: 'react-icons/si',
  },
  {
    id: 'paypal-api',
    name: 'PayPal API',
    category: 'backend',
    proficiencyLevel: 6,
    yearsExperience: 1,
    size: 'small',
    position: [13, 1, -6],
    icon: 'ImPaypal',
    iconLibrary: 'react-icons/im',
  },
  {
    id: 'google-auth',
    name: 'Google Auth',
    category: 'backend',
    proficiencyLevel: 7,
    yearsExperience: 1,
    size: 'small',
    position: [17, -1, -4],
    icon: 'FaGoogle',
    iconLibrary: 'react-icons/fa',
  },
  {
    id: 'ebay-api',
    name: 'eBay API',
    category: 'backend',
    proficiencyLevel: 8,
    yearsExperience: 2,
    size: 'small',
    position: [14, 3, -7],
    icon: 'FaEbay',
    iconLibrary: 'react-icons/fa',
  },
  {
    id: 'grammy-js',
    name: 'Grammy.js',
    category: 'backend',
    proficiencyLevel: 7,
    yearsExperience: 1,
    size: 'small',
    position: [16, 3, -8],
    icon: 'LiaTelegramPlane',
    iconLibrary: 'react-icons/lia',
  },

  // DATABASES (Right-bottom-back cluster)
  {
    id: 'mongodb',
    name: 'MongoDB',
    category: 'databases',
    proficiencyLevel: 9,
    yearsExperience: 2,
    size: 'large',
    position: [10, -8, 8],
    icon: 'SiMongodb',
    iconLibrary: 'react-icons/si',
  },
  {
    id: 'postgresql',
    name: 'PostgreSQL',
    category: 'databases',
    proficiencyLevel: 7,
    yearsExperience: 1,
    size: 'medium',
    position: [12, -10, 10],
    icon: 'BiLogoPostgresql',
    iconLibrary: 'react-icons/bi',
  },
  {
    id: 'sql',
    name: 'SQL',
    category: 'databases',
    proficiencyLevel: 8,
    yearsExperience: 2,
    size: 'medium',
    position: [8, -9, 9],
    icon: 'ImDatabase',
    iconLibrary: 'react-icons/im',
  },
  {
    id: 'firebase',
    name: 'Firebase',
    category: 'databases',
    proficiencyLevel: 7,
    yearsExperience: 1,
    size: 'small',
    position: [11, -7, 7],
    icon: 'IoLogoFirebase',
    iconLibrary: 'react-icons/io5',
  },
  {
    id: 'supabase',
    name: 'Supabase',
    category: 'databases',
    proficiencyLevel: 7,
    yearsExperience: 1,
    size: 'small',
    position: [9, -11, 11],
    icon: 'RiFlashlightFill',
    iconLibrary: 'react-icons/ri',
  },

  // DEVOPS (Left-bottom-back cluster)
  {
    id: 'github-actions',
    name: 'GitHub Actions',
    category: 'devops',
    proficiencyLevel: 7,
    yearsExperience: 1,
    size: 'small',
    position: [-10, -5, 10],
    icon: 'VscGithubAction',
    iconLibrary: 'react-icons/vsc',
  },
  {
    id: 'aws',
    name: 'AWS',
    category: 'devops',
    proficiencyLevel: 6,
    yearsExperience: 1,
    size: 'medium',
    position: [-12, -7, 12],
    icon: 'FaAws',
    iconLibrary: 'react-icons/fa',
  },
  {
    id: 'docker',
    name: 'Docker',
    category: 'devops',
    proficiencyLevel: 7,
    yearsExperience: 1,
    size: 'medium',
    position: [-8, -6, 11],
    icon: 'GrDocker',
    iconLibrary: 'react-icons/gr',
  },

  // TOOLS (Top-center cluster)
  {
    id: 'git',
    name: 'Git',
    category: 'tools',
    proficiencyLevel: 9,
    yearsExperience: 2,
    size: 'large',
    position: [0, 12, 5],
    icon: 'FaGitAlt',
    iconLibrary: 'react-icons/fa',
  },
  {
    id: 'jira',
    name: 'Jira',
    category: 'tools',
    proficiencyLevel: 7,
    yearsExperience: 1,
    size: 'small',
    position: [-2, 14, 6],
    icon: 'SiJira',
    iconLibrary: 'react-icons/si',
  },
  {
    id: 'postman',
    name: 'Postman',
    category: 'tools',
    proficiencyLevel: 8,
    yearsExperience: 2,
    size: 'small',
    position: [2, 13, 4],
    icon: 'SiPostman',
    iconLibrary: 'react-icons/si',
  },
];

// Category metadata
export const categories: Record<TechnologyCategory, Omit<CategoryData, 'technologies'>> = {
  languages: {
    name: 'languages',
    color: '#fdc700',
    glowColor: '#fdc700',
    centerPosition: [0, 0, 0],
  },
  frontend: {
    name: 'frontend',
    color: '#05df72',
    glowColor: '#05df72',
    centerPosition: [-15, 5, -10],
  },
  backend: {
    name: 'backend',
    color: '#00d9ff',
    glowColor: '#00d9ff',
    centerPosition: [15, 0, -5],
  },
  databases: {
    name: 'databases',
    color: '#a855f7',
    glowColor: '#a855f7',
    centerPosition: [10, -8, 8],
  },
  devops: {
    name: 'devops',
    color: '#ff6467',
    glowColor: '#ff6467',
    centerPosition: [-10, -6, 10],
  },
  tools: {
    name: 'tools',
    color: '#e0e0e0',
    glowColor: '#e0e0e0',
    centerPosition: [0, 12, 5],
  },
};

// Technology connections (showing relationships)
export const connections: TechConnection[] = [
  // Frontend Core
  { from: 'react', to: 'typescript', strength: 'primary' },
  { from: 'react', to: 'react-router', strength: 'primary' },
  { from: 'react', to: 'tailwind', strength: 'primary' },
  { from: 'react', to: 'shadcn-ui', strength: 'primary' },
  { from: 'typescript', to: 'zod', strength: 'primary' },
  { from: 'react', to: 'axios', strength: 'primary' },

  // State Management
  { from: 'react', to: 'zustand', strength: 'secondary' },
  { from: 'react', to: 'redux', strength: 'secondary' },
  { from: 'react', to: 'react-query', strength: 'secondary' },

  // Backend Core
  { from: 'nodejs', to: 'express', strength: 'primary' },
  { from: 'express', to: 'jwt', strength: 'primary' },
  { from: 'express', to: 'mongoose', strength: 'primary' },
  { from: 'nodejs', to: 'mongoose', strength: 'secondary' },

  // Database Connections
  { from: 'mongoose', to: 'mongodb', strength: 'primary' },
  { from: 'nodejs', to: 'mongodb', strength: 'secondary' },
  { from: 'nodejs', to: 'postgresql', strength: 'secondary' },
  { from: 'nodejs', to: 'firebase', strength: 'secondary' },
  { from: 'nodejs', to: 'supabase', strength: 'secondary' },

  // DevOps
  { from: 'docker', to: 'aws', strength: 'secondary' },
  { from: 'github-actions', to: 'aws', strength: 'secondary' },
  { from: 'git', to: 'github-actions', strength: 'primary' },

  // Languages to Frameworks
  { from: 'javascript', to: 'react', strength: 'primary' },
  { from: 'javascript', to: 'nodejs', strength: 'primary' },
  { from: 'typescript', to: 'react', strength: 'primary' },
  { from: 'typescript', to: 'nodejs', strength: 'secondary' },

  // Testing/Tools
  { from: 'react', to: 'playwright', strength: 'secondary' },
  { from: 'react', to: 'storybook', strength: 'secondary' },
  { from: 'postman', to: 'express', strength: 'secondary' },
];

// Export organized data
export const techStackData = technologies;

// Helper function to get technologies by category
export const getTechnologiesByCategory = (category: TechnologyCategory): Technology[] => {
  return technologies.filter((tech) => tech.category === category);
};

// Helper function to get technology by ID
export const getTechnologyById = (id: string): Technology | undefined => {
  return technologies.find((tech) => tech.id === id);
};

// Size mapping for 3D rendering
export const sizeMap: Record<TechnologySize, number> = {
  small: 0.8,
  medium: 1.2,
  large: 1.8,
};
