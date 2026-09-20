import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaFacebookF, FaInstagram, FaYoutube, FaTiktok } from 'react-icons/fa';
import { FaThreads, FaXTwitter } from 'react-icons/fa6';
import wacbasketball from '../../assets/wacbasketball.svg';
import LanguageSwitcher from '../ui/LanguageSwitcher';

const NAV_COLUMNS = [
  {
    headingKey: 'footer.columns.club.heading',
    links: [
      { labelKey: 'footer.columns.club.history', to: '/club/history' },
      { labelKey: 'footer.columns.club.trophies', to: '/club/trophies' },
      { labelKey: 'footer.columns.club.management', to: '/club/management' },
      { labelKey: 'footer.columns.club.stadium', to: '/club/stadium' },
      { labelKey: 'footer.columns.club.supporters', to: '/club/supporters' },
    ],
  },
  {
    headingKey: 'footer.columns.teams.heading',
    links: [
      { labelKey: 'footer.columns.teams.mens', to: '/roster/mens' },
      { labelKey: 'footer.columns.teams.womens', to: '/roster/womens' },
      { labelKey: 'footer.columns.teams.u23', to: '/roster/u23' },
      { labelKey: 'footer.columns.teams.u19', to: '/roster/u19' },
      { labelKey: 'footer.columns.teams.u17', to: '/roster/u17' },
      { labelKey: 'footer.columns.teams.academy', to: '/academy' },
    ],
  },
  {
    headingKey: 'footer.columns.matches.heading',
    links: [
      { labelKey: 'footer.columns.matches.fixtures', to: '/fixtures' },
      { labelKey: 'footer.columns.matches.results', to: '/results' },
      { labelKey: 'footer.columns.matches.standings', to: '/standings' },
    ],
  },
  {
    headingKey: 'footer.columns.media.heading',
    links: [
      { labelKey: 'footer.columns.media.news', to: '/news' },
      { labelKey: 'footer.columns.media.gallery', to: '/gallery' },
      { labelKey: 'footer.columns.media.press', to: '/press' },
    ],
  },
  {
    headingKey: 'footer.columns.info.heading',
    links: [
      { labelKey: 'footer.columns.info.about', to: '/club/ourview' },
      { labelKey: 'footer.columns.info.contact', to: '/contact' },
      { labelKey: 'footer.columns.info.privacy', to: '/privacy' },
      { labelKey: 'footer.columns.info.terms', to: '/terms' },
      { labelKey: 'footer.columns.info.sponsors', to: '/club/sponsors' },
    ],
  },
];

const SOCIAL_LINKS = [
  {
    key: 'facebook',
    icon: <FaFacebookF />,
    href: 'https://www.facebook.com/WACofficiel/',
  },
  {
    key: 'instagram',
    icon: <FaInstagram />,
    href: 'https://www.instagram.com/wacofficiel/',
  },
  {
    key: 'threads',
    icon: <FaThreads />,
    href: 'https://www.threads.com/wacofficiel/',
  },
  {
    key: 'twitter',
    icon: <FaXTwitter />,
    href: 'https://x.com/WACofficiel',
  },
  {
    key: 'youtube',
    icon: <FaYoutube />,
    href: 'https://www.youtube.com/@WACofficiel',
  },
  {
    key: 'tiktok',
    icon: <FaTiktok />,
    href: 'https://www.tiktok.com/@wacofficiel/',
  },
];

const BOTTOM_LINKS = [
  { labelKey: 'footer.bottom.terms', to: '/terms' },
  { labelKey: 'footer.bottom.privacy', to: '/privacy' },
  { labelKey: 'footer.bottom.sitemap', to: '/sitemap' },
  { labelKey: 'footer.bottom.contact', to: '/contact' },
  { labelKey: 'footer.bottom.cookies', to: '/cookies' },
];

export default function Footer() {
  const { t } = useTranslation();

  const linkStyles =
    'hover:text-black hover:underline underline-offset-4 transition-all';

  return (
    <footer className="w-full bg-[#fc0000]">
      <div className="px-4 pb-8 pt-16 md:px-8">
        <div className="mx-auto max-w-7xl">
          {/* --------------------------------------------- */}
          {/* Top row: tagline + language switcher           */}
          {/* --------------------------------------------- */}
          <div className="mb-12 flex items-center justify-between  pb-6">
            <div className="flex items-center r gap-3">
              <img
                src={wacbasketball}
                alt="Wydad Athletic Club"
                className="w-15"
              />
            </div>
            <div className="w-40">
              <LanguageSwitcher />
            </div>
          </div>

          {/* --------------------------------------------- */}
          {/* CTA                                              */}
          {/* --------------------------------------------- */}
          <section className="mx-auto mb-16 max-w-2xl text-center">
            <p className="text-3xl font-semibold leading-tight text-white sm:text-4xl">
              {t('footer.cta.headline')}
            </p>
            <p className="mt-6 text-sm font-normal leading-relaxed text-white/90">
              {t('footer.cta.subtitle')}
            </p>

            <Link
              to="/contact"
              className="mt-8 inline-block border border-white px-6 py-2 text-sm text-white transition hover:bg-white hover:text-[#fc0000]"
            >
              {t('footer.cta.button')}
            </Link>
          </section>

          {/* --------------------------------------------- */}
          {/* Nav columns                                      */}
          {/* --------------------------------------------- */}
          <div className="grid grid-cols-2 gap-x-2 gap-y-10 md:grid-cols-4 lg:grid-cols-4 min-[1200px]:grid-cols-5!">
            {NAV_COLUMNS.map((col) => (
              <div key={col.headingKey}>
                <h3 className="mb-6 text-sm font-semibold text-white">
                  {t(col.headingKey)}
                </h3>
                <ul className="space-y-4 text-[13px] font-normal text-white">
                  {col.links.map((link) => (
                    <li key={link.labelKey}>
                      <Link to={link.to} className={linkStyles}>
                        {t(link.labelKey)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <hr className="my-12 border-white" />

          {/* --------------------------------------------- */}
          {/* Social icons                                     */}
          {/* --------------------------------------------- */}
          <ul className="flex flex-wrap justify-center gap-6">
            {SOCIAL_LINKS.map((social) => (
              <li key={social.key}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t(`footer.social.${social.key}`)}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white p-2 text-xl text-[#fc0000] transition-all hover:bg-black hover:text-white"
                >
                  {social.icon}
                </a>
              </li>
            ))}
          </ul>

          {/* --------------------------------------------- */}
          {/* Bottom links                                     */}
          {/* --------------------------------------------- */}
          <div className="mx-auto mt-8 max-w-3xl">
            <ul className="flex flex-wrap justify-center gap-x-6 gap-y-4 text-[13px] font-normal text-white">
              {BOTTOM_LINKS.map((link) => (
                <li key={link.labelKey}>
                  <Link to={link.to} className={linkStyles}>
                    {t(link.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* --------------------------------------------- */}
      {/* Copyright bar                                    */}
      {/* --------------------------------------------- */}
      <div className="bg-black px-6 py-2 text-center">
        <p className="text-sm text-white">
          © {new Date().getFullYear()} {t('footerCopyright')}
        </p>
      </div>
    </footer>
  );
}