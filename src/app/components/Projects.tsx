"use client";

import { useRef, useState, useEffect } from "react";
import { FaGlobe, FaGithub, FaYoutube, FaTelegramPlane } from "react-icons/fa";

interface Project {
  title: string;
  dates: string;
  description: string;
  tags: string[];
  image?: string;
  video?: string;
  website?: string;
  source?: string;
  backend_source?: string;
  frontend_source?: string;
  demo?: string;
}

const staticTranslations = {
  headings: {
    projects: "Projects"
  }
};

const projects: Project[] = [
  {
    title: "Zure Addiss",
    dates: "july 2025 - Current",
    description: `Zure Addis is a digital marketing and creative agency based in Addis Ababa, Ethiopia. It focuses on helping businesses grow their brand online through services like digital strategy, social media marketing, content creation, branding, and design. The company positions itself as a modern marketing partner that builds engaging, audience-focused campaigns and visual identities tailored to local and global markets.`,
    tags: ["HTML", "CSS", "Javascript", "Bootstrap"],
    video: "/12.mp4",
    website: "",
    source: "https://github.com/surafelgk"
  },
  {
    title: "Netflix Clone",
    dates: "Nov 2025",
    description: `Netflix Clone – First Project. This is my first web development project, where I built a Netflix-style interface to learn the basics of HTML, CSS, and JavaScript. The project helped me understand website layout, styling, and responsive design.`,
    tags: ["Next.js", "React", "CSS", "Javascript"],
    video: "/13.mp4",
    website: "",
    source: "https://github.com/surafelgk",
  },
  {
    title: "Color Picker",
    dates: "Nov 2025",
    description: `Color Picker – Simple Website. A simple beginner project that lets users select and generate colors using a color picker and displays the selected color code in real time.`,
    tags: ["Html", "javascript", "css", "Bootstrap"],
    video: "/14.mp4",
    source: "https://github.com/Surafelgk/Color-Picker-web-page"
  },
  {
    title: "Video Editing / Graphics design",
    dates: "Sep 2024 – present",
    description: `Graphics design focuses on creating visual content like logos, posters, and social media designs, while video editing involves enhancing and arranging videos. Finished designs and videos are stored and shared securely using Telegram for easy access and backup.`,
    tags: ["DavinciResolve", "Adobe premiere pro", "Aftereffect", "Capcut", "Canva"],
    video: "/15.mp4",
    source: "https://t.me/Portfoliosura",
  },
];

