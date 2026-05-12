// ============================================
// 404 Not Found Page
// ============================================
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        {/* Animated 404 */}
        <motion.h1
          className="text-[10rem] md:text-[14rem] font-heading font-bold gradient-text leading-none"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          404
        </motion.h1>
        <h2 className="font-heading font-bold text-2xl md:text-3xl text-dark-900 dark:text-white mb-4">
          Page Not Found
        </h2>
        <p className="text-dark-500 dark:text-dark-400 mb-8 max-w-md mx-auto">
          Oops! The page you're looking for doesn't exist or has been moved.
          Let's get you back on track.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 text-white font-medium hover:from-primary-600 hover:to-primary-700 transition-all shadow-lg shadow-primary-500/25"
        >
          <FaHome /> Go Back Home
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;
