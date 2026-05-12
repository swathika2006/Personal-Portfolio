// ============================================
// Testimonials — Client/peer testimonials
// ============================================
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaStar, FaQuoteLeft } from 'react-icons/fa';
import SectionTitle from '../common/SectionTitle';
import { testimonialAPI } from '../../api/endpoints';

const fallbackTestimonials = [
  { _id: '1', name: 'Priya Sharma', role: 'Project Lead', company: 'Tech University', message: 'Swathika is an incredibly talented developer with great attention to detail.', rating: 5 },
  { _id: '2', name: 'Rahul Kumar', role: 'Senior Developer', company: 'CodeCraft Labs', message: 'She picks up new technologies quickly and brings creative solutions.', rating: 5 },
  { _id: '3', name: 'Ananya Iyer', role: 'UI/UX Designer', company: 'DesignFlow Studio', message: 'Seamlessly translates mockups into pixel-perfect responsive interfaces.', rating: 4 },
];

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState(fallbackTestimonials);

  useEffect(() => {
    testimonialAPI.getAll().then(r => {
      if (r.data.data.length > 0) setTestimonials(r.data.data);
    }).catch(() => {});
  }, []);

  return (
    <section className="section-container bg-dark-50/50 dark:bg-dark-900/50" id="testimonials">
      <SectionTitle title="Testimonials" subtitle="What people say about working with me" />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {testimonials.map((t, i) => (
          <motion.div key={t._id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
            className="glass-card p-6 hover:shadow-xl transition-shadow">
            <FaQuoteLeft className="text-primary-300 dark:text-primary-700 mb-4" size={24} />
            <p className="text-dark-600 dark:text-dark-300 text-sm leading-relaxed mb-4 italic">"{t.message}"</p>
            <div className="flex items-center gap-1 mb-3">
              {[...Array(5)].map((_, idx) => (
                <FaStar key={idx} size={14} className={idx < t.rating ? 'text-yellow-500' : 'text-dark-300 dark:text-dark-600'} />
              ))}
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white font-bold text-sm">
                {t.name.charAt(0)}
              </div>
              <div>
                <p className="font-medium text-sm text-dark-900 dark:text-white">{t.name}</p>
                <p className="text-xs text-dark-500 dark:text-dark-400">{t.role} · {t.company}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
