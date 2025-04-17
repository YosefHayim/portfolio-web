import profilePic from "/homepage-hero-image/linkedin-profile.png";

const Hero = () => {
  return (
    <div className="w-min-max flex flex-col items-center justify-between gap-3">
      <div>
        <h2 className="text-4xl">Crafting Digital Experiences through code</h2>
        <p>
          Full-stack developer specialized in building exceptional digital experiences that combine creativity with
          technical excellence.
        </p>
        <div className="flex gap-2">
          <button>View Projects</button>
          <button>Contact Me</button>
        </div>
      </div>
      <div>
        <img src={profilePic} alt="Yosef hayim sabag" />
      </div>
    </div>
  );
};

export default Hero;
