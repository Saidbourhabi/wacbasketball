import { NavLink } from 'react-router-dom';

// Central config — add a new tab here and it appears everywhere.
const LEAGUE_TABS = [
  { label: 'Fixtures', to: '/fixtures' },
  { label: 'Results', to: '/results' },
  { label: 'Standings', to: '/standings' },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Breadcrumb() {
  return (
    <div className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-5xl gap-1 overflow-x-auto px-4 md:px-8">
        {LEAGUE_TABS.map((tab) => (
          <NavLink
            key={tab.to}
            to={tab.to}
            className={({ isActive }) =>
              classNames(
                'whitespace-nowrap border-b-2 px-4 py-3.5 text-xs font-bold uppercase tracking-wider transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#fc0000] focus-visible:ring-offset-1 sm:text-sm',
                isActive
                  ? 'border-[#fc0000] text-[#fc0000]'
                  : 'border-transparent text-black hover:text-[#fc0000]'
              )
            }
          >
            {tab.label}
          </NavLink>
        ))}
      </div>
    </div>
  );
}