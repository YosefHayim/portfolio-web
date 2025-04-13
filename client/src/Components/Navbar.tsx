const Navbar = () => (
  <header className="fixed z-50 flex w-full items-center justify-center border-b border-[#00FF41]/30 bg-black/80">
    <nav className="container w-full">
      <div className="flex items-center justify-between">
        <div className="w-full text-xl tracking-wider">[YOSEF SABAG]</div>
        <div className="flex w-full items-center justify-center gap-5">
          <a href="#projects" className="transition-colors hover:text-[#1AFFD5]">
            &gt; Projects
          </a>
          <a href="#stack" className="transition-colors hover:text-[#1AFFD5]">
            &gt; Stack
          </a>
          <a href="#contact" className="transition-colors hover:text-[#1AFFD5]">
            &gt; Contact
          </a>
        </div>
      </div>
    </nav>
  </header>
);

export default Navbar;
