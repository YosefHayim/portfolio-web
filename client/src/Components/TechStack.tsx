const TechStack = () => (
  <section id="stack" className="z-10 container mx-auto px-6 py-24">
    <h2 className="mb-12 text-3xl">&gt; Tech Stack_</h2>
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
      {[
        { title: "Frontend_", icons: ["fa-react", "fa-vuejs", "fa-js"] },
        { title: "Backend_", icons: ["fa-node-js", "fa-python", "fa-database"] },
        { title: "DevOps_", icons: ["fa-docker", "fa-aws", "fa-github"] },
        { title: "Tools_", icons: ["fa-git-alt", "fa-terminal", "fa-code"] },
      ].map((stack, idx) => (
        <div key={idx} className="border border-[#00FF41]/30 bg-black/80 p-6">
          <h3 className="mb-6 text-xl">{stack.title}</h3>
          <div className="grid grid-cols-3 gap-6">
            {stack.icons.map((icon, i) => (
              <i key={i} className={`fa-brands ${icon} text-3xl transition-colors hover:text-[#1AFFD5]`} />
            ))}
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default TechStack;
