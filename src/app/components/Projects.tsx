"use client";

import { useRef, useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
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
const projects: Project[] = [
  {
    title: "Zure Addiss",
    dates: "july 2025 - Current",
    description: `
    Zure Addis is a digital marketing and creative agency based in Addis Ababa, Ethiopia. It focuses on helping businesses grow their brand online through services like digital strategy, social media marketing, content creation, branding, and design. The company positions itself as a modern marketing partner that builds engaging, audience-focused campaigns and visual identities tailored to local and global markets.
    `,
    tags: ["HTML","CSS", "Javascript", "Bootstrap", ],
    video: "/12.mp4",
    website: "",
    source: "https://github.com/surafelgk"
  },
  {
    title: "Netflix Clone",
    dates: "Nov 2025",
    description: `
**Netflix Clone – First Project**
This is my **first web development project**, where I built a Netflix-style interface to learn the basics of **HTML, CSS, and JavaScript**. The project helped me understand website layout, styling, and responsive design.
`,
    tags: [
      "Next.js",
      "React",
      "CSS",
      "Javascript",
      
    ],
    video: "/13.mp4",
    website: "",
    source: "https://github.com/surafelgk",
  },
  {
    title: "Color Picker",
    dates: "Nov  2025 ",
    description: `
   **Color Picker – Simple Website**

A simple beginner project that lets users **select and generate colors** using a color picker and displays the **selected color code in real time**.
 `,
    tags: ["Html", "javascript", "css", "Bootstrap", ],
    video: "/14.mp4",
    source: "https://github.com/Surafelgk/Color-Picker-web-page"
  },
  {
    title: "Video Editing /Graphics design",
    dates: "Sep 2024 –present",
    description: `
   Graphics design focuses on creating visual content like logos, posters, and social media designs, while video editing involves enhancing and arranging videos. Finished designs and videos are stored and shared securely using Telegram for easy access and backup.`,
    tags: [
      "DavinciResolve",
      "Adobe premiere pro",
     "Aftereffect",
      "Capcut",
      "Canva",
      
    ],
    video: "/15.mp4",
    source: "https://t.me/Portfoliosura",
  },
//   {
//     title: "The Chefs Laundry Android Game",
//     dates: "Jan 2024 – April 2024",
//     description: `
//      Driven by a passion for cooking, I developed a restaurant management Android game that challenges players’ food prep, time management, and decision-making skills.`,
//     tags: ["Android Studio", "Kotlin", "XML", "Gradle"],
//     video: "/chef_laundry.mp4",
//     source: "https://github.com/Segnit11/The-Chefs-Laundry-Android-Mobile-App.git",
//   },
//   {
//     title: "Newroz Kebab Restaurant Website",
//     dates: "Sep 2023 - Dec 2023",
//     description: `
//     Team-based project (~65 hours) to build a responsive website for a local restaurant. Increased online engagement by attracting 50+ new customers monthly and reduced order processing time by 30%. Included a reservation system with admin controls, user login, and email notifications.
//     `,
//     tags: [
//       "PHP",
//       "SQL",
//       "HTML",
//       "CSS",
//       "JavaScript",
//       "Responsive Design"
//     ],
//     video: "/nrk.mp4",
//     source: "https://github.com/Segnit11/NewRoz_Kebab_Website"
//   },
//   {
//     title: "CSS Website",
//     dates: "Aug 2023 - Sep 2023",
//     description:
//       "Led the launch of the Computer Science Society’s website, implementing a CI/CD pipeline for seamless and automated deployment.",
//     tags: ["React", "Next.js", "Chakra UI", "Email JS", "MySQL"],
//     video: "/css-website.mp4",
//     website: "https://css-website-staging.vercel.app/",
//     source: "https://github.com/Segnit11/Computer-Science-Society-Website",
//   },
//   {
//     title: "Interactive Physics Quiz App",
//     dates: "Sep 2021 – Dec 2021",
//     description:
//       "A Windows App that simulates a creative quiz using Java and an interactive GUI on NetBeans by utilizing Adobe Photo-shop with an aim to make learning physics more interactive and engaging for middle school students.",
//     tags: ["Java", "NetBeans", "JFrame", "Swing GUI"],
//     video: "/interactive_physics.mp4",
//     source: "https://github.com/Segnit11/Interactive-Physics.git",
//   }
// ];
];

export default function Projects() {
  const { t } = useLanguage();
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);
  const [isPlaying, setIsPlaying] = useState<boolean[]>(projects.map(() => false));

  // Play a specific video when user clicks the overlay play button
  const handlePlay = (index: number) => {
    const v = videoRefs.current[index];
    if (!v) return;
    // ensure playsinline for mobile
    v.setAttribute("playsinline", "");
    v.setAttribute("webkit-playsinline", "");
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

  return (
    <>

      <section id="projects">
        <h2 className="text-xl font-bold mb-6">{t.headings.projects}</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {projects.map((project, index) => (
            <div
              key={index}
              className="rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition duration-300 bg-white"
            >
              {project.image && (
                <Image
                  src={project.image}
                  alt={project.title}
                  width={600}
                  height={400}
                  className="rounded-t-xl w-full h-auto object-cover"
                  sizes="(max-width: 640px) 100vw, 50vw"
                  loading="lazy"
                />
              )}
              {project.video && (
                <div className="relative">
                  <video
                    ref={(el) => { videoRefs.current[index] = el }}
                    src={project.video}
                    className="rounded-t-xl w-full h-auto object-cover"
                    playsInline
                    loop
                    preload="metadata"
                    poster={project.image}
                    style={{ backgroundColor: "#000" }}
                    controls={isPlaying[index]}
                  />

                  {!isPlaying[index] && (
                    <button
                      onClick={() => handlePlay(index)}
                      aria-label={`Play ${project.title}`}
                      className="absolute inset-0 flex items-center justify-center rounded-t-xl bg-black/30"
                    >
                      <div className="w-14 h-14 bg-white/95 rounded-full flex items-center justify-center shadow-lg">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M8 5v14l11-7L8 5z" fill="#000" />
                        </svg>
                      </div>
                    </button>
                  )}
                </div>
              )}
          <div className="p-4">
              <h3 className="text-lg font-semibold">{project.title}</h3>
              <p className="text-xs text-gray-500">{project.dates}</p>

              <p className="mt-2 text-sm text-gray-700">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-1 mt-3">
                {project.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="bg-gray-100 text-xs text-gray-800 px-2 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex gap-2 mt-4 text-xs">
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 px-2 py-1 border rounded-full hover:bg-gray-100 transition"
                  >
                    <FaYoutube className="text-sm" /> Demo
                  </a>
                )}
                {project.website && (
                  <a
                    href={project.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 px-2 py-1 border rounded-full hover:bg-gray-100 transition"
                  >
                    <FaGlobe className="text-sm" /> Website
                  </a>
                )}
                {project.source && (
                  <a
                    href={project.source}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 px-2 py-1 border rounded-full hover:bg-gray-100 transition"
                  >
                    {project.source.includes("t.me") ? (
                      <FaTelegramPlane className="text-sm" />
                    ) : (
                      <FaGithub className="text-sm" />
                    )} Source
                  </a>
                )}
                {project.frontend_source && (
                  <a
                    href={project.frontend_source}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 px-2 py-1 border rounded-full hover:bg-gray-100 transition"
                  >
                    <FaGithub className="text-sm" /> Front-End
                  </a>
                )}
                {project.backend_source && (
                  <a
                    href={project.backend_source}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 px-2 py-1 border rounded-full hover:bg-gray-100 transition"
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
    </>
  );
}
