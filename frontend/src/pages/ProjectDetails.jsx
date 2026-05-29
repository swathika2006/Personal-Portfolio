// ============================================
// Project Details Page
// ============================================
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaArrowLeft, FaCheck } from 'react-icons/fa';
import Button from '../components/common/Button';
import Loader from '../components/common/Loader';
import { projectAPI } from '../api/endpoints';

const ProjectDetails = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    projectAPI.getById(id).then(r => setProject(r.data.data))
      .catch(() => {}).finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Loader />;
  if (!project) return (
    <div className="pt-20 min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-heading font-bold dark:text-white mb-4">Project Not Found</h2>
        <Button to="/projects" variant="outline" icon={<FaArrowLeft />}>Back to Projects</Button>
      </div>
    </div>
  );

  return (
    <div className="pt-20">
      <section className="section-container max-w-5xl mx-auto">
        {/* Back link */}
        <Link to="/projects" className="inline-flex items-center gap-2 text-primary-500 hover:text-primary-600 mb-8 text-sm font-medium">
          <FaArrowLeft /> Back to Projects
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          {/* Header */}
          <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
            <div>
              <span className="text-sm font-medium px-3 py-1 rounded-full bg-primary-50 dark:bg-primary-950/50 text-primary-600 dark:text-primary-400 capitalize">{project.category}</span>
              <h1 className="font-heading font-bold text-3xl md:text-4xl text-dark-900 dark:text-white mt-3">{project.title}</h1>
            </div>
            <div className="flex gap-3">
              {project.githubLink && <Button href={project.githubLink} variant="outline" size="sm" icon={<FaGithub />}>GitHub</Button>}
              {project.liveLink && project.liveLink !== '#' && <Button href={project.liveLink} size="sm" icon={<FaExternalLinkAlt />}>Live Demo</Button>}
            </div>
          </div>

          {/* Image */}
          <div className="rounded-2xl overflow-hidden mb-8 bg-gradient-to-br from-primary-500/10 to-accent-500/10 h-64 md:h-96 flex items-center justify-center">
            {project.image && project.image !== 'default-project.png' ? (
              <img 
                src={project.image.startsWith('http') ? project.image : `/uploads/${project.image}`} 
                alt={project.title} 
                className="w-full h-full object-cover" 
              />
            ) : (
              <div className="text-8xl font-heading font-bold gradient-text">{project.title.charAt(0)}</div>
            )}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="font-heading font-semibold text-xl text-dark-900 dark:text-white mb-3">About This Project</h2>
                <p className="text-dark-600 dark:text-dark-300 leading-relaxed">{project.longDescription || project.description}</p>
              </div>
              {project.features && project.features.length > 0 && (
                <div>
                  <h2 className="font-heading font-semibold text-xl text-dark-900 dark:text-white mb-3">Key Features</h2>
                  <div className="grid sm:grid-cols-2 gap-2">
                    {project.features.map(f => (
                      <div key={f} className="flex items-center gap-2 text-sm text-dark-600 dark:text-dark-300">
                        <FaCheck className="text-green-500 flex-shrink-0" size={12} /> {f}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="glass-card p-5">
                <h3 className="font-heading font-semibold text-dark-900 dark:text-white mb-3">Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map(t => (
                    <span key={t} className="px-3 py-1.5 rounded-lg bg-primary-50 dark:bg-primary-950/50 text-primary-600 dark:text-primary-400 text-sm font-medium">{t}</span>
                  ))}
                </div>
              </div>
              <div className="glass-card p-5">
                <h3 className="font-heading font-semibold text-dark-900 dark:text-white mb-3">Project Links</h3>
                <div className="space-y-2">
                  {project.githubLink && <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-dark-600 dark:text-dark-300 hover:text-primary-500 transition-colors"><FaGithub /> Source Code</a>}
                  {project.liveLink && project.liveLink !== '#' && <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-dark-600 dark:text-dark-300 hover:text-primary-500 transition-colors"><FaExternalLinkAlt /> Live Demo</a>}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default ProjectDetails;
