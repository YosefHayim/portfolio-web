import NavigationButton from "./NavigationButton/NavigationButton";
import Logo from "../Logo/Logo";
import { AppSidebar } from "../Sidebar/App-sidebar";
import { SidebarTrigger } from "../ui/sidebar";

const Navbar = () => {
  return (
    <header className="fixed left-0 z-20 flex w-full items-center justify-between gap-2 border-b border-gray-800 p-2 backdrop-blur-xl">
      <div className="flex w-full items-center justify-between gap-2">
        <Logo />
        <AppSidebar />
        <SidebarTrigger />

        {/* </Button> */}
      </div>
      <nav className="hidden w-full items-center gap-2 md:flex">
        <NavigationButton to="/" pageName="Home" />
        <NavigationButton to="/about" pageName="About" />
        <NavigationButton to="/techStack" pageName="Tech Stack" />
        <NavigationButton to="/projects" pageName="Projects" />
        <NavigationButton to="/certifications" pageName="Certifications" />
      </nav>
    </header>
  );
};

export default Navbar;
