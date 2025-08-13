'use client';
import { useEffect } from 'react';

export default function HeroSection() {
  useEffect(() => {
    // Dynamisk import av GSAP for å unngå SSR issues
    const loadGSAP = async () => {
      const { gsap } = await import('gsap');
      
      // Hero animations
      gsap.timeline({ delay: 0.5 })
        .from('.hero-line', { 
          y: 100, 
          opacity: 0, 
          duration: 1.2, 
          stagger: 0.2, 
          ease: 'power4.out' 
        })
        .from('.hero-subtitle', { 
          y: 50, 
          opacity: 0, 
          duration: 1, 
          ease: 'power3.out' 
        }, '-=0.8')
        .from('.hero-cta-primary', { 
          y: 30, 
          opacity: 0, 
          duration: 0.8, 
          ease: 'back.out(1.7)' 
        }, '-=0.6')
        .from('.hero-cta-secondary', { 
          y: 30, 
          opacity: 0, 
          duration: 0.8, 
          ease: 'back.out(1.7)' 
        }, '-=0.7');
    };

    loadGSAP();
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-twofold-dark">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="floating-animation morphing-shape absolute top-20 left-10 w-32 h-32 bg-twofold-cream/5 blur-xl"></div>
        <div className="floating-animation morphing-shape absolute top-40 right-20 w-48 h-48 bg-twofold-accent/10 blur-xl"></div>
        <div className="floating-animation morphing-shape absolute bottom-40 left-1/4 w-40 h-40 bg-twofold-cream/8 blur-xl"></div>
        <div className="floating-animation morphing-shape absolute bottom-20 right-1/4 w-24 h-24 bg-twofold-accent/8 blur-xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
        <div className="hero-content">
          <h1 className="text-5xl md:text-8xl font-black mb-8 leading-tight text-twofold-cream">
            <span className="hero-line block">Vi bygger</span>
            <span className="hero-line block text-shimmer">skreddersydde</span>
            <span className="hero-line block">AI-løsninger</span>
          </h1>
        </div>
        
        <div className="hero-subtitle">
          <p className="text-xl md:text-2xl text-twofold-accent mb-12 max-w-4xl mx-auto leading-relaxed">
            Webapper, mobile apps og programvare som transformerer hvordan bedrifter jobber. 
            Drevet av kunstig intelligens og bygget for fremtiden.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <button className="bg-twofold-cream text-twofold-dark px-10 py-4 rounded-full text-lg font-semibold hover-lift hero-cta-primary">
            Se våre løsninger
          </button>
          <button className="border-2 border-twofold-accent hover:border-twofold-cream px-10 py-4 rounded-full text-lg font-semibold transition-all hover:bg-twofold-cream/5 hero-cta-secondary text-twofold-cream">
            Utforsk plattformen →
          </button>
        </div>
      </div>
    </section>
  );
}
