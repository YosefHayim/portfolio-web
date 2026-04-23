import { Award, BookOpen, FolderKanban, Home, Layers, User } from "lucide-react";
import { useLocation } from "react-router";
import { SocialIcons, type IconItem } from "../ui/social-icons";

const ICON_SIZE = 20;

const navItems: IconItem[] = [
 { to: "/#home", icon: <Home size={ICON_SIZE} />, label: "Home" },
 { to: "/#home", icon: <User size={ICON_SIZE} />, label: "About" },
 { to: "/#stack", icon: <Layers size={ICON_SIZE} />, label: "Stack" },
 { to: "/#projects", icon: <FolderKanban size={ICON_SIZE} />, label: "Projects" },
 { to: "/#certifications", icon: <Award size={ICON_SIZE} />, label: "Certs" },
 { to: "/#contact", icon: <BookOpen size={ICON_SIZE} />, label: "Contact" },
];

export function BottomNav() {
 const location = useLocation();

 return (
 <nav className="fixed bottom-0 left-0 z-50 w-full border-t border-[var(--border-subtle)] bg-[var(--bg-void)]/95 backdrop-blur-xl md:hidden">
 <SocialIcons
 activePath={`${location.pathname}${location.hash}`}
 className="h-16"
 items={navItems}
 variant="nav"
 />
 </nav>
 );
}

export default BottomNav;
