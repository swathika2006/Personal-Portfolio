// ============================================
// Manage Projects — Admin CRUD for projects
// ============================================
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaEdit, FaTrash, FaTimes, FaUpload } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { projectAPI } from '../../api/endpoints';

const emptyForm = { title: '', description: '', longDescription: '', category: 'fullstack', technologies: '', githubLink: '', liveLink: '', features: '', featured: false };

const ManageProjects = () => {
  const [projects, setProjects] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchProjects = () => projectAPI.getAll().then(r => setProjects(r.data.data)).catch(() => {});
  useEffect(() => { fetchProjects(); }, []);

  const openAdd = () => { setEditing(null); setForm(emptyForm); setImage(null); setShowModal(true); };
  const openEdit = (p) => {
    setEditing(p._id);
    setForm({ title: p.title, description: p.description, longDescription: p.longDescription || '', category: p.category, technologies: p.technologies.join(', '), githubLink: p.githubLink || '', liveLink: p.liveLink || '', features: (p.features || []).join(', '), featured: p.featured });
    setImage(null); setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const fd = new FormData();
    Object.keys(form).forEach(k => fd.append(k, form[k]));
    if (image) fd.append('image', image);
    try {
      if (editing) { await projectAPI.update(editing, fd); toast.success('Project updated!'); }
      else { await projectAPI.create(fd); toast.success('Project created!'); }
      setShowModal(false); fetchProjects();
    } catch (err) { toast.error(err.response?.data?.message || 'Failed to save'); }
    finally { setLoading(false); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this project?')) return;
    try { await projectAPI.delete(id); toast.success('Deleted!'); fetchProjects(); }
    catch (err) { toast.error('Delete failed'); }
  };

  const inputClass = "w-full px-3 py-2.5 rounded-xl bg-dark-50 dark:bg-dark-800 border border-dark-200 dark:border-dark-700 text-dark-900 dark:text-white text-sm focus:ring-2 focus:ring-primary-500 outline-none";

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-heading font-bold text-2xl text-dark-900 dark:text-white">Manage Projects</h1>
          <p className="text-dark-500 dark:text-dark-400 text-sm">{projects.length} projects total</p>
        </div>
        <button onClick={openAdd} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary-500 text-white text-sm font-medium hover:bg-primary-600 transition-colors">
          <FaPlus /> Add Project
        </button>
      </div>

      {/* Projects Table */}
      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-dark-50 dark:bg-dark-800">
              <tr>
                <th className="text-left px-4 py-3 text-xs font-medium text-dark-500 dark:text-dark-400 uppercase">Project</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-dark-500 dark:text-dark-400 uppercase">Category</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-dark-500 dark:text-dark-400 uppercase">Featured</th>
                <th className="text-right px-4 py-3 text-xs font-medium text-dark-500 dark:text-dark-400 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-100 dark:divide-dark-800">
              {projects.map(p => (
                <tr key={p._id} className="hover:bg-dark-50 dark:hover:bg-dark-800/50 transition-colors">
                  <td className="px-4 py-3">
                    <p className="font-medium text-sm text-dark-900 dark:text-white">{p.title}</p>
                    <p className="text-xs text-dark-500 dark:text-dark-400 line-clamp-1">{p.description}</p>
                  </td>
                  <td className="px-4 py-3"><span className="text-xs px-2 py-1 rounded-full bg-primary-50 dark:bg-primary-950/50 text-primary-600 dark:text-primary-400 capitalize">{p.category}</span></td>
                  <td className="px-4 py-3"><span className={`text-xs ${p.featured ? 'text-green-500' : 'text-dark-400'}`}>{p.featured ? 'Yes' : 'No'}</span></td>
                  <td className="px-4 py-3 text-right">
                    <button onClick={() => openEdit(p)} className="p-2 text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-950/50 rounded-lg transition-colors"><FaEdit size={14} /></button>
                    <button onClick={() => handleDelete(p._id)} className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/50 rounded-lg transition-colors ml-1"><FaTrash size={14} /></button>
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
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-900/50 backdrop-blur-sm">
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-2xl max-h-[90vh] overflow-y-auto glass-card p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-heading font-bold text-xl text-dark-900 dark:text-white">{editing ? 'Edit' : 'Add'} Project</h2>
                <button onClick={() => setShowModal(false)} className="p-2 rounded-lg hover:bg-dark-100 dark:hover:bg-dark-800"><FaTimes className="text-dark-500" /></button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div><label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-1">Title *</label><input type="text" value={form.title} onChange={e => setForm({...form, title: e.target.value})} className={inputClass} required /></div>
                <div><label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-1">Short Description *</label><input type="text" value={form.description} onChange={e => setForm({...form, description: e.target.value})} className={inputClass} required /></div>
                <div><label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-1">Full Description</label><textarea value={form.longDescription} onChange={e => setForm({...form, longDescription: e.target.value})} rows="3" className={`${inputClass} resize-none`} /></div>
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-1">Category *</label>
                    <select value={form.category} onChange={e => setForm({...form, category: e.target.value})} className={inputClass}>
                      {['frontend','backend','fullstack','mobile','ai/ml','other'].map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div><label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-1">Technologies *</label><input type="text" value={form.technologies} onChange={e => setForm({...form, technologies: e.target.value})} placeholder="React, Node.js, MongoDB" className={inputClass} required /></div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-1">GitHub Link</label><input type="url" value={form.githubLink} onChange={e => setForm({...form, githubLink: e.target.value})} className={inputClass} /></div>
                  <div><label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-1">Live Link</label><input type="url" value={form.liveLink} onChange={e => setForm({...form, liveLink: e.target.value})} className={inputClass} /></div>
                </div>
                <div><label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-1">Features (comma-separated)</label><input type="text" value={form.features} onChange={e => setForm({...form, features: e.target.value})} className={inputClass} /></div>
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={form.featured} onChange={e => setForm({...form, featured: e.target.checked})} className="w-4 h-4 rounded border-dark-300 text-primary-500 focus:ring-primary-500" />
                    <span className="text-sm text-dark-700 dark:text-dark-300">Featured Project</span>
                  </label>
                </div>
                <div>
                  <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-1">Project Image</label>
                  <label className="flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 border-dashed border-dark-300 dark:border-dark-600 cursor-pointer hover:border-primary-500 transition-colors">
                    <FaUpload className="text-dark-400" />
                    <span className="text-sm text-dark-500">{image ? image.name : 'Choose image...'}</span>
                    <input type="file" accept="image/*" onChange={e => setImage(e.target.files[0])} className="hidden" />
                  </label>
                </div>
                <div className="flex gap-3 pt-2">
                  <button type="submit" disabled={loading} className="px-6 py-2.5 rounded-xl bg-primary-500 text-white text-sm font-medium hover:bg-primary-600 transition-colors disabled:opacity-50">
                    {loading ? 'Saving...' : editing ? 'Update' : 'Create'}
                  </button>
                  <button type="button" onClick={() => setShowModal(false)} className="px-6 py-2.5 rounded-xl bg-dark-100 dark:bg-dark-800 text-dark-600 dark:text-dark-400 text-sm font-medium hover:bg-dark-200 dark:hover:bg-dark-700 transition-colors">Cancel</button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ManageProjects;
