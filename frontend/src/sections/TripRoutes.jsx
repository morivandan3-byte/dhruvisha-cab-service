import { ArrowRight, CarFront, MapPin } from "lucide-react";

const TripRoutes = () => {
  const districts = [
    "Ahmedabad",
    "Amreli",
    "Anand",
    "Aravalli",
    "Banaskantha",
    "Bharuch",
    "Bhavnagar",
    "Botad",
    "Chhota Udepur",
    "Dahod",
    "Dang",
    "Devbhumi Dwarka",
    "Gandhinagar",
    "Gir Somnath",
    "Jamnagar",
    "Junagadh",
    "Kheda",
    "Kutch",
    "Mahisagar",
    "Mehsana",
    "Morbi",
    "Narmada",
    "Navsari",
    "Panchmahal",
    "Patan",
    "Porbandar",
    "Rajkot",
    "Sabarkantha",
    "Surendranagar",
    "Vadodara",
    "Valsad",
    "Vav-Tharad",
  ];

  return (
    <section
      id="trip-routes"
      className="bg-gray-100 px-4 py-16 text-gray-900 transition-colors dark:bg-[#050505] dark:text-white sm:px-6 sm:py-20 md:px-8 md:py-24 lg:px-10"
    >
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-yellow-500 dark:text-yellow-400 sm:text-sm">
            Trip Routes
          </p>

          <h2 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl">
            Surat to
            <span className="text-yellow-500 dark:text-yellow-400">
              {" "}
              Gujarat
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-gray-600 dark:text-white/60 sm:mt-5 sm:text-base sm:leading-7 md:text-lg">
            Cab service from Surat to destinations across Gujarat.
          </p>
        </div>

        {/* Route Card */}
        <div className="mx-auto mt-10 max-w-5xl rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition-colors dark:border-white/10 dark:bg-white/[0.04] sm:mt-12 sm:rounded-3xl sm:p-6 md:p-8 lg:p-10">
          {/* Card Header */}
          <div className="flex flex-col gap-5 border-b border-gray-200 pb-6 dark:border-white/10 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:pb-7">
            {/* Route Title */}
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-yellow-400/10 text-yellow-500 dark:text-yellow-400 sm:h-14 sm:w-14 sm:rounded-2xl">
                <CarFront size={22} className="sm:hidden" />
                <CarFront
                  size={28}
                  className="hidden sm:block"
                />
              </div>

              <div>
                <p className="text-[11px] font-medium text-gray-500 dark:text-white/40 sm:text-sm">
                  MAIN ROUTE
                </p>

                <h3 className="mt-1 text-xl font-bold sm:text-2xl md:text-3xl">
                  Surat → Gujarat
                </h3>
              </div>
            </div>

            {/* Contact Button */}
            <a
              href="#contact"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-yellow-400 px-5 py-3 text-sm font-semibold text-black transition duration-200 hover:bg-yellow-300 sm:w-auto"
            >
              Book trip contact
              <ArrowRight size={17} />
            </a>
          </div>

          {/* Routes */}
          <div className="mt-6 sm:mt-7">
            <p className="mb-4 text-xs font-medium text-gray-500 dark:text-white/50 sm:mb-5 sm:text-sm">
              Available Destinations
            </p>

            {/* Destinations */}
            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 sm:gap-3 lg:grid-cols-3">
              {districts.map((district) => (
                <a
                  key={district}
                  href="#contact"
                  className="group flex min-h-[50px] items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-3 transition duration-200 hover:border-yellow-400/50 hover:bg-yellow-50 dark:border-white/10 dark:bg-black/20 dark:hover:border-yellow-400/30 dark:hover:bg-yellow-400/[0.05] sm:px-4 sm:py-3.5"
                >
                  <MapPin
                    size={16}
                    className="shrink-0 text-yellow-500 dark:text-yellow-400 sm:h-[17px] sm:w-[17px]"
                  />

                  <span className="text-xs font-medium leading-5 text-gray-700 transition group-hover:text-yellow-600 dark:text-white/80 dark:group-hover:text-white sm:text-sm">
                    Surat → {district}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Text */}
        <p className="mx-auto mt-6 max-w-md text-center text-xs leading-5 text-gray-500 dark:text-white/40 sm:mt-8 sm:text-sm">
          Custom destinations are also available on request.
        </p>
      </div>
    </section>
  );
};

export default TripRoutes;