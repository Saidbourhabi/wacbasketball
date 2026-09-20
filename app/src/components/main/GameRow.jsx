import { FaTicketAlt } from 'react-icons/fa';
// import { MdStadium } from "react-icons/md";


export default function GameRow({ game, isLast }) {
  const isFinished = game.status === 'finished';
  const isLive = game.status === 'live';

  const gameDate = new Date(game.date);
  const day = gameDate.toLocaleDateString('en-US', { day: '2-digit' });
  const weekday = gameDate
    .toLocaleDateString('en-US', { weekday: 'short' })
    .toUpperCase();
  const month = gameDate
    .toLocaleDateString('en-US', { month: 'short' })
    .toUpperCase();
  const time = gameDate.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

  const homeWon = isFinished && game.homeScore > game.awayScore;
  const awayWon = isFinished && game.awayScore > game.homeScore;
  const showTickets =
    !isFinished && !isLive && game.isHomeGame && game.ticketsUrl;

  return (
    <div
      className={`bg-white p-4 transition-colors hover:bg-slate-50 cursor-pointer sm:p-5 ${
        !isLast ? 'border-b border-[#fc0000]' : ''
      }`}
    >
      {/* Top row: date · time on left, league · week on right */}
      <div className="mb-3 flex items-center justify-between gap-3 text-[10px] font-bold uppercase tracking-wider text-black sm:text-xs">
        <span>
          {weekday} {day} {month} - {time}
        </span>
        <span className="truncate text-right">
          {game.leagueName}
          {game.week && ` - ${game.week}`}
        </span>
      </div>

      {/* Middle row: Home · Score/Time · Away */}
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 sm:gap-6">
        {/* Home team */}
        <div className="flex min-w-0 items-center gap-2 sm:gap-3">
          <img
            src={game.homeTeamLogo}
            alt={game.homeTeamName}
            className="h-8 w-8 shrink-0 object-contain sm:h-11 sm:w-11 md:h-12 md:w-12"
            loading="lazy"
          />
          <span
            className={`truncate text-sm font-bold sm:text-base md:text-lg ${
              isFinished && !homeWon ? 'text-[#fc0000]' : 'text-black'
            }`}
          >
            {game.homeTeamName}
          </span>
        </div>

        {/* Score or time */}
        <div className="flex shrink-0 flex-col items-center text-center">
          {isFinished || isLive ? (
            <div className="flex items-center gap-2 sm:gap-2">
              <span
                className={`text-2xl font-black tabular-nums leading-none sm:text-4xl md:text-5xl ${
                  homeWon ? 'text-[#fc0000]' : 'text-black'
                }`}
              >
                {game.homeScore}
              </span>
              <span className="text-lg text-[#fc0000] sm:text-2xl">-</span>
              <span
                className={`text-2xl font-black tabular-nums leading-none sm:text-4xl md:text-5xl ${
                  awayWon ? 'text-black' : 'text-black'
                }`}
              >
                {game.awayScore}
              </span>
            </div>
          ) : (
            <span className="text-xl font-black tabular-nums leading-none text-slate-900 sm:text-2xl md:text-3xl">
              {time}
            </span>
          )}

          <span className="mt-1.5 text-[9px] font-bold uppercase tracking-wider sm:text-[10px]">
            {isLive ? (
              <span className="text-[#fc0000]">Live</span>
            ) : isFinished ? (
              <span className="text-[#fc0000]">Final Score</span>
            ) : null}
          </span>
        </div>

        {/* Away team */}
        <div className="flex min-w-0 items-center justify-end gap-2 sm:gap-3">
          <span
            className={`truncate text-right text-sm font-bold sm:text-base md:text-lg ${
              isFinished && !awayWon ? 'text-black' : 'text-black'
            }`}
          >
            {game.awayTeamName}
          </span>
          <img
            src={game.awayTeamLogo}
            alt={game.awayTeamName}
            className="h-8 w-8 shrink-0 object-contain sm:h-11 sm:w-11 md:h-12 md:w-12"
            loading="lazy"
          />
        </div>
      </div>

      {/* Bottom row: arena + tickets */}
      <div className="mt-3 flex items-center justify-between gap-3 text-[10px] font-semibold uppercase tracking-wider text-black sm:text-xs">
        <span className="flex min-w-0 items-center gap-2 truncate">
          {/* <MdStadium  className="shrink-0 items-center text-xl text-[#fc0000]" /> */}
          <span className="truncate">{game.arena}</span>
        </span>

        {showTickets && (
          <a
            href={game.ticketsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-1.5 rounded-sm bg-[#fc0000] px-3 py-1.5 font-bold text-white transition-colors hover:bg-red-700"
          >
            <FaTicketAlt className="text-[10px]" />
            Tickets
          </a>
        )}
      </div>
    </div>
  );
}