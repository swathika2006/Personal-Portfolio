// ============================================
// Certifications Page — Premium certificate gallery
// ============================================
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaCode, FaServer, FaBrain, FaMicrochip, FaBriefcase,
  FaExternalLinkAlt, FaAward, FaCalendarAlt, FaBuilding,
} from 'react-icons/fa';
import SectionTitle from '../components/common/SectionTitle';
import { certificationAPI } from '../api/endpoints';

// ---- Category Configuration ----
const CATEGORIES = [
  { key: 'all',          label: 'All',                    icon: <FaAward />,     color: 'from-violet-500 to-purple-500',  bg: 'bg-violet-50 dark:bg-violet-950/30',  text: 'text-violet-600 dark:text-violet-400'  },
  { key: 'frontend',     label: 'Frontend Dev',           icon: <FaCode />,      color: 'from-blue-500 to-cyan-500',      bg: 'bg-blue-50 dark:bg-blue-950/30',      text: 'text-blue-600 dark:text-blue-400'      },
  { key: 'backend',      label: 'Backend & Databases',    icon: <FaServer />,    color: 'from-green-500 to-emerald-500',  bg: 'bg-green-50 dark:bg-green-950/30',    text: 'text-green-600 dark:text-green-400'    },
  { key: 'ai-ds',        label: 'AI & Data Science',      icon: <FaBrain />,     color: 'from-orange-500 to-amber-500',   bg: 'bg-orange-50 dark:bg-orange-950/30',  text: 'text-orange-600 dark:text-orange-400'  },
  { key: 'core-cs',      label: 'Core CS & Languages',    icon: <FaMicrochip />, color: 'from-red-500 to-rose-500',       bg: 'bg-red-50 dark:bg-red-950/30',        text: 'text-red-600 dark:text-red-400'        },
  { key: 'professional', label: 'Professional & General', icon: <FaBriefcase />, color: 'from-teal-500 to-cyan-600',      bg: 'bg-teal-50 dark:bg-teal-950/30',      text: 'text-teal-600 dark:text-teal-400'      },
];

const getCatConfig = (key) => CATEGORIES.find(c => c.key === key) || CATEGORIES[0];

// ---- Fallback data (all 25 real certificates) ----
const FALLBACK = [
  { _id: '1',  title: 'Meta Frontend Developer',       issuer: 'Meta via Coursera',  date: '2026', category: 'frontend',     fileName: 'meta-frontend-certification.pdf' },
  { _id: '2',  title: 'HTML & CSS Fundamentals',       issuer: 'Udemy',              date: '2025', category: 'frontend',     fileName: 'html-css-certification.pdf' },
  { _id: '3',  title: 'HTML Concepts',                 issuer: 'Udemy',              date: '2025', category: 'frontend',     fileName: 'html-concepts.pdf' },
  { _id: '4',  title: 'JavaScript Certification',      issuer: 'Udemy',              date: '2025', category: 'frontend',     fileName: 'javascript-certification.pdf' },
  { _id: '5',  title: 'Microsoft UI/UX Fundamentals',  issuer: 'Microsoft',          date: '2025', category: 'frontend',     fileName: 'microsoft-ui-ux-fundamentals-certificate.pdf' },
  { _id: '6',  title: 'Microsoft UX Certification',    issuer: 'Microsoft',          date: '2025', category: 'frontend',     fileName: 'microsoft-ux-certification.pdf' },
  { _id: '7',  title: 'NodeJS & MongoDB Integration',  issuer: 'Udemy',              date: '2026', category: 'backend',      fileName: 'nodejs-mongodb-certification.pdf' },
  { _id: '8',  title: 'MongoDB Certification',         issuer: 'MongoDB University', date: '2025', category: 'backend',      fileName: 'mongo-certification.pdf' },
  { _id: '9',  title: 'Backend Development',           issuer: 'Packt',              date: '2025', category: 'backend',      fileName: 'packt-backend-certification.pdf' },
  { _id: '10', title: 'SQL Certification',             issuer: 'Udemy',              date: '2025', category: 'backend',      fileName: 'sql-certification.pdf' },
  { _id: '11', title: 'AWS Machine Learning',          issuer: 'Amazon Web Services',date: '2026', category: 'ai-ds',        fileName: 'aws-ml-certification.pdf' },
  { _id: '12', title: 'Google Data Analytics',         issuer: 'Google / Coursera',  date: '2025', category: 'ai-ds',        fileName: 'google-data-certification.pdf' },
  { _id: '13', title: 'Gen AI Bootcamp',               issuer: 'Growthschool',       date: '2025', category: 'ai-ds',        fileName: 'gen-ai-bootcamp.pdf' },
  { _id: '14', title: 'BE10X AI Workshop',             issuer: 'BE10X',              date: '2025', category: 'ai-ds',        fileName: 'be10x-ai-workshop.pdf' },
  { _id: '15', title: 'Growthschool AI Workshop',      issuer: 'Growthschool',       date: '2025', category: 'ai-ds',        fileName: 'growthschool-AI-workshop.pdf' },
  { _id: '16', title: 'AI for Cybersecurity',          issuer: 'PMI',                date: '2025', category: 'ai-ds',        fileName: 'ai-for-cybersecurity-pmi.pdf' },
  { _id: '17', title: 'IIT Bombay C++ Programming',    issuer: 'IIT Bombay',         date: '2025', category: 'core-cs',      fileName: 'iit-bombay-cpp-certification.pdf' },
  { _id: '18', title: 'Python Programming',            issuer: 'Udemy',              date: '2025', category: 'core-cs',      fileName: 'python-certification.pdf' },
  { _id: '19', title: 'Cybersecurity Fundamentals',    issuer: 'Coursera',           date: '2025', category: 'core-cs',      fileName: 'cybersecurity-certification.pdf' },
  { _id: '20', title: 'Networking Basics',             issuer: 'Cisco',              date: '2025', category: 'core-cs',      fileName: 'networking-basics-certification.pdf' },
  { _id: '21', title: 'GitHub Core Essentials',        issuer: 'GitHub',             date: '2025', category: 'professional', fileName: 'github-certification.pdf' },
  { _id: '22', title: 'Design Thinking',               issuer: 'Coursera',           date: '2025', category: 'professional', fileName: 'design-thinking-certification.pdf' },
  { _id: '23', title: 'SEO Fundamentals',              issuer: 'Coursera',           date: '2025', category: 'professional', fileName: 'coursera-seo-fundamentals.pdf' },
  { _id: '24', title: 'Interview Skill Development',   issuer: 'NPTEL',              date: '2025', category: 'professional', fileName: 'Interview Skill development.pdf' },
  { _id: '25', title: 'Internship Completion',         issuer: 'Company',            date: '2025', category: 'professional', fileName: 'internship_completion_certificate.pdf' },
];

