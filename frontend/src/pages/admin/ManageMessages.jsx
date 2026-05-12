// ============================================
// Manage Messages — Admin message viewer
// ============================================
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaTrash, FaEnvelope, FaEnvelopeOpen } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { messageAPI } from '../../api/endpoints';

const ManageMessages = () => {
  const [messages, setMessages] = useState([]);
  const [selected, setSelected] = useState(null);

  const fetchMessages = () => messageAPI.getAll().then(r => setMessages(r.data.data)).catch(() => {});
  useEffect(() => { fetchMessages(); }, []);

  const toggleRead = async (id) => {
    try { await messageAPI.toggleRead(id); fetchMessages(); } catch (err) { toast.error('Failed to update'); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this message?')) return;
    try { await messageAPI.delete(id); toast.success('Deleted!'); setSelected(null); fetchMessages(); }
    catch (err) { toast.error('Delete failed'); }
  };

  const unreadCount = messages.filter(m => !m.read).length;

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-heading font-bold text-2xl text-dark-900 dark:text-white">Messages</h1>
        <p className="text-dark-500 dark:text-dark-400 text-sm">{messages.length} total · {unreadCount} unread</p>
      </div>

      <div className="grid lg:grid-cols-5 gap-6">
        {/* Message List */}
        <div className="lg:col-span-2 space-y-2 max-h-[70vh] overflow-y-auto">
          {messages.length === 0 ? (
            <div className="glass-card p-8 text-center text-dark-500 dark:text-dark-400">No messages yet</div>
          ) : messages.map(m => (
            <motion.div key={m._id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              onClick={() => setSelected(m)}
              className={`glass-card p-4 cursor-pointer transition-all hover:shadow-md ${selected?._id === m._id ? 'ring-2 ring-primary-500' : ''} ${!m.read ? 'border-l-4 border-l-primary-500' : ''}`}>
              <div className="flex items-center justify-between mb-1">
                <p className={`text-sm ${!m.read ? 'font-semibold text-dark-900 dark:text-white' : 'text-dark-700 dark:text-dark-300'}`}>{m.name}</p>
                {!m.read ? <FaEnvelope className="text-primary-500" size={12} /> : <FaEnvelopeOpen className="text-dark-400" size={12} />}
              </div>
              <p className="text-xs text-dark-500 dark:text-dark-400 line-clamp-1">{m.subject}</p>
              <p className="text-xs text-dark-400 dark:text-dark-500 mt-1">{new Date(m.createdAt).toLocaleDateString()}</p>
            </motion.div>
          ))}
        </div>

        {/* Message Detail */}
        <div className="lg:col-span-3">
          {selected ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="font-heading font-semibold text-lg text-dark-900 dark:text-white">{selected.subject}</h2>
                  <p className="text-sm text-dark-500 dark:text-dark-400">From: {selected.name} ({selected.email})</p>
                  <p className="text-xs text-dark-400 dark:text-dark-500">{new Date(selected.createdAt).toLocaleString()}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => toggleRead(selected._id)}
                    className="p-2 rounded-lg text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-950/50 transition-colors" title={selected.read ? 'Mark unread' : 'Mark read'}>
                    {selected.read ? <FaEnvelope size={14} /> : <FaEnvelopeOpen size={14} />}
                  </button>
                  <button onClick={() => handleDelete(selected._id)}
                    className="p-2 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-950/50 transition-colors">
                    <FaTrash size={14} />
                  </button>
                </div>
              </div>
              <div className="border-t border-dark-200 dark:border-dark-700 pt-4">
                <p className="text-dark-600 dark:text-dark-300 text-sm leading-relaxed whitespace-pre-wrap">{selected.message}</p>
              </div>
              <div className="mt-4 pt-4 border-t border-dark-200 dark:border-dark-700">
                <a href={`mailto:${selected.email}?subject=Re: ${selected.subject}`}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary-500 text-white text-sm font-medium hover:bg-primary-600 transition-colors">
                  <FaEnvelope /> Reply via Email
                </a>
              </div>
            </motion.div>
          ) : (
            <div className="glass-card p-12 text-center text-dark-500 dark:text-dark-400">
              <FaEnvelope className="mx-auto mb-3 text-dark-300 dark:text-dark-600" size={32} />
              <p>Select a message to view</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageMessages;
