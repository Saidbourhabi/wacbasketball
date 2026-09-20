import { useTranslation } from 'react-i18next';
import { FaReact } from 'react-icons/fa';
import LanguageSwitcher from '../ui/LanguageSwitcher';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-[#fc0000] text-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex items-center justify-between py-8">
          {/* Logo (react-icons) + tagline */}
          <div className="flex items-center gap-3">
            <FaReact className="h-8 w-8 text-white" />
            <span className="text-sm font-medium text-white">
              {t('footerTagline')}
            </span>
          </div>

          {/* Language switcher on the right */}
          <div className="w-40">
            <LanguageSwitcher />
          </div>
        </div>

        {/* Copyright row */}
        <div className="border-t border-white py-6 text-center">
          <p className="text-sm text-white"> © {new Date().getFullYear()} {t('footerCopyright')}</p>
        </div>
      </div>
    </footer>
  );
}