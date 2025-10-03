// src/pages/Home.jsx
import { motion } from "framer-motion";
import { useGithub } from "../context/github/githubContext"; 
import FindAndFilter from "../components/profile/FindAndFilter";
import FAQ from "../components/faq/FAQ";
import Contact from "../components/common/Contact";
import AddTestimonial from "../components/Testimmonals/AddTestimonial";

const parent = { show: { transition: { staggerChildren: 0.15 } } };
const item = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

/* header sizes */
const HEADER_H = 104; // 40-px topbar + 64-px nav

/* sentinel helper */
const Anchor = ({ id, offset = HEADER_H }) => (
  <span
    id={id}
    className="pointer-events-none block -mt-[${offset}px] h-0"
    aria-hidden="true"
  />
);

export default function Home() {
  // ✅ context se state lena
  const { users, loading, error } = useGithub();

  return (
    <motion.main
      className="main scroll-smooth"
      variants={parent}
      initial="hidden"
      animate="show"
    >
      {/* GitHub Finder Section */}
      <motion.section variants={item}>
        <Anchor id="allAIs" />
        <FindAndFilter users={users} loading={loading} error={error} />
      </motion.section>

      {/* FAQ */}
      <motion.section variants={item}>
        <Anchor id="faq" />
        <FAQ />
      </motion.section>

      {/* Contact */}
      <motion.section variants={item}>
        <Anchor id="contact" />
        <Contact />
      </motion.section>

      {/* Testimonials */}
      <motion.section variants={item}>
        <Anchor id="Review" />
        <AddTestimonial />
      </motion.section>
    </motion.main>
  );
}
