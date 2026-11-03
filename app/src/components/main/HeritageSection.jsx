import { useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight, FaLandmark } from "react-icons/fa";

/* ------------------------------------------------------------------ */
/* Data — paste your Cloudinary URLs here                              */
/* ------------------------------------------------------------------ */
const heritageItems = [
    {
        id: "history",
        title: "History",
        subtitle: "Since 1932",
        href: "/club/history",
        image:
            "https://res.cloudinary.com/dgzn9nczh/image/upload/v1789327873/wac-basketabll_gh4bgf.jpg",
    },
    {
        id: "legends",
        title: "Legends",
        subtitle: "The greats",
        href: "/club/legends",
        image:
            "https://res.cloudinary.com/dgzn9nczh/image/upload/v1793727026/historyimg_cpj29l.jpg",
    },
    {
        id: "palmares",
        title: "Palmarès",
        subtitle: "Trophies & titles",
        href: "/club/palmares",
        image:
        "https://res.cloudinary.com/dgzn9nczh/image/upload/v1793726958/akkaoui-lagend_kgg1sc.jpg",
    },
];

/* ------------------------------------------------------------------ */
/* Card                                                                */
/* ------------------------------------------------------------------ */
function HeritageCard({ item }) {
   const [imageFailed, setImageFailed] = useState(false);

   return (
      <Link
         to={item.href}
         aria-label={`Explore ${item.title}`}
         className="group relative block aspect-4/5 min-h-72 overflow-hidden rounded-2xl border-2 border-[#fc0000] bg-neutral-100 sm:aspect-3/4 lg:aspect-4/5"
      >
         {/* Background image or fallback */}
         {!imageFailed ? (
            <img
               src={item.image}
               alt=""
               aria-hidden="true"
               loading="lazy"
               decoding="async"
               onError={() => setImageFailed(true)}
               className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
         ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#fc0000]/10 text-[#fc0000]">
               <FaLandmark className="size-10" aria-hidden="true" />
               <span className="text-sm font-semibold uppercase tracking-wider">
                  {item.title}
               </span>
            </div>
         )}

         {/* Overlay */}
         <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-[#000000cf] to-transparent p-5 text-white md:p-6">
            <span className="inline-block text-[11px] font-semibold uppercase tracking-wider text-white/80">
               {item.subtitle}
            </span>
            <h3 className="mt-1 flex items-center justify-between gap-3 text-xl font-bold leading-snug group-hover:text-[#fc0000] md:text-2xl">
               {item.title}
               <FaArrowRight className="size-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-[#fc0000]" />
            </h3>
         </div>
      </Link>
   );
}

/* ------------------------------------------------------------------ */
/* Section                                                             */
/* ------------------------------------------------------------------ */
export default function HeritageSection() {
   return (
      <section aria-labelledby="heritage-title" className="my-6 px-4 md:px-8">
         <div className="mx-auto max-w-md sm:max-w-3xl lg:max-w-6xl">
            {/* Header */}
            <div className="mb-6 flex items-center justify-between gap-4">
               <h2
                  id="heritage-title"
                  className="text-3xl font-extrabold uppercase tracking-wider text-[#fc0000] sm:text-4xl lg:text-4xl"
               >
                  Heritage
               </h2>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:gap-6">
               {heritageItems.map((item) => (
                    <HeritageCard key={item.id} item={item} />
               ))}
            </div>
         </div>
      </section>
   );
}