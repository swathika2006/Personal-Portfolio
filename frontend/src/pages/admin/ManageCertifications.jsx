// ============================================
// Manage Certifications — Admin CRUD
// ============================================
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaTrash, FaTimes, FaExternalLinkAlt, FaAward } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { certificationAPI } from '../../api/endpoints';

const CATEGORIES = [
  { key: 'frontend',     label: 'Frontend Dev' },
  { key: 'backend',      label: 'Backend & Databases' },
  { key: 'ai-ds',        label: 'AI & Data Science' },
  { key: 'core-cs',      label: 'Core CS & Languages' },
  { key: 'professional', label: 'Professional & General' },
];

const emptyForm = { title: '', issuer: '', date: '', category: 'frontend', fileName: '' };

const ManageCertifications = () => {
  const [certs, setCerts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(false);

  const fetchCerts = () =>
    certificationAPI.getAll().then(r => setCerts(r.data.data)).catch(() => {});

  useEffect(() => { fetchCerts(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.issuer || !form.date || !form.fileName) {
      toast.error('Please fill all fields'); return;
    }
    setLoading(true);
    try {
      await certificationAPI.create(form);
      toast.success('Certification added!');
      setShowModal(false);
      setForm(emptyForm);
      fetchCerts();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add certification');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this certification?')) return;
    try {
      await certificationAPI.delete(id);
      toast.success('Deleted!');
      fetchCerts();
    } catch {
      toast.error('Delete failed');
    }
  };

  const inputClass = 'w-full px-3 py-2.5 rounded-xl bg-dark-50 dark:bg-dark-800 border border-dark-200 dark:border-dark-700 text-dark-900 dark:text-white text-sm focus:ring-2 focus:ring-primary-500 outline-none';

  const catLabel = (key) => CATEGORIES.find(c => c.key === key)?.label || key;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-heading font-bold text-2xl text-dark-900 dark:text-white">Certifications</h1>
          <p className="text-dark-500 dark:text-dark-400 text-sm">{certs.length} certifications total</p>
        </div>
        <button onClick={() => { setForm(emptyForm); setShowModal(true); }}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary-500 text-white text-sm font-medium hover:bg-primary-600 transition-colors">
          <FaPlus /> Add Certification
        </button>
      </div>

      {/* Table */}
      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-dark-50 dark:bg-dark-800">
              <tr>
                <th className="text-left px-4 py-3 text-xs font-medium text-dark-500 dark:text-dark-400 uppercase">Title</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-dark-500 dark:text-dark-400 uppercase hidden md:table-cell">Issuer</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-dark-500 dark:text-dark-400 uppercase">Category</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-dark-500 dark:text-dark-400 uppercase hidden sm:table-cell">Year</th>
                <th className="text-right px-4 py-3 text-xs font-medium text-dark-500 dark:text-dark-400 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-100 dark:divide-dark-800">
              {certs.length === 0 ? (
                <tr><td colSpan={5} className="text-center py-12 text-dark-500 dark:text-dark-400">
                  <FaAward className="mx-auto mb-2 text-dark-300 dark:text-dark-600" size={24} />
                  No certifications yet
                </td></tr>
              ) : certs.map(cert => (
                <tr key={cert._id} className="hover:bg-dark-50 dark:hover:bg-dark-800/50 transition-colors">
                  <td className="px-4 py-3">
                    <p className="font-medium text-sm text-dark-900 dark:text-white">{cert.title}</p>
                    <p className="text-xs text-dark-400 dark:text-dark-500 truncate max-w-[200px]">{cert.fileName}</p>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell text-sm text-dark-600 dark:text-dark-300">{cert.issuer}</td>
                  <td className="px-4 py-3">
                    <span className="text-xs px-2 py-1 rounded-full bg-primary-50 dark:bg-primary-950/50 text-primary-600 dark:text-primary-400">{catLabel(cert.category)}</span>
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell text-sm text-dark-600 dark:text-dark-300">{cert.date}</td>
                  <td className="px-4 py-3 text-right">
                    <a href={`/certificates/${cert.fileName}`} target="_blank" rel="noopener noreferrer"
                      className="p-2 text-accent-500 hover:bg-accent-50 dark:hover:bg-accent-950/50 rounded-lg transition-colors inline-flex" title="View">
                      <FaExternalLinkAlt size={13} />
                    </a>
                    <button onClick={() => handleDelete(cert._id)}
                      className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/50 rounded-lg transition-colors ml-1">
                      <FaTrash size={13} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-900/60 backdrop-blur-sm">
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-lg glass-card p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-heading font-bold text-xl text-dark-900 dark:text-white">Add Certification</h2>
                <button onClick={() => setShowModal(false)} className="p-2 rounded-lg hover:bg-dark-100 dark:hover:bg-dark-800">
                  <FaTimes className="text-dark-500" />
                </button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-1">Title *</label>
                  <input type="text" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="e.g. Meta Frontend Developer" className={inputClass} required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-1">Issuer *</label>
                  <input type="text" value={form.issuer} onChange={e => setForm({ ...form, issuer: e.target.value })} placeholder="e.g. Meta via Coursera" className={inputClass} required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-1">Year *</label>
                    <input type="text" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} placeholder="2025" className={inputClass} required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-1">Category *</label>
                    <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className={inputClass}>
                      {CATEGORIES.map(c => <option key={c.key} value={c.key}>{c.label}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-1">File Name *</label>
                  <input type="text" value={form.fileName} onChange={e => setForm({ ...form, fileName: e.target.value })}
                    placeholder="e.g. meta-frontend-certification.pdf" className={inputClass} required />
                  <p className="text-xs text-dark-400 dark:text-dark-500 mt-1">File must exist in <code className="font-mono">frontend/public/certificates/</code></p>
                </div>
                <div className="flex gap-3 pt-2">
                  <button type="submit" disabled={loading}
                    className="px-6 py-2.5 rounded-xl bg-primary-500 text-white text-sm font-medium hover:bg-primary-600 transition-colors disabled:opacity-50">
                    {loading ? 'Adding...' : 'Add Certification'}
                  </button>
                  <button type="button" onClick={() => setShowModal(false)}
                    className="px-6 py-2.5 rounded-xl bg-dark-100 dark:bg-dark-800 text-dark-600 dark:text-dark-400 text-sm font-medium hover:bg-dark-200 dark:hover:bg-dark-700 transition-colors">
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ManageCertifications;
