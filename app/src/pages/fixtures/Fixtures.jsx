import { useState, useEffect, useMemo } from 'react';
import { Tab } from '@headlessui/react';
import { getAllGames } from '../../utils/contentful';
import GameRow from '../../components/main/GameRow';
import bannerImage from '../../assets/banner.webp';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

function getMonthKey(date) {
  const d = new Date(date);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
}

export default function Fixtures() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    let isMounted = true;

    async function load() {
      setLoading(true);
      const data = await getAllGames();
      if (!isMounted) return;

      setGames(data);

      // Compute the initial tab index here — one state update block,
      // no cascading effect, no render loop.
      if (data.length > 0) {
        const keys = Array.from(new Set(data.map((g) => getMonthKey(g.date)))).sort();
        const currentKey = getMonthKey(new Date());
        const idx = keys.indexOf(currentKey);
        setSelectedIndex(idx >= 0 ? idx : 0);
      } else {
        setSelectedIndex(0);
      }

      setLoading(false);
    }

    load();
    return () => {
      isMounted = false;
    };
  }, []);

  // Group games by month + year (pure derivation, memoized)
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

  // Safety: clamp selectedIndex if it ever exceeds the available months
  const safeIndex = Math.min(selectedIndex, Math.max(months.length - 1, 0));

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center pt-20">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-[#fc0000]" />
      </div>
    );
  }

  if (games.length === 0) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-24 text-center md:px-8">
        <h1 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl">
          Fixtures & Results
        </h1>
        <p className="text-slate-600">
          No games scheduled yet. Check back soon.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Page header */}
      <div
        className="relative flex min-h-50 w-full items-center justify-start bg-cover bg-center bg-no-repeat md:min-h-90"
        style={{ backgroundImage: `url(${bannerImage})` }}
      >
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-[#fc0000b2]" />
        {/* Banner Content — vertically centered, left-aligned */}
        <div className="relative z-10 mx-auto w-full max-w-md px-6 text-left sm:max-w-3xl md:px-8 lg:max-w-6xl">
          <h2 className=" text-3xl font-bold text-white md:text-4xl">
            Fixtures & Results
          </h2>
          <p className="max-w-2xl text-base leading-relaxed text-black">
            Stay up to date with the latest stories, insights, and updates from
            the world of basketball and beyond.
          </p>
        </div>
      </div>

      {/* Month tabs */}
      <Tab.Group selectedIndex={safeIndex} onChange={setSelectedIndex}>
        <Tab.List className=" bg-white">
          <div className="mx-auto flex max-w-5xl gap-1 overflow-x-auto px-4 md:px-8">
            {months.map((month) => (
              <Tab
                key={month.key}
                className={({ selected }) =>
                  classNames(
                    'whitespace-nowrap cursor-pointer border-b-2 px-4 py-3.5 text-xs font-bold uppercase tracking-wider transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#fc0000] focus-visible:ring-offset-1 sm:text-sm',
                    selected
                      ? 'border-[#fc0000] text-[#fc0000]'
                      : 'border-transparent text-black hover:text-[#fc0000]'
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
              <div className="mx-auto max-w-5xl px-4 py-6 md:px-8 md:py-8">
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
    </div>
  );
}