import {
  ArrowRight,
  Award,
  BookOpen,
  FolderKanban,
  Heart,
  Home,
  Layers,
  Lightbulb,
  Package,
  Sparkles,
  User,
  Users,
} from "lucide-react";
import { Link } from "react-router";
import { useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import Logo from "../Logo/Logo";
import { SocialIcons, type IconItem } from "../ui/social-icons";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "../ui/tooltip";

const CURRENT_YEAR = new Date().getFullYear();
const ANIMATION_DELAY_STEP = 0.1;
const ANIMATION_Y_OFFSET = 20;
const ICON_SIZE = 18;

const taglineWords = [
  { word: "Turning", icon: <Sparkles size={ICON_SIZE} /> },
  { word: "ideas", icon: <Lightbulb size={ICON_SIZE} /> },
  { word: "into", icon: <ArrowRight size={ICON_SIZE} /> },
  { word: "products", icon: <Package size={ICON_SIZE} /> },
  { word: "people", icon: <Users size={ICON_SIZE} /> },
  { word: "love.", icon: <Heart size={ICON_SIZE} /> },
];

const taglineItems: IconItem[] = taglineWords.map((item) => ({
  label: item.word,
  icon: item.icon,
  hoverColor: "group-hover:text-[#05df72]",
}));

type NavLink = {
  to: string;
  label: string;
  icon: ReactNode;
};

const navLinks: NavLink[] = [
  { to: "/", label: "Home", icon: <Home size={ICON_SIZE} /> },
  { to: "/about", label: "About", icon: <User size={ICON_SIZE} /> },
  { to: "/techStack", label: "Tech Stack", icon: <Layers size={ICON_SIZE} /> },
  {
    to: "/projects",
    label: "Projects",
    icon: <FolderKanban size={ICON_SIZE} />,
  },
  {
    to: "/certifications",
    label: "Certifications",
    icon: <Award size={ICON_SIZE} />,
  },
  {
    to: "/blog",
    label: "Blog",
    icon: <BookOpen size={ICON_SIZE} />,
  },
];

const Footer = () => {
  const [isSectionHovered, setIsSectionHovered] = useState(false);

  return (
    <footer className="w-full max-w-full overflow-hidden border-t border-[var(--border-subtle)] bg-gradient-to-b from-transparent to-[var(--bg-card)]/30">
      <div className="mx-auto w-full p-5">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          <motion.section
            className="flex flex-col items-start gap-4"
            initial={{ opacity: 0, y: ANIMATION_Y_OFFSET }}
            onMouseEnter={() => setIsSectionHovered(true)}
            onMouseLeave={() => setIsSectionHovered(false)}
            viewport={{ once: true }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <Logo />
            <SocialIcons items={taglineItems} forceShowLabels={isSectionHovered} />
          </motion.section>

          <motion.section
            className="flex flex-col gap-4"
            initial={{ opacity: 0, y: ANIMATION_Y_OFFSET }}
            transition={{ delay: ANIMATION_DELAY_STEP }}
            viewport={{ once: true }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <p className="text-xs text-[var(--text-dim)]">Navigation</p>
            <div className="relative w-fit rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] px-1.5 py-1.5">
              <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-b from-white/[0.02] to-transparent" />
              <nav className="relative flex flex-col gap-2 md:flex-row md:flex-wrap md:gap-x-6 md:gap-y-2">
                {navLinks.map((link) => (
                  <Tooltip key={link.to}>
                    <TooltipTrigger asChild>
                      <Link
                        className="flex items-center text-sm text-[var(--text-muted)] transition-colors hover:text-[#05df72]"
                        to={link.to}
                      >
                        {link.icon}
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent side="top" sideOffset={8}>
                      {link.label}
                    </TooltipContent>
                  </Tooltip>
                ))}
              </nav>
            </div>
          </motion.section>

          <motion.section
            className="flex flex-col gap-4"
            initial={{ opacity: 0, y: ANIMATION_Y_OFFSET }}
            transition={{ delay: ANIMATION_DELAY_STEP * 2 }}
            viewport={{ once: true }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <p className="text-xs text-[var(--text-dim)]">Connect</p>
            <div className="w-auto">
              <SocialIcons showLabels />
            </div>
          </motion.section>
        </div>
      </div>

      <div className="border-t border-[var(--border-subtle)] px-4 py-4 sm:px-6">
        <p className="text-center text-xs text-[var(--text-dim)]">
          © {CURRENT_YEAR} Joseph Sabag. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
