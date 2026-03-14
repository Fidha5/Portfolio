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
  
  // Add mobile menu state
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Form submission states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const formRef = useRef(null);

  // Smooth scroll for anchor links
  // Smooth scroll for anchor links - UPDATED
useEffect(() => {
  const handleAnchorClick = (e) => {
    const href = e.currentTarget.getAttribute('href');
    if (href && href.startsWith('#')) {
      e.preventDefault();
      const targetId = href.substring(1);
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth'
        });
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

// Navigation helper function
const navigateToSection = (sectionId) => {
  console.log(`Navigating to ${sectionId}`);
  
  // Close mobile menu
  setIsMenuOpen(false);
  
  // Small delay to ensure menu is closed
  setTimeout(() => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    } else {
      console.error(`Section #${sectionId} not found`);
    }
  }, 150);
};

  // Close mobile menu when window is resized to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Function to handle resume download
  const handleResumeDownload = () => {
    const resumeUrl = '/resume.pdf';
    const link = document.createElement('a');
    link.href = resumeUrl;
    link.download = 'Fidha_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  // Function to view resume
  const handleResumeView = () => {
    window.open("/resume.pdf", "_blank");
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  // Handle form submission with Formspree
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setShowSuccess(false);
    setShowError(false);

    const formspreeEndpoint = 'https://formspree.io/f/xdawzvzg';

    try {
      const response = await fetch(formspreeEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message
        })
      });

      if (response.ok) {
        setShowSuccess(true);
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
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

  // Social media links
  const socialLinks = {
    instagram: 'https://www.instagram.com/',
    github: 'https://github.com/Fidha5',
    linkedin: 'https://www.linkedin.com/in/fidhacp',
    email: 'mailto:fidfidha07@gmail.com',
    phone: 'tel:+919633452534',
    location: 'Kerala, India'
  };

  return (
    <div className="bg-gradient-to-b from-black via-gray-900 to-black text-white scroll-smooth overflow-x-hidden">
      
      {/* NAVBAR with mobile menu */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 w-full bg-black/80 backdrop-blur-md border-b border-gray-800 z-50"
      >
        <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">
          
          {/* Logo */}
          <motion.h1 
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent cursor-pointer"
            onClick={() => {
              window.location.hash = '#home';
              setIsMenuOpen(false);
            }}
          >
            Fidha
          </motion.h1>

          {/* Desktop Menu */}
          <ul className="hidden md:flex gap-8 text-gray-300">
            {['Home', 'About', 'Skills', 'Projects', 'Contact'].map((item, index) => (
              <motion.li
                key={item}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <a 
                  href={`#${item.toLowerCase()}`} 
                  className="relative hover:text-orange-500 transition-colors group"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById(item.toLowerCase())?.scrollIntoView({
                      behavior: 'smooth'
                    });
                  }}
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 transition-all group-hover:w-full"></span>
                </a>
              </motion.li>
            ))}
          </ul>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-orange-500 focus:outline-none z-50"
              aria-label="Toggle menu"
            >
              <div className="w-6 h-5 flex flex-col justify-between">
                <span className={`w-full h-0.5 bg-current transform transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                <span className={`w-full h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                <span className={`w-full h-0.5 bg-current transform transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
              </div>
            </motion.button>
          </div>
        </div>
{/* Mobile Menu Dropdown - COMPLETELY FIXED */}
<motion.div
  initial={false}
  animate={isMenuOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
  transition={{ duration: 0.3 }}
  className="md:hidden overflow-hidden bg-black/95 backdrop-blur-md border-t border-gray-800"
>
  <div className="px-6 py-4 flex flex-col gap-4">
    {['Home', 'About', 'Skills', 'Projects', 'Contact'].map((item, index) => {
      const sectionId = item.toLowerCase();
      return (
        <motion.div
          key={item}
          initial={{ x: -20, opacity: 0 }}
          animate={isMenuOpen ? { x: 0, opacity: 1 } : { x: -20, opacity: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <button
            onClick={() => {
              console.log(`Navigating to ${sectionId}`);
              // Close menu first
              setIsMenuOpen(false);
              
              // Small delay to allow menu to close before scrolling
              setTimeout(() => {
                const element = document.getElementById(sectionId);
                if (element) {
                  element.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                  });
                } else {
                  console.error(`Element #${sectionId} not found`);
                }
              }, 100);
            }}
            className="w-full text-left text-gray-300 hover:text-orange-500 py-3 text-lg font-medium border-b border-gray-800 last:border-0 transition-colors bg-transparent border-none cursor-pointer"
          >
            {item}
          </button>
        </motion.div>
      );
    })}
    
    {/* Mobile menu social icons */}
    <div className="flex gap-4 pt-2">
      <a
        href={socialLinks.instagram}
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-400 hover:text-orange-500 transition-colors p-2 hover:scale-110 transform duration-200"
        onClick={() => setIsMenuOpen(false)}
      >
        <FiInstagram size={20} />
      </a>
      <a
        href={socialLinks.github}
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-400 hover:text-orange-500 transition-colors p-2 hover:scale-110 transform duration-200"
        onClick={() => setIsMenuOpen(false)}
      >
        <FiGithub size={20} />
      </a>
      <a
        href={socialLinks.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-400 hover:text-orange-500 transition-colors p-2 hover:scale-110 transform duration-200"
        onClick={() => setIsMenuOpen(false)}
      >
        <FiLinkedin size={20} />
      </a>
    </div>
  </div>
</motion.div>  </motion.nav>

      {/* HERO SECTION */}
<section id="home" className="min-h-screen flex flex-col items-center justify-center text-center px-6 relative overflow-hidden">
  
  {/* Animated background circles */}
  <div className="absolute inset-0 overflow-hidden">
    <motion.div 
      animate={{ 
        scale: [1, 1.2, 1],
        opacity: [0.3, 0.5, 0.3],
      }}
      transition={{ duration: 8, repeat: Infinity }}
      className="absolute -top-20 -right-20 w-64 h-64 bg-orange-500 rounded-full blur-3xl opacity-20"
    />
    <motion.div 
      animate={{ 
        scale: [1, 1.3, 1],
        opacity: [0.2, 0.4, 0.2],
      }}
      transition={{ duration: 10, repeat: Infinity }}
      className="absolute -bottom-20 -left-20 w-64 h-64 bg-pink-500 rounded-full blur-3xl opacity-20"
    />
  </div>

  {/* Profile Image - Holographic */}
  <motion.div
    initial={{ scale: 0, rotate: -180 }}
    animate={{ scale: 1, rotate: 0 }}
    transition={{ type: "spring", duration: 1.5 }}
    className="relative mb-8 group"
  >
    {/* Holographic Base */}
    <div className="relative w-44 h-44 mx-auto">
      {/* Scan Lines */}
      <div className="absolute inset-0 bg-scanlines rounded-full opacity-20"></div>
      
      {/* Main Image */}
      <div className="absolute inset-0 rounded-full overflow-hidden border-4 border-cyan-500/30 shadow-2xl">
        <img
          src="fid.png"
          alt="Fidha"
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Holographic Data Points */}
      {[ '⚡', '⏣', '⌘','⚛️'].map((symbol, i) => (
        <motion.div
          key={i}
          animate={{ 
            y: [0, -10, 0],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{ duration: 2, delay: i * 0.5, repeat: Infinity }}
          className="absolute text-cyan-400 text-xs"
          style={{
            top: `${20 + i * 20}%`,
            left: i % 2 === 0 ? '-15px' : 'auto',
            right: i % 2 === 1 ? '-15px' : 'auto',
          }}
        >
          {symbol}
        </motion.div>
      ))}
    </div>
  </motion.div>

  <style jsx>{`
    .bg-scanlines {
      background: repeating-linear-gradient(
        0deg,
        transparent,
        transparent 2px,
        rgba(0, 255, 255, 0.1) 2px,
        rgba(0, 255, 255, 0.1) 4px
      );
    }
  `}</style>

  {/* Name */}
  <motion.h1 
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.5 }}
    className="text-3xl md:text-4xl lg:text-6xl font-bold mb-4"
  >
    <span className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 bg-clip-text text-transparent">
      Hi, I'm Fathima Fidha C P
    </span>
  </motion.h1>

  {/* Role with TypeWriter */}
  <motion.h2 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 1 }}
    className="text-2xl md:text-3xl text-gray-400 mb-8"
  >
    <TypeWriter text="Frontend Developer" speed={80} />
  </motion.h2>

  {/* Buttons */}
  <motion.div 
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 1.5 }}
    className="flex gap-6 flex-wrap justify-center relative z-30"
  >
    <motion.a
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      href="#projects"
      className="relative px-8 py-3 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 text-white font-semibold overflow-hidden group z-30"
      onClick={(e) => {
        e.preventDefault();
        document.getElementById('projects')?.scrollIntoView({
          behavior: 'smooth'
        });
      }}
    >
      <span className="relative z-10">View Projects</span>
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-pink-500 to-orange-500"
        initial={{ x: '100%' }}
        whileHover={{ x: 0 }}
        transition={{ duration: 0.3 }}
      />
    </motion.a>

    {/* Resume Button */}
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => {
        console.log('Resume button clicked');
        window.open('/resume.pdf', '_blank');
      }}
      className="px-8 py-3 rounded-full border-2 border-orange-500 text-orange-500 font-semibold hover:bg-orange-500 hover:text-white transition-all duration-300 flex items-center gap-2 z-30 relative cursor-pointer"
      style={{ pointerEvents: 'auto' }}
    >
      <FiExternalLink size={18} />
      View Resume
    </motion.button>
  </motion.div>

  {/* Social icons */}
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 2 }}
    className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex gap-4"
  >
    <motion.a
      whileHover={{ y: -5 }}
      href={socialLinks.instagram}
      target="_blank"
      rel="noopener noreferrer"
      className="text-gray-400 hover:text-orange-500 transition-colors"
    >
      <FiInstagram size={24} />
    </motion.a>
    <motion.a
      whileHover={{ y: -5 }}
      href={socialLinks.github}
      target="_blank"
      rel="noopener noreferrer"
      className="text-gray-400 hover:text-orange-500 transition-colors"
    >
      <FiGithub size={24} />
    </motion.a>
    <motion.a
      whileHover={{ y: -5 }}
      href={socialLinks.linkedin}
      target="_blank"
      rel="noopener noreferrer"
      className="text-gray-400 hover:text-orange-500 transition-colors"
    >
      <FiLinkedin size={24} />
    </motion.a>
    <motion.a
      whileHover={{ y: -5 }}
      href={socialLinks.email}
      className="text-gray-400 hover:text-orange-500 transition-colors"
    >
      <FiMail size={24} />
    </motion.a>
  </motion.div>
