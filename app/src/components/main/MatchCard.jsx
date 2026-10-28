import { FaMapMarkerAlt } from 'react-icons/fa';

export default function MatchCard({ game }) {
  const gameDate = new Date(game.date);
  
  // Format date and time
  const formattedDate = gameDate.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
  }).toUpperCase();
  
  const formattedTime = gameDate.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

  // Determine if it's a home game for the badge
  const isHome = game.isHomeGame;

  return (
    <div className="flex h-full flex-col justify-between  border border-[#fc0000] bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
      {/* Top row: League & Week */}
      <div className="mb-5 flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-slate-500 sm:text-xs">
        <span className="truncate pr-2">{game.leagueName}</span>
        <span className="shrink-0">{game.week}</span>
      </div>

      {/* Middle row: Teams & Time */}
      <div className="mb-6 flex items-center justify-between gap-3">
        {/* Home Team */}
        <div className="flex flex-1 flex-col items-center gap-2 text-center">
          <img
            src={game.homeTeamLogo}
            alt={game.homeTeamName}
            className="h-12 w-12 object-contain sm:h-14 sm:w-14"
            loading="lazy"
          />
          <span className="line-clamp-2 text-[11px] font-bold text-slate-900 sm:text-xs md:text-sm">
            {game.homeTeamName}
          </span>
        </div>

        {/* Time & Date */}
        <div className="flex shrink-0 flex-col items-center justify-center">
          <span className="text-xl font-black tabular-nums leading-none text-[#fc0000] sm:text-2xl md:text-3xl">
            {formattedTime}
          </span>
          <span className="mt-1 text-[10px] font-bold uppercase tracking-widest text-slate-400 sm:text-xs">
            {formattedDate}
          </span>
        </div>

        {/* Away Team */}
        <div className="flex flex-1 flex-col items-center gap-2 text-center">
          <img
            src={game.awayTeamLogo}
            alt={game.awayTeamName}
            className="h-12 w-12 object-contain sm:h-14 sm:w-14"
            loading="lazy"
          />
          <span className="line-clamp-2 text-[11px] font-bold text-slate-900 sm:text-xs md:text-sm">
            {game.awayTeamName}
          </span>
        </div>
      </div>

      {/* Bottom row: Home/Away Badge & Arena */}
      <div className="mt-auto flex items-center justify-start gap-3 border-t border-slate-100 pt-4">
        <span
          className={`inline-block shrink-0 rounded-sm px-2 py-1 text-[10px] font-bold uppercase tracking-wider ${
            isHome
              ? 'bg-[#fc0000]/10 text-[#fc0000]'
              : 'bg-slate-100 text-slate-600'
          }`}
        >
          {isHome ? 'Home' : 'Away'}
        </span>
        
        <span className="flex items-center gap-1.5 truncate text-[10px] font-semibold uppercase text-slate-500 sm:text-xs">
          <FaMapMarkerAlt className="shrink-0 text-slate-400" />
          <span className="truncate">{game.arena}</span>
        </span>
      </div>
    </div>
  );
}