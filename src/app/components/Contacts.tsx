"use client";

import { FaEnvelope, FaGithub, FaLinkedin, FaTelegramPlane, FaPhone } from "react-icons/fa";
import { useLanguage } from "../../context/LanguageContext";

export default function Contact() {
  const { t } = useLanguage();
  return (
    <>
    <section id="contacts" className="mt-8 mb-8">
      <h2 className="text-xl font-bold mb-4">{t.headings.contacts}</h2>
      <p className="text-sm text-gray-600 mb-4">{t.getInTouch}</p>

      <ul className="space-y-3 text-sm">
        <li className="flex items-center gap-2">
          <FaEnvelope className="text-[#D44638] text-xl" />
          <a href="mailto:surafelgk@gmail.com" className="text-blue-500 underline">
            surafelgk@gmail.com
          </a>
        </li>

        <li className="flex items-center gap-2">
          <FaPhone className="text-[#10B981] text-xl" />
          <a href="tel:+251947510525" className="text-blue-500 underline">
            +251 94 751 0525
          </a>
        </li>

        <li className="flex items-center gap-2">
          <FaLinkedin className="text-[#0A66C2] text-xl" />
          <a
            href="https://www.linkedin.com/in/surafelbinalfew/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            Surafel Binalfew
          </a>
        </li>

        <li className="flex items-center gap-2">
          <FaTelegramPlane className="text-[#0088cc] text-xl" />
          <a
            href="https://t.me/surafel_gk"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            surafel_gk
          </a>
        </li>

        <li className="flex items-center gap-2">
          <FaGithub className="text-[#181717] text-xl" />
          <a
            href="https://github.com/Surafelgk/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            Surafelgk
          </a>
        </li>
      </ul>
    </section>
    </>
  );
}
