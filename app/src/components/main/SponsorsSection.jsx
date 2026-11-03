import kappaLogo from "../../assets/svg/kappa.svg";
import webook from "../../assets/svg/Webook.svg";

const sponsors = [
   { id: "webook", name: "Webook", logo: webook },
   { id: "kappa", name: "kappa", logo: kappaLogo },
   { id: "northwind", name: "Northwind", logo: kappaLogo },
   { id: "lumora", name: "lumora", logo: kappaLogo },
   { id: "meridian", name: "Meridian", logo: kappaLogo },
   { id: "fernhill", name: "Fernhill", logo: kappaLogo },
];

export default function SponsorsSection() {
   return (
      <section className="my-6 px-4 md:px-8">
         <div className="mx-auto max-w-md sm:max-w-3xl lg:max-w-6xl">
            {/* Header: same as LatestNews */}
            <div className="mb-6 flex items-center justify-between gap-4">
               <h2 className="text-3xl font-extrabold uppercase tracking-wider text-[#fc0000] sm:text-4xl lg:text-4xl">
                  Our Sponsors
               </h2>
            </div>

            {/* Grid */}
            <ul
               role="list"
               className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6"
            >
               {sponsors.map((sponsor) => (
                  <li
                     key={sponsor.id}
                     className="flex h-24 items-center justify-center rounded-2xl bg-[#fc0000] px-4 text-white"
                  >
                     <img
                        src={sponsor.logo}
                        alt={sponsor.name}
                        width={160}
                        height={80}
                        decoding="async"
                        loading="lazy"
                        className="h-20 w-auto max-w-full object-contain"
                     />
                  </li>
               ))}
            </ul>
         </div>
      </section>
   );
}