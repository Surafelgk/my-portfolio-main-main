"use client";

import { useEffect, useState, useCallback, useRef, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform, useAnimation } from "framer-motion";
import { FaGithub, FaLinkedin, FaInstagram, FaTelegramPlane, FaEnvelope, FaBriefcase } from "react-icons/fa";

interface NavItem {
  id: string;
  label: string;
  icon?: string;
}

// Custom debounce function
function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// Blue/Black color theme variants
const colorVariants = {
  primary: {
    from: "from-blue-600",
    to: "to-blue-800",
    hover: "hover:from-blue-700 hover:to-blue-900",
    bg: "bg-blue-600",
    text: "text-blue-600",
    border: "border-blue-600",
    light: "bg-blue-500/20",
    gradient: "from-blue-600 to-blue-800",
    gradientHover: "from-blue-700 to-blue-900",
    gradientLight: "from-blue-500/10 to-blue-600/10",
  },
  dark: {
    from: "from-gray-900",
    to: "to-black",
    hover: "hover:from-gray-800 hover:to-gray-900",
    bg: "bg-gray-900",
    text: "text-gray-900",
    border: "border-gray-900",
    light: "bg-gray-900/20",
    gradient: "from-gray-900 to-black",
    gradientHover: "from-gray-800 to-gray-900",
    gradientLight: "from-gray-900/10 to-black/10",
  }
};

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const pulseAnimation = {
  initial: { scale: 1 },
  animate: { 
    scale: [1, 1.05, 1],
    transition: { 
      duration: 2,
      repeat: Infinity,
      repeatType: "reverse" as const
    }
  }
};

// Static translations
const staticTranslations = {
  nav: {
    about: "About",
    experience: "Experience",
    projects: "Projects",
    contacts: "Contact"
  },
  headerRole: "Full Stack Developer",
  quickInfo: [
    "Based in Ethiopia",
    "Open to freelance work",
    "Available for collaboration"
  ],
  getInTouch: "Get in Touch",
  pressEsc: "Press ESC to close"
};

// Professional social media data with Instagram
const professionalSocialMedia = [
  {
    id: "github",
    icon: FaGithub,
    label: "GitHub",
    url: "https://github.com/surafelgk",
    description: "View my code repositories",
    color: "text-gray-700 hover:text-gray-900",
    bgGradient: "from-gray-700 to-gray-900",
    borderColor: "border-gray-300",
    shortLabel: "GH",
    order: 1
  },
  {
    id: "linkedin",
    icon: FaLinkedin,
    label: "LinkedIn",
    url: "https://linkedin.com/in/surafel-binalfew",
    description: "Professional network profile",
    color: "text-blue-700 hover:text-blue-800",
    bgGradient: "from-blue-600 to-blue-800",
    borderColor: "border-blue-300",
    shortLabel: "IN",
    order: 2
  },
  {
    id: "instagram",
    icon: FaInstagram,
    label: "Instagram",
    url: "https://instagram.com/surafel_b", // Add your Instagram URL
    description: "Visual portfolio & updates",
    color: "text-pink-600 hover:text-pink-700",
    bgGradient: "from-pink-600 to-purple-700",
    borderColor: "border-pink-300",
    shortLabel: "IG",
    order: 3
  },
  {
    id: "portfolio",
    icon: FaBriefcase,
    label: "Portfolio",
    url: "https://your-portfolio-link.com", // Replace with your portfolio link
    description: "View my portfolio",
    color: "text-purple-600 hover:text-purple-700",
    bgGradient: "from-purple-600 to-purple-800",
    borderColor: "border-purple-300",
    shortLabel: "PF",
    order: 4
  },
  {
    id: "email",
    icon: FaEnvelope,
    label: "Email",
    url: "mailto:surafelbinalfew@gmail.com",
    description: "Send me an email",
    color: "text-red-600 hover:text-red-700",
    bgGradient: "from-red-600 to-red-800",
    borderColor: "border-red-300",
    shortLabel: "EM",
    order: 5
  },
  {
    id: "telegram",
    icon: FaTelegramPlane,
    label: "Telegram",
    url: "https://t.me/Portfoliosura",
    description: "Message me on Telegram",
    color: "text-blue-500 hover:text-blue-600",
    bgGradient: "from-blue-500 to-blue-700",
    borderColor: "border-blue-300",
    shortLabel: "TG",
    order: 6
  }
].sort((a, b) => a.order - b.order);

