// src/components/layout/Footer.jsx
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <motion.footer
      className="bg-[#F3F7FB] border-t border-gray-200 text-[#2C4964] pt-10 pb-6 px-6 lg:px-16"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {/* Logo & Description */}
        <div>
          <div className="flex items-center mb-4">
            <img
              src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExcGVhNHg3Nm15NnRhOGx3ZzR3aGh0OXg2OXpsZWdhaW05MnBzY3p3dSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/12zV7u6Bh0vHpu/giphy.gif"
              alt="GitHub Finder Logo"
              className="h-10 w-10 mr-2 mix-blend-darken"
              style={{ filter: "brightness(1.1) contrast(1.2)" }}
            />
            <span className="text-2xl font-bold tracking-tight">
              GitHub&nbsp;Finder
            </span>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed">
            Search GitHub users, explore profiles, and check repositories — all
            in one simple, fast, and user-friendly platform.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-semibold text-lg mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-[#1977cc] transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-[#1977cc] transition">
                About
              </Link>
            </li>
            <li>
              <HashLink
                smooth
                to="/#faq"
                className="hover:text-[#1977cc] transition"
              >
                FAQ
              </HashLink>
            </li>
            <li>
              <HashLink
                smooth
                to="/#contact"
                className="hover:text-[#1977cc] transition"
              >
                Contact
              </HashLink>
            </li>
            <li>
              <HashLink
                smooth
                to="/#testimonials"
                className="hover:text-[#1977cc] transition"
              >
                Feedback
              </HashLink>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="font-semibold text-lg mb-3">Support</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/privacy" className="hover:text-[#1977cc] transition">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/terms" className="hover:text-[#1977cc] transition">
                Terms of Service
              </Link>
            </li>
            <li>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#1977cc] transition"
              >
                GitHub
              </a>
            </li>
          </ul>
        </div>

        {/* Extra Info */}
        <div>
          <h4 className="font-semibold text-lg mb-3">About Project</h4>
          <p className="text-sm text-gray-600">
            GitHub Finder is an open-source React app built to help developers
            quickly discover GitHub users and repositories.
          </p>
        </div>
      </div>

      <div className="text-center text-sm text-gray-500 mt-10 border-t pt-4">
        © {new Date().getFullYear()} GitHub Finder. All rights reserved.
      </div>
    </motion.footer>
  );
};

export default Footer;
