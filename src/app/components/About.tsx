import {
  FileText,
  Mail,
  Linkedin,
  Github,
  Instagram,
} from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { FaTelegramPlane } from "react-icons/fa";

const socials = [
  {
    name: "Resume",
    href: "https://docs.google.com/document/d/1gHW8rsWNV2bzkkkkL_nwGwe-41yTfNqX4rC20nije7IVX8/edit?usp=sharing",
    icon: <FileText size={32} className="text-[#2563eb] group-hover:text-[#1e40af] transition-colors duration-300" />,
  },
  {
    name: "Telegram",
    href: "https://t.me/surafel_gk",
    icon: <FaTelegramPlane size={32} className="text-[#0088cc] group-hover:text-[#0077b6] transition-colors duration-300" />,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/surafelbinalfew",
    icon: <Linkedin size={32} className="text-[#0A66C2] group-hover:text-[#084b87] transition-colors duration-300" />,
  },
  {
    name: "GitHub",
    href: "https://github.com/surafelgk",
    icon: <Github size={32} className="text-[#181717] group-hover:text-[#0f0f0f] transition-colors duration-300" />,
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/surafel__gk/",
    icon: <Instagram size={32} className="text-[#E1306C] group-hover:text-[#C13584] transition-colors duration-300" />,
  },
];

export default function About() {
  const { t } = useLanguage();
  return (
    <section id="about" className="mb-8">
      <h2 className="text-xl font-bold text-foreground">{t.headings.about}</h2>

      {/* about me */}
      <p className="text-sm mt-2 text-muted">
      -A Computer Science graduate combining web development, marketing, video editing, and design to create high impact brand experiences.
      </p>

      {/* Education */}
      <p className="text-sm mt-2 text-muted"> 
       - B.S. Computer Science graduate from <b> Unity University </b> with a strong self taught background in <b>Dgital Marketing Specialist</b> and{" "}
        <b>video editor/ Graphics Designer</b> 
      </p>

      {/* Involvement */}
      <p className="text-sm mt-2 text-muted">
       -Outside of coding, I love working out, playing Chess, Cinematography, and recently getting into 3D motion videos.
      </p>

      {/* Socials */}
      <div className="mt-8 flex flex-wrap gap-10">
        {socials.map(({ name, href, icon }) => (
          <a
            key={name}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center space-y-0.5 transition-transform duration-300 hover:-translate-y-1"
          >
            <div className="p-4 rounded-full border border-gray-300 dark:border-white/20 group-hover:animate-bounceOnce">
              {icon}
            </div>
            <span className="text-base font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-muted">
              {name}
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
