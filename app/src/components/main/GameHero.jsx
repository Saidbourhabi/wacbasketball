import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getFeaturedGame } from '../../utils/contentful';
import bgLogo from '../../assets/w.jpg';

export default function GameHero() {
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function load() {
      const data = await getFeaturedGame();
      if (isMounted) {
        setGame(data);
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
        <div className="flex min-h-80 w-full items-center justify-center bg-[#fc0000] sm:min-h-125">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-white/30 border-t-white" />
        </div>
      </section>
    );
  }

  if (!game) return null;

  const isFinished = game.status === 'finished';
  const isLive = game.status === 'live';

  const gameDate = new Date(game.date);
  const formattedDate = gameDate
    .toLocaleDateString('en-US', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
    })
    .toUpperCase()
    .replace(',', '');
  const formattedTime = gameDate.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

  const showTickets = game.isHomeGame && game.ticketsUrl;

  // Dynamic link + label for the secondary button.
  const gamesLink = isFinished ? '/results' : '/fixtures';
  const gamesLabel = isFinished ? 'All Results' : 'All Fixtures';

  return (
    <section className="mt-16 w-full">
      <div className="relative w-full overflow-hidden bg-[#fc0000] text-white">
        {/* Background logo overlay */}
        <img
          src={bgLogo}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 h-full w-full select-none object-cover opacity-20"
          loading="lazy"
          fetchPriority="high"
        />


        <div className="relative z-10 flex min-h-80 flex-col justify-between px-6 py-10 sm:min-h-125 sm:px-12 sm:py-14 md:min-h-135 md:px-20 md:py-16 lg:min-h-145 lg:px-28 lg:py-20 xl:px-40">
          {/* --------------------------------------------- */}
          {/* Top row: League · Week · Date–Time · Arena     */}
          {/* --------------------------------------------- */}
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-center text-[10px] font-bold uppercase tracking-[0.15em] text-white sm:gap-x-8 sm:text-xs md:gap-x-12 md:text-sm">
            <span>{game.leagueName}</span>
            {game.week && <span>{game.week}</span>}
            <span>
              {formattedDate} · {formattedTime}
            </span>
            {game.arena && <span>{game.arena}</span>}
          </div>

          {/* --------------------------------------------- */}
          {/* Middle row: Home · Time/Score · Away           */}
          {/* --------------------------------------------- */}
          <div className="my-8 flex items-center justify-between gap-4 sm:my-10 sm:gap-8 md:my-12 md:gap-14 lg:gap-20">
            {/* Home team */}
            <div className="flex flex-1 flex-col items-center gap-3 text-center sm:gap-4 md:gap-5">
              <img
                src={game.homeTeamLogo}
                alt={game.homeTeamName}
                className="h-16 w-16 object-contain sm:h-24 sm:w-24 md:h-28 md:w-28 lg:h-36 lg:w-36 xl:h-40 xl:w-40"
                loading="lazy"
                fetchPriority="high"
              />
              <span className="text-[10px] font-bold uppercase tracking-wider leading-tight sm:text-xs md:text-sm lg:text-base xl:text-lg">
                {game.homeTeamName}
              </span>
            </div>

            {/* Center: time or final score */}
            {isFinished || isLive ? (
              <div className="flex shrink-0 items-baseline gap-2 sm:gap-4 md:gap-6 lg:gap-8">
                <span className="text-5xl font-black tabular-nums leading-none sm:text-7xl md:text-8xl lg:text-9xl">
                  {game.homeScore ?? 0}
                </span>
                <span className="text-3xl font-bold text-white/50 sm:text-5xl md:text-6xl lg:text-7xl">
                  –
                </span>
                <span className="text-5xl font-black tabular-nums leading-none sm:text-7xl md:text-8xl lg:text-9xl">
                  {game.awayScore ?? 0}
                </span>
              </div>
            ) : (
              <div className="flex items-center text-center">
                <span className="text-4xl font-black tabular-nums leading-none sm:text-6xl md:text-7xl lg:text-8xl">
                  {formattedTime}
                </span>
              </div>
            )}

            {/* Away team */}
            <div className="flex flex-1 flex-col items-center gap-3 text-center sm:gap-4 md:gap-5">
              <img
                src={game.awayTeamLogo}
                alt={game.awayTeamName}
                className="h-16 w-16 object-contain sm:h-24 sm:w-24 md:h-28 md:w-28 lg:h-36 lg:w-36 xl:h-40 xl:w-40"
                loading="lazy"
              />
              <span className="text-[10px] font-bold uppercase tracking-wider leading-tight sm:text-xs md:text-sm lg:text-base xl:text-lg">
                {game.awayTeamName}
              </span>
            </div>
          </div>

          {/* --------------------------------------------- */}
          {/* Bottom row: Follow live + action buttons       */}
          {/* --------------------------------------------- */}
          <div className="flex flex-col items-center gap-3 sm:gap-5">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white sm:text-xs">
              {isLive
                ? 'Match is live'
                : isFinished
                ? 'Final result'
                : 'Follow the match live on Facebook'}
            </span>

            <div className="flex flex-wrap items-center justify-center gap-3">
              {showTickets && (
                <a
                  href={game.ticketsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-sm bg-white px-6 py-3 text-xs font-bold uppercase tracking-wider text-black transition-colors hover:bg-white/85 sm:px-8 sm:py-3.5"
                >
                  Match Ticket
                </a>
              )}
              <Link
                to={gamesLink}
                className="inline-flex items-center justify-center rounded-sm border border-white bg-transparent px-6 py-3 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-white hover:text-[#fc0000] sm:px-8 sm:py-3.5"
              >
                {gamesLabel}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}