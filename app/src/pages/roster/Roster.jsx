import { useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight, FaUsers } from "react-icons/fa";

const teams = [
   {
      id: "mens",
      name: "Men's Team",
      subtitle: "First Team Squad",
      href: "/roster/mens",
      image:
         "https://res.cloudinary.com/dgzn9nczh/image/upload/v1789838860/store2_gygbod.jpg",
   },
   {
      id: "womens",
      name: "Women's Team",
      subtitle: "First Team Squad",
      href: "/roster/womens",
      image:
         "https://res.cloudinary.com/dgzn9nczh/image/upload/v1789838839/store_oqnrny.jpg",
   },
];

function TeamCard({ team }) {
   const [imageFailed, setImageFailed] = useState(false);

   return (
      <Link
         to={team.href}
         aria-label={`View the ${team.name} roster`}
         // aspect-[4/5] works in Tailwind v3 AND v4
         className="group relative block aspect-[4/5] min-h-[18rem] overflow-hidden rounded-2xl border-2 border-[#fc0000] bg-neutral-100"
      >
         {!imageFailed ? (
            <img
               src={team.image}
               alt={`${team.name} roster`}
               loading="lazy"
               decoding="async"
               onError={() => setImageFailed(true)}
               className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
         ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#fc0000]/10 text-[#fc0000]">
               <FaUsers className="size-10" aria-hidden="true" />
               <span className="text-sm font-semibold uppercase tracking-wider">
                  {team.name}
               </span>
            </div>
         )}

         <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#000000cf] to-transparent p-5 text-white md:p-6">
            <span className="inline-block text-[11px] font-semibold uppercase tracking-wider text-white/80">
               {team.subtitle}
            </span>
            <h3 className="mt-1 flex items-center justify-between gap-3 text-xl font-bold leading-snug group-hover:text-[#fc0000] md:text-2xl">
               {team.name}
               <FaArrowRight className="size-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-[#fc0000]" />
            </h3>
         </div>
      </Link>
   );
}

export default function Roster() {
   return (
      <section className="my-6 px-4 md:px-8">
         <div className="mx-auto max-w-md sm:max-w-3xl lg:max-w-6xl">
            <div className="mb-6 flex items-center justify-between gap-4">
               <h1 className="text-3xl font-extrabold uppercase tracking-wider text-[#fc0000] sm:text-4xl lg:text-4xl">
                  Roster
               </h1>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
               {teams.map((team) => (
                  <TeamCard key={team.id} team={team} />
               ))}
            </div>
         </div>
      </section>
   );
}