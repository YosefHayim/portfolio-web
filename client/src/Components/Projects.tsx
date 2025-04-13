const Projects = () => (
  <section id="projects" className="container mx-auto px-6 py-24 z-10">
    <h2 className="text-3xl mb-12">&gt; Featured Projects_</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[
        {
          title: "Project_Alpha",
          desc: "Neural network visualization system",
          tech: ["React.js", "Node.js", "TensorFlow"],
        },
        {
          title: "Project_Beta",
          desc: "Blockchain data explorer",
          tech: ["Web3.js", "Express", "MongoDB"],
        },
        {
          title: "Project_Gamma",
          desc: "AI-powered code analyzer",
          tech: ["Python", "FastAPI", "Docker"],
        },
      ].map((project, idx) => (
        <div
          key={idx}
          className="border border-[#00FF41]/30 bg-black/80 p-6 hover:border-[#00FF41] transition-all group"
        >
          <h3 className="text-xl mb-4">{project.title}</h3>
          <p className="text-[#888] mb-4">{project.desc}</p>
          <div className="space-y-2">
            {project.tech.map((tech, i) => (
              <div key={i} className="text-sm">
                &gt; {tech}
              </div>
            ))}
          </div>
          <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="text-[#1AFFD5] hover:underline cursor-pointer">View Project &gt;</span>
          </div>
        </div>
      ))}
    </div>
  </section>
);
export default Projects;
