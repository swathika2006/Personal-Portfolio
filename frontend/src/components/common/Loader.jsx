// ============================================
// Loader — Full-screen loading spinner
// ============================================
import { motion } from 'framer-motion';

const Loader = () => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-white dark:bg-dark-950">
      <div className="flex flex-col items-center gap-4">
        {/* Animated spinner */}
        <motion.div
          className="w-16 h-16 rounded-full border-4 border-dark-200 dark:border-dark-700 border-t-primary-500"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
        {/* Loading text */}
        <motion.p
          className="text-dark-500 dark:text-dark-400 font-medium"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          Loading...
        </motion.p>
      </div>
    </div>
  );
};

export default Loader;
