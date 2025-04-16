import NavigationButton from "./NavigationButton/NavigationButton";
import Logo from "../Logo/Logo";

const Navbar = () => {
  return (
    <header className="flex items-center justify-between gap-2">
      <Logo />
      <nav className="flex w-full items-center gap-2">
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
