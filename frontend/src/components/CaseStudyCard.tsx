interface CaseStudyCardProps {
  id: string;
  title: string;
  description: string;
  imgSrc: string;
  metric?: string;
  metricLabel?: string;
  tags?: string[];
  isReversed?: boolean;
}

const CaseStudyCard = ({
  id,
  title,
  description,
  imgSrc,
  metric,
  metricLabel,
  tags = [],
  isReversed = false,
}: CaseStudyCardProps) => {
  return (
    <div id={id} className="scroll-mt-24">
      <div
        className={`group flex flex-col md:flex-row items-stretch min-h-[320px] bg-white rounded-2xl overflow-hidden border border-[#E8EDF2] hover:border-[#93D8FF]/60 hover:shadow-[0_8px_40px_rgba(0,129,201,0.08)] transition-all duration-400 ${
          isReversed ? 'md:flex-row-reverse' : ''
        }`}
      >
        {/* Image Section */}
        <div className="md:w-[45%] relative overflow-hidden min-h-[220px] md:min-h-full bg-[#F7F9FC] shrink-0">
          {imgSrc ? (
            <img
              src={imgSrc}
              alt={title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-5xl font-bold text-gray-200">IMG</span>
            </div>
          )}
          {/* Gradient overlay */}
          <div
            className={`absolute inset-0 bg-gradient-to-${isReversed ? 'l' : 'r'} from-transparent to-black/5 hidden md:block`}
          ></div>

          {/* Tags on image */}
          {tags.length > 0 && (
            <div className="absolute top-4 left-4 flex flex-wrap gap-1.5">
              {tags.map((tag, i) => (
                <span
                  key={i}
                  className="bg-white/90 backdrop-blur-sm text-[#0081C9] text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="flex-1 p-7 md:p-9 flex flex-col justify-center">
          <h3 className="text-lg md:text-xl font-bold text-[#0A1628] mb-3 leading-snug">
            {title}
          </h3>
          <p className="text-gray-500 mb-5 leading-relaxed text-[13px]">
            {description}
          </p>

          {/* Metric */}
          {metric && (
            <div className="mb-5 pb-5 border-b border-[#F0F2F5]">
              <div className="flex items-end gap-2.5">
                <span className="text-2xl md:text-3xl font-extrabold text-[#0081C9] leading-none">
                  {metric}
                </span>
                <span className="text-[#999] text-[10px] font-medium uppercase tracking-[1px] pb-0.5">
                  {metricLabel}
                </span>
              </div>
            </div>
          )}

          <a
            href="#"
            className="text-[#0081C9] font-semibold text-sm flex items-center gap-1.5 group-hover:gap-2.5 transition-all"
          >
            Xem chi tiết <span className="text-base">→</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default CaseStudyCard;
