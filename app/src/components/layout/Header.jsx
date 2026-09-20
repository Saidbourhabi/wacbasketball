import { Link } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { MenuIcon, XIcon, ExternalLinkIcon } from '@animateicons/react/lucide';
import { FaUserCircle, FaSignOutAlt } from 'react-icons/fa';
import { useAuth0 } from '@auth0/auth0-react';
import { useTranslation } from 'react-i18next';
import wacbasketball from '../../assets/wacbasketball.svg';

const navigation = [
  { name: 'Home', href: '/', key: 'home' },
  { name: 'News', href: '/news', key: 'news' },
  {
    name: 'Club',
    key: 'club',
    items: [
      { name: 'Ourview', href: '/club/ourview', key: 'club_ourview' },
      { name: 'Our History', href: '/club/history', key: 'club_history' },
      { name: 'Our Honours', href: '/club/honours', key: 'club_honours' },
      { name: 'Our Trophies', href: '/club/trophies', key: 'club_trophies' },
      { name: 'Management', href: '/club/management', key: 'club_management' },
      { name: 'Sponsors', href: '/club/sponsors', key: 'club_sponsors' },
      { name: 'Memberships', href: '/club/memberships', key: 'club_memberships' },
      { name: 'Contact Us', href: '/contact', key: 'club_contact' },
    ],
  },
  {
    name: 'Schedule & Results',
    key: 'schedule_results',
    items: [
      { name: 'Fixtures', href: '/fixtures', key: 'schedule_results_fixtures' },
      { name: 'Results', href: '/results', key: 'schedule_results_results' },
      { name: 'Standings', href: '/standings', key: 'schedule_results_standings' },
    ],
  },
  {
    name: 'Roster',
    key: 'roster',
    items: [
      { name: "Men's Basketball", href: '/roster/mens', key: 'roster_mens' },
      { name: "Women's Basketball", href: '/roster/womens', key: 'roster_womens' },
      { name: 'Staff', href: '/roster/staff', key: 'roster_staff' },
      { name: 'U23', href: '/roster/u23', key: 'roster_u23' },
    ],
  },
  {
    name: 'Academy',
    key: 'academy',
    items: [
      { name: 'Camp', href: '/academy/camp', key: 'academy_camp' },
      { name: 'Philosophy', href: '/academy/philosophy', key: 'academy_philosophy' },
    ],
  },
  { name: 'Store', href: 'https://wacofficialbrand.com/', key: 'store' },
  { name: 'Tickets', href: 'https://wacbasket.ticketing.ma/', key: 'tickets' },
];

function StoreTicketLink({ href, translationKey }) {
  const iconRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const { t } = useTranslation();

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center px-3 py-2 text-sm font-medium text-white hover:bg-white hover:text-[#fc0000]"
      onMouseEnter={() => {
        setIsHovered(true);
        iconRef.current?.startAnimation();
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        iconRef.current?.stopAnimation();
      }}
    >
      {t(translationKey)}
      <ExternalLinkIcon
        ref={iconRef}
        size={16}
        duration={0.5}
        color={isHovered ? '#fc0000' : '#ffffff'}
        className="ml-1"
      />
    </a>
  );
}

