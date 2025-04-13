const Navbar = () => (
  <header className="fixed w-full z-50 bg-black/80 border-b border-[#00FF41]/30">
    <nav className="container px-6 py-4 p-1">
      <div className="flex justify-between items-center">
        <div className="text-xl tracking-wider">[YOSEF SABAG]</div>
        <div className="space-x-8">
          <a href="#projects" className="hover:text-[#1AFFD5] transition-colors">
            &gt; Projects
          </a>
          <a href="#stack" className="hover:text-[#1AFFD5] transition-colors">
            &gt; Stack
          </a>
          <a href="#contact" className="hover:text-[#1AFFD5] transition-colors">
            &gt; Contact
          </a>
        </div>
      </div>
    </nav>
  </header>
);

export default Navbar;