const Header = () => {
  const [activeSection, setActiveSection] = useState("about");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLogoHovered, setIsLogoHovered] = useState(false);
  const [isImageOpen, setIsImageOpen] = useState(false);
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null);
  
  const headerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const lastScrollY = useRef(0);
  
  // Framer Motion controls
  const logoControls = useAnimation();
  const navControls = useAnimation();
  const headerControls = useAnimation();
  const socialControls = useAnimation();

  const { scrollY } = useScroll();
  
  // Blue/Black theme transforms
  const headerOpacity = useTransform(scrollY, [0, 100], [0.95, 1]);
  const headerBlur = useTransform(scrollY, [0, 100], ["blur(0px)", "blur(5px)"]);
  const headerShadow = useTransform(
    scrollY,
    [0, 50],
    [
      "0px 2px 8px rgba(0, 0, 0, 0.1)",
      "0px 8px 32px rgba(0, 0, 0, 0.2)"
    ]
  );
  
  // Background color transform - becomes more solid on scroll
  const headerBackground = useTransform(
    scrollY,
    [0, 100],
    [
      "rgba(255, 255, 255, 0.95)",
      "rgba(255, 255, 255, 0.98)"
    ]
  );

  // Static nav items
  const navItems: NavItem[] = useMemo(
    () => [
      { id: "about", label: staticTranslations.nav.about, icon: "👤" },
      { id: "experience", label: staticTranslations.nav.experience },
      { id: "projects", label: staticTranslations.nav.projects },
      { id: "contacts", label: staticTranslations.nav.contacts },
    ],
    []
  );

  // Smooth scroll with animation
  const scrollToSection = useCallback(async (id: string) => {
    const section = document.getElementById(id);
    if (!section || !headerRef.current) return;

    // Animate the clicked button
    await navControls.start({
      scale: [1, 0.95, 1],
      transition: { duration: 0.3 }
    });

    const headerHeight = headerRef.current.offsetHeight;
    const sectionTop = section.offsetTop - headerHeight - 20;

    window.scrollTo({
      top: sectionTop,
      behavior: "smooth",
    });

    setActiveSection(id);
    setIsMobileMenuOpen(false);
  }, [navControls]);

  // Intersection Observer for section detection
  useEffect(() => {
    const updateActiveSection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
          setActiveSection(entry.target.id);
          
          // Animate header indicator when section changes
          headerControls.start({
            scale: [1, 1.02, 1],
            transition: { duration: 0.3 }
          });
        }
      });
    };

    const options = {
      root: null,
      rootMargin: "-20% 0px -70% 0px",
      threshold: [0.1, 0.3, 0.5],
    };

    observerRef.current = new IntersectionObserver(updateActiveSection, options);

    // Observe all sections
    navItems.forEach((item) => {
      const section = document.getElementById(item.id);
      if (section) {
        observerRef.current?.observe(section);
      }
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [navItems, headerControls]);

  // Header always visible - only update scroll state for styling
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Update scrolled state for styling - becomes more prominent on scroll
      setIsScrolled(currentScrollY > 30);
      
      lastScrollY.current = currentScrollY;
    };

    // Debounce the scroll handler
    const debouncedScroll = debounce(handleScroll, 100);

    window.addEventListener("scroll", debouncedScroll, { passive: true });
    
    // Initial check
    handleScroll();
    
    return () => {
      window.removeEventListener("scroll", debouncedScroll);
    };
  }, []);

  // Logo hover animation
  useEffect(() => {
    if (isLogoHovered) {
      logoControls.start({
        rotate: [0, -5, 5, 0],
        transition: { duration: 0.4 }
      });
    } else {
      logoControls.start({ rotate: 0 });
    }
  }, [isLogoHovered, logoControls]);

  // Always show header when menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      headerControls.start({ y: 0 });
    }
  }, [isMobileMenuOpen, headerControls]);

  // Keyboard shortcuts with animation
  useEffect(() => {
    const handleKeyDown = async (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMobileMenuOpen) {
        await headerControls.start({
          scale: [1, 0.98, 1],
          transition: { duration: 0.2 }
        });
        setIsMobileMenuOpen(false);
        return;
      }
      
      if (e.key === "Escape" && isImageOpen) {
        setIsImageOpen(false);
        return;
      }
      
      // Number keys for quick navigation (1-4) with animation
      if (!isMobileMenuOpen && e.altKey && e.key >= "1" && e.key <= "4") {
        const index = parseInt(e.key) - 1;
        if (navItems[index]) {
          // Animate all nav items
          await navControls.start({
            scale: [1, 0.95, 1],
            transition: { duration: 0.2 }
          });
          scrollToSection(navItems[index].id);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMobileMenuOpen, isImageOpen, navItems, scrollToSection, headerControls, navControls]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
    
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const handleLogoClick = useCallback(async () => {
    // Animate logo click
    await logoControls.start({
      scale: [1, 0.9, 1],
      rotate: [0, 360],
      transition: { duration: 0.5 }
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
    setActiveSection("about");
    setIsMobileMenuOpen(false);
  }, [logoControls]);

  const handleSocialHover = async (id: string | null) => {
    setHoveredSocial(id);
    if (id) {
      await socialControls.start({
        scale: [1, 1.05, 1],
        transition: { duration: 0.3 }
      });
    }
  };

  // Blue/Black theme background particle animation
  const ParticleBackground = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-gradient-to-r from-blue-600/30 to-blue-800/20 rounded-full"
          initial={{
            x: Math.random() * 100,
            y: Math.random() * 100,
            opacity: 0
          }}
          animate={{
            x: [null, Math.random() * 100],
            y: [null, Math.random() * 100],
            opacity: [0, 0.3, 0]
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            repeat: Infinity,
            repeatType: "reverse",
            delay: i * 0.4
          }}
        />
      ))}
    </div>
  );

  return (
    <>
      <motion.header
        ref={headerRef}
        style={{
          opacity: headerOpacity,
          backdropFilter: headerBlur,
          boxShadow: headerShadow,
          background: headerBackground,
        }}
        animate={headerControls}
        initial={{ y: 0, opacity: 0.9 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 w-full z-50"
      >
        {/* Animated Background */}
        <ParticleBackground />
        
        {/* Animated border bottom with blue gradient */}
        <motion.div 
          className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-blue-600 to-transparent"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isScrolled ? 1 : 0.5 }}
          transition={{ duration: 0.5 }}
        />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Animated Logo */}
            <motion.div
              ref={logoRef}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <motion.button
                animate={logoControls}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onHoverStart={() => setIsLogoHovered(true)}
                onHoverEnd={() => setIsLogoHovered(false)}
                onClick={handleLogoClick}
                className="flex items-center space-x-3 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 rounded-lg p-1 relative group"
                aria-label="Scroll to top"
              >
                {/* Blue glow effect */}
                <motion.div
                  className="absolute -inset-2 rounded-full border-2 border-blue-600/20"
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.3, 0.5, 0.3]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                />
                
                <div className="relative">
                  {/* Blue glow effect on hover */}
                  <motion.div
                    className="absolute -inset-3 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 blur-2xl"
                    animate={isLogoHovered ? { opacity: [0.06, 0.18, 0.06], rotate: [0, 8, 0] } : { opacity: 0 }}
                    transition={{ duration: 1.6, repeat: Infinity }}
                  />
                  
                  <Image
                    src="/segni-pic2.jpg"
                    alt="Surafel Binalfew"
                    width={48}
                    height={48}
                    className="rounded-full object-cover border-2 border-white shadow-lg relative z-10 cursor-pointer"
                    priority
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsImageOpen(true);
                    }}
                  />
                  
                  {/* Active indicator dot with blue color */}
                  <motion.div
                    className="absolute bottom-0 right-0 w-3 h-3 bg-blue-600 rounded-full border-2 border-white z-20"
                    animate={pulseAnimation}
                  />
                </div>
                
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="sr-only"
                >
                  Surafel Binalfew
                </motion.span>
              </motion.button>
            </motion.div>

            {/* Desktop Navigation - Blue/Black Theme */}
            <motion.nav
              ref={navRef}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="hidden md:flex items-center space-x-1"
            >
              {navItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  variants={fadeInUp}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: index * 0.1 }}
                  custom={index}
                >
                  <motion.button
                    animate={navControls}
                    whileHover={{ 
                      y: -2,
                      transition: { type: "spring", stiffness: 400, damping: 17 }
                    }}
                    whileTap={{ 
                      y: 0,
                      scale: 0.95 
                    }}
                    onClick={() => scrollToSection(item.id)}
                    className="relative px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 group"
                    aria-current={activeSection === item.id ? "page" : undefined}
                  >
                    {/* Hover background effect with blue */}
                    <motion.div
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-50 to-blue-100/50 -z-10"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    />
                    
                    <span className="relative z-10 flex items-center gap-2">
                      <motion.span
                        className="text-base"
                        animate={activeSection === item.id ? {
                          rotate: [0, 360],
                          transition: { duration: 0.5 }
                        } : {}}
                      >
                        {item.icon}
                      </motion.span>
                      <span className={`transition-colors duration-200 ${
                        activeSection === item.id 
                          ? "text-white font-semibold" 
                          : "text-gray-700 group-hover:text-blue-700"
                      }`}>
                        {item.label}
                      </span>
                    </span>
                    
                    {/* Active indicator with blue gradient */}
                    {activeSection === item.id && (
                      <>
                        <motion.div
                          layoutId="desktopActiveIndicator"
                          className={`absolute inset-0 bg-gradient-to-r ${colorVariants.primary.gradient} rounded-full -z-10 shadow-lg`}
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                        <motion.div
                          className="absolute -inset-1 rounded-full border-2 border-blue-600/30 -z-10"
                          animate={{
                            scale: [1, 1.1, 1],
                            opacity: [0.5, 0.2, 0.5]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity
                          }}
                        />
                      </>
                    )}
                    
                    {/* Hover arrow indicator with blue */}
                    <motion.div
                      className="absolute -right-2 top-1/2 -translate-y-1/2 text-blue-600 opacity-0 group-hover:opacity-100"
                      initial={{ x: -5 }}
                      whileHover={{ x: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      →
                    </motion.div>
                  </motion.button>
                </motion.div>
              ))}
            </motion.nav>

            {/* Professional Social Media Icons - Desktop */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="hidden lg:flex items-center space-x-2"
            >
              <div className="flex items-center space-x-3">
                {/* Elegant separator */}
                <motion.div
                  className="w-8 h-[1px] bg-gradient-to-r from-blue-600/20 to-blue-800/10"
                  animate={{
                    width: ["0px", "32px", "32px"],
                  }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                />
                
                {/* Professional social icons container */}
                <div className="flex items-center space-x-2 bg-white/50 backdrop-blur-sm rounded-xl px-3 py-2 border border-gray-200 shadow-sm">
                  {professionalSocialMedia.map((social, index) => (
                    <motion.div
                      key={social.id}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.6 + (index * 0.1) }}
                      className="relative"
                    >
                      <motion.a
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        animate={socialControls}
                        whileHover={{ 
                          scale: 1.1,
                          y: -2,
                          transition: { type: "spring", stiffness: 400, damping: 15 }
                        }}
                        whileTap={{ scale: 0.95 }}
                        onMouseEnter={() => handleSocialHover(social.id)}
                        onMouseLeave={() => handleSocialHover(null)}
                        className="relative p-2 rounded-lg transition-all duration-300 group"
                        aria-label={social.label}
                      >
                        {/* Minimalist background effect */}
                        <motion.div
                          className={`absolute inset-0 rounded-lg bg-gradient-to-r ${social.bgGradient} opacity-0 group-hover:opacity-10`}
                          initial={false}
                          animate={{
                            opacity: hoveredSocial === social.id ? 0.1 : 0
                          }}
                          transition={{ duration: 0.3 }}
                        />
                        
                        {/* Elegant tooltip */}
                        <motion.div
                          className="absolute -top-10 left-1/2 transform -translate-x-1/2 px-3 py-1.5 bg-gray-900 text-white text-xs font-medium rounded-lg shadow-lg opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none"
                          initial={{ y: 5, opacity: 0 }}
                          animate={{ 
                            y: hoveredSocial === social.id ? 0 : 5,
                            opacity: hoveredSocial === social.id ? 1 : 0
                          }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="flex flex-col items-center">
                            <span className="font-semibold">{social.label}</span>
                            <span className="text-gray-300 text-[10px] mt-0.5">{social.description}</span>
                          </div>
                          <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45" />
                        </motion.div>
                        
                        {/* Social icon */}
                        <div className="relative z-10">
                          <social.icon 
                            className={`w-5 h-5 transition-all duration-300 ${social.color} ${
                              hoveredSocial === social.id ? 'scale-110' : ''
                            }`}
                          />
                          
                          {/* Subtle indicator dot */}
                          <motion.div
                            className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-blue-500 rounded-full"
                            initial={{ scale: 0 }}
                            animate={{ 
                              scale: hoveredSocial === social.id ? 1 : 0,
                              opacity: hoveredSocial === social.id ? 1 : 0
                            }}
                            transition={{ duration: 0.2 }}
                          />
                        </div>
                      </motion.a>
                      
                      {/* Vertical separator between icons */}
                      {index < professionalSocialMedia.length - 1 && (
                        <motion.div
                          className="absolute -right-1 top-1/2 -translate-y-1/2 h-3 w-[1px] bg-gray-300"
                          animate={{
                            height: hoveredSocial === social.id || hoveredSocial === professionalSocialMedia[index + 1]?.id ? 
                              ["6px", "12px", "6px"] : "6px"
                          }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        />
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Mobile Menu Button with Blue Theme */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, type: "spring" }}
              className="md:hidden flex items-center space-x-2"
            >
              {/* Mobile Social Media Icons (professional) */}
              <div className="flex items-center space-x-1 mr-2 bg-white/50 backdrop-blur-sm rounded-lg px-2 py-1.5 border border-gray-200">
                {professionalSocialMedia.slice(0, 3).map((social) => (
                  <motion.a
                    key={social.id}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileTap={{ scale: 0.9 }}
                    className="p-1.5 rounded-md hover:bg-gray-100 transition-colors relative group"
                    aria-label={social.label}
                  >
                    <social.icon className={`w-4 h-4 ${social.color}`} />
                    {/* Mobile tooltip */}
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-900 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none">
                      {social.shortLabel}
                      <div className="absolute bottom-[-4px] left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45" />
                    </div>
                  </motion.a>
                ))}
              </div>
              
              <motion.button
                animate={isMobileMenuOpen ? "open" : "closed"}
                variants={{
                  open: { rotate: 90 },
                  closed: { rotate: 0 }
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 relative"
                aria-label="Toggle menu"
                aria-expanded={isMobileMenuOpen}
              >
                {/* Button background animation with blue */}
                <motion.div
                  className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-600/10 to-blue-800/10"
                  animate={{
                    opacity: isMobileMenuOpen ? 1 : 0.5
                  }}
                  transition={{ duration: 0.3 }}
                />
                
                <div className="relative w-6 h-6">
                  <motion.span
                    variants={{
                      open: { rotate: 45, y: 6, width: "100%" },
                      closed: { rotate: 0, y: 0, width: "100%" }
                    }}
                    className="absolute top-0 left-0 w-6 h-0.5 bg-gradient-to-r from-gray-900 to-gray-700 rounded-full"
                  />
                  <motion.span
                    variants={{
                      open: { opacity: 0, x: -10 },
                      closed: { opacity: 1, x: 0, width: "80%" }
                    }}
                    className="absolute top-3 left-0 h-0.5 bg-gradient-to-r from-gray-900 to-gray-700 rounded-full"
                  />
                  <motion.span
                    variants={{
                      open: { rotate: -45, y: -6, width: "100%" },
                      closed: { rotate: 0, y: 0, width: "100%" }
                    }}
                    className="absolute bottom-0 left-0 w-6 h-0.5 bg-gradient-to-r from-gray-900 to-gray-700 rounded-full"
                  />
                </div>
              </motion.button>
            </motion.div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu with Blue/Black Theme */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop with blue tint */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-gradient-to-br from-blue-900/20 to-gray-900/40 backdrop-blur-md z-40 md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            {/* Menu Panel with blue/black theme */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ 
                x: "100%",
                transition: { type: "spring", damping: 30, stiffness: 200 }
              }}
              transition={{ 
                type: "spring", 
                damping: 30, 
                stiffness: 300,
                mass: 0.5
              }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-gradient-to-b from-white to-gray-50 z-50 md:hidden flex flex-col shadow-2xl overflow-hidden"
            >
              {/* Blue theme particles for menu */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-gradient-to-r from-blue-600/20 to-blue-800/10 rounded-full"
                    initial={{
                      x: Math.random() * 400,
                      y: Math.random() * 800,
                      opacity: 0
                    }}
                    animate={{
                      y: [0, -100],
                      opacity: [0, 0.2, 0]
                    }}
                    transition={{
                      duration: 3 + Math.random() * 2,
                      repeat: Infinity,
                      repeatType: "reverse",
                      delay: i * 0.2
                    }}
                  />
                ))}
              </div>
              
              {/* Menu Header */}
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="p-6 border-b border-gray-200 bg-gradient-to-r from-white to-white/90 relative z-10"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="relative"
                    >
                      <motion.div
                        className="absolute -inset-2 bg-gradient-to-r from-blue-600 to-blue-800 rounded-full"
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0.1, 0.2, 0.1]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity
                        }}
                      />
                      <Image
                        src="/segni-pic2.jpg"
                        alt="Surafel Binalfew"
                        width={56}
                        height={56}
                        className="rounded-full object-cover border-2 border-white shadow-lg relative z-10"
                        onClick={() => setIsImageOpen(true)}
                      />
                    </motion.div>
                    <div>
                      <motion.h2
                        initial={{ x: -10, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="font-semibold text-gray-900"
                      >
                        Surafel Binalfew
                      </motion.h2>
                      <motion.p
                        initial={{ x: -10, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-sm text-gray-600"
                      >
                        {staticTranslations.headerRole}
                      </motion.p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <motion.button
                      whileHover={{ scale: 1.1, rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                      aria-label="Close menu"
                    >
                      <span className="text-2xl text-gray-500 hover:text-gray-700">×</span>
                    </motion.button>
                  </div>
                </div>
              </motion.div>

              {/* Navigation Items with blue theme */}
              <div className="flex-1 overflow-y-auto p-6 relative z-10">
                <motion.nav
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                  className="space-y-2"
                >
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.id}
                      variants={fadeInUp}
                      custom={index}
                    >
                      <motion.button
                        whileHover={{ 
                          scale: 1.02,
                          x: 5,
                          transition: { type: "spring", stiffness: 400 }
                        }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => scrollToSection(item.id)}
                        className={`w-full flex items-center justify-between p-5 rounded-2xl text-left transition-all duration-200 group relative overflow-hidden ${
                          activeSection === item.id
                            ? `bg-gradient-to-r ${colorVariants.primary.gradient} text-white shadow-xl`
                            : "text-gray-700 hover:bg-blue-50 hover:shadow-lg border border-gray-200"
                        }`}
                      >
                        {/* Blue shine effect */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-100/30 to-transparent"
                          initial={{ x: "-100%" }}
                          whileHover={{ x: "100%" }}
                          transition={{ duration: 0.6 }}
                        />
                        
                        <div className="flex items-center space-x-4 relative z-10">
                          <motion.span
                            className="text-2xl"
                            whileHover={{ 
                              rotate: [0, 10, -10, 0],
                              transition: { duration: 0.5 }
                            }}
                          >
                            {item.icon}
                          </motion.span>
                          <span className="font-medium text-lg">{item.label}</span>
                        </div>
                        
                        {activeSection === item.id ? (
                          <motion.div
                            layoutId="mobileActiveIndicator"
                            className="w-2 h-8 bg-white rounded-full relative z-10"
                            animate={{
                              scaleY: [1, 1.2, 1],
                              transition: { duration: 1, repeat: Infinity }
                            }}
                          />
                        ) : (
                          <motion.span
                            className="text-blue-600 opacity-0 group-hover:opacity-100 relative z-10"
                            initial={{ x: 0 }}
                            whileHover={{ x: 5 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            →
                          </motion.span>
                        )}
                      </motion.button>
                    </motion.div>
                  ))}
                </motion.nav>

                {/* Professional Social Media Section in Mobile Menu */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mt-8 p-6 bg-white rounded-2xl border border-gray-200 shadow-sm"
                >
                  <motion.h3
                    whileHover={{ x: 5 }}
                    className="font-semibold text-gray-900 mb-4 flex items-center gap-3"
                  >
                    <motion.span
                      animate={{ rotate: [0, 10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="text-2xl text-blue-600"
                    >
                      📱
                    </motion.span>
                    Professional Profiles
                  </motion.h3>
                  <div className="grid grid-cols-2 gap-3">
                    {professionalSocialMedia.map((social) => (
                      <motion.a
                        key={social.id}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`flex items-center space-x-3 p-3 rounded-xl border ${social.borderColor} hover:shadow-md transition-all duration-300 group`}
                        aria-label={social.label}
                      >
                        <div className={`p-2 rounded-lg bg-gradient-to-r ${social.bgGradient}/10 group-hover:${social.bgGradient}/20 transition-all duration-300`}>
                          <social.icon 
                            className={`w-5 h-5 ${social.color}`}
                          />
                        </div>
                        <div className="flex-1">
                          <span className="text-sm font-medium text-gray-900">{social.label}</span>
                          <p className="text-xs text-gray-500 mt-0.5">{social.description}</p>
                        </div>
                      </motion.a>
                    ))}
                  </div>
                </motion.div>

                {/* Quick Info with blue accents */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mt-6 p-6 bg-gradient-to-br from-white to-blue-50 rounded-2xl border border-blue-100 shadow-sm"
                >
                  <motion.h3
                    whileHover={{ x: 5 }}
                    className="font-semibold text-gray-900 mb-4 flex items-center gap-3"
                  >
                    <motion.span
                      animate={{ rotate: [0, 10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="text-2xl text-blue-600"
                    >
                      📍
                    </motion.span>
                    Quick Info
                  </motion.h3>
                  <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                    className="space-y-4"
                  >
                    {staticTranslations.quickInfo.map((text, index) => (
                      <motion.p
                        key={index}
                        variants={fadeInUp}
                        className="text-sm text-gray-700 flex items-center gap-3 group"
                      >
                        <motion.span
                          className="w-2 h-2 bg-gradient-to-r from-blue-600 to-blue-800 rounded-full"
                          animate={pulseAnimation}
                          transition={{ delay: index * 0.1 }}
                        />
                        {text}
                        <motion.span
                          className="ml-auto text-blue-600 opacity-0 group-hover:opacity-100"
                          initial={{ x: -10 }}
                          whileHover={{ x: 0 }}
                        >
                          •
                        </motion.span>
                      </motion.p>
                    ))}
                  </motion.div>
                </motion.div>
              </div>

              {/* Footer with blue theme */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="p-6 border-t border-gray-200 bg-white/80 backdrop-blur-sm relative z-10"
              >
                <motion.button
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: "0px 10px 30px rgba(37, 99, 235, 0.3)"
                  }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => scrollToSection("contacts")}
                  className="w-full py-4 bg-gradient-to-r from-blue-600 via-blue-700 to-blue-600 text-white font-semibold rounded-xl shadow-lg relative overflow-hidden group"
                >
                  {/* Animated blue background */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-800"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "0%" }}
                    transition={{ duration: 0.4 }}
                  />
                  
                  {/* Text with blue theme */}
                  <div className="relative z-10 flex items-center justify-center gap-3">
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      👋
                    </motion.span>
                    <span>{staticTranslations.getInTouch}</span>
                    <motion.span
                      animate={{ x: [0, -5, 0] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                    >
                      →
                    </motion.span>
                  </div>
                </motion.button>
                
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="text-center text-xs text-gray-500 mt-4"
                >
                  {staticTranslations.pressEsc.split('ESC').map((part, i, arr) => (
                    <span key={i}>
                      {i === 0 ? part : null}
                      {i > 0 && (
                        <kbd className="px-2 py-1 bg-gray-100 rounded-lg text-gray-600 shadow-inner">ESC</kbd>
                      )}
                      {i < arr.length - 1 ? arr[i+1] : ''}
                    </span>
                  ))}
                </motion.p>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      
      {/* Small Image Modal with Neon Frame */}
      <AnimatePresence>
        {isImageOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-60 flex items-center justify-center bg-black/30"
            onClick={() => setIsImageOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative mx-4 max-w-xs sm:max-w-sm w-full"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Neon frame - made smaller */}
              <motion.div
                className="absolute -inset-0.5 rounded-lg blur-md bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 opacity-70 z-0"
                animate={{ 
                  opacity: [0.5, 0.8, 0.5],
                  rotate: [0, 1, 0]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              
              <div className="relative z-10 bg-white p-1.5 rounded-lg">
                <Image
                  src="/segni-pic2.jpg"
                  alt="Surafel Binalfew"
                  width={400}
                  height={400}
                  className="w-full h-auto rounded-md object-cover"
                />
                
                <button
                  onClick={() => setIsImageOpen(false)}
                  aria-label="Close image"
                  className="absolute -top-3 -right-3 p-1.5 rounded-full bg-white text-gray-700 border border-gray-300 shadow-md hover:shadow-lg transition-shadow"
                >
                  ×
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;