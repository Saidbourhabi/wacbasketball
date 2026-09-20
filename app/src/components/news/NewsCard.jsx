import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaUser } from 'react-icons/fa';

export default function NewsCard({ article }) {
  const formattedDate = new Date(article.date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).toUpperCase();

  return (
    <Link
      to={`/news/${article.slug}`}
      className="group relative block overflow-hidden rounded-lg bg-white shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="aspect-119/128 w-full overflow-hidden">
        <img
          src={article.image}
          alt={article.headline}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
          fetchPriority='high'
        />
      </div>

      <div className="absolute inset-x-0 bottom-0 px-6 py-4 backdrop-blur-sm">
        <div className="mb-2 flex items-center gap-4 text-xs font-medium uppercase text-white">
          <span className="flex items-center gap-1">
            <FaCalendarAlt className="text-[#fc0000]" />
            {formattedDate}
          </span>
          <span className="flex items-center gap-1">
            <FaUser className="text-[#fc0000]" />
            {article.authorName}
          </span>
        </div>

        <p className="mb-0 text-lg font-semibold text-white transition-colors group-hover:text-brand-red line-clamp-1">
          {article.headline}
        </p>
      </div>
    </Link>
  );
}