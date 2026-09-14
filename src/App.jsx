import { useEffect, useState, useRef } from "react";
import TypeWriter from "./components/Typewriter";
import { motion } from "framer-motion";
import { FiGithub, FiLinkedin, FiMail, FiExternalLink, FiDownload, FiInstagram, FiSend } from "react-icons/fi";

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const formRef = useRef(null);

  // Scroll detection for navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll for anchor links
  useEffect(() => {
    const handleAnchorClick = (e) => {
      const href = e.currentTarget.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const targetId = href.substring(1);
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', handleAnchorClick);
    });

    return () => {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.removeEventListener('click', handleAnchorClick);
      });
    };
  }, []);

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleResumeDownload = () => {
    const resumeUrl = '/resume.pdf';
    const link = document.createElement('a');
    link.href = resumeUrl;
    link.download = 'Fathima_Fidha_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setShowSuccess(false);
    setShowError(false);

    try {
      const response = await fetch('https://formspree.io/f/xdawzvzg', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setShowSuccess(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setShowSuccess(false), 5000);
      } else {
        setShowError(true);
        setTimeout(() => setShowError(false), 5000);
      }
    } catch (error) {
      setShowError(true);
      setTimeout(() => setShowError(false), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialLinks = {
    instagram: 'https://www.instagram.com/',
    github: 'https://github.com/Fidha5',
    linkedin: 'https://www.linkedin.com/in/fidhacp',
    email: 'mailto:fidfidha07@gmail.com',
    phone: 'tel:+919633452534',
    location: 'Malappuram, Kerala, India'
  };

  const navItems = ['Home', 'About', 'Skills', 'Projects', 'Contact'];

  return (
    <div className="bg-[#0a0a0a] text-white antialiased">
      
      {/* NAVBAR */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled 
            ? 'bg-[#0a0a0a]/90 backdrop-blur-xl border-b border-white/5' 
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-5">
          
          <motion.a 
            href="#home"
            whileHover={{ opacity: 0.8 }}
            className="text-lg font-semibold tracking-tight text-white"
          >
            Fidha<span className="text-orange-500">.</span>
          </motion.a>

          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center gap-10">
            {navItems.map((item, index) => (
              <motion.li
                key={item}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <a 
                  href={`#${item.toLowerCase()}`} 
                  className="text-sm text-gray-400 hover:text-white transition-colors duration-300 tracking-wide"
                >
                  {item}
                </a>
              </motion.li>
            ))}
            <motion.li
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <a 
                href="#contact"
                className="text-sm px-5 py-2 rounded-full border border-white/10 hover:border-orange-500/50 hover:bg-orange-500/10 text-white transition-all duration-300"
              >
                Let's Talk
              </a>
            </motion.li>
          </ul>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white p-2"
            aria-label="Toggle menu"
          >
            <div className="w-6 h-4 flex flex-col justify-between">
              <span className={`w-full h-px bg-white transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-[7px]' : ''}`}></span>
              <span className={`w-full h-px bg-white transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`w-full h-px bg-white transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`}></span>
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={false}
          animate={isMenuOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden overflow-hidden bg-[#0a0a0a]/95 backdrop-blur-xl border-t border-white/5"
        >
          <div className="px-6 py-6 flex flex-col gap-1">
            {navItems.map((item, index) => {
              const sectionId = item.toLowerCase();
              return (
                <motion.button
                  key={item}
                  initial={{ x: -20, opacity: 0 }}
                  animate={isMenuOpen ? { x: 0, opacity: 1 } : { x: -20, opacity: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => {
                    setIsMenuOpen(false);
                    setTimeout(() => {
                      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }}
                  className="text-left text-gray-400 hover:text-white py-3 text-base transition-colors"
                >
                  {item}
                </motion.button>
              );
            })}
            
            <div className="flex gap-6 pt-4 mt-2 border-t border-white/5">
              {[
                { icon: FiInstagram, link: socialLinks.instagram },
                { icon: FiGithub, link: socialLinks.github },
                { icon: FiLinkedin, link: socialLinks.linkedin },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-orange-500 transition-colors"
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.nav>

      {/* HERO SECTION */}
      <section id="home" className="min-h-screen flex items-center justify-center relative px-6">
        
        {/* Subtle Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-pink-500/5 rounded-full blur-[120px]"></div>
        </div>

        <div className="max-w-6xl mx-auto w-full relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-7 text-center lg:text-left"
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs text-gray-400 mb-8"
              >
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                Available for opportunities
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-[1.1]"
              >
                Hi, I'm{' '}
                <span className="bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">
                  Fathima Fidha
                </span>
              </motion.h1>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-lg sm:text-xl text-gray-400 mb-8 h-8"
              >
                <TypeWriter text="Frontend Developer" speed={80} />
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="text-gray-500 text-base leading-relaxed mb-10 max-w-lg mx-auto lg:mx-0"
              >
                Crafting clean, responsive, and user-focused web experiences with modern technologies. 
                Turning ideas into elegant digital solutions.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="flex flex-wrap gap-4 justify-center lg:justify-start mb-12"
              >
                <a
                  href="#projects"
                  className="group px-7 py-3 bg-white text-black text-sm font-medium rounded-full hover:bg-gray-200 transition-all duration-300 flex items-center gap-2"
                >
                  View Work
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </a>

                <button
                  onClick={handleResumeDownload}
                  className="px-7 py-3 border border-white/10 text-gray-300 text-sm font-medium rounded-full hover:border-white/30 hover:text-white transition-all duration-300 flex items-center gap-2"
                >
                  <FiDownload size={16} />
                  Resume
                </button>
              </motion.div>

              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1 }}
                className="flex gap-5 justify-center lg:justify-start"
              >
                {[
                  { icon: FiGithub, link: socialLinks.github, label: 'GitHub' },
                  { icon: FiLinkedin, link: socialLinks.linkedin, label: 'LinkedIn' },
                  { icon: FiInstagram, link: socialLinks.instagram, label: 'Instagram' },
                  { icon: FiMail, link: socialLinks.email, label: 'Email' },
                ].map((social, i) => (
                  <motion.a
                    key={i}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -3 }}
                    className="text-gray-600 hover:text-white transition-colors duration-300"
                    aria-label={social.label}
                  >
                    <social.icon size={20} />
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>

            {/* Profile Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="lg:col-span-5 flex justify-center lg:justify-end"
            >
              <div className="relative">
                {/* Subtle glow */}
                <div className="absolute -inset-4 bg-gradient-to-r from-orange-500/20 to-pink-500/20 rounded-full blur-3xl"></div>
                
                {/* Image */}
                <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-full overflow-hidden border border-white/10">
                  <img
                    src="fid.png"
                    alt="Fathima Fidha"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Decorative dots */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute -top-2 -right-2 w-3 h-3 bg-orange-500 rounded-full"
                />
                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                  className="absolute -bottom-2 -left-2 w-2 h-2 bg-pink-500 rounded-full"
                />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2"
        >
          <span className="text-[10px] text-gray-600 tracking-widest uppercase">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-gray-600 to-transparent"></div>
        </motion.div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="py-32 px-6 relative">
        <div className="max-w-6xl mx-auto">
          
          {/* Section Label */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-16"
          >
            <span className="text-xs text-orange-500 tracking-widest uppercase">01</span>
            <div className="h-px flex-1 bg-white/5 max-w-[60px]"></div>
            <span className="text-xs text-gray-600 tracking-widest uppercase">About</span>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            
            {/* Left - Text */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-8 leading-tight">
                A developer who cares about
                <span className="text-gray-500"> the details.</span>
              </h2>

              <div className="space-y-5 text-gray-400 leading-relaxed">
                <p>
                  I'm a passionate Frontend Developer who enjoys creating clean, responsive, 
                  and user-friendly web interfaces. I mainly work with React to build modern 
                  and interactive web applications.
                </p>
                <p>
                  I love transforming ideas into visually appealing and intuitive digital 
                  experiences while focusing on performance, accessibility, and usability.
                </p>
                <p>
                  As a developer, I'm always eager to learn new technologies and improve 
                  my skills to create better and more engaging user experiences.
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 mt-12 pt-8 border-t border-white/5">
                {[
                  { number: '2+', label: 'Years Experience' },
                  { number: '3+', label: 'Projects Built' },
                  { number: '5+', label: 'Technologies' }
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                  >
                    <div className="text-2xl sm:text-3xl font-bold text-white mb-1">{stat.number}</div>
                    <div className="text-xs text-gray-600 tracking-wide">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right - Image */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative aspect-[4/5] max-w-sm mx-auto lg:mx-0 lg:ml-auto">
                {/* Frame decoration */}
                <div className="absolute -inset-3 border border-white/5 rounded-2xl"></div>
                
                {/* Image */}
                <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white/10">
                  <img
                    src="fid.png"
                    alt="Fathima Fidha"
                    className="w-full h-full object-cover"
                  />
                  {/* Subtle gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                </div>

                {/* Floating tag */}
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute -bottom-4 -left-4 bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 backdrop-blur-sm"
                >
                  <div className="text-xs text-gray-500 mb-1">Based in</div>
                  <div className="text-sm font-medium text-white">Kerala, India</div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SKILLS SECTION */}
      <section id="skills" className="py-32 px-6 relative">
        <div className="max-w-6xl mx-auto">
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-16"
          >
            <span className="text-xs text-orange-500 tracking-widest uppercase">02</span>
            <div className="h-px flex-1 bg-white/5 max-w-[60px]"></div>
            <span className="text-xs text-gray-600 tracking-widest uppercase">Skills</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-bold tracking-tight mb-16 max-w-2xl"
          >
            Technologies I work with
          </motion.h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-8">
            {[
              { name: 'React', level: 90 },
              { name: 'Tailwind CSS', level: 90 },
              { name: 'HTML/CSS', level: 90 },
              { name: 'C', level: 85 },
              { name: 'Python', level: 80 },
              { name: 'JavaScript', level: 80 },
              { name: 'Django', level: 75 },
            ].map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="group"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
                    {skill.name}
                  </span>
                  <span className="text-xs text-gray-600">{skill.level}%</span>
                </div>
                <div className="h-px bg-white/5 relative overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: 0.3 + index * 0.05, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-orange-500 to-pink-500"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS SECTION */}
      <section id="projects" className="py-32 px-6 relative">
        <div className="max-w-6xl mx-auto">
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-16"
          >
            <span className="text-xs text-orange-500 tracking-widest uppercase">03</span>
            <div className="h-px flex-1 bg-white/5 max-w-[60px]"></div>
            <span className="text-xs text-gray-600 tracking-widest uppercase">Projects</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-bold tracking-tight mb-16 max-w-2xl"
          >
            Selected work
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Lurnzo',
                desc: 'AI-based technology learning platform for coding education.',
                tech: ['Python', 'Django', 'MySQL'],
                image: 'lurnzo.jpeg',
                github: 'https://github.com/Fidha5/Lurnzo',
                live: null,
              },
              {
                title: 'AttenDo',
                desc: 'Smart attendance system with faculty dashboard and notifications.',
                tech: ['React', 'Django', 'SQLite'],
                image: 'attendo.jpeg',
                github: 'https://github.com/Sameeha6/ATTENDO',
                live: null,
              },
              {
                title: 'E-App',
                desc: 'E-commerce platform with product listing, cart, and orders.',
                tech: ['React', 'JSON'],
                image: 'image.png',
                github: 'https://github.com/Fidha5/E-App',
                live: 'e-app.mp4',
              },
            ].map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="group"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-white/5 mb-5 bg-gray-900">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-3 bg-white text-black rounded-full"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <FiGithub size={18} />
                    </motion.a>
                    
                    {project.live ? (
                      <motion.a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-3 bg-orange-500 text-white rounded-full"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <FiExternalLink size={18} />
                      </motion.a>
                    ) : (
                      <div className="p-3 bg-white/10 text-gray-500 rounded-full cursor-not-allowed relative group/tip">
                        <FiExternalLink size={18} />
                        <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] text-gray-400 bg-black/80 px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover/tip:opacity-100 transition-opacity">
                          Coming soon
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-lg font-semibold text-white group-hover:text-orange-400 transition-colors">
                      {project.title}
                    </h3>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-white transition-colors mt-1"
                    >
                      <FiExternalLink size={16} />
                    </a>
                  </div>
                  
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {project.desc}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 pt-1">
                    {project.tech.map(tech => (
                      <span 
                        key={tech} 
                        className="text-[11px] text-gray-500 px-2.5 py-1 rounded-full border border-white/5"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="py-32 px-6 relative">
        <div className="max-w-6xl mx-auto">
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-16"
          >
            <span className="text-xs text-orange-500 tracking-widest uppercase">04</span>
            <div className="h-px flex-1 bg-white/5 max-w-[60px]"></div>
            <span className="text-xs text-gray-600 tracking-widest uppercase">Contact</span>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
            
            {/* Left - Info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-6">
                Let's create something
                <span className="text-gray-500"> together.</span>
              </h2>

              <p className="text-gray-400 leading-relaxed mb-12 max-w-md">
                I'm always open to discussing new projects, creative ideas, or opportunities 
                to be part of your vision.
              </p>

              {/* Contact Details */}
              <div className="space-y-6">
                {[
                  { icon: FiMail, label: 'Email', value: 'fidfidha07@gmail.com', href: socialLinks.email },
                  { icon: null, label: 'Phone', value: '+91 9633452534', href: socialLinks.phone, isPhone: true },
                  { icon: null, label: 'Location', value: 'Malappuram, Kerala, India', isLocation: true },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center flex-shrink-0">
                      {item.icon ? (
                        <item.icon size={16} className="text-orange-500" />
                      ) : item.isPhone ? (
                        <svg className="w-4 h-4 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                        </svg>
                      ) : (
                        <svg className="w-4 h-4 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                        </svg>
                      )}
                    </div>
                    <div>
                      <div className="text-xs text-gray-600 mb-1">{item.label}</div>
                      {item.href ? (
                        <a href={item.href} className="text-sm text-gray-300 hover:text-orange-400 transition-colors">
                          {item.value}
                        </a>
                      ) : (
                        <div className="text-sm text-gray-300">{item.value}</div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Social */}
              <div className="flex gap-4 mt-12 pt-8 border-t border-white/5">
                {[
                  { icon: FiGithub, link: socialLinks.github },
                  { icon: FiLinkedin, link: socialLinks.linkedin },
                  { icon: FiInstagram, link: socialLinks.instagram },
                ].map((social, i) => (
                  <motion.a
                    key={i}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -3 }}
                    className="w-10 h-10 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center text-gray-500 hover:text-white hover:border-white/20 transition-all"
                  >
                    <social.icon size={16} />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Right - Form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              {/* Success/Error Messages */}
              {showSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-sm"
                >
                  ✓ Message sent successfully. I'll get back to you soon.
                </motion.div>
              )}
              {showError && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm"
                >
                  ✗ Something went wrong. Please try again.
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs text-gray-500 mb-2 tracking-wide">Name</label>
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder-gray-600 focus:outline-none focus:border-orange-500/50 transition-colors disabled:opacity-50"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-2 tracking-wide">Email</label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder-gray-600 focus:outline-none focus:border-orange-500/50 transition-colors disabled:opacity-50"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-gray-500 mb-2 tracking-wide">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder-gray-600 focus:outline-none focus:border-orange-500/50 transition-colors disabled:opacity-50"
                    placeholder="What's this about?"
                  />
                </div>

                <div>
                  <label className="block text-xs text-gray-500 mb-2 tracking-wide">Message</label>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows="5"
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder-gray-600 focus:outline-none focus:border-orange-500/50 transition-colors resize-none disabled:opacity-50"
                    placeholder="Tell me about your project..."
                  ></textarea>
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: isSubmitting ? 1 : 1.01 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.99 }}
                  className={`w-full py-3.5 bg-white text-black text-sm font-medium rounded-lg transition-all duration-300 flex items-center justify-center gap-2 ${
                    isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-200'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <FiSend size={14} />
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/5 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold text-white">
                Fathima Fidha<span className="text-orange-500">.</span>
              </span>
              <span className="text-xs text-gray-600">© {new Date().getFullYear()}</span>
            </div>

            <div className="flex items-center gap-6 text-xs text-gray-600">
              <a href="#home" className="hover:text-white transition-colors">Home</a>
              <a href="#about" className="hover:text-white transition-colors">About</a>
              <a href="#projects" className="hover:text-white transition-colors">Projects</a>
              <a href="#contact" className="hover:text-white transition-colors">Contact</a>
            </div>

            <motion.button
              whileHover={{ y: -3 }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-gray-500 hover:text-white hover:border-white/30 transition-all text-xs"
              aria-label="Back to top"
            >
              ↑
            </motion.button>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;