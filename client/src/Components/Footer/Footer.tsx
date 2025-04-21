import DiscordSocialButton from "../Discord/DiscordSocialButton";
import GithubSocialButton from "../GithubSocialButton/GithubSocialButton";
import LinkedinSocialButton from "../LinkedinSocialButton/LinkedinSocialButton";
import Logo from "../Logo/Logo";
import NavigationButton from "../Navbar/NavigationButton/NavigationButton";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="relative flex w-full flex-col items-start justify-start gap-8 p-5">
      <section className="flex w-full flex-col items-start justify-start">
        <Logo />
        <p className="text-gray-400">Trying to get better everyday.</p>
      </section>
      <section className="flex w-full flex-col items-start justify-start gap-2">
        <h2>Navigation</h2>
        <nav className="flex w-full flex-col items-center gap-2">
          <NavigationButton to="/" pageName="Home" />
          <NavigationButton to="/about" pageName="About" />
          <NavigationButton to="/techStack" pageName="Tech Stack" />
          <NavigationButton to="/projects" pageName="Projects" />
          <NavigationButton to="/certifications" pageName="Certifications" />
        </nav>
      </section>
      <section className="flex w-full flex-col items-start justify-start gap-4">
        <h2>Social</h2>
        <nav className="flex w-full items-start justify-start gap-4">
          <GithubSocialButton />
          <DiscordSocialButton />
          <LinkedinSocialButton />
        </nav>
      </section>
      <section className="flex w-full items-center justify-center border-t border-gray-800 p-3">
        <p className="text-center text-sm text-gray-400">© {year} - Yosef Portfolio. All rights reserved</p>
      </section>
    </footer>
  );
};

export default Footer;
