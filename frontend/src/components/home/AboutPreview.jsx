// ============================================
// About Preview — Short bio for home page
// ============================================
import { motion } from 'framer-motion';
import { FaGraduationCap, FaCode, FaLaptopCode } from 'react-icons/fa';
import SectionTitle from '../common/SectionTitle';
import Button from '../common/Button';

const highlights = [
  {
    icon: <FaCode className="text-primary-500" size={24} />,
    title: 'Clean Code',
    description: 'Writing maintainable, well-documented, and scalable code following industry best practices.',
  },
  {
    icon: <FaLaptopCode className="text-accent-500" size={24} />,
    title: 'Full Stack',
    description: 'End-to-end development from responsive frontends to robust backend APIs and databases.',
  },
  {
    icon: <FaGraduationCap className="text-primary-500" size={24} />,
    title: 'Always Learning',
    description: 'Continuously exploring new technologies and frameworks to stay ahead of the curve.',
  },
];

const AboutPreview = () => {
  return (
    <section className="section-container" id="about-preview">
      <SectionTitle
        title="About Me"
        subtitle="A passionate developer who loves creating impactful digital experiences"
      />

      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* Text */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-dark-600 dark:text-dark-300 leading-relaxed mb-6">
            I'm <strong className="text-dark-900 dark:text-white">Eswari Swathika.N</strong>, a Full Stack
            Developer with a passion for building modern web applications. I specialize
            in the MERN stack and love creating seamless user experiences with clean,
            efficient code.
          </p>
          <p className="text-dark-600 dark:text-dark-300 leading-relaxed mb-8">
            Currently pursuing my degree in Computer Science, I am constantly learning
            and building projects that solve real-world problems. My goal is to
            contribute to innovative teams and create technology that makes a difference.
          </p>
          <Button to="/about" variant="outline">
            Learn More About Me
          </Button>
        </motion.div>

        {/* Highlight Cards */}
        <div className="space-y-4">
          {highlights.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card p-5 flex items-start gap-4 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-primary-50 dark:bg-primary-950/50 flex items-center justify-center flex-shrink-0">
                {item.icon}
              </div>
              <div>
                <h3 className="font-heading font-semibold text-dark-900 dark:text-white mb-1">
                  {item.title}
                </h3>
                <p className="text-dark-500 dark:text-dark-400 text-sm">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutPreview;
