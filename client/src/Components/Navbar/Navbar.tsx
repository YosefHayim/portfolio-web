import NavigationButton from "./NavigationButton/NavigationButton";
import Logo from "../Logo/Logo";
import { RxHamburgerMenu } from "react-icons/rx";

const Navbar = () => {
  return (
    <header className="fixed z-10 flex w-full items-center justify-between gap-2 border-b border-gray-800 p-2 backdrop-blur-xl">
      <div className="flex w-full items-center justify-between gap-2">
        <Logo />
        <button className="rounded-sm p-1 hover:bg-gray-800">
          <RxHamburgerMenu size={30} />
        </button>
      </div>
      <nav className="hidden w-full items-center gap-2 md:flex">
        <NavigationButton to="/" pageName="Home" />
        <NavigationButton to="/about" pageName="About" />
        <NavigationButton to="/techStack" pageName="Tech Stack" />
        <NavigationButton to="/projects" pageName="Projects" />
        <NavigationButton to="/certifications" pageName="Certifications" />
        <NavigationButton to="/contact" pageName="Contact" />
      </nav>
    </header>
  );
};

export default Navbar;
