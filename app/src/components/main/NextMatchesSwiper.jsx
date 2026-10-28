import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { getUpcomingGames } from '../../utils/contentful';
import MatchCard from '../main/MatchCard';

import 'swiper/css';
import 'swiper/css/navigation';

export default function NextMatchesSwiper() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function load() {
      setLoading(true);
      const data = await getUpcomingGames();
      if (isMounted) {
        // Limit to the next 8 games for the carousel
        setGames(data.slice(0, 8));
        setLoading(false);
      }
    }

    load();
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

  // Don't render if there are no upcoming games
  if (games.length === 0) return null;

  return (
    <section className="mt-16 px-4 md:px-8">
      <div className="mx-auto max-w-md sm:max-w-3xl lg:max-w-6xl">
        {/* Header: Title left, Nav right */}
        <div className="mb-6 flex items-center justify-between gap-4">
          <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">
            Next Matches
          </h2>

          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              aria-label="Previous matches"
              className="matches-prev flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition-all hover:border-[#fc0000] hover:bg-[#fc0000] hover:text-white disabled:cursor-not-allowed disabled:opacity-40 md:h-11 md:w-11"
            >
              <FaChevronLeft className="text-sm" />
            </button>
            <button
              type="button"
              aria-label="Next matches"
              className="matches-next flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition-all hover:border-[#fc0000] hover:bg-[#fc0000] hover:text-white disabled:cursor-not-allowed disabled:opacity-40 md:h-11 md:w-11"
            >
              <FaChevronRight className="text-sm" />
            </button>
          </div>
        </div>

        {/* Swiper */}
        <Swiper
          modules={[Navigation, Autoplay]}
          navigation={{
            prevEl: '.matches-prev',
            nextEl: '.matches-next',
          }}
          spaceBetween={20}
          slidesPerView={1}
          autoplay={{ delay: 5000, disableOnInteraction: true }}
          breakpoints={{
            640: { slidesPerView: 2, spaceBetween: 20 },
            1024: { slidesPerView: 3, spaceBetween: 24 },
            1280: { slidesPerView: 4, spaceBetween: 24 },
          }}
          className="!pb-4" // Added padding bottom for hover shadows
        >
          {games.map((game) => (
            <SwiperSlide key={game.id} className="!h-auto">
              <MatchCard game={game} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}