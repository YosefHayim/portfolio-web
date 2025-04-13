const Hero = () => (
  <section id="hero" className="relative z-10 flex h-[800px] items-center justify-center">
    <div className="flex flex-col items-center justify-center gap-3 space-y-8 text-center">
      <h1 className="text-5xl font-bold tracking-wider md:text-7xl">
        System Online:
        <br />
        <span className="text-[#1AFFD5]">Full-Stack Developer Initiated</span>
      </h1>
      <p className="text-2xl tracking-wide">&gt; Code, Deploy, Repeat_</p>
      <div className="mt-12 flex justify-center gap-6">
        <button
          type="button"
          className="border-2 border-[#00FF41] bg-[#00FF41]/20 transition-all hover:bg-[#00FF41]/30"
        >
          &gt; Enter Portfolio
        </button>
        <button
          type="button"
          className="border-2 border-[#1AFFD5] bg-black/50 p-2 transition-all hover:bg-[#1AFFD5]/20"
        >
          &gt; Download Résumé
        </button>
      </div>
    </div>
  </section>
);

export default Hero;
