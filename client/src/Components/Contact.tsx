const Contact = () => (
  <section id="contact" className="container mx-auto px-6 py-24 z-10">
    <h2 className="text-3xl mb-12">&gt; Contact_Interface</h2>
    <div className="grid md:grid-cols-2 gap-12">
      <div className="border border-[#00FF41] bg-black/80 p-8">
        <form className="space-y-6">
          <div>
            <label className="block mb-2">&gt; Name:</label>
            <input
              type="text"
              className="w-full bg-black border border-[#00FF41]/30 p-3 focus:border-[#00FF41] focus:outline-none"
            />
          </div>
          <div>
            <label className="block mb-2">&gt; Email:</label>
            <input
              type="email"
              className="w-full bg-black border border-[#00FF41]/30 p-3 focus:border-[#00FF41] focus:outline-none"
            />
          </div>
          <div>
            <label className="block mb-2">&gt; Message:</label>
            <textarea className="w-full bg-black border border-[#00FF41]/30 p-3 h-32 focus:border-[#00FF41] focus:outline-none"></textarea>
          </div>
          <button
            type="button"
            className="w-full py-4 bg-[#00FF41]/20 border-2 border-[#00FF41] hover:bg-[#00FF41]/30 transition-all"
          >
            &gt; SEND SIGNAL
          </button>
        </form>
      </div>
      <div className="border border-[#00FF41]/30 bg-black/80 p-8 flex items-center justify-center">
        <div className="text-center space-y-4">
          <img
            className="w-48 h-48"
            src="https://storage.googleapis.com/uxpilot-auth.appspot.com/3808203470-22dc9e93f9eb2ad80259.png"
            alt="QR Code"
          />
          <p className="text-[#888]">Scan to initialize direct contact protocol</p>
        </div>
      </div>
    </div>
  </section>
);

export default Contact;
