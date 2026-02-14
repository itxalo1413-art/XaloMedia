
const BackgroundGrid = () => {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-[#fcfcfc]">
      <div className="absolute inset-[ -100px] bg-grid bg-grid-animate"></div>
    </div>
  );
};

export default BackgroundGrid;
