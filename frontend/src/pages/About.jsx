// ============================================
// About Page — Full biography, education, timeline
// ============================================
import { motion } from 'framer-motion';
import { FaGraduationCap, FaBriefcase, FaHeart, FaRocket } from 'react-icons/fa';
import SectionTitle from '../components/common/SectionTitle';

const timeline = [
  { year: '2024 - Present', title: 'B.Tech Artificial Intelligence and Data Science', org: 'SKCET', desc: 'Currently pursuing my degree, specializing in full-stack web development and software engineering.', icon: <FaGraduationCap />, type: 'education' },
  { year: '2024', title: 'Full Stack Developer Intern', org: 'CodTech IT solutions', desc: 'Built responsive web applications using React, Node.js, and MongoDB. Collaborated with senior developers.', icon: <FaBriefcase />, type: 'work' },
  { year: '2024', title: 'Started Coding Journey', org: 'Self-Learning', desc: 'Began learning programming with c++ and JavaScript. Built first projects and fell in love with web dev.', icon: <FaRocket />, type: 'milestone' },
];

const About = () => {
  return (
    <div className="pt-20">
      <section className="section-container">
        <SectionTitle title="About Me" subtitle="Learn more about who I am and what drives me" />

        <div className="grid lg:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
          {/* Bio */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h3 className="font-heading font-bold text-2xl text-dark-900 dark:text-white mb-4">
              Hi, I'm <span className="gradient-text">Eswari Swathika.N</span>
            </h3>
            <p className="text-dark-600 dark:text-dark-300 leading-relaxed mb-4">
              I'm a passionate Full Stack Developer and Artificial Intelligence and Data Science student who loves building modern, user-friendly web applications. With a strong foundation in the MERN stack, I enjoy turning complex problems into elegant digital solutions.
            </p>
            <p className="text-dark-600 dark:text-dark-300 leading-relaxed mb-4">
              My journey in tech started with curiosity about how websites work, and it has evolved into a deep passion for creating impactful software. I believe in writing clean, maintainable code and following industry best practices.
            </p>
            <p className="text-dark-600 dark:text-dark-300 leading-relaxed mb-6">
              When I'm not coding, I enjoy exploring new technologies, contributing to open-source projects, and sharing my knowledge with the developer community.
            </p>

            {/* Quick Facts */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Name', value: 'Eswari Swathika.N' },
                { label: 'Location', value: 'India' },
                { label: 'Degree', value: 'B.Tech AI&DS' },
                { label: 'Interests', value: 'Web Dev, AI agent, Data Analyst' },
              ].map(f => (
                <div key={f.label} className="glass-card p-3">
                  <p className="text-xs text-dark-500 dark:text-dark-400">{f.label}</p>
                  <p className="font-medium text-sm text-dark-900 dark:text-white">{f.value}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Career Objective */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div className="glass-card p-6 mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-primary-50 dark:bg-primary-950/50 flex items-center justify-center text-primary-500"><FaHeart /></div>
                <h3 className="font-heading font-semibold text-lg text-dark-900 dark:text-white">Career Objective</h3>
              </div>
              <p className="text-dark-600 dark:text-dark-300 text-sm leading-relaxed">
                To leverage my technical skills and creative problem-solving abilities in a challenging role as a Full Stack Developer, where I can contribute to building innovative products while continuously growing as a professional. I aspire to work with teams that value clean code, user experience, and impactful technology.
              </p>
            </div>

            <div className="glass-card p-6">
              <h3 className="font-heading font-semibold text-lg text-dark-900 dark:text-white mb-4">What I Bring</h3>
              <div className="space-y-3">
                {['Strong problem-solving mindset', 'Clean & well-documented code', 'Responsive & accessible design', 'Quick learner & team player', 'Passion for modern web technologies'].map(item => (
                  <div key={item} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary-500" />
                    <span className="text-sm text-dark-600 dark:text-dark-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-container bg-dark-50/50 dark:bg-dark-900/50">
        <SectionTitle title="My Journey" subtitle="Education and experience timeline" />
        <div className="max-w-3xl mx-auto">
          {timeline.map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative pl-8 pb-8 border-l-2 border-primary-200 dark:border-primary-800 last:pb-0">
              <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white text-xs">
                {item.icon}
              </div>
              <div className="glass-card p-5 ml-4">
                <span className="text-xs font-medium px-2 py-1 rounded-full bg-primary-50 dark:bg-primary-950/50 text-primary-600 dark:text-primary-400">{item.year}</span>
                <h4 className="font-heading font-semibold text-dark-900 dark:text-white mt-2">{item.title}</h4>
                <p className="text-sm text-primary-600 dark:text-primary-400 mb-1">{item.org}</p>
                <p className="text-sm text-dark-500 dark:text-dark-400">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;
