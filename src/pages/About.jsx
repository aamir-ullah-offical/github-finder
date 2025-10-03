/* ─────────────────  src/pages/About.jsx  ───────────────── */
import { motion } from "framer-motion";
import { 
  FaGithub, 
  FaSearch, 
  FaStar, 
  FaUsers, 
  FaCodeBranch 
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

const WORKFLOW = [
  {
    step: 1,
    title: "Search",
    desc: "Type any GitHub username or repository to explore.",
  },
  {
    step: 2,
    title: "Analyze",
    desc: "Get profile insights, repo details, and activity history.",
  },
  {
    step: 3,
    title: "Discover",
    desc: "Find collaborators, trending projects, or inspiring repos.",
  },
];

export default function About() {
  return (
    <div className="bg-white text-gray-800" id="about">

      {/* ───── Hero Section ───── */}
      <section className="relative h-[80vh] flex items-center justify-center text-center">
        {/* Background with overlay */}
        <img
          src="/public/aboutbg.png" 
          alt="GitHub Finder Background"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/30" />

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
          <p className="text-lg md:text-xl text-gray-200">
            A modern tool for developers and students to search, explore, and analyze GitHub users & repositories in one intuitive dashboard.
          </p>
        </motion.div>
      </section>

      {/* ───── Features Section ───── */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <h2 className="text-3xl font-bold text-center text-sky-700 mb-12">Key Features</h2>
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

      {/* ───── How it Works Section ───── */}
      <section className="py-20 bg-[#e4f1fc]">
        <div className="container mx-auto px-6 max-w-5xl">
          <h2 className="text-3xl font-bold text-center text-sky-700 mb-12">How It Works</h2>
          <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-8">
            {WORKFLOW.map(({ step, title, desc }) => (
              <motion.div
                key={title}
                className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
              >
                <div className="mb-3 text-2xl font-bold text-sky-600">Step {step}</div>
                <h3 className="text-xl font-semibold mb-2">{title}</h3>
                <p className="text-gray-600 text-sm">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── Developer Section ───── */}
      <section className="py-20 bg-white text-center">
        <div className="container mx-auto px-6 max-w-2xl">
          <h2 className="text-3xl font-bold text-sky-700 mb-4">About the Developer</h2>
          <p className="text-gray-600 mb-6">
            GitHub Finder is crafted with ❤️ to make exploring GitHub fast, organized, and insightful.
          </p>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-sky-500 text-white px-6 py-3 rounded-full font-semibold shadow hover:scale-105 transition"
          >
            <FaGithub /> View GitHub
          </a>
        </div>
      </section>

    </div>
  );
}
