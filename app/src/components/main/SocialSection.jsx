import { useRef } from 'react';
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

const SocialIcon = ({ icon: Icon, href, name }) => {
  const iconRef = useRef(null);

  const handleEnter = () => {
    gsap.to(iconRef.current, {
      scale: 1.25,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleLeave = () => {
    gsap.to(iconRef.current, {
      scale: 1,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={name}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className="group flex items-center justify-center rounded-full bg-black p-3 text-white transition-colors duration-300 hover:bg-white hover:text-[#fc0000] sm:p-4"
    >
      <span ref={iconRef} className="inline-flex">
        <Icon className="h-6 w-6 sm:h-7 sm:w-7" />
      </span>
    </a>
  );
};

const SocialSection = () => {
  return (
    <section className="flex min-h-[30vh] w-full border-y-2 border-white items-center justify-center bg-[#fc0000] py-8 sm:min-h-[40vh] lg:min-h-[30vh]">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-6 px-4 sm:gap-8 md:flex-row md:justify-between md:gap-12 lg:px-8">
        {/* Heading */}
        <h1 className="text-3xl font-extrabold uppercase tracking-wider text-white sm:text-4xl lg:text-5xl">
            Follow Us
        </h1>

        {/* Social grid */}
        <div className="grid grid-cols-6 gap-3 sm:grid-cols-6 sm:gap-4">
          {socials.map((social) => (
            <SocialIcon key={social.name} {...social} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialSection;