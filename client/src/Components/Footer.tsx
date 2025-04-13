const Footer = () => (
  <footer className="border-t border-[#00FF41]/30 bg-black/80 z-10">
    <div className="container mx-auto px-6 py-12">
      <div className="space-y-4 text-center">
        <p>&gt; SYSTEM STATUS: ONLINE</p>
        <div className="flex justify-center space-x-8">
          <span className="hover:text-[#1AFFD5] cursor-pointer">
            <i className="fa-brands fa-github"></i> GITHUB
          </span>
          <span className="hover:text-[#1AFFD5] cursor-pointer">
            <i className="fa-brands fa-linkedin"></i> LINKEDIN
          </span>
          <span className="hover:text-[#1AFFD5] cursor-pointer">
            <i className="fa-regular fa-envelope"></i> EMAIL
          </span>
        </div>
        <p className="text-[#888]">&gt; © 2025 [DEV_NAME] — Code is the truth</p>
      </div>
    </div>
  </footer>
);

export default Footer;
