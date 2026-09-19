import {
  CarFront,
  Mail,
  MapPin,
  Phone,
  Send,
} from "lucide-react";

const Contact = () => {
  return (
    <section
      id="contact"
      className="bg-gray-50 px-4 py-16 text-gray-900 transition-colors dark:bg-[#080808] dark:text-white sm:px-6 sm:py-20 md:px-8 md:py-24 lg:px-10"
    >
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-yellow-500 dark:text-yellow-400 sm:text-sm">
            Contact Us
          </p>

          <h2 className="text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
            Get in
            <span className="text-yellow-500 dark:text-yellow-400">
              {" "}
              touch with us.
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-gray-600 dark:text-white/60 sm:mt-5 sm:text-base sm:leading-7">
            Have a question or want to know more about our services?
            Send us a message and we will get back to you soon.
          </p>
        </div>

        {/* Contact Content */}
        <div className="mt-10 grid gap-6 sm:mt-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-8">
          {/* Contact Information */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-colors dark:border-white/10 dark:bg-white/[0.04] sm:rounded-3xl sm:p-7 md:p-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-400/10 text-yellow-500 dark:text-yellow-400">
              <CarFront size={24} />
            </div>

            <h3 className="mt-6 text-2xl font-bold">
              Dhruvisha Cab Service
            </h3>

            <p className="mt-3 text-sm leading-6 text-gray-600 dark:text-white/55 sm:text-base">
              Comfortable and reliable cab services for local and
              outstation journeys across Gujarat.
            </p>

            {/* Contact Details */}
            <div className="mt-8 space-y-5">
              {/* Phone */}
              <a
                href="tel:+919712497925"
                className="group flex items-center gap-4 transition hover:text-yellow-500 dark:hover:text-yellow-400"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-yellow-400/10 text-yellow-500 dark:text-yellow-400">
                  <Phone size={18} />
                </div>

                <div>
                  <p className="text-xs text-gray-500 dark:text-white/40">
                    Phone
                  </p>

                  <p className="mt-1 text-sm font-medium text-gray-800 group-hover:text-yellow-500 dark:text-white/80 dark:group-hover:text-yellow-400">
                    +91 97124 97925<br />
                    +91 81406 75891 
                  </p>
                </div>
              </a>

              {/* Email */}
              <a
                href="mailto:jadavbhavesh777@gmail.com"
                className="group flex items-center gap-4 transition hover:text-yellow-500 dark:hover:text-yellow-400"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-yellow-400/10 text-yellow-500 dark:text-yellow-400">
                  <Mail size={18} />
                </div>

                <div className="min-w-0">
                  <p className="text-xs text-gray-500 dark:text-white/40">
                    Email
                  </p>

                  <p className="mt-1 break-all text-sm font-medium text-gray-800 group-hover:text-yellow-500 dark:text-white/80 dark:group-hover:text-yellow-400">
                    jadavbhavesh777@gmail.com
                  </p>
                </div>
              </a>

              {/* Location */}
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-yellow-400/10 text-yellow-500 dark:text-yellow-400">
                  <MapPin size={18} />
                </div>

                <div>
                  <p className="text-xs text-gray-500 dark:text-white/40">
                    Service Area
                  </p>

                  <p className="mt-1 text-sm font-medium text-gray-800 dark:text-white/80">
                    Surat, Gujarat
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-colors dark:border-white/10 dark:bg-white/[0.04] sm:rounded-3xl sm:p-7 md:p-8">
            <div className="mb-7">
              <h3 className="text-2xl font-bold">
                Get In Touch
              </h3>

              <p className="mt-2 text-sm text-gray-500 dark:text-white/50">
                Have a question? Send us a message and we'll get
                back to you.
              </p>
            </div>

            <form className="space-y-5">
              {/* Name + Email */}
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-medium text-gray-700 dark:text-white/70"
                  >
                    Full Name
                  </label>

                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter your name"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:border-yellow-400 dark:border-white/10 dark:bg-black/30 dark:text-white dark:placeholder:text-white/30 dark:focus:border-yellow-400/50"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-gray-700 dark:text-white/70"
                  >
                    Email Address
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:border-yellow-400 dark:border-white/10 dark:bg-black/30 dark:text-white dark:placeholder:text-white/30 dark:focus:border-yellow-400/50"
                  />
                </div>
              </div>

              {/* Mobile */}
              <div>
                <label
                  htmlFor="mobile"
                  className="mb-2 block text-sm font-medium text-gray-700 dark:text-white/70"
                >
                  Mobile Number
                </label>

                <input
                  id="mobile"
                  name="mobile"
                  type="tel"
                  placeholder="Enter your mobile number"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:border-yellow-400 dark:border-white/10 dark:bg-black/30 dark:text-white dark:placeholder:text-white/30 dark:focus:border-yellow-400/50"
                />
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-medium text-gray-700 dark:text-white/70"
                >
                  Message
                </label>

                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  placeholder="Write your message..."
                  className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:border-yellow-400 dark:border-white/10 dark:bg-black/30 dark:text-white dark:placeholder:text-white/30 dark:focus:border-yellow-400/50"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-yellow-400 px-5 py-3.5 text-sm font-semibold text-black transition duration-200 hover:bg-yellow-300"
              >
                <Send size={17} />
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;