export default function Projects() {
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);
  const projectRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [isPlaying, setIsPlaying] = useState<boolean[]>(projects.map(() => false));
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const [currentlyPlaying, setCurrentlyPlaying] = useState<number | null>(null);

  // Track user interaction
  useEffect(() => {
    const handleInteraction = () => {
      if (!hasUserInteracted) {
        setHasUserInteracted(true);
        console.log("User interaction detected - autoplay enabled");
      }
    };

    // Listen for any interaction
    document.addEventListener('click', handleInteraction, { once: true });
    document.addEventListener('touchstart', handleInteraction, { once: true });
    document.addEventListener('scroll', handleInteraction, { once: true });

    return () => {
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('touchstart', handleInteraction);
      document.removeEventListener('scroll', handleInteraction);
    };
  }, [hasUserInteracted]);

  // Setup intersection observer for scroll-based autoplay
  useEffect(() => {
    if (!hasUserInteracted) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = parseInt(entry.target.getAttribute('data-index') || '0');
          
          if (entry.isIntersecting) {
            // 70% chance to play when video enters viewport
            if (Math.random() < 0.7 && !isPlaying[index]) {
              playVideo(index);
            }
          } else {
            // Pause when leaving viewport
            if (isPlaying[index]) {
              pauseVideo(index);
            }
          }
        });
      },
      {
        threshold: 0.4, // When 40% is visible
        rootMargin: '0px 0px -30px 0px'
      }
    );

    // Observe each project
    projectRefs.current.forEach((ref, index) => {
      if (ref) {
        ref.setAttribute('data-index', index.toString());
        observer.observe(ref);
      }
    });

    return () => {
      projectRefs.current.forEach(ref => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [hasUserInteracted, isPlaying]);

  // Play video function
  const playVideo = async (index: number) => {
    const video = videoRefs.current[index];
    if (!video) return;

    // Pause currently playing video
    if (currentlyPlaying !== null && currentlyPlaying !== index) {
      const currentVideo = videoRefs.current[currentlyPlaying];
      if (currentVideo) {
        currentVideo.pause();
        setIsPlaying(prev => {
          const newState = [...prev];
          newState[currentlyPlaying] = false;
          return newState;
        });
      }
    }

    // Set video properties
    video.muted = true;
    video.playsInline = true;
    video.loop = true;

    try {
      await video.play();
      setIsPlaying(prev => {
        const newState = [...prev];
        newState[index] = true;
        return newState;
      });
      setCurrentlyPlaying(index);
    } catch (error) {
      console.log(`Failed to autoplay video ${index}:`, error);
    }
  };

  // Pause video function
  const pauseVideo = (index: number) => {
    const video = videoRefs.current[index];
    if (!video) return;
    
    video.pause();
    setIsPlaying(prev => {
      const newState = [...prev];
      newState[index] = false;
      return newState;
    });
    
    if (currentlyPlaying === index) {
      setCurrentlyPlaying(null);
    }
  };

  // Handle video click - toggle play/pause
  const handleVideoClick = (index: number) => {
    if (!hasUserInteracted) {
      setHasUserInteracted(true);
    }

    if (isPlaying[index]) {
      pauseVideo(index);
    } else {
      playVideo(index);
    }
  };

  return (
    <section id="projects">
      <h2 className="text-xl font-bold mb-6">{staticTranslations.headings.projects}</h2>
      
      {/* Status Indicator */}
      <div className="mb-4">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-full border border-gray-300">
          <div className={`w-2 h-2 rounded-full ${hasUserInteracted ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
          <span className="text-sm text-gray-700">
            {hasUserInteracted ? 'Scroll to autoplay • Click video to control' : 'Interact with page to enable videos'}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {projects.map((project, index) => (
          <div
            key={index}
            ref={(el) => { projectRefs.current[index] = el }}
            data-index={index}
            className="rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 bg-white overflow-hidden group"
          >
            {/* Video Section */}
            {project.video && (
              <div className="relative overflow-hidden">
                <video
                  ref={(el) => { videoRefs.current[index] = el }}
                  src={project.video}
                  className="rounded-t-xl w-full h-48 sm:h-56 object-cover cursor-pointer"
                  onClick={() => handleVideoClick(index)}
                  muted
                  playsInline
                  loop
                  preload="metadata"
                  poster={project.image}
                  style={{ backgroundColor: "#000" }}
                />

                {/* Overlay with status indicators */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                  {/* Left side: Status indicators */}
                  <div className="flex items-center gap-2">
                    <div className="bg-black/80 text-white text-xs px-2.5 py-1 rounded-full backdrop-blur-sm flex items-center gap-1.5">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
                      </svg>
                      <span>Muted</span>
                    </div>
                    
                    {isPlaying[index] && (
                      <div className="bg-green-600/90 text-white text-xs px-2.5 py-1 rounded-full backdrop-blur-sm flex items-center gap-1.5 animate-pulse">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                        <span>Live</span>
                      </div>
                    )}
                  </div>

                  {/* Right side: Control hint */}
                  <div className="bg-black/50 text-white text-xs px-2.5 py-1 rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
                    Click to {isPlaying[index] ? 'pause' : 'play'}
                  </div>
                </div>

                {/* Top-right indicator */}
                {hasUserInteracted && !isPlaying[index] && (
                  <div className="absolute top-3 right-3 bg-purple-600/90 text-white text-xs px-2.5 py-1 rounded-full backdrop-blur-sm">
                    May autoplay
                  </div>
                )}
              </div>
            )}

            {/* Project Details */}
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{project.title}</h3>
                  <p className="text-xs text-gray-500 mt-1">{project.dates}</p>
                </div>
                {isPlaying[index] && (
                  <div className="flex items-center gap-1.5 text-green-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-xs font-medium">Playing</span>
                  </div>
                )}
              </div>

              <p className="mt-3 text-sm text-gray-700 whitespace-pre-line leading-relaxed">
                {project.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-3">
                {project.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="bg-gray-100 text-xs text-gray-800 px-3 py-1.5 rounded-full border border-gray-200 hover:bg-gray-200 transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Links */}
              <div className="flex flex-wrap gap-2 mt-4 text-xs">
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-4 py-2 border border-gray-300 rounded-full hover:bg-gray-100 hover:border-gray-400 transition-all duration-200"
                  >
                    <FaYoutube className="text-sm" /> Demo
                  </a>
                )}
                {project.website && (
                  <a
                    href={project.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-4 py-2 border border-gray-300 rounded-full hover:bg-gray-100 hover:border-gray-400 transition-all duration-200"
                  >
                    <FaGlobe className="text-sm" /> Website
                  </a>
                )}
                {project.source && (
                  <a
                    href={project.source}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-4 py-2 border border-gray-300 rounded-full hover:bg-gray-100 hover:border-gray-400 transition-all duration-200"
                  >
                    {project.source.includes("t.me") ? (
                      <FaTelegramPlane className="text-sm" />
                    ) : (
                      <FaGithub className="text-sm" />
                    )}
                    {project.source.includes("t.me") ? " Telegram" : " Source"}
                  </a>
                )}
                {project.frontend_source && (
                  <a
                    href={project.frontend_source}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-4 py-2 border border-gray-300 rounded-full hover:bg-gray-100 hover:border-gray-400 transition-all duration-200"
                  >
                    <FaGithub className="text-sm" /> Front-End
                  </a>
                )}
                {project.backend_source && (
                  <a
                    href={project.backend_source}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-4 py-2 border border-gray-300 rounded-full hover:bg-gray-100 hover:border-gray-400 transition-all duration-200"
                  >
                    <FaGithub className="text-sm" /> Back-End
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Note */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="text-center">
          <p className="text-xs text-gray-500">
            Videos are muted and may autoplay when scrolling. Click any video to control playback.
          </p>
        </div>
      </div>
    </section>
  );
}