// ============================================
// Admin Dashboard — Overview stats
// ============================================
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaProjectDiagram, FaEnvelope, FaEye, FaChartLine } from 'react-icons/fa';
import { projectAPI, messageAPI, analyticsAPI } from '../../api/endpoints';

const Dashboard = () => {
  const [stats, setStats] = useState({ projects: 0, messages: 0, unread: 0, views: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [projRes, msgRes, viewsRes] = await Promise.all([
          projectAPI.getAll(), 
          messageAPI.getAll(),
          analyticsAPI.getViews().catch(() => ({ data: { views: 0 } }))
        ]);
        const messages = msgRes.data.data;
        setStats({
          projects: projRes.data.count,
          messages: messages.length,
          unread: messages.filter(m => !m.read).length,
          views: viewsRes.data?.views || 0
        });
      } catch (err) { console.error('Dashboard fetch error:', err); }
    };
    fetchStats();
  }, []);

  const cards = [
    { label: 'Total Projects', value: stats.projects, icon: <FaProjectDiagram />, color: 'from-blue-500 to-cyan-500' },
    { label: 'Total Messages', value: stats.messages, icon: <FaEnvelope />, color: 'from-green-500 to-emerald-500' },
    { label: 'Unread Messages', value: stats.unread, icon: <FaEye />, color: 'from-orange-500 to-amber-500' },
    { label: 'Visitor Views', value: stats.views, icon: <FaChartLine />, color: 'from-purple-500 to-violet-500' },
  ];

  return (
    <div>
      <h1 className="font-heading font-bold text-2xl text-dark-900 dark:text-white mb-2">Dashboard</h1>
      <p className="text-dark-500 dark:text-dark-400 mb-8">Welcome back! Here's an overview of your portfolio.</p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {cards.map((card, i) => (
          <motion.div key={card.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-dark-500 dark:text-dark-400">{card.label}</span>
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-r ${card.color} flex items-center justify-center text-white`}>{card.icon}</div>
            </div>
            <p className="font-heading font-bold text-3xl text-dark-900 dark:text-white">{card.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="glass-card p-6">
        <h2 className="font-heading font-semibold text-lg text-dark-900 dark:text-white mb-4">Quick Actions</h2>
        <div className="grid sm:grid-cols-3 gap-3">
          <a href="/admin/projects" className="p-4 rounded-xl bg-primary-50 dark:bg-primary-950/30 text-center hover:bg-primary-100 dark:hover:bg-primary-950/50 transition-colors">
            <FaProjectDiagram className="mx-auto mb-2 text-primary-500" size={24} />
            <span className="text-sm font-medium text-dark-700 dark:text-dark-300">Manage Projects</span>
          </a>
          <a href="/admin/messages" className="p-4 rounded-xl bg-green-50 dark:bg-green-950/30 text-center hover:bg-green-100 dark:hover:bg-green-950/50 transition-colors">
            <FaEnvelope className="mx-auto mb-2 text-green-500" size={24} />
            <span className="text-sm font-medium text-dark-700 dark:text-dark-300">View Messages</span>
          </a>
          <a href="/" target="_blank" rel="noopener noreferrer" className="p-4 rounded-xl bg-accent-50 dark:bg-accent-950/30 text-center hover:bg-accent-100 dark:hover:bg-accent-950/50 transition-colors">
            <FaEye className="mx-auto mb-2 text-accent-500" size={24} />
            <span className="text-sm font-medium text-dark-700 dark:text-dark-300">View Portfolio</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
