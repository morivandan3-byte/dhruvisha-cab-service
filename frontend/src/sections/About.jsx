import {
  Car,
  Clock3,
  MapPinned,
  ShieldCheck,
} from "lucide-react";

const About = () => {
  const features = [
    {
      icon: Car,
      title: "Comfortable Cars",
      description:
        "Clean and comfortable vehicles for every journey.",
    },
    {
      icon: ShieldCheck,
      title: "Safe & Reliable",
      description:
        "A reliable travel experience with professional service.",
    },
    {
      icon: Clock3,
      title: "On-Time Service",
      description:
        "We value your time and focus on timely pickups.",
    },
    {
      icon: MapPinned,
      title: "Local & Outstation",
      description:
        "Travel locally or plan comfortable outstation trips.",
    },
  ];

  return (
    <section
      id="about"
      className="bg-gray-50 px-5 py-20 text-gray-900 transition-colors dark:bg-[#080808] dark:text-white sm:px-8 md:py-24 lg:px-10"
    >
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div className="max-w-2xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-yellow-500 dark:text-yellow-400">
            About Dhruvisha
          </p>

          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Comfortable journeys,
            <span className="block text-yellow-500 dark:text-yellow-400">
              dependable service.
            </span>
          </h2>

          <p className="mt-5 text-base leading-7 text-gray-600 dark:text-white/65 sm:text-lg">
            Dhruvisha Cab Service provides comfortable and
            convenient transportation for local rides,
            outstation trips and long-distance journeys.
          </p>
        </div>

        {/* Content */}
        <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:items-center">
          {/* Left */}
          <div>
            <h3 className="text-2xl font-semibold sm:text-3xl">
              Travel with confidence
            </h3>

            <p className="mt-5 leading-7 text-gray-600 dark:text-white/60">
              Whether you are travelling for work, family,
              business or leisure, our goal is to make every
              ride simple and comfortable. From pickup to
              destination, we focus on providing a smooth
              travel experience.
            </p>

            <p className="mt-4 leading-7 text-gray-600 dark:text-white/60">
              We offer flexible cab services for individual
              travellers, families and groups, with routes
              tailored to your travel needs.
            </p>

            {/* Stats */}
            <div className="mt-8 grid grid-cols-2 gap-5 sm:grid-cols-3">
              <Stat value="24/7" label="Availability" />

              <Stat value="Local" label="& Outstation" />

              <Stat value="Reliable" label="Service" />
            </div>
          </div>

          {/* Features */}
          <div className="grid gap-4 sm:grid-cols-2">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className="rounded-2xl border border-gray-200 bg-white p-5 transition hover:border-yellow-400/50 hover:shadow-sm dark:border-white/10 dark:bg-white/[0.04] dark:hover:border-yellow-400/30 dark:hover:bg-white/[0.06] sm:p-6"
                >
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-yellow-400/10 text-yellow-500 dark:text-yellow-400">
                    <Icon size={22} />
                  </div>

                  <h4 className="text-lg font-semibold">
                    {feature.title}
                  </h4>

                  <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-white/55">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

/* Stats */
const Stat = ({ value, label }) => {
  return (
    <div className="border-l-2 border-yellow-400 pl-4">
      <p className="text-xl font-bold sm:text-2xl">
        {value}
      </p>

      <p className="mt-1 text-sm text-gray-500 dark:text-white/50">
        {label}
      </p>
    </div>
  );
};

export default About;