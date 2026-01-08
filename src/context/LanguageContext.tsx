"use client";

import React, { createContext, useContext, useState, useMemo } from "react";

type Lang = "en" | "am";

const translations = {
  en: {
    nav: {
      about: "About",
      experience: "Experience",
      projects: "Projects",
      contacts: "Contact",
    },
    headings: {
      heroName: "Surafel Binalfew",
      heroTitle: "Professional, Web Developer / Digital Marketing Specialist",
      heroIntro: "hey there, welcome to my portfolio :-). I am a passionate builder, creative problem solver, and lifelong learner.",
      about: "about me",
      projects: "projects",
      experience: "experience",
      contacts: "contact",
    },
    headerRole: "Web Developer & Digital Marketer",
    quickInfo: [
      "Based in Addis Ababa, Ethiopia",
      "Full-Stack Developer",
      "Digital Marketing Specialist",
      "Available for freelance projects",
    ],
    getInTouch: "Get In Touch",
    pressEsc: "Press ESC to close",
  },
  am: {
    nav: {
      about: "ስለ እኔ",
      experience: "ልምድ",
      projects: "ፕሮጀክቶች",
      contacts: "አገናኝ",
    },
      headings: {
        heroName: "ሱራፌል ቢናልፈው",
        heroTitle: "ሙያዊ፣ የድህረ-ድር እና ዲጂታል ማርኬቲንግ ስራዎች",
        heroIntro: "ሰላም፣ እንኳን ወደ ፖርቲፎሊዮዬ በደህና መጡ። እኔ ፈጣን እና ፈጣሪ ተግባራዊ ተጠናቀቀ ሰው ነኝ።",
        about: "ስለ እኔ",
        projects: "ፕሮጀክቶች",
        experience: "ልምድ",
        contacts: "አገናኝ",
      },
    headerRole: "የድህረ-ድር እና ዲጂታል አሰራር",
    quickInfo: [
      "ከአዲስ አበባ የተመነ",
      "Full-Stack አባል",
      "ዲጂታል ማርኬቲንግ ስራ",
      "ለፍሪላንስ እገኛ",
    ],
    getInTouch: "ያግኙኝ",
    pressEsc: "ESC ን ይጫኑ ለመዝጋት",
  },
};

type LanguageContextType = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: typeof translations["en"];
  translations: typeof translations;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [lang, setLang] = useState<Lang>(() => {
    try {
      if (typeof window !== "undefined") {
        const stored = window.localStorage.getItem("lang");
        if (stored === "en" || stored === "am") return stored as Lang;
      }
    } catch (e) {
      // ignore
    }
    return "en";
  });

  // Persist language and update document lang attribute
  React.useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        window.localStorage.setItem("lang", lang);
        document.documentElement.lang = lang === "en" ? "en" : "am";
      }
    } catch (e) {
      // ignore
    }
  }, [lang]);

  const value = useMemo(() => ({ lang, setLang, t: translations[lang], translations }), [lang]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
