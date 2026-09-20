import { useMemo } from 'react';
import { Tab } from '@headlessui/react';
import GameRow from './GameRow';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

function getMonthKey(date) {
  const d = new Date(date);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
}

function getDefaultIndex(months, initialTab) {
  if (months.length === 0) return 0;
  if (initialTab === 'last') return months.length - 1;
  if (initialTab === 'first') return 0;

  const currentKey = getMonthKey(new Date());
  const exact = months.findIndex((m) => m.key === currentKey);
  if (exact >= 0) return exact;

  const nextIdx = months.findIndex((m) => m.key > currentKey);
  return nextIdx >= 0 ? nextIdx : 0;
}

export default function GamesByMonth({ games, initialTab = 'current' }) {
  const months = useMemo(() => {
    const map = new Map();
    games.forEach((game) => {
      const key = getMonthKey(game.date);
      const d = new Date(game.date);
      const label = d
        .toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
        .toUpperCase();
      if (!map.has(key)) map.set(key, { key, label, games: [] });
      map.get(key).games.push(game);
    });
    return Array.from(map.values()).sort((a, b) => a.key.localeCompare(b.key));
  }, [games]);

  if (months.length === 0) return null;

  return (
    <Tab.Group defaultIndex={getDefaultIndex(months, initialTab)}>
      <Tab.List >
        <div className="mx-auto flex max-w-5xl gap-2 overflow-x-auto px-4 py-5 md:px-8">
          {months.map((month) => (
            <Tab
              key={month.key}
              className={({ selected }) =>
                classNames(
                  'whitespace-nowrap cursor-pointer px-5 py-2 text-xs font-bold uppercase tracking-wider transition-colors  sm:text-sm',
                  selected
                    ? 'bg-[#fc0000] text-white shadow-sm'
                    : 'bg-slate-100 text-black hover:bg-white'
                )
              }
            >
              {month.label}
            </Tab>
          ))}
        </div>
      </Tab.List>

      <Tab.Panels>
        {months.map((month) => (
          <Tab.Panel key={month.key} className="focus:outline-none">
            <div className="mx-auto max-w-5xl px-4 pb-6 md:px-8 md:pb-8">
              <div className="overflow-hidden border border-[#fc0000] bg-white shadow-sm">
                {month.games.map((game, idx) => (
                  <GameRow
                    key={game.id}
                    game={game}
                    isLast={idx === month.games.length - 1}
                  />
                ))}
              </div>
            </div>
          </Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  );
}