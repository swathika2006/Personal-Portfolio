// ============================================
// Hero Section — Animated hero with typing effect
// ============================================
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { FaGithub, FaLinkedin, FaDownload, FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Button from '../common/Button';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden" id="hero">
      {/* Animated background shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-500/10 rounded-full blur-3xl animate-float" />
        <div className="absolute top-1/2 -left-40 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute -bottom-40 right-1/3 w-72 h-72 bg-primary-400/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }} />
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      <div className="section-container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            {/* Greeting badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 dark:bg-primary-950/50 border border-primary-200 dark:border-primary-800 mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-sm font-medium text-primary-700 dark:text-primary-300">
                Open to opportunities
              </span>
            </motion.div>

            <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl text-dark-900 dark:text-white leading-tight mb-4">
              Hi, I'm{' '}
              <span className="gradient-text">Eswari Swathika.N</span>
            </h1>

            {/* Typing animation */}
            <div className="text-xl md:text-2xl text-dark-600 dark:text-dark-300 mb-6 h-8">
              <TypeAnimation
                sequence={[
                  'Full Stack Developer',
                  2000,
                  'React.js Enthusiast',
                  2000,
                  'UI/UX Designer',
                  2000,
                  'Problem Solver',
                  2000,
                  'Tech Explorer',
                  2000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
                className="font-mono text-primary-600 dark:text-primary-400"
              />
            </div>

            <p className="text-dark-500 dark:text-dark-400 text-lg leading-relaxed mb-8 max-w-lg">
              Passionate about building beautiful, functional, and user-friendly
              web applications. I turn ideas into elegant digital experiences
              with clean code and modern technologies.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 mb-8">
              <Button to="/projects" size="lg" icon={<FaArrowRight />}>
                View Projects
              </Button>
              <Button
                href="/resume.pdf"
                variant="outline"
                size="lg"
                icon={<FaDownload />}
              >
                Download Resume
              </Button>
              <Button to="/contact" variant="ghost" size="lg">
                Contact Me
              </Button>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              <span className="text-sm text-dark-500 dark:text-dark-400">
                Find me on:
              </span>
              <a
                href="https://github.com/swathika2006"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-dark-100 dark:bg-dark-800 flex items-center justify-center text-dark-600 dark:text-dark-400 hover:bg-dark-900 hover:text-white dark:hover:bg-white dark:hover:text-dark-900 transition-all duration-200 hover:scale-110"
                aria-label="GitHub"
              >
                <FaGithub size={18} />
              </a>
              <a
                href="https://www.linkedin.com/in/eswari-swathika-n-581499329/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-dark-100 dark:bg-dark-800 flex items-center justify-center text-dark-600 dark:text-dark-400 hover:bg-[#0A66C2] hover:text-white transition-all duration-200 hover:scale-110"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={18} />
              </a>
            </div>
          </motion.div>

          {/* Hero Visual — Animated gradient orb */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="hidden lg:flex justify-center items-center"
          >
            <div className="relative">
              {/* Outer ring */}
              <div className="w-80 h-80 rounded-full border-2 border-dashed border-primary-300/30 dark:border-primary-700/30 animate-spin-slow flex items-center justify-center">
                {/* Inner ring */}
                <div className="w-64 h-64 rounded-full border-2 border-dashed border-accent-300/30 dark:border-accent-700/30 animate-spin-slow flex items-center justify-center" style={{ animationDirection: 'reverse' }}>
                  {/* Center orb */}
                  <div className="w-48 h-48 rounded-full bg-gradient-to-br from-primary-500 via-primary-400 to-accent-500 animate-pulse-glow flex items-center justify-center shadow-2xl">
                    <span className="text-6xl font-heading font-bold text-white">ES</span>
                  </div>
                </div>
              </div>

              {/* Floating tech badges */}
              {[
                { label: 'React', pos: 'top-0 left-0 -translate-x-4 -translate-y-4' },
                { label: 'Node.js', pos: 'top-0 right-0 translate-x-4 -translate-y-4' },
                { label: 'MongoDB', pos: 'bottom-0 left-0 -translate-x-4 translate-y-4' },
                { label: 'Express', pos: 'bottom-0 right-0 translate-x-4 translate-y-4' },
              ].map((badge, i) => (
                <motion.div
                  key={badge.label}
                  className={`absolute ${badge.pos} px-3 py-1.5 rounded-lg glass-card text-xs font-medium text-dark-700 dark:text-dark-200`}
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 2, delay: i * 0.5, repeat: Infinity }}
                >
                  {badge.label}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
