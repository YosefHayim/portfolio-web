/**
 * Career Journey Data Structure
 * Represents Joseph Sabag's professional timeline as railway stations
 */

export type MilestoneCategory = 'military' | 'education' | 'work' | 'achievement';

export interface CareerMilestone {
  id: string;
  title: string;
  organization: string;
  category: MilestoneCategory;
  date: string; // e.g., "2019-2021" or "2024"
  duration?: string; // e.g., "2 years"
  description: string;
  achievements: string[];
  position: [number, number, number]; // 3D position along the track
  color: string; // Category color
  icon?: string; // Icon component name
  iconLibrary?: string;
  photos?: string[]; // Image paths
  skills?: string[]; // Skills gained
}

export interface TrackSegment {
  start: [number, number, number];
  end: [number, number, number];
  controlPoint1?: [number, number, number]; // For bezier curves
  controlPoint2?: [number, number, number];
  scenery: 'desert' | 'city' | 'tech_hub'; // Visual theme
}

// Category styling
export const milestoneCategories = {
  military: { color: '#ff6467', label: 'Military Service' },
  education: { color: '#fdc700', label: 'Education' },
  work: { color: '#00d9ff', label: 'Professional Work' },
  achievement: { color: '#05df72', label: 'Achievement' },
};

// Career milestones in chronological order
export const careerMilestones: CareerMilestone[] = [
  {
    id: 'idf-start',
    title: 'IDF Service Begins',
    organization: 'Israel Defense Forces',
    category: 'military',
    date: '2019',
    duration: '2 years',
    description: 'Started mandatory military service, developing discipline and leadership skills',
    achievements: [
      'Learned teamwork under pressure',
      'Developed problem-solving mindset',
      'Built resilience and adaptability',
    ],
    position: [0, 0, 0], // Starting point
    color: '#ff6467',
    icon: 'FaShieldAlt',
    iconLibrary: 'react-icons/fa',
    skills: ['Leadership', 'Teamwork', 'Discipline'],
  },
  {
    id: 'idf-end',
    title: 'IDF Service Completed',
    organization: 'Israel Defense Forces',
    category: 'military',
    date: '2021',
    description: 'Honorable discharge from military service with valuable life lessons',
    achievements: [
      'Completed full service term',
      'Recognized for dedication',
      'Ready for civilian career',
    ],
    position: [15, 2, -5],
    color: '#ff6467',
    icon: 'FaMedal',
    iconLibrary: 'react-icons/fa',
    skills: ['Time Management', 'Stress Management'],
  },
  {
    id: 'insurance-job',
    title: 'Insurance Company',
    organization: 'Insurance Firm',
    category: 'work',
    date: '2021-2022',
    duration: '1 year',
    description: 'First civilian role, working in insurance sector while discovering tech passion',
    achievements: [
      'Gained professional work experience',
      'Developed customer service skills',
      'Realized passion for technology',
    ],
    position: [25, 1, -12],
    color: '#00d9ff',
    icon: 'FaBriefcase',
    iconLibrary: 'react-icons/fa',
    skills: ['Communication', 'Customer Service', 'Sales'],
  },
  {
    id: 'self-study',
    title: 'Self-Taught Learning',
    organization: 'Independent Study',
    category: 'education',
    date: '2022',
    duration: '6 months',
    description: 'Intensive self-study of programming fundamentals and web development',
    achievements: [
      'Learned Python basics',
      'Built first web projects',
      'Discovered love for coding',
    ],
    position: [35, 3, -8],
    color: '#fdc700',
    icon: 'FaBook',
    iconLibrary: 'react-icons/fa',
    skills: ['Python', 'HTML', 'CSS', 'Self-Learning'],
  },
  {
    id: 'bootcamp-start',
    title: 'Coding Bootcamp Begins',
    organization: 'Appleseeds Academy',
    category: 'education',
    date: '2022',
    duration: '7 months',
    description: 'Enrolled in intensive full-stack development bootcamp',
    achievements: [
      'Mastered MERN stack',
      'Built multiple full-stack projects',
      'Collaborated in team projects',
    ],
    position: [48, 5, -15],
    color: '#fdc700',
    icon: 'FaGraduationCap',
    iconLibrary: 'react-icons/fa',
    skills: ['React', 'Node.js', 'MongoDB', 'Express'],
  },
  {
    id: 'bootcamp-excellence',
    title: 'Excellence Award',
    organization: 'Appleseeds Academy',
    category: 'achievement',
    date: '2023',
    description: 'Recognized as outstanding student for dedication and skill',
    achievements: [
      'Awarded Excellence Certificate',
      'Top performer in cohort',
      'Strong portfolio developed',
    ],
    position: [60, 7, -10],
    color: '#05df72',
    icon: 'FaTrophy',
    iconLibrary: 'react-icons/fa',
    skills: ['Full-Stack Development', 'Problem Solving'],
  },
  {
    id: 'first-dev-job',
    title: 'First Developer Position',
    organization: 'Tech Startup',
    category: 'work',
    date: '2023',
    duration: '1 year',
    description: 'Landed first professional developer role, applying bootcamp skills',
    achievements: [
      'Built production features',
      'Worked with senior developers',
      'Learned industry best practices',
    ],
    position: [75, 6, -18],
    color: '#00d9ff',
    icon: 'FaCode',
    iconLibrary: 'react-icons/fa',
    skills: ['Git', 'Agile', 'Code Review', 'Testing'],
  },
  {
    id: 'continuous-learning',
    title: 'Continuous Growth',
    organization: 'Various Platforms',
    category: 'education',
    date: '2023-2024',
    description: 'Ongoing learning through certifications and self-improvement',
    achievements: [
      'Earned 9+ certifications',
      'Mastered new technologies',
      'Built side projects',
    ],
    position: [88, 8, -12],
    color: '#fdc700',
    icon: 'FaRocket',
    iconLibrary: 'react-icons/fa',
    skills: ['TypeScript', 'Docker', 'AWS', 'CI/CD'],
  },
  {
    id: 'present',
    title: 'Present Day',
    organization: 'Joseph Sabag',
    category: 'achievement',
    date: '2025',
    description: 'Experienced full-stack developer, always trying to get better everyday',
    achievements: [
      'Strong full-stack portfolio',
      'Multiple successful projects',
      'Ready for next opportunity',
    ],
    position: [100, 10, -8],
    color: '#05df72',
    icon: 'FaStar',
    iconLibrary: 'react-icons/fa',
    skills: ['Leadership', 'Mentoring', 'Architecture'],
  },
  {
    id: 'future',
    title: 'The Future Awaits',
    organization: '???',
    category: 'achievement',
    date: '202X',
    description: 'Continuing the journey of growth and excellence',
    achievements: [
      'Senior developer role',
      'Leading tech teams',
      'Building impactful products',
    ],
    position: [115, 12, -5],
    color: '#05df72',
    icon: 'FaInfinity',
    iconLibrary: 'react-icons/fa',
    skills: ['Innovation', 'Vision', 'Impact'],
  },
];

