// ============================================
// Contact Section — Contact form for home page
// ============================================
import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaPaperPlane, FaMapMarkerAlt, FaEnvelope, FaGithub, FaLinkedin } from 'react-icons/fa';
import toast from 'react-hot-toast';
import SectionTitle from '../common/SectionTitle';
import Button from '../common/Button';
import { messageAPI } from '../../api/endpoints';
import emailjs from '@emailjs/browser';

const ContactSection = () => {
  const formRef = useRef();
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.subject || !form.message) {
      toast.error('Please fill in all fields'); return;
    }
    setLoading(true);

    // EmailJS Credentials (same as Contact page)
    const SERVICE_ID = "service_4kjrce4";
    const TEMPLATE_ID = "template_e38q9t9";
    const PUBLIC_KEY = "vcU2IKkfp4gIdjJKA";

    try {
      // 1. Save to MongoDB so it shows up in the Admin Panel
      await messageAPI.send(form);

      // 2. Send via EmailJS
      await emailjs.sendForm(
        SERVICE_ID,
        TEMPLATE_ID,
        formRef.current,
        PUBLIC_KEY
      );

      toast.success('Message sent successfully!');
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      console.error('EmailJS Error:', err);
      toast.error('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section-container" id="contact">
      <SectionTitle title="Get In Touch" subtitle="Have a project in mind or want to say hello? Drop me a message!" />
      <div className="grid lg:grid-cols-5 gap-10 max-w-6xl mx-auto">
        {/* Contact Info */}
        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }} className="lg:col-span-2 space-y-6">
          <div className="glass-card p-6">
            <h3 className="font-heading font-semibold text-lg text-dark-900 dark:text-white mb-4">Contact Info</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary-50 dark:bg-primary-950/50 flex items-center justify-center text-primary-500"><FaEnvelope /></div>
                <div><p className="text-xs text-dark-500 dark:text-dark-400">Email</p><p className="text-sm font-medium dark:text-white">swathikaneswari@gmail.com</p></div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary-50 dark:bg-primary-950/50 flex items-center justify-center text-primary-500"><FaMapMarkerAlt /></div>
                <div><p className="text-xs text-dark-500 dark:text-dark-400">Location</p><p className="text-sm font-medium dark:text-white">India</p></div>
              </div>
            </div>
          </div>
          <div className="glass-card p-6">
            <h3 className="font-heading font-semibold text-dark-900 dark:text-white mb-3">Social Links</h3>
            <div className="flex gap-3">
              <a href="https://github.com/swathika2006" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-dark-100 dark:bg-dark-800 flex items-center justify-center text-dark-600 dark:text-dark-400 hover:bg-primary-500 hover:text-white transition-all"><FaGithub size={18} /></a>
              <a href="https://www.linkedin.com/in/eswari-swathika-n-581499329/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-dark-100 dark:bg-dark-800 flex items-center justify-center text-dark-600 dark:text-dark-400 hover:bg-primary-500 hover:text-white transition-all"><FaLinkedin size={18} /></a>
            </div>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.form ref={formRef} onSubmit={handleSubmit} initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }} className="lg:col-span-3 glass-card p-6 md:p-8">
          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-1">Name</label>
              <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Your name"
                className="w-full px-4 py-2.5 rounded-xl bg-dark-50 dark:bg-dark-800 border border-dark-200 dark:border-dark-700 text-dark-900 dark:text-white placeholder-dark-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-1">Email</label>
              <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="your@email.com"
                className="w-full px-4 py-2.5 rounded-xl bg-dark-50 dark:bg-dark-800 border border-dark-200 dark:border-dark-700 text-dark-900 dark:text-white placeholder-dark-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all text-sm" />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-1">Subject</label>
            <input type="text" name="subject" value={form.subject} onChange={handleChange} placeholder="What's this about?"
              className="w-full px-4 py-2.5 rounded-xl bg-dark-50 dark:bg-dark-800 border border-dark-200 dark:border-dark-700 text-dark-900 dark:text-white placeholder-dark-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all text-sm" />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-1">Message</label>
            <textarea name="message" value={form.message} onChange={handleChange} rows="5" placeholder="Your message..."
              className="w-full px-4 py-2.5 rounded-xl bg-dark-50 dark:bg-dark-800 border border-dark-200 dark:border-dark-700 text-dark-900 dark:text-white placeholder-dark-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all text-sm resize-none" />
          </div>
          <Button type="submit" disabled={loading} icon={<FaPaperPlane />}>
            {loading ? 'Sending...' : 'Send Message'}
          </Button>
        </motion.form>
      </div>
    </section>
  );
};

export default ContactSection;
