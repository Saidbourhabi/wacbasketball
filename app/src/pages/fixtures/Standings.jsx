import { useState, useEffect } from 'react';
import { getAllStandings } from '../../utils/contentful';
import bannerImage from '../../assets/banner.webp';
import { FaInfoCircle } from "react-icons/fa";


// !Number of top positions highlighted as playoff zone.
const PLAYOFF_SPOTS = 8;

export default function Standings() {
  const [standings, setStandings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function load() {
      setLoading(true);
      const data = await getAllStandings();
      if (isMounted) {
        setStandings(data);
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

  if (standings.length === 0) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-24 text-center md:px-8">
        <h1 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl">
          Standings
        </h1>
        <p className="text-slate-600">
          Standings are not available yet. Check back soon.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Page header */}
      {/* Page header */}
<div
  className="relative flex min-h-50 w-full items-center bg-cover bg-center bg-no-repeat md:min-h-90"
  style={{ backgroundImage: `url(${bannerImage})` }}
>
  {/* Red overlay for brand consistency and text readability */}
  <div className="absolute inset-0 bg-linear-to-r from-[#fc0000f2] via-[#fc00009b] to-transparent" />

  {/* Banner content — left-aligned, vertically centered */}
  <div className="relative z-10 mx-auto w-full max-w-md px-6 py-10 sm:max-w-3xl sm:px-8 sm:py-14 md:px-10 md:py-16 lg:max-w-6xl">
    <span className="mb-3 inline-block text-[10px] font-bold uppercase tracking-[0.25em] text-white/80 sm:text-xs">
      DEX-HOMMES · Season 26-27
    </span>
    <h1 className="text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
      Standings
    </h1>
    <p className="mt-3 max-w-2xl text-sm leading-relaxed text-black sm:text-base md:text-lg">
      Full league table for the current season. Top {PLAYOFF_SPOTS} teams
      qualify for the playoffs.
    </p>
  </div>
</div>

      {/* Table */}
      <div className="mx-auto max-w-5xl px-4 py-6 md:px-8 md:py-8">
        <div className="overflow-hidden border border-[#fc0000] bg-white shadow-sm">
          {/* Header row */}
          <div className="grid grid-cols-[2.5rem_1fr_repeat(3,2.5rem)_3rem] items-center gap-2 border-b border-[#fc0000] bg-[#fc0000] px-3 py-3 text-[10px] font-bold uppercase tracking-wider text-white sm:grid-cols-[3rem_1fr_repeat(3,3rem)_3.5rem] sm:gap-3 sm:px-5 sm:text-xs md:grid-cols-[3.5rem_1fr_repeat(3,3.5rem)_4rem] md:text-sm">
            <span className="text-center">Pos</span>
            <span>Teams</span>
            <span className="text-center">GP</span>
            <span className="text-center">W</span>
            <span className="text-center">L</span>
            <span className="text-center font-black text-black">PTS</span>
          </div>

          {/* Team rows */}
          {standings.map((team) => {
            const isPlayoff = team.position <= PLAYOFF_SPOTS;

            return (
              <div
                key={team.id}
                className={`grid grid-cols-[2.5rem_1fr_repeat(3,2.5rem)_3rem] items-center gap-2 border-b border-[#fc0000]  px-3 py-3.5 transition-colors last:border-b-0 hover:bg-slate-50 sm:grid-cols-[3rem_1fr_repeat(3,3rem)_3.5rem] sm:gap-3 sm:px-5 sm:py-4 md:grid-cols-[3.5rem_1fr_repeat(3,3.5rem)_4rem] ${
                  isPlayoff ? 'border-l-4 border-l-[#fc0000]' : 'border-l-4 border-l-transparent'
                }`}
              >
                {/* Position */}
                <span
                  className={`text-center text-sm font-black tabular-nums sm:text-base md:text-lg ${
                    isPlayoff ? 'text-[#fc0000]' : 'text-slate-400'
                  }`}
                >
                  {team.position}
                </span>

                {/* Team: logo + name */}
                <div className="flex min-w-0 items-center gap-2 sm:gap-3">
                  {team.teamLogo ? (
                    <img
                      src={team.teamLogo}
                      alt={team.teamName}
                      className="h-7 w-7 shrink-0 object-contain sm:h-9 sm:w-9 md:h-10 md:w-10"
                      loading="lazy"
                    />
                  ) : (
                    <div className="h-7 w-7 shrink-0 rounded-full bg-slate-100 sm:h-9 sm:w-9 md:h-10 md:w-10" />
                  )}
                  <span className="truncate text-sm font-bold text-black uppercase sm:text-base md:text-lg">
                    {team.teamName}
                  </span>
                </div>

                {/* GP */}
                <span className="text-center text-sm font-semibold tabular-nums text-slate-700 sm:text-base">
                  {team.gamesPlayed}
                </span>

                {/* W */}
                <span className="text-center text-sm font-semibold tabular-nums text-slate-700 sm:text-base">
                  {team.wins}
                </span>

                {/* L */}
                <span className="text-center text-sm font-semibold tabular-nums text-slate-700 sm:text-base">
                  {team.losses}
                </span>

                {/* PTS */}
                <span className="text-center text-base font-black tabular-nums text-black sm:text-lg md:text-xl">
                  {team.points}
                </span>
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="mt-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#fc0000]">
          <FaInfoCircle className="text-black text-sm items-center" />
          Playoff qualification ({PLAYOFF_SPOTS} teams)
        </div>
      </div>
    </div>
  );
}