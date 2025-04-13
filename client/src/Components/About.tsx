const About = () => (
  <section id="about" className="container px-6 py-24 z-10">
    <div className="bg-black/80 border border-[#00FF41]/30 p-8 backdrop-blur-sm">
      <div className="space-y-4">
        <p className="text-lg">
          <span className="text-[#888]">[2025-04-13]</span> Initiated: MERN Developer.
        </p>
        <p className="text-lg">Specialized in building scalable backend and immersive UIs.</p>
        <div className="flex gap-4 mt-8">
          <div className="h-2 w-2 bg-[#00FF41] animate-pulse"></div>
          <div className="h-2 w-2 bg-[#1AFFD5] animate-pulse delay-100"></div>
          <div className="h-2 w-2 bg-[#888] animate-pulse delay-200"></div>
        </div>
      </div>
    </div>
  </section>
);

export default About;
