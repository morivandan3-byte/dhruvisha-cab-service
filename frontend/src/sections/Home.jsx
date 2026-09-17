import {
  ArrowRight,
  CarFront,
  Phone,
  ShieldCheck,
  UserRoundCheck,
} from "lucide-react";

import heroImage from "../assets/images/hero-cab.jpg";

const Home = () => {
  const trustPoints = [
    {
      icon: ShieldCheck,
      title: "Comfortable Rides",
    },
    {
      icon: CarFront,
      title: "Reliable Service",
    },
    {
      icon: UserRoundCheck,
      title: "Professional Drivers",
    },
  ];

  return (
    <section
      id="home"
      className="relative flex min-h-[calc(100vh-80px)] items-center overflow-hidden bg-white dark:bg-[#050505]"
    >
      {/* Background */}
      <img
        src={heroImage}
        alt="Dhruvisha Cab Service"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 dark:bg-black/45" />

      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-transparent" />

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 py-20 sm:px-8 md:py-24 lg:px-10 lg:py-28">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-yellow-400/40 bg-black/30 px-4 py-2 backdrop-blur-sm">
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />

            <span className="text-sm font-medium text-white">
              Your Trusted Cab Service
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            Your Journey,
            <br />
            <span className="text-yellow-400">
              Our Responsibility.
            </span>
          </h1>

          {/* Description */}
          <p className="mt-6 max-w-2xl text-base leading-7 text-gray-200 sm:text-lg sm:leading-8">
            Comfortable, reliable and convenient cab services for
            local rides, outstation trips and long-distance journeys.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-yellow-400 px-7 py-3.5 font-semibold text-black transition hover:bg-yellow-300"
            >
              <CarFront size={19} />
              Bill Generate
              <ArrowRight size={18} />
            </a>

            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/40 bg-black/20 px-7 py-3.5 font-semibold text-white backdrop-blur-sm transition hover:border-yellow-400 hover:text-yellow-400"
            >
              <Phone size={18} />
              Contact Us
            </a>
          </div>

          {/* Trust Points */}
          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-3">
            {trustPoints.map(({ icon: Icon, title }) => (
              <div
                key={title}
                className="flex items-center gap-3"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-yellow-400/30 bg-yellow-400/10">
                  <Icon
                    size={22}
                    className="text-yellow-400"
                  />
                </div>

                <p className="text-sm font-semibold text-white">
                  {title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;