// src/components/common/PageLoader.jsx
import { motion } from 'framer-motion';

export default function PageLoader() {
  return (
    <motion.div
      className="fixed inset-0 z-[99999] grid place-items-center bg-white"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.45 } }}
    >
      {/* ── Core orb ── */}
      <motion.div
        className="relative h-24 w-24 rounded-full bg-gradient-to-br from-sky-400 to-indigo-600 shadow-xl"
        /* slow pulse */
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
      >
        {/* inner neural “grid” ring */}
        <motion.div
          className="absolute inset-0 m-auto h-full w-full rounded-full border-[6px] border-dashed
                     border-white/40"
          animate={{ rotate: 360 }}
          transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
        />

        {/* tiny central spark */}
        <motion.span
          className="absolute left-1/2 top-1/2 block h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
          animate={{ scale: [0.5, 1, 0.5] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </motion.div>
  );
}
