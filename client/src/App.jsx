import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  Terminal, Shield, Code, Server, Database, Menu, X, 
  Mail, ExternalLink, ChevronRight, Award,
  MonitorSmartphone, Briefcase, GraduationCap, Layout, Globe, Lock, Cpu
} from 'lucide-react';
import axios from 'axios';

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  
  const { scrollY, scrollYProgress } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  // Typing effect state
  const [typingText, setTypingText] = useState('');
  const fullText = "Full-Stack Developer | Cybersecurity Enthusiast";
  
  useEffect(() => {
    let i = 0;
    const typingId = setInterval(() => {
      setTypingText(fullText.substring(0, i));
      i++;
      if (i > fullText.length) clearInterval(typingId);
    }, 50);
    return () => clearInterval(typingId);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = ['Home', 'Services', 'About', 'Skills', 'Certificates', 'Projects', 'Contact'];

  const scrollTo = (id) => {
    const element = document.getElementById(id.toLowerCase());
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // Connects to the Node.js backend
      await axios.post('http://localhost:5000/api/contact', formData);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setSubmitStatus('error');
    }
    setIsSubmitting(false);
    
    // Clear status after 3 seconds
    setTimeout(() => setSubmitStatus(null), 3000);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-gray-200 font-sans selection:bg-cyan-500/30 overflow-x-hidden relative">
      
      {/* Scroll Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 z-[60] origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Navbar */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/5 py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-bold tracking-tighter"
          >
            <span className="text-white">Sin</span><span className="text-cyan-500">Khun</span><span className="text-cyan-500/50">.</span>
          </motion.div>

          {/* Desktop Nav */}
          <div className="hidden md:flex gap-8 items-center">
            {navLinks.map((link, i) => (
              <motion.button 
                key={link}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => scrollTo(link)}
                className="text-sm text-gray-400 hover:text-cyan-400 transition-colors uppercase tracking-widest font-medium"
              >
                {link}
              </motion.button>
            ))}
            <motion.button 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              onClick={() => scrollTo('Contact')}
              className="px-6 py-2.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 hover:bg-cyan-500 hover:text-black transition-all duration-300 text-sm font-semibold"
            >
              Hire Me
            </motion.button>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-gray-400 hover:text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#050505] flex flex-col items-center justify-center gap-8 md:hidden">
          {navLinks.map((link) => (
            <button 
              key={link}
              onClick={() => scrollTo(link)}
              className="text-2xl font-bold text-gray-400 hover:text-cyan-400"
            >
              {link}
            </button>
          ))}
        </div>
      )}

      {/* Hero Section */}
      <section id="home" className="pt-32 pb-20 min-h-screen flex items-center relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] animate-float pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] animate-float-delayed pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          <motion.div style={{ opacity }}>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6"
            >
              <Terminal size={16} className="text-cyan-400" />
              <span className="text-sm font-medium text-gray-300">Available for Freelance</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[1.1] mb-6"
            >
              Building <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Secure</span> & <br/>
              Scalable Web
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg md:text-xl text-gray-400 max-w-lg mb-8 leading-relaxed font-light"
            >
              I'm <strong className="text-white font-medium">Khun</strong>, a <span className="text-cyan-400">{typingText}</span><span className="animate-ping text-cyan-400">|</span> with 3+ years of experience specializing in React, Laravel, and Cybersecurity. I build digital experiences that are fast, beautiful, and secure.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap gap-4 items-center"
            >
              <button 
                onClick={() => scrollTo('Projects')}
                className="px-8 py-4 rounded-full bg-white text-black font-bold hover:bg-cyan-400 transition-colors flex items-center gap-2 group"
              >
                View My Work
                <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
              
              <a 
                href="/Sin-Khun-CV.html" 
                target="_blank"
                className="px-8 py-4 rounded-full border border-white/20 text-white font-bold hover:bg-white/5 transition-colors flex items-center gap-2 group"
              >
                View / Download CV
              </a>

              <div className="flex gap-4 items-center pl-2">
                <SocialLink href="https://t.me/PSKNE1" icon={<TelegramIcon size={22} />} />
                <SocialLink href="https://wa.me/855975875054" icon={<WhatsAppIcon size={22} />} />
                <SocialLink href="https://www.linkedin.com/in/sin-khun-1a5a7a375" icon={<LinkedInIcon size={22} />} />
              </div>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            {/* Visual representation of stack/coder instead of a photo for a more modern tech feel */}
            <div className="relative w-full aspect-square max-w-[500px] mx-auto">
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse" />
              <div className="absolute inset-10 bg-[#0a0a0a] rounded-3xl border border-white/10 shadow-2xl flex flex-col overflow-hidden transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <div className="h-10 bg-white/5 border-b border-white/10 flex items-center px-4 gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <div className="p-6 font-mono text-sm flex flex-col gap-2">
                  <p className="text-gray-400">{'// Initialize Khun Profile'}</p>
                  <p><span className="text-pink-500">const</span> <span className="text-blue-400">developer</span> = {'{'}</p>
                  <p className="pl-4"><span className="text-cyan-300">name</span>: <span className="text-green-400">'Sin Khun'</span>,</p>
                  <p className="pl-4"><span className="text-cyan-300">role</span>: <span className="text-green-400">'Full Stack Engineer'</span>,</p>
                  <p className="pl-4"><span className="text-cyan-300">skills</span>: [<span className="text-green-400">'React'</span>, <span className="text-green-400">'Laravel'</span>, <span className="text-green-400">'Security'</span>],</p>
                  <p className="pl-4"><span className="text-cyan-300">experience</span>: <span className="text-orange-400">3</span> + <span className="text-green-400">' years'</span>,</p>
                  <p className="pl-4"><span className="text-cyan-300">passion</span>: <span className="text-green-400">'Building secure systems'</span></p>
                  <p>{'};'}</p>
                  <p className="text-gray-400 mt-4">{'// Execute'}</p>
                  <p><span className="text-blue-400">developer</span>.<span className="text-yellow-200">buildAwesomeThings</span>();</p>
                  <div className="mt-4 flex gap-2 items-center text-cyan-500 animate-pulse">
                    <span>&gt;</span> System ready...
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 relative bg-[#0a0a0a] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <SectionHeader title="My Services" subtitle="What I can build for your business" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
            <ServiceCard 
              icon={<Globe size={32} className="text-cyan-400" />}
              title="Full-Stack Web Applications"
              description="Custom, scalable web apps built with React.js and Laravel. From simple dashboards to complex SaaS platforms, tailored to your business needs."
            />
            <ServiceCard 
              icon={<Layout size={32} className="text-blue-400" />}
              title="Secure E-Commerce Solutions"
              description="High-performance, secure online stores. Complete with payment gateway integration, product management, and beautiful user interfaces."
            />
            <ServiceCard 
              icon={<Cpu size={32} className="text-emerald-400" />}
              title="IoT & System Integration"
              description="Connecting physical hardware to web interfaces. Real-time data tracking, automated reporting, and hardware-to-software API integrations."
            />
            <ServiceCard 
              icon={<Lock size={32} className="text-red-400" />}
              title="Cybersecurity Audits"
              description="Protect your business. I provide vulnerability assessments, penetration testing, and security hardening for existing web applications."
            />
          </div>
        </div>
      </section>

      {/* About & Education */}
      <section id="about" className="py-24 bg-[#0a0a0a] relative border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <SectionHeader title="About Me" subtitle="My Journey & Education" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="space-y-6 text-gray-400 leading-relaxed font-light"
            >
              <p>
                Hello! I'm Khun, a passionate developer based in Phnom Penh, Cambodia. My journey in tech started with a deep curiosity about how the web works, which quickly evolved into a passion for building complex, data-driven applications.
              </p>
              <p>
                Over the past 3 years, I've honed my skills across the stack, focusing heavily on the <strong>React ecosystem</strong> for interactive frontends and <strong>Laravel/PHP</strong> for robust backends. 
              </p>
              <p>
                Beyond standard development, I have a strong focus on <strong>Cybersecurity</strong>. I hold certifications in Ethical Hacking, which allows me to build applications that aren't just beautiful and functional, but also secure against modern web threats.
              </p>
            </motion.div>
            
            <div className="space-y-6">
              <EducationCard 
                title="B.Sc. Information Technology (Year 2)"
                school="Setec Institute"
                year="Present"
                description="Focusing on advanced software engineering, database management, and network security."
                icon={<GraduationCap />}
              />
              <EducationCard 
                title="Certified Ethical Hacker (v12)"
                school="Learnkarts"
                year="Aug 2025"
                description="Comprehensive training in identifying vulnerabilities and securing web infrastructure."
                icon={<Shield />}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <SectionHeader title="Expertise" subtitle="Technologies I work with" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <SkillCategory 
              title="Frontend Development" 
              icon={<MonitorSmartphone className="text-blue-400" />}
              skills={['React.js', 'JavaScript (ES6+)', 'Tailwind CSS', 'HTML5/CSS3', 'Framer Motion']}
            />
            <SkillCategory 
              title="Backend & Database" 
              icon={<Server className="text-emerald-400" />}
              skills={['PHP', 'Laravel Framework', 'Node.js', 'Express', 'MySQL', 'MongoDB']}
            />
            <SkillCategory 
              title="Tools & Security" 
              icon={<Shield className="text-red-400" />}
              skills={['Git & GitHub', 'Vulnerability Assessment', 'API Security', 'Postman', 'Linux']}
            />
          </div>
        </div>
      </section>

      {/* Certificates */}
      <section id="certificates" className="py-24 bg-[#0a0a0a] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <SectionHeader title="Certifications" subtitle="My formal training and professional achievements" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-16">
            <CertificateCard 
              title="Meta Full-Stack Developer"
              issuer="Meta"
              image="/certificates/meta-full-stack-developer.jpg"
              onClick={() => setSelectedCertificate("/certificates/meta-full-stack-developer.jpg")}
            />
            <CertificateCard 
              title="Certied of Course Completion"
              issuer="Cisco Networking Academy"
              image="/certificates/CEH-completed.jpg"
              onClick={() => setSelectedCertificate("/certificates/CEH-completed.jpg")}
            />
            <CertificateCard 
              title="PHP & Laravel Framework"
              issuer="Board Infinity"
              image="/certificates/php-laravel-certificate.jpg"
              onClick={() => setSelectedCertificate("/certificates/php-laravel-certificate.jpg")}
            />
            <CertificateCard 
              title="Google AI Professional"
              issuer="Google"
              image="/certificates/google-AI-professional-badge.jpg"
              onClick={() => setSelectedCertificate("/certificates/google-AI-professional-badge.jpg")}
            />
            <CertificateCard 
              title="Network & Cybersecurity"
              issuer="SALA CYBER"
              image="/certificates/network-and-cybersecurity-foundation.jpg"
              onClick={() => setSelectedCertificate("/certificates/network-and-cybersecurity-foundation.jpg")}
            />
            <CertificateCard 
              title="React Development"
              issuer="Master IT"
              image="/certificates/react-certificate.jpg"
              onClick={() => setSelectedCertificate("/certificates/react-certificate.jpg")}
            />
            <CertificateCard 
              title="Cybersecurity & Ethical Hacking"
              issuer="HackerX"
              image="/certificates/cybersecurity-and-ethical-hacking.jpg"
              onClick={() => setSelectedCertificate("/certificates/cybersecurity-and-ethical-hacking.jpg")}
            />
            <CertificateCard 
              title="Gemini Certified Student"
              issuer="Google"
              image="/certificates/gemini-certified-student.jpg"
              onClick={() => setSelectedCertificate("/certificates/gemini-certified-student.jpg")}
            />
            <CertificateCard 
              title="Google AI Essentials"
              issuer="Google"
              image="/certificates/google-AI.jpg"
              onClick={() => setSelectedCertificate("/certificates/google-AI.jpg")}
            />
            <CertificateCard 
              title="Meta Front-End Developer"
              issuer="Meta"
              image="/certificates/meta-font-end.jpg"
              onClick={() => setSelectedCertificate("/certificates/meta-font-end.jpg")}
            />
            <CertificateCard 
              title="Meta Front-End Badge"
              issuer="Meta"
              image="/certificates/meta-front-end-badge.jpg"
              onClick={() => setSelectedCertificate("/certificates/meta-front-end-badge.jpg")}
            />
            <CertificateCard 
              title="Meta React Framework"
              issuer="Meta"
              image="/certificates/meta-react.jpg"
              onClick={() => setSelectedCertificate("/certificates/meta-react.jpg")}
            />
            <CertificateCard 
              title="CEH Badge"
              issuer="Cisco Networking Academy"
              image="/certificates/CEH.jpg"
              onClick={() => setSelectedCertificate("/certificates/CEH.jpg")}
            />
            <CertificateCard 
              title="CEH v12"
              issuer="Learnkarts"
              image="/certificates/certificate-ceh-v1.jpg"
              onClick={() => setSelectedCertificate("/certificates/certificate-ceh-v1.jpg")}
            />
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="py-24 bg-[#0a0a0a] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <SectionHeader title="Selected Work" subtitle="A showcase of my recent projects" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
            <ProjectCard 
              title="Eco-Board IoT Dashboard"
              description="An enterprise-level Laravel application for factory management, featuring real-time worker line scanning and data visualization."
              tags={['Laravel', 'PHP', 'MySQL', 'IoT Integration']}
              image="bg-gradient-to-br from-gray-800 to-gray-900"
              link="https://ym.yaikh.com"
            />
            <ProjectCard 
              title="Yaikh AI Dashboard"
              description="A premium, glassmorphism-styled React dashboard featuring AI chatbot integrations and 3D animations."
              tags={['React', 'Tailwind CSS', 'Framer Motion']}
              image="bg-gradient-to-br from-indigo-900 to-purple-900"
              link="https://yaikh.com"
            />

            <ProjectCard 
              title="Academic & Side Projects"
              description="A collection of university assignments and various smaller projects demonstrating my ongoing learning in full-stack web development."
              tags={['PHP', 'JavaScript', 'React', 'Algorithms']}
              image="bg-gradient-to-br from-cyan-900 to-blue-900"
              github="https://github.com/Khunboy168"
            />
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-32 relative">
        <div className="absolute inset-0 bg-cyan-900/5 mix-blend-screen" />
        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">Let's work together</h2>
            <p className="text-xl text-gray-400 mb-12 font-light">
              Whether you have a freelance project, a job opportunity, or just want to chat about code and security, my inbox is open.
            </p>
            
            <form onSubmit={handleContactSubmit} className="max-w-md mx-auto space-y-4 text-left">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Name</label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors" 
                  placeholder="John Doe" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Email</label>
                <input 
                  type="email" 
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors" 
                  placeholder="john@example.com" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Message</label>
                <textarea 
                  rows="4" 
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors resize-none" 
                  placeholder="Tell me about your project..."
                ></textarea>
              </div>
              
              {submitStatus === 'success' && (
                <div className="p-3 bg-green-500/10 border border-green-500/20 text-green-400 rounded-lg text-sm text-center">
                  Message sent successfully! I will get back to you soon.
                </div>
              )}
              {submitStatus === 'error' && (
                <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg text-sm text-center">
                  Failed to send message. Please try again.
                </div>
              )}

              <button 
                type="submit" 
                disabled={isSubmitting}
                className={`w-full py-4 font-bold rounded-lg transition-colors mt-4 ${isSubmitting ? 'bg-cyan-500/50 cursor-not-allowed' : 'bg-cyan-500 hover:bg-cyan-400'} text-black`}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-gray-500 text-sm border-t border-white/5">
        <p>&copy; {new Date().getFullYear()} Sin Khun. Built with MERN Stack & Tailwind CSS.</p>
      </footer>

      {/* Certificate Modal Overlay */}
      {selectedCertificate && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm transition-all"
          onClick={() => setSelectedCertificate(null)}
        >
          <button 
            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors"
            onClick={() => setSelectedCertificate(null)}
          >
            <X size={32} />
          </button>
          <motion.img 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            src={selectedCertificate} 
            alt="Certificate Full View" 
            className="max-w-full max-h-[90vh] object-contain rounded-xl border border-white/10 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

    </div>
  );
}

