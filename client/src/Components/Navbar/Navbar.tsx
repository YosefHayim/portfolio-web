import { GoDash } from "react-icons/go";
import { IoIosArrowForward } from "react-icons/io";
import NavigationButton from "./NavigationButton/NavigationButton";

const Navbar = () => {
  return (
    <header className="flex w-full items-center justify-between gap-2 p-4 shadow">
      <div className="flex w-full items-end justify-start">
        <IoIosArrowForward size={30} />
        <GoDash size={30} />
        <h1 className="text-xl">Yosef Sabag</h1>
      </div>
      <nav className="flex w-full items-center gap-8">
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
