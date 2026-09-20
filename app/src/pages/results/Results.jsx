import { useState, useEffect } from 'react';
import { getFinishedGames } from '../../utils/contentful';
import GamesByMonth from '../../components/main/GamesByMonth';
import bannerImage from '../../assets/banner.webp';
import Breadcrumb from '../../components/main/Breadcrumb';
import { Helmet } from 'react-helmet-async';

export default function Results() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function load() {
      setLoading(true);
      const data = await getFinishedGames();
      if (isMounted) {
        setGames(data);
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
      <section className="mt-16">
        <div className="flex min-h-100 w-full items-center justify-center bg-[#fc0000] sm:min-h-125">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-white/30 border-t-white" />
        </div>
      </section>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
        <Helmet >
          <title>Results - Latest Game Results</title>
          <meta name="description" content="This is the results page." />
          <link rel="canonical" href="https://wacbasketball.vercel.app/results" />
        </Helmet>
      {/* Banner */}
      <div
        className="relative flex min-h-50 w-full items-center bg-cover bg-center bg-no-repeat md:min-h-90"
        style={{ backgroundImage: `url(${bannerImage})` }}
      >
        <div className="absolute inset-0 bg-linear-to-r from-[#fc0000f2] via-[#fc0000cc] to-transparent" />

        <div className="relative z-10 mx-auto w-full max-w-md px-6 py-10 sm:max-w-3xl sm:px-8 sm:py-14 md:px-10 md:py-16 lg:max-w-6xl">
          <span className="mb-3 inline-block text-[10px] font-bold uppercase tracking-[0.25em] text-white/80 sm:text-xs">
            DEX-HOMMES · Season 26-27
          </span>
          <h1 className="text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
            Results
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/90 sm:text-base md:text-lg">
            Final scores from every game of the season. Filter by month to
            review any match.
          </p>
        </div>
      </div>
          
      <Breadcrumb />
      
      {/* Tabs + games */}
      {games.length === 0 ? (
        <div className="mx-auto max-w-5xl px-4 py-24 text-center md:px-8">
          <p className="text-slate-600">
            No results yet. Check back after the first game.
          </p>
        </div>
      ) : (
        <GamesByMonth games={games} initialTab="last" />
      )}
    </div>
  );
}