// ---- Certificate Card ----
const CertCard = ({ cert, index }) => {
  const cat = getCatConfig(cert.category);
  const fileExt = cert.fileName.split('.').pop().toLowerCase();
  const isImage = ['jpg', 'jpeg', 'png'].includes(fileExt);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, delay: (index % 6) * 0.06 }}
      className="glass-card overflow-hidden group hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col"
    >
      {/* Top gradient accent bar */}
      <div className={`h-1.5 w-full bg-gradient-to-r ${cat.color}`} />

      <div className="p-5 flex flex-col flex-1">
        {/* Category badge + icon */}
        <div className="flex items-center justify-between mb-4">
          <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${cat.bg} ${cat.text}`}>
            {cat.icon}
            {cat.label}
          </span>
          {/* Year pill */}
          <span className="inline-flex items-center gap-1 text-xs text-dark-500 dark:text-dark-400">
            <FaCalendarAlt size={10} />
            {cert.date}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-heading font-semibold text-dark-900 dark:text-white leading-snug mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
          {cert.title}
        </h3>

        {/* Issuer */}
        <div className="flex items-center gap-1.5 text-sm text-dark-500 dark:text-dark-400 mb-4">
          <FaBuilding size={12} className="flex-shrink-0" />
          <span>{cert.issuer}</span>
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* View Certificate button */}
        <a
          href={`/certificates/${cert.fileName}`}
          target="_blank"
          rel="noopener noreferrer"
          className={`mt-4 inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-medium
            bg-gradient-to-r ${cat.color} text-white opacity-90 hover:opacity-100
            shadow-md hover:shadow-lg transition-all duration-200 group-hover:scale-[1.02]`}
        >
          <FaExternalLinkAlt size={12} />
          View {isImage ? 'Certificate' : 'Document'}
        </a>
      </div>
    </motion.div>
  );
};

// ---- Main Page ----
const Certifications = () => {
  const [certs, setCerts] = useState(FALLBACK);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    certificationAPI.getAll()
      .then(r => { if (r.data.data.length > 0) setCerts(r.data.data); })
      .catch(() => {}); // silently fallback
  }, []);

  const filtered = activeTab === 'all' ? certs : certs.filter(c => c.category === activeTab);

  const total = certs.length;

  return (
    <div className="pt-20">
      {/* Hero Banner */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-accent-700 py-16">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="relative section-container py-0 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white/90 text-sm font-medium mb-4">
              <FaAward /> {total} Certifications & Credentials
            </div>
            <h1 className="font-heading font-bold text-3xl md:text-5xl text-white mb-3">
              My Certifications
            </h1>
            <p className="text-white/70 text-lg max-w-xl mx-auto">
              A curated collection of professional certifications reflecting continuous learning and growth.
            </p>
          </motion.div>
        </div>
      </div>

      <section className="section-container">
        {/* Category Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {CATEGORIES.map(cat => {
            const count = cat.key === 'all' ? certs.length : certs.filter(c => c.category === cat.key).length;
            const isActive = activeTab === cat.key;
            return (
              <button
                key={cat.key}
                onClick={() => setActiveTab(cat.key)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
                  ${isActive
                    ? `bg-gradient-to-r ${cat.color} text-white shadow-lg scale-[1.03]`
                    : 'bg-white dark:bg-dark-800 text-dark-600 dark:text-dark-400 hover:bg-dark-100 dark:hover:bg-dark-700 border border-dark-200 dark:border-dark-700'
                  }`}
              >
                {cat.icon}
                {cat.label}
                <span className={`text-xs px-1.5 py-0.5 rounded-md ${isActive ? 'bg-white/20' : 'bg-dark-100 dark:bg-dark-700'}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </motion.div>

        {/* Count indicator */}
        <motion.p
          key={activeTab}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-sm text-dark-500 dark:text-dark-400 mb-8"
        >
          Showing <span className="font-semibold text-primary-600 dark:text-primary-400">{filtered.length}</span> certificate{filtered.length !== 1 ? 's' : ''}
        </motion.p>

        {/* Cards Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
          >
            {filtered.map((cert, i) => (
              <CertCard key={cert._id || cert.fileName} cert={cert} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-dark-500 dark:text-dark-400">
            <FaAward className="mx-auto mb-4 text-dark-300 dark:text-dark-600" size={40} />
            <p className="text-lg">No certifications in this category yet.</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Certifications;
