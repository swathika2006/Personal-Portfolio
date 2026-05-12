// ============================================
// Theme Toggle — Sun/Moon icon button
// ============================================
import { motion } from 'framer-motion';
import { FiSun, FiMoon } from 'react-icons/fi';
import { useTheme } from '../../context/ThemeContext';

const ThemeToggle = () => {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative w-10 h-10 rounded-xl bg-dark-100 dark:bg-dark-800 flex items-center justify-center text-dark-600 dark:text-dark-300 hover:bg-dark-200 dark:hover:bg-dark-700 transition-colors"
      aria-label="Toggle theme"
      id="theme-toggle"
    >
      <motion.div
        initial={false}
        animate={{ rotate: darkMode ? 180 : 0, scale: darkMode ? 0 : 1 }}
        transition={{ duration: 0.3 }}
        className="absolute"
      >
        <FiSun size={18} />
      </motion.div>
      <motion.div
        initial={false}
        animate={{ rotate: darkMode ? 0 : -180, scale: darkMode ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="absolute"
      >
        <FiMoon size={18} />
      </motion.div>
    </button>
  );
};

export default ThemeToggle;
