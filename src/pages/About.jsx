/* ─────────────────  src/pages/About.jsx  ───────────────── */
import { motion } from "framer-motion";
import {
  FaGithub,
  FaSearch,
  FaStar,
  FaUsers,
  FaCodeBranch,
  FaBullseye,
  FaLightbulb,
  FaLinkedin,
} from "react-icons/fa";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

const FEATURES = [
  {
    icon: <FaSearch />,
    title: "Smart Search",
    desc: "Find GitHub users & repositories instantly with optimized search filters.",
  },
  {
    icon: <FaUsers />,
    title: "Profile Insights",
    desc: "View detailed user profiles including followers, bio, and activity.",
  },
  {
    icon: <FaStar />,
    title: "Top Repositories",
    desc: "Access a user’s most starred repositories quickly & easily.",
  },
  {
    icon: <FaCodeBranch />,
    title: "Developer Stats",
    desc: "Check repositories, followers, and growth stats at a glance.",
  },
];

const TEAM = [
  {
    name: "Muhammad Osama",
    role: "Project Creator (React)",
    github: "https://github.com/xamQrexii",
    linkedin: "https://www.linkedin.com/in/xamqrexii/",
    avatar: "/Muhammad-Osama.png",
  },
  {
    name: "Aamir Ullah",
    role: "Lead Developer (Vite + Advanced Features)",
    github: "https://github.com/aamir-ullah-offical",
    linkedin: "https://www.linkedin.com/in/aamirullahofficial/",
    avatar: "/Aamir-Ullah.png",
  },
];

export default function About() {
  return (
    <div className="bg-white text-gray-800" id="about">
      {/* ───── Hero Section ───── */}
      <section className="relative h-[80vh] flex items-center justify-center text-center">
        <img
          src="/about-bg.avif"
          alt="GitHub Finder Background"
          className="absolute inset-0 h-full w-full object-cover brightness-110 contrast-105 saturate-110"
        />
        {/* Lighter Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/10" />

        <motion.div
          className="relative z-10 max-w-3xl px-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6">
            About GitHub Finder
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-6">
            A modern tool for developers and students to search, explore, and
            analyze GitHub users & repositories in one intuitive dashboard.
          </p>
          <a
            href="/"
            className="inline-block bg-sky-500 text-white px-8 py-4 rounded-full font-semibold shadow hover:scale-105 transition"
          >
            Explore GitHub Now
          </a>
        </motion.div>
      </section>

      {/* ───── Vision & Mission ───── */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-5xl text-center">
          <motion.h2
            className="text-3xl font-bold text-sky-700 mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            Our Vision & Mission
          </motion.h2>
          <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-10">
            <motion.div
              className="bg-white shadow rounded-xl p-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <FaLightbulb className="text-4xl text-sky-500 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2">Vision</h3>
              <p className="text-gray-600 text-sm">
                To empower developers worldwide with a fast, intuitive tool that
                makes GitHub exploration effortless and insightful.
              </p>
            </motion.div>

            <motion.div
              className="bg-white shadow rounded-xl p-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <FaBullseye className="text-4xl text-sky-500 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2">Mission</h3>
              <p className="text-gray-600 text-sm">
                To simplify collaboration, discovery, and growth by integrating
                powerful search, analysis, and repository insights in one
                platform.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ───── Features Section ───── */}
      <section className="py-20  bg-[#e4f1fc]">
        <div className="container mx-auto px-6 max-w-6xl">
          <h2 className="text-3xl font-bold text-center text-sky-700 mb-12">
            Key Features
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {FEATURES.map(({ icon, title, desc }) => (
              <motion.div
                key={title}
                className="bg-gray-50 rounded-xl p-6 text-center shadow hover:shadow-lg transition"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
              >
                <div className="text-4xl text-sky-500 mb-4">{icon}</div>
                <h3 className="text-xl font-semibold mb-2">{title}</h3>
                <p className="text-gray-600 text-sm">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── Team / Developers Section ───── */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-5xl text-center">
          <h2 className="text-3xl font-bold text-sky-800 mb-14">
            Meet the Developers
          </h2>
          <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8">
            {TEAM.map(({ name, role, github, linkedin, avatar }) => (
              <motion.div
                key={name}
                className={`rounded-xl px-6 py-8 flex flex-col items-center bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300`}
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
              >
                {/* Avatar */}
                <div className="relative mb-5">
                  <img
                    src={avatar}
                    alt={name}
                    className="w-20 h-20 rounded-full border border-gray-300 shadow-sm object-cover"
                  />
                  {name === "Muhammad Osama" && (
                    <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-sky-700 text-white text-xs font-medium px-3 py-0.5 rounded-full shadow-sm">
                      Creator
                    </span>
                  )}
                </div>

                {/* Name & Role */}
                <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
                <p className="text-sky-700 font-medium text-sm mb-3">{role}</p>

                {/* Bio */}
                <p className="text-gray-600 text-sm leading-relaxed mb-6 max-w-xs">
                  {name === "Muhammad Osama"
                    ? "Started the GitHub Finder project in React, simplifying GitHub exploration for developers."
                    : "Enhanced the project with Vite, advanced features, and a modern UI/UX for developers."}
                </p>

                {/* Social Links */}
                <div className="flex gap-6">
                  <a
                    href={github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-gray-900 text-xl transition-colors"
                  >
                    <FaGithub />
                  </a>
                  <a
                    href={linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-sky-700 text-xl transition-colors"
                  >
                    <FaLinkedin />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── Closing Section ───── */}
      <section className="py-16 bg-[#e4f1fc] text-center">
        <p className="text-gray-600 text-lg">
          Built with ❤️ by developers, for developers.
        </p>
      </section>
    </div>
  );
}
