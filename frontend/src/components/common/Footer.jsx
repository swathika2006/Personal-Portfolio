// ============================================
// Footer — Social links, quick links, copyright
// ============================================
import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaEnvelope, FaHeart, FaArrowUp } from 'react-icons/fa';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-dark-50 dark:bg-dark-900 border-t border-dark-200 dark:border-dark-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white font-heading font-bold text-lg">
                ES
              </div>
              <span className="font-heading font-bold text-lg dark:text-white">
                Eswari Swathika.N
              </span>
            </div>
            <p className="text-dark-500 dark:text-dark-400 text-sm leading-relaxed">
              Full Stack Developer passionate about building beautiful,
              functional, and user-friendly web applications.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading font-semibold text-dark-900 dark:text-white mb-4">
              Quick Links
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {[
                { name: 'Home', path: '/' },
                { name: 'About', path: '/about' },
                { name: 'Skills', path: '/skills' },
                { name: 'Projects', path: '/projects' },
                { name: 'Certifications', path: '/certifications' },
                { name: 'Contact', path: '/contact' },
                { name: 'Resume', path: '/resume' },
              ].map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-dark-500 dark:text-dark-400 hover:text-primary-500 dark:hover:text-primary-400 text-sm transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="font-heading font-semibold text-dark-900 dark:text-white mb-4">
              Connect With Me
            </h3>
            <div className="flex gap-3">
              <a
                href="https://github.com/swathika2006"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-dark-200 dark:bg-dark-800 flex items-center justify-center text-dark-600 dark:text-dark-400 hover:bg-primary-500 hover:text-white dark:hover:bg-primary-500 transition-all duration-200 hover:scale-110"
                aria-label="GitHub"
              >
                <FaGithub size={18} />
              </a>
              <a
                href="https://www.linkedin.com/in/eswari-swathika-n-581499329/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-dark-200 dark:bg-dark-800 flex items-center justify-center text-dark-600 dark:text-dark-400 hover:bg-primary-500 hover:text-white dark:hover:bg-primary-500 transition-all duration-200 hover:scale-110"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={18} />
              </a>
              <a
                href="mailto:contact@swathika.dev"
                className="w-10 h-10 rounded-xl bg-dark-200 dark:bg-dark-800 flex items-center justify-center text-dark-600 dark:text-dark-400 hover:bg-primary-500 hover:text-white dark:hover:bg-primary-500 transition-all duration-200 hover:scale-110"
                aria-label="Email"
              >
                <FaEnvelope size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-dark-200 dark:border-dark-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-dark-500 dark:text-dark-400 text-sm">
            © {currentYear} Eswari Swathika.N. Built with{' '}
            <FaHeart className="inline text-red-500 animate-pulse" size={12} />{' '}
            using React & Tailwind CSS
          </p>
          <button
            onClick={scrollToTop}
            className="w-10 h-10 rounded-xl bg-primary-500 text-white flex items-center justify-center hover:bg-primary-600 transition-all duration-200 hover:-translate-y-1 shadow-lg shadow-primary-500/25"
            aria-label="Scroll to top"
            id="scroll-to-top"
          >
            <FaArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
