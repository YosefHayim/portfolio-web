const Contact = () => (
  <section id="contact" className="z-10 container mx-auto px-6 py-24">
    <h2 className="mb-12 text-3xl">&gt; Contact_Interface</h2>
    <div className="grid gap-12 md:grid-cols-2">
      <div className="border border-[#00FF41] bg-black/80 p-8">
        <form className="space-y-6">
          <div>
            <label className="mb-2 block">&gt; Name:</label>
            <input
              type="text"
              className="w-full border border-[#00FF41]/30 bg-black p-3 focus:border-[#00FF41] focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-2 block">&gt; Email:</label>
            <input
              type="email"
              className="w-full border border-[#00FF41]/30 bg-black p-3 focus:border-[#00FF41] focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-2 block">&gt; Message:</label>
            <textarea className="h-32 w-full border border-[#00FF41]/30 bg-black p-3 focus:border-[#00FF41] focus:outline-none"></textarea>
          </div>
          <button
            type="button"
            className="w-full border-2 border-[#00FF41] bg-[#00FF41]/20 py-4 transition-all hover:bg-[#00FF41]/30"
          >
            &gt; SEND SIGNAL
          </button>
        </form>
      </div>
      <div className="flex items-center justify-center border border-[#00FF41]/30 bg-black/80 p-8">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <img
            className="h-48 w-48"
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
