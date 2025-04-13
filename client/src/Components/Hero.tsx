const Hero = () => (
  <section id="hero" className="relative h-[800px] flex items-center justify-center z-10">
    <div className="text-center space-y-8">
      <h1 className="text-5xl md:text-7xl font-bold tracking-wider">
        System Online:
        <br />
        <span className="text-[#1AFFD5]">Full-Stack Developer Initiated</span>
      </h1>
      <p className="text-2xl tracking-wide">&gt; Code, Deploy, Repeat_</p>
      <div className="flex gap-6 justify-center mt-12">
        <button className="px-8 py-4 bg-[#00FF41]/20 border-2 border-[#00FF41] hover:bg-[#00FF41]/30 transition-all">
          &gt; Enter Portfolio
        </button>
        <button className="px-8 py-4 bg-black/50 border-2 border-[#1AFFD5] hover:bg-[#1AFFD5]/20 transition-all">
          &gt; Download Résumé
        </button>
      </div>
    </div>
  </section>
);

export default Hero;
