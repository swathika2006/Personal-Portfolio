// ============================================
// Skills Page — Full skills display with categories
// ============================================
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaReact, FaNodeJs, FaHtml5, FaCss3Alt, FaPython, FaGitAlt, FaDocker, FaFigma, FaServer, FaCode } from 'react-icons/fa';
import { SiJavascript, SiTypescript, SiTailwindcss, SiExpress, SiMongodb, SiMysql, SiPostgresql, SiPostman } from 'react-icons/si';
import SectionTitle from '../components/common/SectionTitle';
import { skillAPI } from '../api/endpoints';

const iconMap = {
  FaReact: <FaReact />, FaNodeJs: <FaNodeJs />, FaHtml5: <FaHtml5 />, FaCss3Alt: <FaCss3Alt />,
  FaPython: <FaPython />, FaGitAlt: <FaGitAlt />, FaDocker: <FaDocker />, FaFigma: <FaFigma />,
  FaServer: <FaServer />, SiJavascript: <SiJavascript />, SiTypescript: <SiTypescript />,
  SiTailwindcss: <SiTailwindcss />, SiExpress: <SiExpress />, SiMongodb: <SiMongodb />,
  SiMysql: <SiMysql />, SiPostgresql: <SiPostgresql />, SiVisualstudiocode: <FaCode />,
  SiPostman: <SiPostman />,
};

const catConfig = {
  frontend: { label: 'Frontend Development', color: 'from-blue-500 to-cyan-500', bg: 'bg-blue-50 dark:bg-blue-950/30' },
  backend: { label: 'Backend Development', color: 'from-green-500 to-emerald-500', bg: 'bg-green-50 dark:bg-green-950/30' },
  database: { label: 'Databases', color: 'from-orange-500 to-amber-500', bg: 'bg-orange-50 dark:bg-orange-950/30' },
  tools: { label: 'Tools & DevOps', color: 'from-purple-500 to-violet-500', bg: 'bg-purple-50 dark:bg-purple-950/30' },
};

const fallbackSkills = [
  { name: 'React.js', category: 'frontend', proficiency: 90, icon: 'FaReact' },
  { name: 'JavaScript', category: 'frontend', proficiency: 88, icon: 'SiJavascript' },
  { name: 'TypeScript', category: 'frontend', proficiency: 75, icon: 'SiTypescript' },
  { name: 'HTML5', category: 'frontend', proficiency: 95, icon: 'FaHtml5' },
  { name: 'CSS3', category: 'frontend', proficiency: 90, icon: 'FaCss3Alt' },
  { name: 'Tailwind CSS', category: 'frontend', proficiency: 85, icon: 'SiTailwindcss' },
  { name: 'Node.js', category: 'backend', proficiency: 85, icon: 'FaNodeJs' },
  { name: 'Express.js', category: 'backend', proficiency: 82, icon: 'SiExpress' },
  { name: 'Python', category: 'backend', proficiency: 78, icon: 'FaPython' },
  { name: 'REST APIs', category: 'backend', proficiency: 88, icon: 'FaServer' },
  { name: 'MongoDB', category: 'database', proficiency: 82, icon: 'SiMongodb' },
  { name: 'MySQL', category: 'database', proficiency: 75, icon: 'SiMysql' },
  { name: 'PostgreSQL', category: 'database', proficiency: 70, icon: 'SiPostgresql' },
  { name: 'Git & GitHub', category: 'tools', proficiency: 88, icon: 'FaGitAlt' },
  { name: 'VS Code', category: 'tools', proficiency: 92, icon: 'SiVisualstudiocode' },
  { name: 'Docker', category: 'tools', proficiency: 65, icon: 'FaDocker' },
  { name: 'Figma', category: 'tools', proficiency: 70, icon: 'FaFigma' },
  { name: 'Postman', category: 'tools', proficiency: 85, icon: 'SiPostman' },
];

const Skills = () => {
  const [skills, setSkills] = useState(fallbackSkills);

  useEffect(() => {
    skillAPI.getAll().then(r => { if (r.data.data.length > 0) setSkills(r.data.data); }).catch(() => {});
  }, []);

  const grouped = Object.keys(catConfig).map(cat => ({
    category: cat, ...catConfig[cat], skills: skills.filter(s => s.category === cat),
  }));

  return (
    <div className="pt-20">
      <section className="section-container">
        <SectionTitle title="Skills & Technologies" subtitle="A comprehensive overview of my technical skillset" />
        <div className="space-y-12 max-w-5xl mx-auto">
          {grouped.map((group, gi) => (
            <motion.div key={group.category} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: gi * 0.1 }}>
              <h3 className={`font-heading font-bold text-xl mb-6 bg-gradient-to-r ${group.color} bg-clip-text text-transparent`}>
                {group.label}
              </h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {group.skills.map((skill, i) => (
                  <motion.div key={skill.name} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                    className={`${group.bg} rounded-xl p-4 border border-dark-200/50 dark:border-dark-700/50 hover:shadow-lg transition-all`}>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-2xl text-dark-700 dark:text-dark-200">{iconMap[skill.icon] || <FaReact />}</span>
                      <div className="flex-1">
                        <h4 className="font-medium text-sm text-dark-900 dark:text-white">{skill.name}</h4>
                        <span className="text-xs text-dark-500 dark:text-dark-400">{skill.proficiency}%</span>
                      </div>
                    </div>
                    <div className="skill-bar">
                      <motion.div className="skill-bar-fill" initial={{ width: 0 }}
                        whileInView={{ width: `${skill.proficiency}%` }} viewport={{ once: true }}
                        transition={{ duration: 1.2, delay: i * 0.05 }} />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Skills;
