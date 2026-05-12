// // ============================================
// // Contact Page — Full contact form + info
// // ============================================
// import { useState } from 'react';
// import { motion } from 'framer-motion';
// import { FaPaperPlane, FaMapMarkerAlt, FaEnvelope, FaGithub, FaLinkedin } from 'react-icons/fa';
// import toast from 'react-hot-toast';
// import SectionTitle from '../components/common/SectionTitle';
// import { messageAPI } from '../api/endpoints';


// const Contact = () => {
//   const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
//   const [loading, setLoading] = useState(false);
//   const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!form.name || !form.email || !form.subject || !form.message) { toast.error('Please fill all fields'); return; }
//     setLoading(true);
//     try {
//       const res = await messageAPI.send(form);
//       toast.success(res.data.message);
//       setForm({ name: '', email: '', subject: '', message: '' });
//     } catch (err) { toast.error(err.response?.data?.message || 'Failed to send'); }
//     finally { setLoading(false); }
//   };

//   const inputClass = "w-full px-4 py-3 rounded-xl bg-white dark:bg-dark-800 border border-dark-200 dark:border-dark-700 text-dark-900 dark:text-white placeholder-dark-400 focus:ring-2 focus:ring-primary-500 outline-none transition-all text-sm";

//   return (
//     <div className="pt-20">
//       <section className="section-container">
//         <SectionTitle title="Contact Me" subtitle="Let's work together! Send me a message and I'll get back to you." />
//         <div className="grid lg:grid-cols-5 gap-10 max-w-6xl mx-auto">
//           <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="lg:col-span-2 space-y-6">
//             <div className="glass-card p-6">
//               <h3 className="font-heading font-semibold text-lg text-dark-900 dark:text-white mb-4">Let's Connect</h3>
//               <p className="text-dark-500 dark:text-dark-400 text-sm mb-6">
//                 I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
//               </p>
//               <div className="space-y-4">
//                 <div className="flex items-center gap-3">
//                   <div className="w-10 h-10 rounded-xl bg-primary-50 dark:bg-primary-950/50 flex items-center justify-center text-primary-500"><FaEnvelope /></div>
//                   <div><p className="text-xs text-dark-500 dark:text-dark-400">Email</p><p className="text-sm font-medium dark:text-white">swathikaneswari@gmail.com</p></div>
//                 </div>
//                 <div className="flex items-center gap-3">
//                   <div className="w-10 h-10 rounded-xl bg-primary-50 dark:bg-primary-950/50 flex items-center justify-center text-primary-500"><FaMapMarkerAlt /></div>
//                   <div><p className="text-xs text-dark-500 dark:text-dark-400">Location</p><p className="text-sm font-medium dark:text-white">India</p></div>
//                 </div>
//               </div>
//             </div>
//             <div className="glass-card p-6">
//               <h3 className="font-heading font-semibold text-dark-900 dark:text-white mb-3">Follow Me</h3>
//               <div className="flex gap-3">
//                 <a href="https://github.com/swathika2006" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl bg-dark-100 dark:bg-dark-800 flex items-center justify-center text-dark-600 dark:text-dark-400 hover:bg-primary-500 hover:text-white transition-all hover:scale-110"><FaGithub size={20} /></a>
//                 <a href="https://www.linkedin.com/in/eswari-swathika-n-581499329/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl bg-dark-100 dark:bg-dark-800 flex items-center justify-center text-dark-600 dark:text-dark-400 hover:bg-primary-500 hover:text-white transition-all hover:scale-110"><FaLinkedin size={20} /></a>
//                 {/* <a href="mailto:swathikaneswari@gmail.com" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl bg-dark-100 dark:bg-dark-800 flex items-center justify-center text-dark-600 dark:text-dark-400 hover:bg-primary-500 hover:text-white transition-all hover:scale-110"><FaEnvelope size={20} /></a> */}

