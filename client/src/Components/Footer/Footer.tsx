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
import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import Logo from "../Logo/Logo";
import { SocialIcons, type IconItem } from "../ui/social-icons";

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

const taglineColorMap: Record<string, string> = {
 Turning: "group-hover:text-[#F59E0B]",
 ideas: "group-hover:text-[#FBBF24]",
 into: "group-hover:text-[#05df72]",
 products: "group-hover:text-[#3B82F6]",
 people: "group-hover:text-[#A78BFA]",
 "love.": "group-hover:text-[#F43F5E]",
};

const taglineItems: IconItem[] = taglineWords.map((item) => ({
 label: item.word,
 icon: item.icon,
 hoverColor: taglineColorMap[item.word],
}));

const navLinks = [
 { to: "/#home", label: "Home", icon: <Home size={ICON_SIZE} /> },
 { to: "/#home", label: "About", icon: <User size={ICON_SIZE} /> },
 { to: "/#stack", label: "Tech Stack", icon: <Layers size={ICON_SIZE} /> },
 { to: "/#projects", label: "Projects", icon: <FolderKanban size={ICON_SIZE} /> },
 { to: "/#certifications", label: "Certifications", icon: <Award size={ICON_SIZE} /> },
 { to: "/#contact", label: "Contact", icon: <BookOpen size={ICON_SIZE} /> },
];

const navItems: IconItem[] = navLinks.map((link) => ({
 label: link.label,
 icon: link.icon,
 to: link.to,
 hoverColor: "group-hover:text-[#05df72]",
}));

const Footer = () => {
 const [isSectionHovered, setIsSectionHovered] = useState(false);

 return (
 <footer className="w-full max-w-full overflow-hidden border-t border-[var(--border-subtle)] bg-gradient-to-b from-transparent to-[var(--bg-card)]/30">
 <div className="mx-auto w-full p-2">
 <div className="grid grid-cols-1 gap-2 md:grid-cols-3 items-end">
 <motion.section
 className="flex flex-col items-start gap-2"
 initial={{ opacity: 0, y: ANIMATION_Y_OFFSET }}
 onMouseEnter={() => setIsSectionHovered(true)}
 onMouseLeave={() => setIsSectionHovered(false)}
 viewport={{ once: true }}
 whileInView={{ opacity: 1, y: 0 }}
 >
 <Logo />
 <SocialIcons
 forceShowLabels={isSectionHovered}
 items={taglineItems}
 labelSides={["top", "bottom", "left", "right"]}
 />
 </motion.section>

 <motion.section
 className="flex flex-col gap-2"
 initial={{ opacity: 0, y: ANIMATION_Y_OFFSET }}
 transition={{ delay: ANIMATION_DELAY_STEP }}
 viewport={{ once: true }}
 whileInView={{ opacity: 1, y: 0 }}
 >
 <p className="text-xs text-[var(--text-dim)]">Navigation</p>
 <SocialIcons
 items={navItems}
 labelSides={["top", "bottom", "left", "right"]}
 showLabels
 />
 </motion.section>

 <motion.section
 className="flex flex-col gap-2"
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

 <div className="border-t border-[var(--border-subtle)] p-2 p-2 sm:p-2">
 <div className="flex flex-col items-center gap-2 sm:flex-row sm:justify-center sm:gap-2">
 <p className="text-center text-xs text-[var(--text-dim)]">
 © {CURRENT_YEAR} Joseph Sabag. All rights reserved.
 </p>
 <Link className="text-xs text-[var(--text-dim)] transition-colors hover:text-[#05df72]" to="/#contact">
 Contact
 </Link>
 </div>
 </div>
 </footer>
 );
};

export default Footer;
