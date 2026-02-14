const About = () => (
  <section className="bg-white py-20" id="about">
    <div className="max-w-[1200px] mx-auto px-5">
      <h2 className="text-[var(--primary)] text-center text-4xl mb-12 font-bold">About Us</h2>
      <div className="grid grid-cols-[1.2fr_1fr] gap-16 items-center">
        <div className="about-content">
          <h3 className="text-5xl text-[#001C30] mb-4 font-bold">Heading</h3>
          <p className="text-[#666] mb-2">Sub Heading</p>
          <p className="text-[#666]">Sub Heading</p>
        </div>
        <div className="bg-white p-8 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.05)] border border-[#f0f0f0]">
          <div className="flex justify-between items-center mb-4">
            <h4 className="font-bold">Heading</h4>
            <div className="w-[60px] h-px bg-[#888]"></div>
          </div>
          <p className="text-sm text-[#666] mb-2">Sub Heading</p>
          <p className="text-sm text-[#666]">Sub Heading</p>
          
          <div className="mt-8 border-t border-[#eee] pt-5">
             <h4 className="text-sm font-bold">By whom?</h4>
             <p className="text-xs text-[#888]">Sub Heading</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default About;
