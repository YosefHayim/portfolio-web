const Footer = () => (
  <footer className="z-10 w-full border-t border-[#00FF41]/30 bg-black/80">
    <div className="container mx-auto px-6 py-12">
      <div className="flex w-full items-center justify-center gap-2 space-y-4 text-center">
        <p>&gt; SYSTEM STATUS: ONLINE</p>
        <p className="text-[#888]">&gt; © 2025 [YOSEF SABAG] — Code is the truth</p>
        <div className="flex items-center justify-center gap-2 space-x-8">
          <span className="cursor-pointer hover:text-[#1AFFD5]">
            <i className="fa-brands fa-github"></i> GITHUB
          </span>
          <span className="cursor-pointer hover:text-[#1AFFD5]">
            <i className="fa-brands fa-linkedin"></i> LINKEDIN
          </span>
          <span className="cursor-pointer hover:text-[#1AFFD5]">
            <i className="fa-regular fa-envelope"></i> MAIL
          </span>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
