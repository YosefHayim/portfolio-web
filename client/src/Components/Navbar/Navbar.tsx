import { AppWindow, Award, BookOpen, FolderKanban, Home, Layers, User } from "lucide-react";
import AnimatedHamburger from "../AnimatedHamburger/AnimatedHamburger";
import Logo from "../Logo/Logo";
import { AppSidebar } from "../Sidebar/Sidebar";
import { useSidebar } from "../ui/sidebar";
import { SocialIcons, type IconItem } from "../ui/social-icons";

const ICON_SIZE = 16;

const navItems: IconItem[] = [
  { to: "/", icon: <Home size={ICON_SIZE} />, label: "Home" },
  { to: "/about", icon: <User size={ICON_SIZE} />, label: "About" },
  { to: "/techStack", icon: <Layers size={ICON_SIZE} />, label: "Tech Stack" },
  { to: "/projects", icon: <FolderKanban size={ICON_SIZE} />, label: "Projects" },
  { to: "/apps", icon: <AppWindow size={ICON_SIZE} />, label: "Apps" },
  { to: "/certifications", icon: <Award size={ICON_SIZE} />, label: "Certifications" },
  { to: "/blog", icon: <BookOpen size={ICON_SIZE} />, label: "Blog" },
];

const Navbar = () => {
  const { openMobile, toggleSidebar } = useSidebar();

  return (
    <header className="fixed left-0 z-20 flex w-full items-center justify-between gap-2 border-b border-gray-800 p-3 backdrop-blur-3xl">
      <div className="flex w-full items-center justify-between gap-2">
        <Logo />
        <AppSidebar />
        <div className="md:hidden">
          <AnimatedHamburger isOpen={openMobile} onClick={toggleSidebar} />
        </div>
      </div>
      <div className="hidden w-full md:block">
        <SocialIcons
          items={navItems}
          labelSides={["bottom"]}
          showLabels
        />
      </div>
    </header>
  );
};

export default Navbar;
