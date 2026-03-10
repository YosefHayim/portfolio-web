import { AppWindow, Award, FolderKanban, Home, Layers, User } from "lucide-react";
import { useLocation } from "react-router";
import { SocialIcons, type IconItem } from "../ui/social-icons";

const ICON_SIZE = 20;

const navItems: IconItem[] = [
  { to: "/", icon: <Home size={ICON_SIZE} />, label: "Home" },
  { to: "/about", icon: <User size={ICON_SIZE} />, label: "About" },
  { to: "/techStack", icon: <Layers size={ICON_SIZE} />, label: "Stack" },
  { to: "/projects", icon: <FolderKanban size={ICON_SIZE} />, label: "Projects" },
  { to: "/apps", icon: <AppWindow size={ICON_SIZE} />, label: "Apps" },
  { to: "/certifications", icon: <Award size={ICON_SIZE} />, label: "Certs" },
];

export function BottomNav() {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 z-50 w-full border-t border-[var(--border-subtle)] bg-[var(--bg-void)]/95 backdrop-blur-xl md:hidden">
      <SocialIcons
        activePath={location.pathname}
        className="h-16"
        items={navItems}
        variant="nav"
      />
    </nav>
  );
}

export default BottomNav;
