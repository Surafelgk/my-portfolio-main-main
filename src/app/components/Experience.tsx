"use client";

import { useState } from "react";
import Image from "next/image";
import { useLanguage } from "../../context/LanguageContext";
import { ChevronDown, ChevronRight } from "lucide-react";

export default function Experience() {
  const { t } = useLanguage();
  const [openSet, setOpenSet] = useState<Set<number>>(new Set());

  const experiences = [
    {
      role: "Video Editor & Brand Designer",
      company: "Zureaddis Digital Marketing",
      image: "/zureaddis-logo.png",
      duration: "july 2025 – Present",
      summary:
        "Providing comprehensive creative services including video editing, brand design, and digital content creation for diverse clients.",
      bullets: [
        "Edited and produced promotional videos, social media content, and corporate presentations using Adobe Premiere Pro and After Effects.",
        "Designed complete brand identities including logos, color palettes, typography systems, and brand guidelines for startups and small businesses.",
        "Created motion graphics and animated explainer videos that increased client engagement by 40% on social media platforms.",
        "Developed responsive website designs and UI/UX mockups using Figma and Adobe XD, ensuring brand consistency across digital touchpoints.",
        "Managed client projects from concept to delivery, including storyboarding, asset creation, and final output optimization for various platforms."
      ],
      tech: [
        "Adobe Premiere Pro",
        "Adobe After Effects",
        "Adobe Photoshop",
        "Adobe Illustrator",
        "Figma",
        "DaVinci Resolve",
        "Canva"
      ],
      projects: [
        { name: "Client Portfolio Website", url: "https://zureaddis.com/" },
        { name: "Brand Identity Packages", url: "https://zureaddis.com/" }
      ]
    },
    {
      role: "Web developer",
      company: "Zureaddis Digital Marketing",
      image: "/zureaddis-logo.png",
      duration: "july 2025 – Aug 2025",
      summary:
        "web developer zuraddiss Digital marketing agency",
      bullets: [
        "Developed responsive web sites using modern frameworks and technologies.",
        "Optimized website performance and ensured cross-browser compatibility.",
        "Collaborated with design teams to implement UI components.",
        "Maintained and updated existing codebase with bug fixes and feature enhancements."
      ],
      tech: [
        "HTML/CSS",
        "JavaScript",
        "Bootstrap",
        "Git"
      ],
      projects: [
        { name: "https://zureaddis.com/", url: "https://zureaddis.com/" },
      ]
    },
    {
      role: "Freelance",
      company: "Freelance video editor and Graphics Designer",
      image: "/men.png",
      duration: "sep 2025 – present",
      summary:
        "Fast, reliable editing for your projects. Expert in cuts, color, motion graphics. Let's bring your vision to life.",
      bullets: [
        "Fast, efficient editing to meet tight deadlines.",
        "Specializes in social media clips, ads, and YouTube content.",
        "Clean, modern cuts that keep viewers engaged.",
      ],
      tech: [
        "Davinci Resolve", 
        "Adobe premium pro", 
        "Adobe Photoshop", 
        "Adobe After effect", 
      ],
      projects: [
        { name: "Portfolio", url: "https://t.me/Portfoliosura" }
      ]
    },
    {
      role: "Social Media Manager & Video Editor",
      company: "Lavoca Company",
      image: "/lavoca.jpg", // You'll need to add this image
      duration: "Present",
      summary:
        "Managing social media presence and creating engaging video content for Lavoca Company's brand identity and marketing campaigns.",
      bullets: [
        "Create and edit engaging video content for social media platforms including Instagram, TikTok, and LinkedIn.",
        "Develop and execute social media strategies to increase brand awareness and engagement.",
        "Film and photograph company events, products, and behind-the-scenes content as a videographer.",
        "Manage content calendars and schedule posts across multiple platforms.",
        "Analyze social media metrics and adjust strategies to optimize performance.",
        "Collaborate with marketing team to ensure brand consistency across all visual content."
      ],
      tech: [
        "Adobe Premiere Pro",
        "DaVinci Resolve",
        "Adobe Photoshop",
        "Social Media Management",
        "Videography",
        "Content Strategy",
        "Analytics Tools"
      ],
      projects: [
        { name: "Lavoca Social Portfolio", url: "https://www.instagram.com/lavoca/" }
      ]
    },
    {
      role: "Video Editor & Videographer",
      company: "Letarik Interior",
      image: "/logo 3.png",
      duration: "Present",
      summary:
        "Professional videography and video editing services for letarik interior promotional and corporate content needs.",
      bullets: [
        "Shoot and edit high-quality promotional videos for products and services.",
        "Operate professional camera equipment, lighting, and audio gear during on-location and studio shoots.",
        "Produce customer testimonial videos, product demonstrations, and corporate interviews.",
        "Apply color grading, sound design, and motion graphics to enhance video quality.",
        "Manage video assets and maintain organized project files for easy access and reuse.",
        "Collaborate with creative directors to storyboard and plan video productions."
      ],
      tech: [
        "DaVinci Resolve",
        "Adobe Premiere Pro",
        "Adobe After Effects",
        "Sony Cameras",
        "Lighting Equipment",
        "Audio Recording",
        "Motion Graphics"
      ],
      projects: [
        { name: "Letarik interior Video Portfolio", url: "https://www.lavoca.com/videos" }
      ]
    }
  ];
  
  const toggle = (i: number) => {
    setOpenSet((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(i)) {
        newSet.delete(i);
      } else {
        newSet.add(i);
      }
      return newSet;
    });
  };

  const handleProjectClick = (proj: { name: string; url?: string }) => {
    if (proj.url) {
      window.open(proj.url, "_blank", "noopener,noreferrer");
      return;
    }
    window.alert("Internal engineering application — link not available.");
  };

  const pillClass =
  "inline-flex items-center rounded-full px-2 py-[2px] text-[10px] uppercase tracking-wide " +
  "bg-gray-100 text-black border border-transparent transition-colors duration-200 " +
  "hover:border-green-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-400/60 " +
  "dark:bg-gray-200 dark:text-gray-900";

  return (
    <section id="experience" className="mb-6">
      <h2 className="text-xl font-bold mb-4">{t.headings.experience}</h2>
      <div>
        {experiences.map((exp, i) => {
          const isOpen = openSet.has(i);

          return (
            <div
              key={i}
              className="border-b border-gray-300 pb-4 transition-all duration-300 animate-fadeIn "
            >
              <button
                onClick={() => toggle(i)}
                className="group w-full text-left flex flex-col mt-2"
              >
                {/* Top row: logo + info left, duration right */}
                <div className="flex items-start justify-between w-full">
                  {/* Left: Logo + Company/Role */}
                  <div className="flex items-center space-x-4">
                    {/* Logo */}
                    <Image
                      src={exp.image}
                      alt={`${exp.company} logo`}
                      width={40}
                      height={40}
                      className="w-10 h-10 object-contain bg-white p-1 rounded-md"
                    />
                    {/* Text: Company + Role */}
                    <div>
                      <div className="flex flex-row">
                        <p className="font-semibold">{exp.company}</p>
                        <span className="ml-1 mt-1 text-black font-bold">
                          {isOpen ? (
                            <ChevronDown size={20} strokeWidth={3.5} />
                          ) : (
                            <ChevronRight size={20} strokeWidth={3.5} />
                          )}
                        </span>
                      </div>

                      <p className="text-sm text-gray-600">{exp.role}</p>
                    </div>
                  </div>

                  {/* Right: Duration */}
                  <div className="text-sm text-gray-500 whitespace-nowrap mt-1">
                    {exp.duration}
                  </div>
                </div>

                {/* Summary + Tags */}
                <p className="text-sm mt-2">{exp.summary}</p>

                <div className="mt-2 flex flex-wrap gap-2">
                  {exp.tech.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 text-gray-800 px-2 py-0.5 rounded-full text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </button>

              <div
                className={`transition-all duration-500 ease-in-out overflow-hidden ${
                  isOpen
                    ? "max-h-[500px] opacity-100 mt-4"
                    : "max-h-0 opacity-0"
                }`}
              >
                <ul className="list-disc pl-6 text-sm text-gray-700 space-y-1">
                  {exp.bullets.map((point, idx) => (
                    <li key={idx}>{point}</li>
                  ))}
                </ul>
                <div className="mt-2 text-sm flex flex-wrap gap-3 items-center">
                {exp.projects.map((proj, idx) =>
                  "url" in proj && proj.url ? (
                    <span key={idx} className="inline-flex items-center gap-2">
                      <a
                        href={proj.url}
                        target="_blank"
                        rel="noopener noreferrer external"
                        className="text-blue-600 underline hover:text-blue-800 transition-colors"
                        title="Opens in a new tab"
                      >
                        {proj.name}
                      </a>
                      <span className={pillClass} title="External App"> link</span>
                    </span>
                  ) : (
                    <span key={idx} className="inline-flex items-center gap-2">
                      <span className="text-gray-600">{proj.name}</span>
                      <span
                        className={pillClass}
                        title="Internal engineering application — link not available"
                      >
                        Internal App
                      </span>
                    </span>
                  )
                )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}