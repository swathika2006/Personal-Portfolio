// ============================================
// Resume Page — View & download resume
// ============================================
import { motion } from 'framer-motion';
import { FaDownload, FaGraduationCap, FaBriefcase, FaAward } from 'react-icons/fa';
import SectionTitle from '../components/common/SectionTitle';
import Button from '../components/common/Button';

const Resume = () => {
  return (
    <div className="pt-20">
      <section className="section-container max-w-4xl mx-auto">
        <SectionTitle title="My Resume" subtitle="A summary of my education, experience, and achievements" />
        <div className="text-center mb-10">
  <Button
  href="/resume.pdf"
    size="lg"
    icon={<FaDownload />}
  >
    Download Resume (PDF)
  </Button>
</div>

        <div className="space-y-10">
          {/* Education */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-primary-50 dark:bg-primary-950/50 flex items-center justify-center text-primary-500"><FaGraduationCap size={20} /></div>
              <h2 className="font-heading font-bold text-2xl text-dark-900 dark:text-white">Education</h2>
            </div>
            <div className="glass-card p-6">
              <h3 className="font-heading font-semibold text-lg text-dark-900 dark:text-white">B.Tech in Computer Science & Engineering</h3>
              <p className="text-primary-600 dark:text-primary-400 text-sm mb-2">University Name · 2024 - Present</p>
              <p className="text-dark-500 dark:text-dark-400 text-sm">Specializing in full-stack web development, data structures, and algorithms. Active participant in coding competitions and tech events.</p>
            </div>
          </motion.div>

          {/* Experience */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-accent-50 dark:bg-accent-950/50 flex items-center justify-center text-accent-500"><FaBriefcase size={20} /></div>
              <h2 className="font-heading font-bold text-2xl text-dark-900 dark:text-white">Experience</h2>
            </div>
            <div className="glass-card p-6">
              <h3 className="font-heading font-semibold text-lg text-dark-900 dark:text-white">Full Stack Developer Intern</h3>
              <p className="text-primary-600 dark:text-primary-400 text-sm mb-2">Tech Company · 2023</p>
              <ul className="text-dark-500 dark:text-dark-400 text-sm space-y-1 list-disc list-inside">
                <li>Built responsive web applications using React and Node.js</li>
                <li>Designed and implemented RESTful APIs</li>
                <li>Collaborated with senior developers in Agile sprints</li>
                <li>Improved application performance by 30%</li>
              </ul>
            </div>
          </motion.div>

          {/* Achievements */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-yellow-50 dark:bg-yellow-950/50 flex items-center justify-center text-yellow-500"><FaAward size={20} /></div>
              <h2 className="font-heading font-bold text-2xl text-dark-900 dark:text-white">Achievements</h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {['Completed 50+ coding challenges on LeetCode', 'Built 10+ full-stack projects', 'Open Source Contributor', 'Technical blog writer'].map(a => (
                <div key={a} className="glass-card p-4 flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-yellow-500" />
                  <span className="text-sm text-dark-700 dark:text-dark-300">{a}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Resume;