</section>
    {/* ABOUT SECTION */}
<section id="about" className="py-24 px-10 relative bg-gradient-to-b from-black via-gray-900 to-black">
  <div className="max-w-6xl mx-auto">
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center"
    >
      {/* Image Column with Circular Design */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="relative group flex justify-center"
      >
        {/* Particle Effects */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                x: [Math.random() * 150 - 75, Math.random() * 150 - 75],
                y: [Math.random() * 150 - 75, Math.random() * 150 - 75],
                scale: [0, 1, 0],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 2
              }}
              className="absolute w-1 h-1 bg-orange-500 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`
              }}
            />
          ))}
        </div>
        
        {/* Main Image Card - Circular */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="relative z-10 w-64 h-64 md:w-72 md:h-72"
        >
          {/* Glow Effect */}
          <motion.div 
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute inset-0 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full blur-xl opacity-40 group-hover:opacity-70 transition-opacity"
          ></motion.div>
          
          {/* Image Container */}
          <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white/20 shadow-2xl">
            <img
              src="fid.png"
              alt="Fidha"
              className="w-full h-full object-cover"
            />
            
            {/* Gradient Border */}
            <div className="absolute inset-0 rounded-full border-4 border-transparent group-hover:border-orange-500/50 transition-all duration-300"></div>
            
            {/* Bottom Gradient */}
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/80 via-black/40 to-transparent rounded-b-full"></div>
          </div>
        </motion.div>
        
        {/* Floating Tech Icons */}
        {/* <motion.div
          animate={{ y: [0, -10, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute -top-2 -right-2 w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white text-xl shadow-xl z-20"
        >
          ⚛️
        </motion.div>
        
        <motion.div
          animate={{ y: [0, 10, 0], rotate: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, delay: 1 }}
          className="absolute -bottom-2 -left-2 w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white text-xl shadow-xl z-20"
        >
          📦
        </motion.div> */}

        {/* Additional Floating Elements */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute -top-6 -left-2 w-16 h-16 bg-orange-500/10 rounded-full blur-md"
        ></motion.div>
        
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 5, repeat: Infinity, delay: 1.5 }}
          className="absolute -bottom-6 -right-2 w-20 h-20 bg-pink-500/10 rounded-full blur-md"
        ></motion.div>
      </motion.div>

      {/* Text Column */}
      <div>
        <motion.h2 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold mb-6"
        >
          About <span className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">Me</span>
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
          className="text-gray-400 text-lg leading-relaxed mb-4"
        >
          I am a passionate Frontend Developer who enjoys creating clean, responsive, and user-friendly web interfaces. I mainly work with React to build modern and interactive web applications.
        </motion.p>
        
        <motion.p 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          viewport={{ once: true }}
          className="text-gray-400 text-lg leading-relaxed mb-4"
        >
          I love transforming ideas into visually appealing and intuitive digital experiences while focusing on performance, accessibility, and usability.
        </motion.p>
        
        <motion.p 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8 }}
          viewport={{ once: true }}
          className="text-gray-400 text-lg leading-relaxed"
        >
          As a developer, I am always eager to learn new technologies and improve my skills to create better and more engaging user experiences.
        </motion.p>

        {/* Stats Section */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          viewport={{ once: true }}
          className="grid grid-cols-3 gap-4 mt-8"
        >
          {[
            { number: '2+', label: 'Years', icon: '⏳' },
            { number: '2+', label: 'Projects', icon: '🚀' },
            { number: '5+', label: 'Technologies', icon: '💻' }
          ].map((stat, index) => (
            <motion.div 
              key={index} 
              whileHover={{ y: -5 }}
              className="text-center p-4 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 hover:border-orange-500/50 transition-all"
            >
              <div className="text-2xl mb-1">{stat.icon}</div>
              <div className="text-2xl font-bold text-orange-500">{stat.number}</div>
              <div className="text-xs text-gray-500">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  </div>
</section>
      {/* SKILLS SECTION */}
      <section id="skills" className="py-24 px-10 bg-gradient-to-b from-black via-gray-900 to-black">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-center mb-16"
          >
            My <span className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">Skills</span>
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: 'React', level: 90, icon: '⚛️', color: 'from-blue-500 to-cyan-500' },
              { name: 'Tailwind CSS', level: 90, icon: '🌊', color: 'from-blue-600 to-blue-400' },
              { name: 'HTML/CSS', level: 90, icon: '🎨', color: 'from-orange-500 to-red-500' },
              { name: 'C', level: 85, icon: '⚙️', color: 'from-blue-600 to-blue-400' },
              { name: 'Python', level: 80, icon: ' 🔷 ', color: 'from-blue-600 to-blue-400' },
              { name: 'JavaScript', level: 80, icon: '📜', color: 'from-yellow-500 to-amber-500' },
              { name: 'Django', level: 75, icon: '📦', color: 'from-green-500 to-emerald-500' },
            ].map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700 hover:border-orange-500 transition-all"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">{skill.icon}</span>
                  <h3 className="text-xl font-semibold">{skill.name}</h3>
                </div>
                
                <div className="relative h-3 bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                    viewport={{ once: true }}
                    className={`absolute h-full rounded-full bg-gradient-to-r ${skill.color}`}
                  />
                </div>
                <p className="text-right mt-2 text-sm text-gray-400">{skill.level}%</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS SECTION */}
      <section id="projects" className="py-24 px-10">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-center mb-16"
          >
            <span className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">Projects</span>
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Lurnzo',
                desc: 'AI-based technology learning platform for coding education.',
                tech: ['Python', 'Django', 'mySQL'],
                icon: '🤖',
                image: 'lurnzo.jpeg',
                github: 'https://github.com/Fidha5/Lurnzo',
                live: 'https://lurnnzo-demo.com',
                hasLive: false
              },
              {
                title: 'AttenDo',
                desc: 'Smart attendance system with faculty dashboard and parent notifications.',
                tech: ['React', 'Django', 'SQLite'],
                icon: '📊',
                image: 'attendo.jpeg',
                github: 'https://github.com/Sameeha6/ATTENDO',
                live: 'https://attendance-system-demo.com',
                hasLive: false
              },
              {
                title: 'E-App',
                desc: 'E-commerce platform with product listing, cart, and order system.',
                tech: ['React', 'Json'],
                icon: '🛒',
                image: 'image.png',
                github: 'https://github.com/Fidha5/E-App',
                live: 'e-app.mp4',
                hasLive: true
              },
            ].map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ 
                  scale: 1.05,
                  rotateY: 5,
                  boxShadow: "0 20px 40px rgba(249, 115, 22, 0.3)"
                }}
                className="group relative bg-gradient-to-br from-gray-900 to-black rounded-2xl border border-gray-800 hover:border-orange-500 transition-all overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-pink-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                
                {/* Project Image */}
                <div className="relative h-48 w-full overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent"></div>
                  
                  {/* Icon overlay on image */}
                  <div className="absolute top-3 right-3 w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-2xl border border-white/20">
                    {project.icon}
                  </div>

                  {/* Hover Overlay with Icons */}
                  <motion.div 
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center gap-6"
                  >
                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.2, y: -5 }}
                      className="bg-orange-500 p-3 rounded-full text-white shadow-lg"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <FiGithub size={24} />
                    </motion.a>

                    {project.hasLive ? (
                      <motion.a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.2, y: -5 }}
                        className="bg-pink-500 p-3 rounded-full text-white shadow-lg"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <FiExternalLink size={24} />
                      </motion.a>
                    ) : (
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="relative group/tooltip"
                      >
                        <div className="bg-gray-600 p-3 rounded-full text-white shadow-lg cursor-not-allowed opacity-75">
                          <FiExternalLink size={24} />
                        </div>
                        <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-3 py-1 rounded-full whitespace-nowrap opacity-0 group-hover/tooltip:opacity-100 transition-opacity">
                          Demo coming soon
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                </div>
                
                {/* Content */}
                <div className="relative p-6">
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-orange-500 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 mb-4">
                    {project.desc}
                  </p>
                  
                  {/* Tech tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map(tech => (
                      <span key={tech} className="px-2 py-1 text-xs bg-gray-800 rounded-full text-gray-300">
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Demo Status Badge and Bottom Icons */}
                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      {!project.hasLive && (
                        <span className="text-xs bg-yellow-500/20 text-yellow-500 px-3 py-1 rounded-full border border-yellow-500/30">
                          ⏳ Demo Soon
                        </span>
                      )}
                      {project.hasLive && (
                        <span className="text-xs bg-green-500/20 text-green-500 px-3 py-1 rounded-full border border-green-500/30">
                          🚀 Live Demo
                        </span>
                      )}
                    </div>
                    
                    {/* Bottom Icons */}
                    <div className="flex gap-2">
                      <motion.a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.2 }}
                        className="text-gray-500 hover:text-orange-500 transition-colors"
                      >
                        <FiGithub size={16} />
                      </motion.a>
                      
                      {project.hasLive ? (
                        <motion.a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.2 }}
                          className="text-gray-500 hover:text-orange-500 transition-colors"
                        >
                          <FiExternalLink size={16} />
                        </motion.a>
                      ) : (
                        <div className="relative group/tooltip">
                          <FiExternalLink size={16} className="text-gray-700 cursor-not-allowed" />
                          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-[10px] px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover/tooltip:opacity-100 transition-opacity">
                            Demo coming soon
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT SECTION - Modern UI Update */}
<section id="contact" className="py-24 px-10 relative overflow-hidden">
  {/* Animated background elements */}
  <div className="absolute inset-0">
    <motion.div 
      animate={{ 
        scale: [1, 1.2, 1],
        opacity: [0.1, 0.2, 0.1],
      }}
      transition={{ duration: 8, repeat: Infinity }}
      className="absolute top-20 left-20 w-72 h-72 bg-orange-500 rounded-full blur-3xl opacity-10"
    />
    <motion.div 
      animate={{ 
        scale: [1, 1.3, 1],
        opacity: [0.1, 0.2, 0.1],
      }}
      transition={{ duration: 10, repeat: Infinity }}
      className="absolute bottom-20 right-20 w-80 h-80 bg-pink-500 rounded-full blur-3xl opacity-10"
    />
    
    {/* Grid overlay */}
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
  </div>

  <div className="max-w-5xl mx-auto relative z-10">
    {/* Section Header */}
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center mb-16"
    >
      <h2 className="text-4xl md:text-5xl font-bold mb-4">
        Get In <span className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">Touch</span>
      </h2>
      <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-pink-500 mx-auto rounded-full"></div>
      <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
        Let's connect and discuss how we can work together
      </p>
    </motion.div>

    {/* Contact Cards Grid */}
    <div className="grid md:grid-cols-3 gap-6 mb-8">
      {/* Email Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        viewport={{ once: true }}
        whileHover={{ y: -8 }}
        className="group relative bg-gradient-to-br from-gray-900 to-black p-8 rounded-2xl border border-gray-800 hover:border-orange-500 transition-all"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-pink-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <div className="relative text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-orange-500/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
            <FiMail className="text-orange-500" size={32} />
          </div>
          <h3 className="text-xl font-semibold mb-2">Email</h3>
          <a 
            href={socialLinks.email} 
            className="text-gray-400 hover:text-orange-500 transition-colors text-sm break-all"
          >
            fidfidha07@gmail.com
          </a>
        </div>
      </motion.div>

      {/* Phone Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        viewport={{ once: true }}
        whileHover={{ y: -8 }}
        className="group relative bg-gradient-to-br from-gray-900 to-black p-8 rounded-2xl border border-gray-800 hover:border-orange-500 transition-all"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-pink-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <div className="relative text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-orange-500/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
            <svg className="w-8 h-8 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2">Phone</h3>
          <a 
            href="tel:+919633452534" 
            className="text-gray-400 hover:text-orange-500 transition-colors text-sm"
          >
            +91 9633452534
          </a>
        </div>
      </motion.div>

      {/* Location Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        viewport={{ once: true }}
        whileHover={{ y: -8 }}
        className="group relative bg-gradient-to-br from-gray-900 to-black p-8 rounded-2xl border border-gray-800 hover:border-orange-500 transition-all"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-pink-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <div className="relative text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-orange-500/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
            <svg className="w-8 h-8 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2">Location</h3>
          <span className="text-gray-400 text-sm">
            Malappuram, Kerala, India
          </span>
        </div>
      </motion.div>
    </div>

    {/* Bottom Section - Social & Resume */}
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      viewport={{ once: true }}
      className="bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-800"
    >
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Social Icons */}
        <div className="flex gap-4">
          <motion.a
            whileHover={{ y: -5, scale: 1.2 }}
            href={socialLinks.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-gray-800 rounded-xl hover:bg-orange-500 transition-all duration-300"
          >
            <FiInstagram size={22} className="text-gray-300" />
          </motion.a>
          <motion.a
            whileHover={{ y: -5, scale: 1.2 }}
            href={socialLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-gray-800 rounded-xl hover:bg-orange-500 transition-all duration-300"
          >
            <FiGithub size={22} className="text-gray-300" />
          </motion.a>
          <motion.a
            whileHover={{ y: -5, scale: 1.2 }}
            href={socialLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-gray-800 rounded-xl hover:bg-orange-500 transition-all duration-300"
          >
            <FiLinkedin size={22} className="text-gray-300" />
          </motion.a>
        </div>

        {/* Resume Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleResumeDownload}
          className="group relative px-8 py-3 bg-gradient-to-r from-orange-500 to-pink-500 rounded-xl overflow-hidden"
        >
          <span className="relative z-10 flex items-center gap-2 text-white font-semibold">
            <FiDownload size={18} className="group-hover:animate-bounce" />
            Download Resume
          </span>
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-pink-500 to-orange-500"
            initial={{ x: '100%' }}
            whileHover={{ x: 0 }}
            transition={{ duration: 0.3 }}
          />
        </motion.button>
      </div>

      {/* Quick Response Text */}
      <motion.p 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-center text-gray-500 text-sm mt-6"
      >
      </motion.p>
    </motion.div>
  </div>
</section>

      {/* MESSAGE SECTION - Contact Form */}
      <section id="message" className="py-24 px-10 relative bg-gradient-to-b from-black via-gray-900 to-black">
        <div className="max-w-4xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-center mb-6"
          >
            Send Me a <span className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">Message</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="text-gray-400 text-center mb-12"
          >
            Have a question or want to work together? Drop me a message!
          </motion.p>

          {/* Success Message */}
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-green-500/20 border border-green-500/50 rounded-lg text-green-500 text-center"
            >
              ✅ Message sent successfully! I'll get back to you soon.
            </motion.div>
          )}

          {/* Error Message */}
          {showError && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-500 text-center"
            >
              ❌ Failed to send message. Please try again.
            </motion.div>
          )}

          <motion.form
            ref={formRef}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-2xl border border-gray-800 shadow-2xl"
            onSubmit={handleSubmit}
          >
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              {/* Name Input */}
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:border-orange-500 focus:outline-none transition-colors text-white peer"
                  placeholder=" "
                  disabled={isSubmitting}
                />
                <label 
                  htmlFor="name"
                  className="absolute left-4 -top-2.5 bg-gray-900 px-2 text-sm text-gray-400 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-placeholder-shown:bg-transparent peer-placeholder-shown:text-gray-500 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:bg-gray-900 peer-focus:text-orange-500"
                >
                  Your Name
                </label>
              </div>

              {/* Email Input */}
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:border-orange-500 focus:outline-none transition-colors text-white peer"
                  placeholder=" "
                  disabled={isSubmitting}
                />
                <label 
                  htmlFor="email"
                  className="absolute left-4 -top-2.5 bg-gray-900 px-2 text-sm text-gray-400 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-placeholder-shown:bg-transparent peer-placeholder-shown:text-gray-500 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:bg-gray-900 peer-focus:text-orange-500"
                >
                  Your Email
                </label>
              </div>
            </div>

            {/* Subject Input */}
            <div className="relative mb-6">
              <input
                type="text"
                name="subject"
                id="subject"
                value={formData.subject}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:border-orange-500 focus:outline-none transition-colors text-white peer"
                placeholder=" "
                disabled={isSubmitting}
              />
              <label 
                htmlFor="subject"
                className="absolute left-4 -top-2.5 bg-gray-900 px-2 text-sm text-gray-400 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-placeholder-shown:bg-transparent peer-placeholder-shown:text-gray-500 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:bg-gray-900 peer-focus:text-orange-500"
              >
                Subject
              </label>
            </div>

            {/* Message Textarea */}
            <div className="relative mb-6">
              <textarea
                name="message"
                id="message"
                rows="5"
                value={formData.message}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:border-orange-500 focus:outline-none transition-colors text-white peer resize-none"
                placeholder=" "
                disabled={isSubmitting}
              ></textarea>
              <label 
                htmlFor="message"
                className="absolute left-4 -top-2.5 bg-gray-900 px-2 text-sm text-gray-400 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-placeholder-shown:bg-transparent peer-placeholder-shown:text-gray-500 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:bg-gray-900 peer-focus:text-orange-500"
              >
                Your Message
              </label>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
              whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
              className={`w-full md:w-auto px-8 py-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white font-semibold rounded-lg hover:shadow-lg transition-all flex items-center justify-center gap-2 mx-auto ${
                isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Sending...
                </>
              ) : (
                <>
                  <FiSend size={18} />
                  Send Message
                </>
              )}
            </motion.button>
          </motion.form>
        </div>
      </section>

     {/* FOOTER SECTION */}
<footer className="relative bg-gradient-to-b from-gray-900 to-black border-t border-gray-800">
  {/* Animated background elements */}
  <div className="absolute inset-0 overflow-hidden">
    <motion.div
      animate={{ 
        scale: [1, 1.2, 1],
        opacity: [0.1, 0.2, 0.1],
      }}
      transition={{ duration: 8, repeat: Infinity }}
      className="absolute -top-20 -right-20 w-64 h-64 bg-orange-500 rounded-full blur-3xl opacity-10"
    />
    <motion.div
      animate={{ 
        scale: [1, 1.3, 1],
        opacity: [0.1, 0.2, 0.1],
      }}
      transition={{ duration: 10, repeat: Infinity }}
      className="absolute -bottom-20 -left-20 w-64 h-64 bg-pink-500 rounded-full blur-3xl opacity-10"
    />
  </div>

  <div className="max-w-6xl mx-auto px-6 py-12 relative z-10">
    {/* Main Footer Content */}
    <div className="grid md:grid-cols-4 gap-8 mb-8">
      {/* Brand Column */}
      <div className="col-span-1">
        <motion.h3 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent mb-4"
        >
          Fathima Fidha C P
        </motion.h3>
        <p className="text-gray-400 text-sm leading-relaxed">
          Creating beautiful and responsive web experiences with modern technologies.
        </p>
      </div>

      {/* Quick Links */}
      <div className="col-span-1">
        <motion.h4 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-lg font-semibold text-white mb-4"
        >
          Quick Links
        </motion.h4>
        <ul className="space-y-2">
          {['Home', 'About', 'Skills', 'Projects', 'Contact'].map((item, index) => (
            <motion.li
              key={item}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + index * 0.05 }}
            >
              <a 
                href={`#${item.toLowerCase()}`}
                className="text-gray-400 hover:text-orange-500 transition-colors text-sm"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(item.toLowerCase())?.scrollIntoView({
                    behavior: 'smooth'
                  });
                }}
              >
                {item}
              </a>
            </motion.li>
          ))}
        </ul>
      </div>

      {/* Contact Info - UPDATED with phone and location */}
      <div className="col-span-1">
        <motion.h4 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-lg font-semibold text-white mb-4"
        >
          Contact Info
        </motion.h4>
        <ul className="space-y-3 text-sm">
          {/* Email */}
          <motion.li 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25 }}
            className="flex items-center gap-2 text-gray-400 hover:text-orange-500 transition-colors"
          >
            <FiMail size={14} className="text-orange-500 flex-shrink-0" />
            <a href={socialLinks.email} className="hover:text-orange-500 transition-colors">
              fidfidha07@gmail.com
            </a>
          </motion.li>
          
          {/* Phone - NEW */}
          <motion.li 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex items-center gap-2 text-gray-400 hover:text-orange-500 transition-colors"
          >
            <svg className="w-4 h-4 text-orange-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
            </svg>
            <a href="tel:+1234567890" className="hover:text-orange-500 transition-colors">
              +91 9633452534 {/* Replace with your number */}
            </a>
          </motion.li>
          
          {/* Location - NEW */}
          <motion.li 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.35 }}
            className="flex items-center gap-2 text-gray-400 hover:text-orange-500 transition-colors"
          >
            <svg className="w-4 h-4 text-orange-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
            </svg>
            <span className="hover:text-orange-500 transition-colors">
              Malappuram, Kerala {/* Replace with your location */}
            </span>
          </motion.li>
        </ul>
      </div>

      {/* Social Links */}
      <div className="col-span-1">
        <motion.h4 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-lg font-semibold text-white mb-4"
        >
          Follow Me
        </motion.h4>
        <div className="flex gap-3">
          {[
            { icon: FiInstagram, link: socialLinks.instagram, label: 'Instagram' },
            // { icon: FiGithub, link: socialLinks.github, label: 'GitHub' },
            { icon: FiLinkedin, link: socialLinks.linkedin, label: 'LinkedIn' },
          ].map((social, index) => (
            <motion.a
              key={social.label}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.35 + index * 0.05 }}
              whileHover={{ y: -5, scale: 1.1 }}
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-gray-800 rounded-lg hover:bg-orange-500 transition-colors"
              aria-label={social.label}
            >
              <social.icon size={18} className="text-gray-300" />
            </motion.a>
          ))}
        </div>
      </div>
    </div>

    {/* Divider */}
    <motion.div 
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.4 }}
      className="h-px bg-gradient-to-r from-transparent via-orange-500/50 to-transparent mb-6"
    />

    {/* Copyright and Bottom Bar */}
    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.45 }}
        className="text-gray-400 text-sm"
      >
        © {new Date().getFullYear()} Fidha. All rights reserved.
      </motion.p>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        className="flex gap-4 text-xs text-gray-500"
      >
        <span className="cursor-pointer hover:text-orange-500 transition-colors">Privacy Policy</span>
        <span className="cursor-pointer hover:text-orange-500 transition-colors">Terms of Service</span>
        <span className="cursor-pointer hover:text-orange-500 transition-colors">Cookie Policy</span>
      </motion.div>

      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.55 }}
        className="text-xs text-gray-600"
      >
        Built with React & Tailwind CSS
      </motion.p>
    </div>

    {/* Back to Top Button */}
    <motion.button
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.6 }}
      whileHover={{ scale: 1.1, y: -5 }}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="absolute -top-5 right-10 w-10 h-10 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full flex items-center justify-center text-white shadow-lg cursor-pointer hover:shadow-xl transition-all"
    >
      ↑
    </motion.button>
  </div>
</footer>
</div>
  );
}

export default App;