//               </div>
//             </div>
//           </motion.div>
//           <motion.form onSubmit={handleSubmit} initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="lg:col-span-3 glass-card p-6 md:p-8">
//             <h3 className="font-heading font-semibold text-xl text-dark-900 dark:text-white mb-6">Send a Message</h3>
//             <div className="grid sm:grid-cols-2 gap-4 mb-4">
//               <div><label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-1.5">Name *</label><input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Your name" className={inputClass} /></div>
//               <div><label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-1.5">Email *</label><input type="email" name="email" value={form.email} onChange={handleChange} placeholder="your@email.com" className={inputClass} /></div>
//             </div>
//             <div className="mb-4"><label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-1.5">Subject *</label><input type="text" name="subject" value={form.subject} onChange={handleChange} placeholder="What's this about?" className={inputClass} /></div>
//             <div className="mb-6"><label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-1.5">Message *</label><textarea name="message" value={form.message} onChange={handleChange} rows="6" placeholder="Tell me about your project..." className={`${inputClass} resize-none`} /></div>
//             <button type="submit" disabled={loading}
//               className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 text-white font-medium hover:from-primary-600 hover:to-primary-700 transition-all shadow-lg shadow-primary-500/25 disabled:opacity-50">
//               <FaPaperPlane /> {loading ? 'Sending...' : 'Send Message'}
//             </button>
//           </motion.form>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Contact;
// ============================================
// Contact Page — Full contact form + info
// ============================================
import { useState, useRef } from 'react'; // Added useRef
import { motion } from 'framer-motion';
import { FaPaperPlane, FaMapMarkerAlt, FaEnvelope, FaGithub, FaLinkedin } from 'react-icons/fa';
import toast from 'react-hot-toast';
import SectionTitle from '../components/common/SectionTitle';
import emailjs from '@emailjs/browser'; // Import EmailJS

const Contact = () => {
  const formRef = useRef(); // Create a reference for the form
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!form.name || !form.email || !form.subject || !form.message) { 
      toast.error('Please fill all fields'); 
      return; 
    }

    setLoading(true);

    // Your EmailJS Credentials
    const SERVICE_ID = "service_4kjrce4";
    const TEMPLATE_ID = "template_e38q9t9";
    const PUBLIC_KEY = "vcU2IKkfp4gIdjJKA";

    try {
      await emailjs.sendForm(
        SERVICE_ID,
        TEMPLATE_ID,
        formRef.current, // Uses the form reference to pull data
        PUBLIC_KEY
      );

      toast.success('Message sent successfully!');
      setForm({ name: '', email: '', subject: '', message: '' }); // Clear form
    } catch (err) {
      console.error('EmailJS Error:', err);
      toast.error('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full px-4 py-3 rounded-xl bg-white dark:bg-dark-800 border border-dark-200 dark:border-dark-700 text-dark-900 dark:text-white placeholder-dark-400 focus:ring-2 focus:ring-primary-500 outline-none transition-all text-sm";

  return (
    <div className="pt-20">
      <section className="section-container">
        <SectionTitle title="Contact Me" subtitle="Let's work together! Send me a message and I'll get back to you." />
        <div className="grid lg:grid-cols-5 gap-10 max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="lg:col-span-2 space-y-6">
            <div className="glass-card p-6">
              <h3 className="font-heading font-semibold text-lg text-dark-900 dark:text-white mb-4">Let's Connect</h3>
              <p className="text-dark-500 dark:text-dark-400 text-sm mb-6">
                I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
              </p>
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
              <h3 className="font-heading font-semibold text-dark-900 dark:text-white mb-3">Follow Me</h3>
              <div className="flex gap-3">
                <a href="https://github.com/swathika2006" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl bg-dark-100 dark:bg-dark-800 flex items-center justify-center text-dark-600 dark:text-dark-400 hover:bg-primary-500 hover:text-white transition-all hover:scale-110"><FaGithub size={20} /></a>
                <a href="https://www.linkedin.com/in/eswari-swathika-n-581499329/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl bg-dark-100 dark:bg-dark-800 flex items-center justify-center text-dark-600 dark:text-dark-400 hover:bg-primary-500 hover:text-white transition-all hover:scale-110"><FaLinkedin size={20} /></a>
              </div>
            </div>
          </motion.div>

          {/* Form with ref added here */}
          <motion.form 
            ref={formRef} 
            onSubmit={handleSubmit} 
            initial={{ opacity: 0, x: 30 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true }} 
            className="lg:col-span-3 glass-card p-6 md:p-8"
          >
            <h3 className="font-heading font-semibold text-xl text-dark-900 dark:text-white mb-6">Send a Message</h3>
            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-1.5">Name *</label>
                <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Your name" className={inputClass} />
              </div>
              <div>
                <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-1.5">Email *</label>
                <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="your@email.com" className={inputClass} />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-1.5">Subject *</label>
              <input type="text" name="subject" value={form.subject} onChange={handleChange} placeholder="What's this about?" className={inputClass} />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-1.5">Message *</label>
              <textarea name="message" value={form.message} onChange={handleChange} rows="6" placeholder="Tell me about your project..." className={`${inputClass} resize-none`} />
            </div>
            <button type="submit" disabled={loading}
              className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 text-white font-medium hover:from-primary-600 hover:to-primary-700 transition-all shadow-lg shadow-primary-500/25 disabled:opacity-50">
              <FaPaperPlane /> {loading ? 'Sending...' : 'Send Message'}
            </button>
          </motion.form>
        </div>
      </section>
    </div>
  );
};

export default Contact;