// Railway track segments connecting milestones
export const trackSegments: TrackSegment[] = [
  // Military phase (desert scenery)
  {
    start: [0, 0, 0],
    end: [15, 2, -5],
    controlPoint1: [5, 1, -2],
    controlPoint2: [10, 1.5, -3],
    scenery: 'desert',
  },
  // Transition to civilian work (city scenery)
  {
    start: [15, 2, -5],
    end: [35, 3, -8],
    controlPoint1: [20, 2, -6],
    controlPoint2: [28, 2.5, -7],
    scenery: 'city',
  },
  // Bootcamp phase (tech hub scenery)
  {
    start: [35, 3, -8],
    end: [60, 7, -10],
    controlPoint1: [42, 4, -9],
    controlPoint2: [52, 6, -10],
    scenery: 'tech_hub',
  },
  // Professional growth
  {
    start: [60, 7, -10],
    end: [88, 8, -12],
    controlPoint1: [70, 7, -11],
    controlPoint2: [80, 7.5, -12],
    scenery: 'tech_hub',
  },
  // Present to future
  {
    start: [88, 8, -12],
    end: [115, 12, -5],
    controlPoint1: [95, 9, -10],
    controlPoint2: [105, 11, -7],
    scenery: 'tech_hub',
  },
];

// Helper functions
export const getMilestoneById = (id: string): CareerMilestone | undefined => {
  return careerMilestones.find((milestone) => milestone.id === id);
};

export const getMilestonesByCategory = (category: MilestoneCategory): CareerMilestone[] => {
  return careerMilestones.filter((milestone) => milestone.category === category);
};

export const getTotalJourneyLength = (): number => {
  // Calculate total distance along track
  return trackSegments.reduce((total, segment) => {
    const startVec = segment.start;
    const endVec = segment.end;
    const dx = endVec[0] - startVec[0];
    const dy = endVec[1] - startVec[1];
    const dz = endVec[2] - startVec[2];
    return total + Math.sqrt(dx * dx + dy * dy + dz * dz);
  }, 0);
};

export const getPositionAtProgress = (progress: number): [number, number, number] => {
  // Progress from 0 to 1 along entire track
  const totalLength = getTotalJourneyLength();
  const targetDistance = progress * totalLength;

  let accumulatedDistance = 0;
  for (const segment of trackSegments) {
    const startVec = segment.start;
    const endVec = segment.end;
    const dx = endVec[0] - startVec[0];
    const dy = endVec[1] - startVec[1];
    const dz = endVec[2] - startVec[2];
    const segmentLength = Math.sqrt(dx * dx + dy * dy + dz * dz);

    if (accumulatedDistance + segmentLength >= targetDistance) {
      const segmentProgress = (targetDistance - accumulatedDistance) / segmentLength;
      return [
        startVec[0] + dx * segmentProgress,
        startVec[1] + dy * segmentProgress,
        startVec[2] + dz * segmentProgress,
      ];
    }

    accumulatedDistance += segmentLength;
  }

  // Return last position if progress >= 1
  const lastSegment = trackSegments[trackSegments.length - 1];
  return lastSegment.end;
};
