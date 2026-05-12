// ============================================
// Button — Reusable button component with variants
// ============================================
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const variants = {
  primary:
    'bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40',
  secondary:
    'bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-600 hover:to-accent-700 text-white shadow-lg shadow-accent-500/25 hover:shadow-accent-500/40',
  outline:
    'border-2 border-primary-500 text-primary-600 dark:text-primary-400 hover:bg-primary-500 hover:text-white',
  ghost:
    'text-dark-600 dark:text-dark-300 hover:bg-dark-100 dark:hover:bg-dark-800 hover:text-primary-600 dark:hover:text-primary-400',
};

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-2.5 text-sm',
  lg: 'px-8 py-3 text-base',
};

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  href,
  to,
  className = '',
  icon,
  ...props
}) => {
  const classes = `inline-flex items-center justify-center gap-2 font-medium rounded-xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] ${variants[variant]} ${sizes[size]} ${className}`;

  // External link
  if (href) {
    return (
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        {...props}
      >
        {icon && <span>{icon}</span>}
        {children}
      </motion.a>
    );
  }

  // Internal link
  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {icon && <span>{icon}</span>}
        {children}
      </Link>
    );
  }

  // Regular button
  return (
    <motion.button
      className={classes}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {icon && <span>{icon}</span>}
      {children}
    </motion.button>
  );
};

export default Button;
