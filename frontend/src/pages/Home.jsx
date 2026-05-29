// ============================================
// Home Page — Landing page combining all sections
// ============================================
import Hero from '../components/home/Hero';
import AboutPreview from '../components/home/AboutPreview';
import SkillsPreview from '../components/home/SkillsPreview';
import FeaturedProjects from '../components/home/FeaturedProjects';
import Testimonials from '../components/home/Testimonials';
import ContactSection from '../components/home/ContactSection';

import { useEffect } from 'react';
import { analyticsAPI } from '../api/endpoints';

const Home = () => {
  useEffect(() => {
    // Increment view count when someone visits the home page
    analyticsAPI.incrementViews().catch(() => {});
  }, []);

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
