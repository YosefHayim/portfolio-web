/**
 * Certifications Data Structure
 * Represents Joseph Sabag's certifications as 3D trophies and certificates
 */

export type CertificationType = 'bootcamp' | 'course' | 'achievement' | 'certification';

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  type: CertificationType;
  date: string; // e.g., "2023" or "2023-06"
  credentialId?: string;
  verificationUrl?: string;
  description: string;
  skills: string[];
  position: [number, number, number]; // 3D position in display case
  color: string; // Category color
  icon?: string; // Icon component name
  iconLibrary?: string;
  isFeatured?: boolean; // Display on rotating platform
  imageUrl?: string; // Certificate image
}

// Certification type styling
export const certificationTypes = {
  bootcamp: { color: '#05df72', label: 'Bootcamp Graduate' },
  course: { color: '#00d9ff', label: 'Course Completion' },
  achievement: { color: '#fdc700', label: 'Achievement Award' },
  certification: { color: '#a855f7', label: 'Professional Certification' },
};

// Certifications data
export const certifications: Certification[] = [
  {
    id: 'appleseeds-fullstack',
    title: 'Full-Stack Development Bootcamp',
    issuer: 'Appleseeds Academy',
    type: 'bootcamp',
    date: '2023',
    description: 'Intensive 7-month bootcamp covering MERN stack, React, Node.js, MongoDB, and modern web development',
    skills: ['React', 'Node.js', 'MongoDB', 'Express', 'JavaScript', 'HTML/CSS'],
    position: [0, 2, 0], // Center, featured position
    color: '#05df72',
    icon: 'FaGraduationCap',
    iconLibrary: 'react-icons/fa',
    isFeatured: true,
  },
  {
    id: 'appleseeds-excellence',
    title: 'Excellence Award',
    issuer: 'Appleseeds Academy',
    type: 'achievement',
    date: '2023',
    description: 'Recognized as outstanding student for exceptional dedication, skill, and performance during bootcamp',
    skills: ['Leadership', 'Problem Solving', 'Teamwork', 'Excellence'],
    position: [4, 1.5, -2],
    color: '#fdc700',
    icon: 'FaTrophy',
    iconLibrary: 'react-icons/fa',
    isFeatured: false,
  },
  {
    id: 'javascript-advanced',
    title: 'Advanced JavaScript',
    issuer: 'Udemy',
    type: 'course',
    date: '2022',
    description: 'Deep dive into modern JavaScript, ES6+, asynchronous programming, and design patterns',
    skills: ['JavaScript', 'ES6+', 'Async/Await', 'Promises', 'Design Patterns'],
    position: [-4, 1, -2],
    color: '#00d9ff',
    icon: 'FaJs',
    iconLibrary: 'react-icons/fa',
    isFeatured: false,
  },
  {
    id: 'react-complete',
    title: 'React - The Complete Guide',
    issuer: 'Udemy',
    type: 'course',
    date: '2023',
    description: 'Comprehensive React course covering hooks, context, Redux, Next.js, and modern React patterns',
    skills: ['React', 'Redux', 'Next.js', 'React Hooks', 'Context API'],
    position: [4, 1, 2],
    color: '#00d9ff',
    icon: 'FaReact',
    iconLibrary: 'react-icons/fa',
    isFeatured: false,
  },
  {
    id: 'nodejs-mastery',
    title: 'Node.js Mastery',
    issuer: 'Udemy',
    type: 'course',
    date: '2023',
    description: 'Master Node.js, Express, MongoDB, REST APIs, authentication, and backend architecture',
    skills: ['Node.js', 'Express', 'MongoDB', 'REST API', 'Authentication'],
    position: [-4, 1, 2],
    color: '#00d9ff',
    icon: 'FaNodeJs',
    iconLibrary: 'react-icons/fa',
    isFeatured: false,
  },
  {
    id: 'typescript-fundamentals',
    title: 'TypeScript Fundamentals',
    issuer: 'Udemy',
    type: 'course',
    date: '2024',
    description: 'Learn TypeScript from basics to advanced types, generics, and integration with React',
    skills: ['TypeScript', 'Types', 'Generics', 'Type Guards', 'Advanced Types'],
    position: [0, 0.5, -3],
    color: '#00d9ff',
    icon: 'SiTypescript',
    iconLibrary: 'react-icons/si',
    isFeatured: false,
  },
  {
    id: 'docker-kubernetes',
    title: 'Docker & Kubernetes',
    issuer: 'Udemy',
    type: 'course',
    date: '2024',
    description: 'Container orchestration, Docker basics, Kubernetes deployment, and microservices architecture',
    skills: ['Docker', 'Kubernetes', 'Containers', 'Microservices', 'DevOps'],
    position: [3, 0.5, 3],
    color: '#00d9ff',
    icon: 'FaDocker',
    iconLibrary: 'react-icons/fa',
    isFeatured: false,
  },
  {
    id: 'aws-cloud',
    title: 'AWS Cloud Practitioner',
    issuer: 'Amazon Web Services',
    type: 'certification',
    date: '2024',
    description: 'Foundational AWS cloud knowledge, services, architecture, and best practices',
    skills: ['AWS', 'Cloud Computing', 'S3', 'EC2', 'Lambda', 'Cloud Architecture'],
    position: [-3, 0.5, 3],
    color: '#a855f7',
    icon: 'FaAws',
    iconLibrary: 'react-icons/fa',
    isFeatured: false,
  },
  {
    id: 'git-github',
    title: 'Git & GitHub Mastery',
    issuer: 'Udemy',
    type: 'course',
    date: '2022',
    description: 'Version control, Git workflows, branching strategies, collaboration, and GitHub features',
    skills: ['Git', 'GitHub', 'Version Control', 'Collaboration', 'CI/CD'],
    position: [0, 0.5, 3],
    color: '#00d9ff',
    icon: 'FaGithub',
    iconLibrary: 'react-icons/fa',
    isFeatured: false,
  },
  {
    id: 'web-design',
    title: 'Modern Web Design',
    issuer: 'Udemy',
    type: 'course',
    date: '2023',
    description: 'UI/UX principles, responsive design, Tailwind CSS, and modern design patterns',
    skills: ['UI/UX', 'Tailwind CSS', 'Responsive Design', 'Design Patterns'],
    position: [0, 0, -4],
    color: '#00d9ff',
    icon: 'FaPaintBrush',
    iconLibrary: 'react-icons/fa',
    isFeatured: false,
  },
];

// Helper functions
export const getCertificationById = (id: string): Certification | undefined => {
  return certifications.find((cert) => cert.id === id);
};

export const getCertificationsByType = (type: CertificationType): Certification[] => {
  return certifications.filter((cert) => cert.type === type);
};

export const getFeaturedCertification = (): Certification | undefined => {
  return certifications.find((cert) => cert.isFeatured);
};

export const getTotalCertifications = (): number => {
  return certifications.length;
};

export const getCertificationStats = () => {
  return {
    total: certifications.length,
    bootcamps: getCertificationsByType('bootcamp').length,
    courses: getCertificationsByType('course').length,
    achievements: getCertificationsByType('achievement').length,
    professionalCerts: getCertificationsByType('certification').length,
  };
};
