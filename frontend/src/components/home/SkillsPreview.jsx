// ============================================
// Skills Preview — Animated skill cards for home page
// ============================================
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaReact, FaNodeJs, FaHtml5, FaCss3Alt, FaPython, FaGitAlt, FaDocker } from 'react-icons/fa';
import { SiJavascript, SiTailwindcss, SiExpress, SiMongodb, SiMysql } from 'react-icons/si';
import SectionTitle from '../common/SectionTitle';
import Button from '../common/Button';
import { skillAPI } from '../../api/endpoints';

const iconMap = {
  FaReact: <FaReact />, FaNodeJs: <FaNodeJs />, FaHtml5: <FaHtml5 />,
  FaCss3Alt: <FaCss3Alt />, FaPython: <FaPython />, FaGitAlt: <FaGitAlt />,
  FaDocker: <FaDocker />, SiJavascript: <SiJavascript />,
  SiTailwindcss: <SiTailwindcss />, SiExpress: <SiExpress />,
  SiMongodb: <SiMongodb />, SiMysql: <SiMysql />,
};

const catColors = {
  frontend: 'from-blue-500 to-cyan-500', backend: 'from-green-500 to-emerald-500',
  database: 'from-orange-500 to-amber-500', tools: 'from-purple-500 to-violet-500',
};
const catLabels = { frontend: 'Frontend', backend: 'Backend', database: 'Database', tools: 'Tools' };

const fallback = [
  { name: 'React.js', category: 'frontend', proficiency: 90, icon: 'FaReact' },
  { name: 'JavaScript', category: 'frontend', proficiency: 88, icon: 'SiJavascript' },
  { name: 'HTML5', category: 'frontend', proficiency: 95, icon: 'FaHtml5' },
  { name: 'Tailwind CSS', category: 'frontend', proficiency: 85, icon: 'SiTailwindcss' },
  { name: 'Node.js', category: 'backend', proficiency: 85, icon: 'FaNodeJs' },
  { name: 'Express.js', category: 'backend', proficiency: 82, icon: 'SiExpress' },
  { name: 'Python', category: 'backend', proficiency: 78, icon: 'FaPython' },
  { name: 'MongoDB', category: 'database', proficiency: 82, icon: 'SiMongodb' },
  { name: 'MySQL', category: 'database', proficiency: 75, icon: 'SiMysql' },
  { name: 'Git & GitHub', category: 'tools', proficiency: 88, icon: 'FaGitAlt' },
  { name: 'Docker', category: 'tools', proficiency: 65, icon: 'FaDocker' },
];

const SkillsPreview = () => {
  const [skills, setSkills] = useState(fallback);
  const [active, setActive] = useState('frontend');

  useEffect(() => {
    skillAPI.getAll().then(r => setSkills(r.data.data)).catch(() => {});
  }, []);

  const filtered = skills.filter(s => s.category === active);

  return (
    <section className="section-container bg-dark-50/50 dark:bg-dark-900/50" id="skills-preview">
      <SectionTitle title="My Skills" subtitle="Technologies I use to bring ideas to life" />
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {Object.keys(catLabels).map(c => (
          <button key={c} onClick={() => setActive(c)}
            className={`px-5 py-2 rounded-xl text-sm font-medium transition-all ${active === c ? 'bg-gradient-to-r ' + catColors[c] + ' text-white shadow-lg' : 'bg-white dark:bg-dark-800 text-dark-600 dark:text-dark-400 hover:bg-dark-100 dark:hover:bg-dark-700'}`}>
            {catLabels[c]}
          </button>
        ))}
      </div>
      <motion.div key={active} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
        {filtered.map((skill, i) => (
          <motion.div key={skill.name} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            className="glass-card p-5 text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="text-3xl mb-3 flex justify-center text-primary-500">
              {iconMap[skill.icon] || <FaReact />}
            </div>
            <h4 className="font-medium text-sm text-dark-900 dark:text-white mb-2">{skill.name}</h4>
            <div className="skill-bar">
              <motion.div className="skill-bar-fill" initial={{ width: 0 }}
                whileInView={{ width: `${skill.proficiency}%` }} viewport={{ once: true }}
                transition={{ duration: 1, delay: i * 0.05 }} />
            </div>
            <span className="text-xs text-dark-500 dark:text-dark-400 mt-1 block">{skill.proficiency}%</span>
          </motion.div>
        ))}
      </motion.div>
      <div className="text-center mt-10">
        <Button to="/skills" variant="outline">View All Skills</Button>
      </div>
    </section>
  );
};

export default SkillsPreview;
