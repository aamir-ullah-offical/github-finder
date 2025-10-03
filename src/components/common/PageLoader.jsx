// src/components/common/PageLoader.jsx
import { motion } from "framer-motion";
import { FaGithub, FaSearch } from "react-icons/fa";

export default function PageLoader() {
  return (
    <motion.div
      className="fixed inset-0 z-[99999] grid place-items-center bg-gradient-to-br from-white via-sky-50 to-sky-100"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.45 } }}
    >
      <div className="relative flex flex-col items-center gap-4">
        {/* ── outer glowing rotating ring ── */}
        <motion.div
          className="relative h-32 w-32 rounded-full border-[6px] border-sky-400/40 shadow-[0_0_25px_5px_rgba(14,165,233,0.4)]"
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        >
          {/* pulsating gradient background */}
          <motion.div
            className="absolute inset-2 rounded-full bg-gradient-to-tr from-sky-400 to-indigo-600 blur-md"
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* center icon with combo GitHub + search */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center text-white"
            animate={{ scale: [0.9, 1.1, 0.9] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="relative flex items-center justify-center">
              <FaGithub className="text-5xl drop-shadow-lg" />
              <FaSearch className="absolute right-[-12px] bottom-[-6px] text-xl text-cyan-300 drop-shadow" />
            </div>
          </motion.div>
        </motion.div>

        {/* glowing finder pulse under text */}
        <motion.div
          className="h-2 w-20 rounded-full bg-gradient-to-r from-sky-400 to-indigo-500 blur-md"
          animate={{ opacity: [0.2, 0.8, 0.2], scaleX: [0.8, 1.2, 0.8] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    </motion.div>
  );
}
