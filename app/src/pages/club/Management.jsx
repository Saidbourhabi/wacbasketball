import { useState } from "react";
import banner from "../../assets/banner.webp";

const teamMembers = [
  { id: 1, name: "Ali Mourafi", role: "President", image: "https://res.cloudinary.com/dgzn9nczh/image/upload/v1785348998/IMG_3780_eha3g3.jpg" },
  { id: 2, name: "Khalid Hachemi", role: "Vice President", image: "https://res.cloudinary.com/dgzn9nczh/image/upload/v1785348998/IMG_3780_eha3g3.jpg" },
  { id: 3, name: "Simon Konecki", role: "Treasurer", image: "https://res.cloudinary.com/dgzn9nczh/image/upload/v1785348998/IMG_3780_eha3g3.jpg" },
  { id: 4, name: "Sophia Lala", role: "Secretary", image: "https://res.cloudinary.com/dgzn9nczh/image/upload/v1785348998/IMG_3780_eha3g3.jpg" },
  { id: 5, name: "Nizar Hafiani", role: "Member", image: "https://res.cloudinary.com/dgzn9nczh/image/upload/v1785348998/IMG_3780_eha3g3.jpg" },
  { id: 6, name: "Abdelkrim Khatabi", role: "Marketing", image: "https://res.cloudinary.com/dgzn9nczh/image/upload/v1785348998/IMG_3780_eha3g3.jpg" },
];

export default function Management() {
  return (
    <main className="w-full">
      {/* --------------------------------------------- */}
      {/* Banner                                           */}
      {/* --------------------------------------------- */}
      <div
        className="relative flex min-h-50 w-full items-center bg-cover bg-center bg-no-repeat md:min-h-90"
        style={{ backgroundImage: `url(${banner})` }}
      >
        <div className="absolute inset-0 bg-linear-to-r from-[#fc0000f2] via-[#fc0000cc] to-transparent" />

        <div className="relative z-10 mx-auto w-full max-w-md px-6 py-10 sm:max-w-3xl sm:px-8 sm:py-14 md:px-10 md:py-16 lg:max-w-6xl">
          <span className="mb-3 inline-block text-[10px] font-bold uppercase tracking-[0.25em] text-white/80 sm:text-xs">
            The Club Managers
          </span>
          <h1 className="text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
            Management
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/90 sm:text-base md:text-lg">
            Meet our management team leading the vision and strategy of the club.
          </p>
        </div>
      </div>

      {/* --------------------------------------------- */}
      {/* Cards Section                                    */}
      {/* --------------------------------------------- */}
      <div className="mx-auto mt-10 max-w-6xl p-8 md:px-8">
        <ul className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {teamMembers.map((member) => (
            <FadeInCard key={member.id} member={member} />
          ))}
        </ul>
      </div>
    </main>
  );
}

function FadeInCard({ member }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <li className="cursor-pointer overflow-hidden  border-2 border-[#fc0000] bg-white transition hover:border-black">
      <div className="relative h-95 w-full bg-white">
        <img
          src={member.image}
          alt={member.name}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          className={`h-full w-full object-cover object-top transition-opacity duration-700 ease-out ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>

      <div className="p-4">
        <h3 className="text-xl font-semibold leading-tight text-[#fc0000]">
          {member.name}
        </h3>
        <p className="mt-1 text-sm tracking-wide text-black">
          {member.role}
        </p>
      </div>
    </li>
  );
}