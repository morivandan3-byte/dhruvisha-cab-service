import { Mail, MapPin, Phone } from "lucide-react";

const Footer = () => {
  const links = [
    ["Home", "#home"],
    ["About", "#about"],
    ["Trip Routes", "#trip-routes"],
    ["Contact", "#contact"],
  ];

  return (
    <footer className="border-t border-gray-200 bg-white text-gray-900 transition-colors dark:border-white/10 dark:bg-[#050505] dark:text-white">
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 md:py-14 lg:px-10">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {/* Brand */}
          <div>
            <a
              href="#home"
              className="text-xl font-bold tracking-wide"
            >
              DHRUVISHA
              <span className="ml-1 text-yellow-500 dark:text-yellow-400">
                CAB
              </span>
            </a>

            <p className="mt-4 max-w-sm text-sm leading-6 text-gray-500 dark:text-white/50">
              Reliable and comfortable cab services for local and
              outstation travel across Gujarat.
            </p>

            <div className="mt-6 flex gap-3">
              {["FB", "IG", "IN"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-xs font-bold text-gray-500 transition hover:border-yellow-400 hover:text-yellow-500 dark:border-white/10 dark:text-white/60 dark:hover:text-yellow-400"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">
              Quick Links
            </h3>

            <div className="mt-5 flex flex-col gap-3">
              {links.map(([name, href]) => (
                <a
                  key={name}
                  href={href}
                  className="text-sm text-gray-500 transition hover:text-yellow-500 dark:text-white/50 dark:hover:text-yellow-400"
                >
                  {name}
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">
              Contact
            </h3>

            <div className="mt-5 space-y-4 text-sm text-gray-500 dark:text-white/50">
              <a
                href="tel:+919712497925"
                className="flex items-center gap-3 transition hover:text-yellow-500 dark:hover:text-yellow-400"
              >
                <Phone size={17} className="text-yellow-500 dark:text-yellow-400" />
                +91 97124 97925 <br />
                +91 81406 75891
              </a>

              <a
                href="mailto:jadavbhavesh777@gmail.com"
                className="flex items-center gap-3 transition hover:text-yellow-500 dark:hover:text-yellow-400"
              >
                <Mail size={17} className="shrink-0 text-yellow-500 dark:text-yellow-400" />
                <span className="break-all">
                  jadavbhavesh777@gmail.com
                </span>
              </a>

              <div className="flex items-center gap-3">
                <MapPin size={17} className="text-yellow-500 dark:text-yellow-400" />
                Surat, Gujarat
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-200 dark:border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-5 py-5 text-center sm:px-8 md:flex-row md:text-left lg:px-10">
          <p className="text-xs text-gray-400 sm:text-sm">
            © {new Date().getFullYear()} Dhruvisha Cab Service. All rights reserved.
          </p>

          <p className="text-xs text-gray-400 sm:text-sm">
            Designed & Developed with care.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;