// Reusable Components
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

function SectionHeader({ title, subtitle }) {
  return (
    <motion.div 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeUp}
      className="mb-12"
    >
      <h2 className="text-3xl md:text-5xl font-bold mb-4">{title}</h2>
      <div className="w-20 h-1 bg-cyan-500 mb-6" />
      <p className="text-xl text-gray-400 font-light">{subtitle}</p>
    </motion.div>
  );
}

function SocialLink({ icon, href }) {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noreferrer"
      className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-cyan-500 hover:text-black transition-all"
    >
      {icon}
    </a>
  );
}

function EducationCard({ title, school, year, description, icon }) {
  return (
    <motion.div 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeUp}
      className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-cyan-500/30 transition-colors flex gap-6"
    >
      <div className="w-12 h-12 shrink-0 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
        {icon}
      </div>
      <div>
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-white">{title}</h3>
          <span className="text-xs font-medium px-2 py-1 bg-white/10 rounded-md text-gray-300">{year}</span>
        </div>
        <p className="text-cyan-400 font-medium mb-3">{school}</p>
        <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
}

function SkillCategory({ title, icon, skills }) {
  return (
    <motion.div 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeUp}
      className="p-6 rounded-2xl bg-white/5 border border-white/5"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-white/5">
          {icon}
        </div>
        <h3 className="text-lg font-bold">{title}</h3>
      </div>
      <ul className="space-y-3">
        {skills.map(skill => (
          <li key={skill} className="flex items-center gap-3 text-gray-300">
            <ChevronRight size={14} className="text-cyan-500" />
            {skill}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

function ProjectCard({ title, description, tags, image, link, github }) {
  return (
    <motion.div 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeUp}
      className="group rounded-2xl bg-white/5 border border-white/5 overflow-hidden hover:border-cyan-500/30 transition-all flex flex-col"
    >
      <div className={`h-48 w-full ${image} relative overflow-hidden flex items-center justify-center shrink-0`}>
        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
        <Code size={48} className="text-white/20 group-hover:scale-110 transition-transform duration-500" />
      </div>
      <div className="p-8 flex flex-col flex-grow">
        <h3 className="text-2xl font-bold mb-3 group-hover:text-cyan-400 transition-colors">{title}</h3>
        <p className="text-gray-400 mb-6 text-sm leading-relaxed line-clamp-3">
          {description}
        </p>
        <div className="flex flex-wrap gap-2 mb-6">
          {tags.map(tag => (
            <span key={tag} className="text-xs font-medium px-3 py-1 bg-white/10 rounded-full text-gray-300">
              {tag}
            </span>
          ))}
        </div>
        <div className="mt-auto flex gap-4">
          {link && (
            <a href={link} target="_blank" rel="noreferrer" className="text-sm font-bold text-cyan-400 flex items-center gap-2 hover:text-white transition-colors">
              Live Preview <ExternalLink size={14} />
            </a>
          )}
          {github && (
            <a href={github} target="_blank" rel="noreferrer" className="text-sm font-bold text-gray-400 flex items-center gap-2 hover:text-white transition-colors">
              Source Code <Code size={14} />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function CertificateCard({ title, issuer, image, onClick }) {
  return (
    <motion.div 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeUp}
      onClick={onClick}
      className="group rounded-2xl bg-white/5 border border-white/5 overflow-hidden hover:border-cyan-500/50 transition-all duration-300 cursor-pointer"
    >
      <div className="h-48 w-full relative overflow-hidden bg-[#050505]">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
      </div>
      <div className="p-6">
        <div className="flex items-center gap-2 mb-2">
          <Award size={16} className="text-cyan-400" />
          <span className="text-xs font-bold tracking-wider text-cyan-400 uppercase">{issuer}</span>
        </div>
        <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">{title}</h3>
      </div>
    </motion.div>
  );
}

function ServiceCard({ icon, title, description }) {
  return (
    <motion.div 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeUp}
      className="p-8 rounded-2xl bg-white/5 border border-white/5 hover:border-cyan-500/30 transition-colors flex flex-col items-start"
    >
      <div className="p-4 rounded-xl bg-white/5 mb-6">
        {icon}
      </div>
      <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
      <p className="text-gray-400 leading-relaxed font-light">{description}</p>
    </motion.div>
  );
}

export default App;

// Custom Brand SVGs
function TelegramIcon({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13"></line>
      <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
    </svg>
  );
}

function WhatsAppIcon({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
    </svg>
  );
}

function LinkedInIcon({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
      <rect x="2" y="9" width="4" height="12"></rect>
      <circle cx="4" cy="4" r="2"></circle>
    </svg>
  );
}
