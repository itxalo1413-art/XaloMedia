import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Services from '../components/Services';
import PartnerLogos from '../components/PartnerLogos';
import CaseStudies from '../components/CaseStudies';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';
import ContactHighlight from '../components/ContactHighlight';
import Footer from '../components/Footer';
import FloatingCTA from '../components/FloatingCTA';
import BackgroundGrid from '../components/BackgroundGrid';
import { ScrollReveal } from '../hooks/useScrollReveal';

const Home = () => {
  return (
    <div className="home">
      <BackgroundGrid />
      <Navbar />
      <Hero />
      <ScrollReveal>
        <Services />
      </ScrollReveal>
      <ScrollReveal>
        <PartnerLogos />
      </ScrollReveal>
      <ScrollReveal>
        <CaseStudies />
      </ScrollReveal>
      <Testimonials />
      <ScrollReveal>
        <FAQ />
      </ScrollReveal>
      <ContactHighlight />
      <Footer />
      <FloatingCTA />
    </div>
  );
};

export default Home;
