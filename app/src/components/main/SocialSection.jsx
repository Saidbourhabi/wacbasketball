import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import {
  FaFacebookF,
  FaInstagram,
  FaXTwitter,
  FaYoutube,
  FaTiktok,
} from 'react-icons/fa6';

const socials = [
  { name: 'Facebook', icon: FaFacebookF, href: 'https://www.facebook.com/wydadbasketball' },
  { name: 'Instagram', icon: FaInstagram, href: 'https://instagram.com/wacbasketball' },
  { name: 'X', icon: FaXTwitter, href: 'https://x.com/wacbasketball38' },
  { name: 'YouTube', icon: FaYoutube, href: 'https://www.youtube.com/@wacbasketball' },
  { name: 'TikTok', icon: FaTiktok, href: 'https://www.tiktok.com/@wacbasketball' },
];

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const SocialIcon = ({ icon: Icon, href, name }) => {
  const iconRef = useRef(null);

  const animate = (scale) => {
    if (!iconRef.current || prefersReducedMotion()) return;
    gsap.to(iconRef.current, {
      scale,
      duration: 0.3,
      ease: 'power2.out',
      overwrite: 'auto',
    });
  };

  useEffect(() => {
    const el = iconRef.current;
    return () => {
      if (el) gsap.killTweensOf(el);
    };
  }, []);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={name}
      onMouseEnter={() => animate(1.25)}
      onMouseLeave={() => animate(1)}
      onFocus={() => animate(1.25)}
      onBlur={() => animate(1)}
      className="flex items-center justify-center rounded-full bg-black p-3 text-white transition-colors duration-300 hover:bg-white hover:text-[#fc0000] focus-visible:outline-none focus-visible:bg-white focus-visible:text-[#fc0000] focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#fc0000] sm:p-4"
    >
      <span ref={iconRef} className="inline-flex">
        <Icon className="h-6 w-6 sm:h-7 sm:w-7" aria-hidden="true" />
      </span>
    </a>
  );
};

const SocialSection = () => {
  return (
    <section
      aria-labelledby="social-heading"
      className="flex min-h-[30vh] w-full items-center justify-center border-y-2 border-white bg-[#fc0000] py-8 sm:min-h-[40vh]"
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-6 px-4 sm:gap-8 md:flex-row md:justify-between md:gap-12 lg:px-8">
        <h2
          id="social-heading"
          className="text-3xl font-extrabold uppercase tracking-wider text-white sm:text-4xl lg:text-5xl"
        >
          Follow Us
        </h2>

        <ul className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          {socials.map(({ name, ...social }) => (
            <li key={name}>
              <SocialIcon name={name} {...social} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default SocialSection;