// ============================================
// Home Page — Landing page combining all sections
// ============================================
import Hero from '../components/home/Hero';
import AboutPreview from '../components/home/AboutPreview';
import SkillsPreview from '../components/home/SkillsPreview';
import FeaturedProjects from '../components/home/FeaturedProjects';
import Testimonials from '../components/home/Testimonials';
import ContactSection from '../components/home/ContactSection';

const Home = () => {
  return (
    <>
      <Hero />
      <AboutPreview />
      <SkillsPreview />
      <FeaturedProjects />
      {/* <Testimonials /> */}
      <ContactSection />
    </>
  );
};

export default Home;
