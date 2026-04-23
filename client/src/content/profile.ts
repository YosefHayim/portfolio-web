export type RecruiterMetric = {
 label: string;
 value: string;
};

export type RecruiterCertification = {
 id: string;
 title: string;
 issuer: string;
 date: string;
 link: string;
};

export type ImpactHighlight = {
 id: string;
 label: string;
 value: string;
};

export type ExperienceItem = {
 id: string;
 company: string;
 role: string;
 companyUrl?: string;
 logoUrl?: string;
 logoMonogram?: string;
 dateRange: string;
 bullets: string[];
};

export type FeaturedOffGitHubProject = {
 id: string;
 name: string;
 url?: string;
 logoUrl?: string;
 logoMonogram?: string;
 description: string;
 status: string;
 dateRange: string;
 techStack: string[];
};

export const recruiterProfile = {
 name: "Joseph Sabag",
 role: "AI Software Engineer",
 shortBio:
 "I build practical AI and full-stack products that automate real workflows, reduce manual work, and ship fast with production reliability, including improvements on systems serving 83M+ requests daily, a zero-data-loss migration of 10 years of data, products reaching 500+ active users, and delivery of production iOS apps.",
 githubUsername: "YosefHayim",
 linkedinUrl: "https://www.linkedin.com/in/yosef-hayim-sabag/",
 whatsappUrl: "https://wa.me/546187549",
 contactEmail: "",
 resumeUrl:
 "https://docs.google.com/document/d/1oMcChoLpNMrr-E8fcXUsb7RED5yXZ9J1mUCjcjGTUlw/edit?tab=t.0",
};

export const recruiterMetrics: RecruiterMetric[] = [
 { label: "Public Repositories", value: "Live from GitHub" },
 { label: "Open-Source Focus", value: "Shipping weekly" },
 { label: "Core Stack", value: "React + Node + TS + AI" },
];

export const coreTechStack: string[] = [
 "TypeScript",
 "React",
 "Next.js",
 "Node.js",
 "Express",
 "Python",
 "PostgreSQL",
 "MongoDB",
 "Tailwind CSS",
 "Playwright",
 "Docker",
 "AWS",
];

export const experienceItems: ExperienceItem[] = [
 {
 id: "predicto",
 company: "Predicto AI",
 role: "Software Engineer",
 companyUrl: "https://www.linkedin.com/company/predicto-ai/posts/?feedView=all",
 logoUrl: "https://predicto.ai/logo.png",
 logoMonogram: "PA",
 dateRange: "Jul 2025 - May 2026",
 bullets: [
 "Fixed bugs and shipped production features on the buying platform with React 18.",
 "Executed a zero-data-loss migration of 10 years of production data to Cloudflare.",
 "Built a CMS theme and improved tooling to help protect ad revenue quality.",
 ],
 },
 {
 id: "wotch",
 company: "Wotch Health",
 role: "Software Engineer Intern",
 companyUrl: "https://www.linkedin.com/company/wotch-health/",
 logoUrl: "https://wotch.health/logo.png",
 logoMonogram: "WH",
 dateRange: "Feb 2025 - Apr 2025",
 bullets: [
 "Optimized CI/CD and test workflows for real-time healthcare delivery.",
 "Engineered WebSocket testing coverage with Jest and Playwright.",
 "Built a production debugging tool that masks sensitive patient data.",
 ],
 },
];

export const featuredOffGitHubProjects: FeaturedOffGitHubProject[] = [
 {
 id: "small-bites",
 name: "SmallBites",
 url: "https://apps.apple.com/ca/app/small-bites/id6759283694",
 logoUrl: "https://www.apple.com/apple-touch-icon.png",
 logoMonogram: "SB",
 description:
 "Ditch the puree panic. SmallBites helps parents start solids with confidence through expert-led BLW guidance, a 400+ first-food database, personalized meal plans, progress tracking, and 300+ practical recipes.",
 status: "Published",
 dateRange: "2026",
 techStack: ["React Native", "Expo", "NestJS", "CI/CD"],
 },
 {
 id: "wise-note-taker",
 name: "WiseNoteTaker",
 logoUrl: "https://www.apple.com/apple-touch-icon.png",
 logoMonogram: "WN",
 description:
 "Professional AI meeting-notes app that records, transcribes, and summarizes conversations in one tap, turning raw voice recordings into accurate, structured, and actionable notes for teams, professionals, and students.",
 status: "In Review",
 dateRange: "2026",
 techStack: ["React Native", "Expo", "NestJS", "CI/CD"],
 },
];

export const recruiterCertifications: RecruiterCertification[] = [
 {
 id: "github-actions",
 title: "GitHub Actions - The Complete Guide",
 issuer: "Udemy",
 date: "Sep 2025",
 link: "https://www.udemy.com/certificate/UC-6da4399d-15db-4b8c-84ec-3b56953a0766/",
 },
 {
 id: "nextjs",
 title: "Next.js App Router Fundamentals",
 issuer: "Vercel",
 date: "Sep 2025",
 link: "https://www.linkedin.com/in/yosef-hayim-sabag/details/certifications/1758366776092/single-media-viewer/?profileId=ACoAADtj-18BDUMzABOGjZh335dfWV5OYcgy63g",
 },
 {
 id: "react-native",
 title: "React Native - The Practical Guide [2025]",
 issuer: "Udemy",
 date: "Jun 2025",
 link: "https://www.udemy.com/certificate/UC-fb20f1dd-ba51-4300-b378-b46c170f30b8/",
 },
 {
 id: "nodejs-bootcamp",
 title: "Node.js, Express, MongoDB and More Bootcamp",
 issuer: "Udemy",
 date: "Feb 2025",
 link: "https://www.udemy.com/certificate/UC-830343b5-2bb6-44ae-baf3-af70748ea84c/",
 },
 {
 id: "python-bootcamp",
 title: "100 Days of Code: Complete Python Pro Bootcamp",
 issuer: "Udemy",
 date: "Oct 2024",
 link: "https://www.udemy.com/certificate/UC-65f92c9d-6851-4700-9ced-8cfa8d192b41/",
 },
];
