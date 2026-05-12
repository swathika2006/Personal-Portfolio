// ============================================
// Projects Page — All projects with search & filter
// ============================================
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import SectionTitle from '../components/common/SectionTitle';
import { projectAPI } from '../api/endpoints';

const categories = ['all', 'frontend', 'backend', 'fullstack', 'mobile', 'ai/ml', 'other'];

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    projectAPI.getAll().then(r => {
      setProjects(r.data.data);
      setFiltered(r.data.data);
    }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    let result = projects;
    if (category !== 'all') result = result.filter(p => p.category === category);
    if (search) result = result.filter(p =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase()) ||
      p.technologies.some(t => t.toLowerCase().includes(search.toLowerCase()))
    );
    setFiltered(result);
  }, [search, category, projects]);

  return (
    <div className="pt-20">
      <section className="section-container">
        <SectionTitle title="My Projects" subtitle="Explore my portfolio of web applications and software projects" />

        {/* Search & Filter */}
        <div className="max-w-4xl mx-auto mb-10 space-y-4">
          <div className="relative">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-dark-400" />
            <input type="text" placeholder="Search projects by name or technology..."
              value={search} onChange={e => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-white dark:bg-dark-800 border border-dark-200 dark:border-dark-700 text-dark-900 dark:text-white placeholder-dark-400 focus:ring-2 focus:ring-primary-500 outline-none transition-all" />
          </div>
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map(c => (
              <button key={c} onClick={() => setCategory(c)}
                className={`px-4 py-2 rounded-xl text-sm font-medium capitalize transition-all ${category === c ? 'bg-primary-500 text-white shadow-lg' : 'bg-white dark:bg-dark-800 text-dark-600 dark:text-dark-400 hover:bg-dark-100 dark:hover:bg-dark-700'}`}>
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        {loading ? (
          <div className="text-center py-20 text-dark-500 dark:text-dark-400">Loading projects...</div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-dark-500 dark:text-dark-400 text-lg">No projects found</p>
            <p className="text-dark-400 dark:text-dark-500 text-sm mt-2">Try adjusting your search or filter</p>
          </div>
        ) : (
          <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((project, i) => (
              <motion.div key={project._id} layout initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                className="glass-card overflow-hidden group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className="h-48 bg-gradient-to-br from-primary-500/20 to-accent-500/20 flex items-center justify-center relative overflow-hidden">
                  {project.image && project.image !== 'default-project.png' ? (
                    <img src={`/uploads/${project.image}`} alt={project.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-5xl font-heading font-bold gradient-text">{project.title.charAt(0)}</div>
                  )}
                  <div className="absolute inset-0 bg-dark-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                    {project.githubLink && <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/40 transition-colors"><FaGithub size={18} /></a>}
                    {project.liveLink && <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/40 transition-colors"><FaExternalLinkAlt size={16} /></a>}
                  </div>
                </div>
                <div className="p-5">
                  <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-primary-50 dark:bg-primary-950/50 text-primary-600 dark:text-primary-400 capitalize">{project.category}</span>
                  <h3 className="font-heading font-semibold text-lg text-dark-900 dark:text-white mt-3 mb-2">
                    <Link to={`/projects/${project._id}`} className="hover:text-primary-500 transition-colors">{project.title}</Link>
                  </h3>
                  <p className="text-dark-500 dark:text-dark-400 text-sm mb-4 line-clamp-2">{project.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.slice(0, 4).map(t => (
                      <span key={t} className="text-xs px-2 py-1 rounded-md bg-dark-100 dark:bg-dark-800 text-dark-600 dark:text-dark-400">{t}</span>
                    ))}
                    {project.technologies.length > 4 && <span className="text-xs px-2 py-1 rounded-md bg-dark-100 dark:bg-dark-800 text-dark-500">+{project.technologies.length - 4}</span>}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </section>
    </div>
  );
};

export default Projects;
