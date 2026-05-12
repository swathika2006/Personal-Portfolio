// ============================================
// Featured Projects — Project cards for home page
// ============================================
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import SectionTitle from '../common/SectionTitle';
import Button from '../common/Button';
import { projectAPI } from '../../api/endpoints';

// const fallbackProjects = [
//   { _id: '1', title: 'E-Commerce Platform', description: 'A full-stack e-commerce platform with payment integration and admin dashboard.', category: 'fullstack', technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'], githubLink: '#', liveLink: '#' },
//   { _id: '2', title: 'Task Management App', description: 'Collaborative task management with real-time updates and kanban boards.', category: 'fullstack', technologies: ['React', 'Socket.io', 'MongoDB', 'Redux'], githubLink: '#', liveLink: '#' },
//   { _id: '3', title: 'Weather Dashboard', description: 'Interactive weather dashboard with 7-day forecasts and location search.', category: 'frontend', technologies: ['React', 'OpenWeather API', 'Chart.js'], githubLink: '#', liveLink: '#' },
// ];

const fallbackProjects = [
  { 
    _id: '1', 
    title: 'Forever E-Commerce', 
    description: 'A full-stack MERN e-commerce platform featuring a modern UI, product management, and seamless checkout experience.', 
    category: 'fullstack', 
    technologies: ['MongoDB', 'Express', 'React', 'Node.js'], 
    githubLink: 'https://github.com/swathika2006/mern-project', 
    liveLink: 'https://forever-frontend-amber-one.vercel.app/' 
  },
  { 
    _id: '2', 
    title: 'Task Management App', 
    description: 'Collaborative task management with real-time updates and kanban boards.', 
    category: 'fullstack', 
    technologies: ['React', 'Socket.io', 'MongoDB', 'Redux'], 
    githubLink: '#', 
    liveLink: '#' 
  },
  { 
    _id: '3', 
    title: 'Weather Dashboard', 
    description: 'Interactive weather dashboard with 7-day forecasts and location search.', 
    category: 'frontend', 
    technologies: ['React', 'OpenWeather API', 'Chart.js'], 
    githubLink: '#', 
    liveLink: '#' 
  },
];

const FeaturedProjects = () => {
  const [projects, setProjects] = useState(fallbackProjects);

  useEffect(() => {
    projectAPI.getAll({ featured: true }).then(r => {
      if (r.data.data.length > 0) setProjects(r.data.data.slice(0, 3));
    }).catch(() => {});
  }, []);

  return (
    <section className="section-container" id="featured-projects">
      <SectionTitle title="Featured Projects" subtitle="Some of my recent work that I'm proud of" />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, i) => (
          <motion.div key={project._id} initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="glass-card overflow-hidden group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
            {/* Image placeholder */}
            <div className="h-48 bg-gradient-to-br from-primary-500/20 to-accent-500/20 flex items-center justify-center relative overflow-hidden">
              <div className="text-4xl font-heading font-bold gradient-text">{project.title.charAt(0)}</div>
              <div className="absolute inset-0 bg-dark-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                {project.githubLink && (
                  <a href={project.githubLink} target="_blank" rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/40 transition-colors">
                    <FaGithub size={18} />
                  </a>
                )}
                {project.liveLink && (
                  <a href={project.liveLink} target="_blank" rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/40 transition-colors">
                    <FaExternalLinkAlt size={16} />
                  </a>
                )}
              </div>
            </div>
            <div className="p-5">
              <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-primary-50 dark:bg-primary-950/50 text-primary-600 dark:text-primary-400 capitalize">
                {project.category}
              </span>
              <h3 className="font-heading font-semibold text-lg text-dark-900 dark:text-white mt-3 mb-2">
                <Link to={`/projects/${project._id}`} className="hover:text-primary-500 transition-colors">
                  {project.title}
                </Link>
              </h3>
              <p className="text-dark-500 dark:text-dark-400 text-sm mb-4 line-clamp-2">{project.description}</p>
              <div className="flex flex-wrap gap-1.5">
                {project.technologies.slice(0, 4).map(tech => (
                  <span key={tech} className="text-xs px-2 py-1 rounded-md bg-dark-100 dark:bg-dark-800 text-dark-600 dark:text-dark-400">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="text-center mt-10">
        <Button to="/projects" variant="primary">View All Projects</Button>
      </div>
    </section>
  );
};

export default FeaturedProjects;
