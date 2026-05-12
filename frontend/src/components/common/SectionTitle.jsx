// ============================================
// Section Title — Reusable heading component
// ============================================
import { motion } from 'framer-motion';

const SectionTitle = ({ title, subtitle, center = true }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
      className={`mb-12 md:mb-16 ${center ? 'text-center' : ''}`}
    >
      <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-dark-900 dark:text-white mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-dark-500 dark:text-dark-400 text-lg max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
      {/* Gradient underline */}
      <div className={`mt-4 flex ${center ? 'justify-center' : ''}`}>
        <div className="w-20 h-1 rounded-full bg-gradient-to-r from-primary-500 to-accent-500" />
      </div>
    </motion.div>
  );
};

export default SectionTitle;