function AuthDropdown({ user, logout }) {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-white hover:text-[#fc0000] focus:outline-none"
      >
        {user?.picture ? (
          <img src={user.picture} alt={user.name} className="w-8 h-8 rounded-full" />
        ) : (
          <FaUserCircle className="w-8 h-8" />
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-[#fc0000] shadow-lg py-2 z-50 border border-white">
          <Link
            to="/profile"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-2 px-4 py-2 text-white hover:bg-[#fc0000] hover:text-black"
          >
            <FaUserCircle className="w-4 h-4" />
            <span>{t('header.myAccount')}</span>
          </Link>
          <button
            onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
            className="flex items-center cursor-pointer gap-2 w-full px-4 py-2 text-white hover:bg-[#fc0000] hover:text-black text-left"
          >
            <FaSignOutAlt className="w-4 h-4" />
            <span>{t('header.logout')}</span>
          </button>
        </div>
      )}
    </div>
  );
}

export default function Header() {
  const { isAuthenticated, user, loginWithRedirect, logout } = useAuth0();
  const { t } = useTranslation();

  // Plain React state — nothing else controls this.
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [openSections, setOpenSections] = useState({});

  const closeDrawer = () => {
    setDrawerOpen(false);
    setOpenSections({});
  };

  const toggleSection = (key) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 border-b-2 border-white bg-[#fc0000]">
      <div className="mx-auto max-w-8xl">
        <div className="relative flex h-16 items-center justify-between">
          {/* Left side: hamburger, logo, inline nav */}
          <div className="flex items-center">
            <button
              type="button"
              onClick={() => setDrawerOpen((v) => !v)}
              className="inline-flex cursor-pointer bg-white h-16 w-16 items-center justify-center p-2"
            >
              <span className="sr-only">Open main menu</span>
              {drawerOpen ? (
                <XIcon size={32} duration={1} color="#fc0000" />
              ) : (
                <MenuIcon size={32} duration={1} color="#fc0000" />
              )}
            </button>

            <Link to="/" className="flex shrink-0 items-center pl-4">
              <img alt="Your Company" src={wacbasketball} className="w-9" fetchPriority="high" />
            </Link>

            <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-4">
              {navigation
                .filter((item) => item.key === 'store' || item.key === 'tickets')
                .map((item) => (
                  <StoreTicketLink key={item.key} href={item.href} translationKey={`navigation.${item.key}`} />
                ))}
            </div>
          </div>

          {/* Right side: Auth0 */}
          <div className="flex items-center pr-3">
            {isAuthenticated ? (
              <AuthDropdown user={user} logout={logout} />
            ) : (
              <button
                onClick={() => loginWithRedirect()}
                className="flex items-center justify-center gap-2 cursor-pointer w-full px-4 py-2 text-white hover:bg-white hover:text-[#fc0000]"
              >
                <span>{t('header.signin')}</span>
                <FaUserCircle className="text-xl" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Drawer panel — plain conditional render, no Headless UI */}
      {drawerOpen && (
        <div className="fixed top-16 left-0 right-0 bottom-0 z-20 border-t-2 border-white bg-black shadow-lg sm:left-0 sm:right-auto sm:w-72 overflow-y-auto">
          <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
            {navigation.map((item) => {
              // Grouped sections with sub-items
              if (item.items) {
                const isOpen = !!openSections[item.key];
                return (
                  <div key={item.name} className="py-1">
                    <button
                      type="button"
                      onClick={() => toggleSection(item.key)}
                      className="flex w-full cursor-pointer items-center justify-between px-3 py-2 text-base font-medium text-white hover:bg-[#fc0000] hover:text-white"
                    >
                      <span>{t(`navigation.${item.key}`)}</span>
                      <span
                        className={`transform transition-transform ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      >
                        <svg
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </span>
                    </button>

                    {isOpen && (
                      <div className="mt-1 space-y-1 pl-4">
                        {item.items.map((subItem) => (
                          <Link
                            key={subItem.name}
                            to={subItem.href}
                            onClick={closeDrawer}
                            className="block px-3 py-2 text-sm text-white hover:bg-[#fc0000] hover:text-white"
                          >
                            {t(`navigation.${subItem.key}`)}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              // External links
              if (item.key === 'store' || item.key === 'tickets') {
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={closeDrawer}
                    className="block px-3 py-2 text-base font-medium text-white hover:bg-[#fc0000] hover:text-white"
                  >
                    {t(`navigation.${item.key}`)}
                  </a>
                );
              }

              // Flat internal links
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={closeDrawer}
                  className="block px-3 py-2 text-base font-medium text-white hover:bg-[#fc0000] hover:text-white"
                >
                  {t(`navigation.${item.key}`)}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}