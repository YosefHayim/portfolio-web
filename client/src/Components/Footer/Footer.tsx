import Logo from "../Logo/Logo";
import NavigationButton from "../Navbar/NavigationButton/NavigationButton";

const Footer = () => {
  return (
    <footer className="absolute bottom-0 flex w-full items-center justify-around">
      <section className="flex flex-col items-center justify-center">
        <Logo />
      </section>
      <section>
        <h2>Navigation</h2>
        <nav className="flex w-full flex-col items-center gap-2">
          <NavigationButton to="/" pageName="Home" />
          <NavigationButton to="/about" pageName="About" />
          <NavigationButton to="/techStack" pageName="Tech Stack" />
          <NavigationButton to="/projects" pageName="Projects" />
          <NavigationButton to="/certifications" pageName="Certifications" />
          <NavigationButton to="/contact" pageName="Contact" />
        </nav>
      </section>
      <section>
        <h2>Social</h2>
      </section>
    </footer>
  );
};

export default Footer;
