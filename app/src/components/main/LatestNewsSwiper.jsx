import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { FaChevronLeft, FaChevronRight, FaCalendarAlt } from 'react-icons/fa';
import { getAllNews } from '../../utils/contentful';

import 'swiper/css';
import 'swiper/css/navigation';

const CATEGORY_LABELS = {
  'mens-basketball': "Men's Basketball",
  'womens-basketball': "Women's Basketball",
  'the-club': 'The Club',
  'academy': 'Academy',
};

export default function LatestNewsSwiper() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function fetchNews() {
      setLoading(true);
      const data = await getAllNews();
      if (isMounted) {
        setArticles(data.filter((a) => a.published).slice(0, 8));
        setLoading(false);
      }
    }

    fetchNews();
    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return (
      <section className="mt-16 px-4 md:px-8">
        <div className="mx-auto flex max-w-md justify-center sm:max-w-3xl lg:max-w-6xl">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-[#fc0000]" />
        </div>
      </section>
    );
  }

  if (articles.length === 0) return null;

  return (
    <section className="my-6 px-4 md:px-8">
      <div className="mx-auto max-w-md sm:max-w-3xl lg:max-w-6xl ">
        {/* Header: Title left, Nav right */}
        <div className="mb-6 flex items-center justify-between gap-4">
          <h1 className="text-3xl font-extrabold uppercase tracking-wider text-[#fc0000] sm:text-4xl lg:text-4xl">
            Latest News
          </h1>

          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              aria-label="Previous"
              className="swiper-prev flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#fc0000] bg-white text-[#fc0000] transition-all  hover:border-white hover:bg-[#fc0000] hover:text-white cursor-pointer disabled:cursor-not-allowed disabled:opacity-40 md:h-11 md:w-11"
            >
              <FaChevronLeft className="text-sm" />
            </button>
            <button
              type="button"
              aria-label="Next"
              className="swiper-next flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#fc0000] bg-white text-[#fc0000] transition-all hover:border-white hover:bg-[#fc0000] hover:text-white cursor-pointer disabled:cursor-not-allowed disabled:opacity-40 md:h-11 md:w-11"
            >
              <FaChevronRight className="text-sm" />
            </button>
          </div>
        </div>

        {/* Swiper */}
        <Swiper
          modules={[Navigation, Autoplay]}
          navigation={{
            prevEl: '.swiper-prev',
            nextEl: '.swiper-next',
          }}
          spaceBetween={20}
          slidesPerView={1}
          autoplay={{ delay: 5000, disableOnInteraction: true }}
          breakpoints={{
            640: { slidesPerView: 2, spaceBetween: 20 },
            1024: { slidesPerView: 2, spaceBetween: 24 },
            1280: { slidesPerView: 3, spaceBetween: 24 },
          }}
          className="pb-2!"
        >
          {articles.map((article) => (
            <SwiperSlide key={article.id} className="h-auto!">
              <Link
                to={`/news/${article.slug}`}
                className="group relative block aspect-video overflow-hidden"
              >
                <img
                  src={article.image}
                  alt={article.headline}
                  className="absolute inset-0 border-2 border-[#fc0000] h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 "
                  loading="lazy"
                />
                <div className="absolute inset-x-0 bg-linear-to-t from-[#000000cf] to-transparent bottom-0 p-5 text-white md:p-6">
                  <span className=" inline-block text-[11px] font-semibold uppercase tracking-wider text-white ">
                    {CATEGORY_LABELS[article.category] || article.category}
                  </span>
                  <h3 className=" text-lg font-bold leading-snug line-clamp-2 group-hover:text-[#fc0000] md:text-xl ">
                    {article.headline}
                  </h3>
                  <div className="flex items-center gap-3 text-xs font-medium text-white">
                    <span className="flex items-center gap-1.5">
                      <FaCalendarAlt className="text-[#fc0000]" />
                      {new Date(article.date).toLocaleDateString('en-US', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}