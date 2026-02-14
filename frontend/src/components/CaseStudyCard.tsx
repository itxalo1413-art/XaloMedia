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
    <div id={id} className="scroll-mt-32 mb-10">
      <div
        className={`group flex flex-col md:flex-row items-stretch min-h-[380px] bg-white rounded-2xl overflow-hidden border border-[#E8EDF2] hover:border-[#93D8FF] hover:shadow-[0_20px_60px_rgba(0,129,201,0.08)] transition-all duration-500 ${
          isReversed ? 'md:flex-row-reverse' : ''
        }`}
      >
        {/* Image Section */}
        <div className="flex-1 relative overflow-hidden min-h-[250px] md:min-h-full bg-[#F7F9FC]">
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
            className={`absolute inset-0 bg-gradient-to-${isReversed ? 'l' : 'r'} from-transparent to-black/10 hidden md:block`}
          ></div>

          {/* Tags on image */}
          {tags.length > 0 && (
            <div className="absolute top-4 left-4 flex gap-2">
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
        <div className="flex-1 p-8 md:p-10 flex flex-col justify-center">
          <h3 className="text-xl md:text-2xl font-bold text-[#0A1628] mb-4 leading-snug">
            {title}
          </h3>
          <p className="text-gray-500 mb-6 leading-relaxed text-sm">
            {description}
          </p>

          {/* Metric */}
          {metric && (
            <div className="mb-6 pb-6 border-b border-[#E8EDF2]">
              <div className="flex items-end gap-3">
                <span className="text-3xl md:text-4xl font-extrabold text-[#0081C9] leading-none">
                  {metric}
                </span>
                <span className="text-[#999] text-xs font-medium uppercase tracking-[1px] pb-1">
                  {metricLabel}
                </span>
              </div>
            </div>
          )}

          <a
            href="#"
            className="text-[#0081C9] font-semibold text-sm flex items-center gap-2 group-hover:gap-3 transition-all"
          >
            Xem chi tiết <span className="text-base">→</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default CaseStudyCard;
