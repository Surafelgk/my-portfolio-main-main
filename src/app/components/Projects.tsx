"use client";

import { useRef, useState } from "react";
import { FaGlobe, FaGithub, FaYoutube, FaTelegramPlane } from "react-icons/fa";
import Image from "next/image";

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

// Static translations since language context is removed
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
  const [isPlaying, setIsPlaying] = useState<boolean[]>(projects.map(() => false));

  // Play a specific video when user clicks the overlay play button
  const handlePlay = (index: number) => {
    const v = videoRefs.current[index];
    if (!v) return;
    
    // Ensure playsinline for mobile and mute the video
    v.setAttribute("playsinline", "");
    v.setAttribute("webkit-playsinline", "");
    v.muted = true; // Mute the video
    
    const p = v.play();
    if (p && typeof p.then === "function") {
      p.then(() => {
        setIsPlaying((prev) => {
          const copy = [...prev];
          copy[index] = true;
          return copy;
        });
      }).catch(() => {
        // Still mark as playing to show controls even if autoplay failed
        setIsPlaying((prev) => {
          const copy = [...prev];
          copy[index] = true;
          return copy;
        });
      });
    } else {
      setIsPlaying((prev) => {
        const copy = [...prev];
        copy[index] = true;
        return copy;
      });
    }
  };

  // Pause a specific video
  const handlePause = (index: number) => {
    const v = videoRefs.current[index];
    if (!v) return;
    v.pause();
    setIsPlaying((prev) => {
      const copy = [...prev];
      copy[index] = false;
      return copy;
    });
  };

  return (
    <section id="projects">
      <h2 className="text-xl font-bold mb-6">{staticTranslations.headings.projects}</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {projects.map((project, index) => (
          <div
            key={index}
            className="rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition duration-300 bg-white overflow-hidden"
          >
            {/* Video Section */}
            {project.video && (
              <div className="relative">
                <video
                  ref={(el) => { videoRefs.current[index] = el }}
                  src={project.video}
                  className="rounded-t-xl w-full h-48 sm:h-56 object-cover"
                  playsInline
                  loop
                  muted // Muted by default
                  preload="metadata"
                  poster={project.image}
                  style={{ backgroundColor: "#000" }}
                  controls={isPlaying[index]}
                  onClick={() => isPlaying[index] ? handlePause(index) : handlePlay(index)}
                />

                {/* Custom Play/Pause Overlay */}
                {!isPlaying[index] ? (
                  <button
                    onClick={() => handlePlay(index)}
                    aria-label={`Play ${project.title} (muted)`}
                    className="absolute inset-0 flex items-center justify-center rounded-t-xl bg-black/40 hover:bg-black/50 transition-all duration-200"
                  >
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-14 h-14 bg-white/95 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M8 5v14l11-7L8 5z" fill="#000" />
                        </svg>
                      </div>
                      <span className="text-xs text-white bg-black/50 px-2 py-1 rounded-full">
                        Muted • Click to play
                      </span>
                    </div>
                  </button>
                ) : (
                  <button
                    onClick={() => handlePause(index)}
                    aria-label={`Pause ${project.title}`}
                    className="absolute inset-0 flex items-center justify-center rounded-t-xl bg-black/20 hover:bg-black/30 transition-all duration-200 opacity-0 hover:opacity-100"
                  >
                    <div className="w-14 h-14 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" fill="#000" />
                      </svg>
                    </div>
                  </button>
                )}

                {/* Muted Indicator */}
                {isPlaying[index] && (
                  <div className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
                    </svg>
                    <span>Muted</span>
                  </div>
                )}
              </div>
            )}

            {/* Project Details */}
            <div className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold">{project.title}</h3>
                  <p className="text-xs text-gray-500 mt-1">{project.dates}</p>
                </div>
                {isPlaying[index] && (
                  <button
                    onClick={() => handlePause(index)}
                    className="text-xs text-gray-500 hover:text-gray-700 px-2 py-1 rounded-full border border-gray-300 hover:border-gray-400 transition-colors"
                    aria-label="Stop video"
                  >
                    Stop Video
                  </button>
                )}
              </div>

              <p className="mt-3 text-sm text-gray-700 whitespace-pre-line">
                {project.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mt-3">
                {project.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="bg-gray-100 text-xs text-gray-800 px-2.5 py-1 rounded-full border border-gray-200"
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
                    className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-300 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    <FaYoutube className="text-sm" /> Demo
                  </a>
                )}
                {project.website && (
                  <a
                    href={project.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-300 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    <FaGlobe className="text-sm" /> Website
                  </a>
                )}
                {project.source && (
                  <a
                    href={project.source}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-300 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    {project.source.includes("t.me") ? (
                      <FaTelegramPlane className="text-sm" />
                    ) : (
                      <FaGithub className="text-sm" />
                    )}{" "}
                    {project.source.includes("t.me") ? "Telegram" : "Source"}
                  </a>
                )}
                {project.frontend_source && (
                  <a
                    href={project.frontend_source}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-300 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    <FaGithub className="text-sm" /> Front-End
                  </a>
                )}
                {project.backend_source && (
                  <a
                    href={project.backend_source}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-300 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    <FaGithub className="text-sm" /> Back-End
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}