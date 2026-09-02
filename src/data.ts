export type Lang = "en" | "tr";

export interface Bilingual {
  en: string;
  tr: string;
}

export interface Project {
  name: string;
  desc: Bilingual;
  tags: string[];
  href: string;
  demo?: string;
}

export const SITE_URL = "https://hasanbasriengin.github.io/";

export const profile = {
  name: "Hasan Basri Engin",
  // Pulled live from the GitHub profile. To pin a local copy instead, drop a
  // file at public/avatar.jpg and set this back to "/avatar.jpg".
  avatar: "https://github.com/HasanBasriEngin.png?size=240",
  role: {
    en: "Software Engineering student — Cybersecurity & Software Development",
    tr: "Yazılım Mühendisliği öğrencisi — Siber Güvenlik ve Yazılım Geliştirme",
  } satisfies Bilingual,
  university: {
    en: "Ankara Science University · 4th year",
    tr: "Ankara Bilim Üniversitesi · 4. sınıf",
  } satisfies Bilingual,
  focus: {
    en: "SOC · Blue Team",
    tr: "SOC · Blue Team",
  } satisfies Bilingual,
  bio: {
    en: "A software engineering student working in cybersecurity, mainly on the SOC side. I also build full-stack applications end to end, from backend services and APIs to the frontend layer. I am currently preparing for the HTB Certified Defensive Security Analyst (CDSA) and CCNA certifications.",
    tr: "Siber güvenlikle ilgilenen bir yazılım mühendisliği öğrencisiyim; özellikle SOC tarafına odaklanıyorum. Aynı zamanda hem sunucu (API) hem de arayüz tarafında uçtan uca web uygulamaları geliştiriyorum. Şu anda HTB Certified Defensive Security Analyst (CDSA) ve CCNA sertifikaları için çalışıyorum.",
  } satisfies Bilingual,
};

export const socials = [
  {
    label: "GitHub",
    href: "https://github.com/HasanBasriEngin",
    icon: "github" as const,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/hasan-basri-engin-732060276/",
    icon: "linkedin" as const,
  },
  {
    label: "Hack The Box",
    href: "https://profile.hackthebox.com/profile/019fa249-02c8-70af-b61b-51e1c9e1d1a3",
    icon: "htb" as const,
  },
];

// First 3 are the featured / current projects, shown at the top.
export const projects: Project[] = [
  {
    name: "PrintShop",
    desc: {
      en: "A modern e-commerce platform for 3D-printed products, with dynamic product management, auth and an admin panel.",
      tr: "3D baskı ürünleri satan modern bir e-ticaret platformu; dinamik ürün yönetimi, kimlik doğrulama ve yönetici paneli içeriyor.",
    },
    tags: ["React", "TypeScript", "Supabase", "Tailwind CSS"],
    href: "https://github.com/HasanBasriEngin/printshop-ecommerce-web-site",
  },
  {
    name: "OmniSpeech",
    desc: {
      en: "A hybrid DSP + deep-learning framework for multi-dimensional speech transformation: emotion conversion, voice cloning and gender/age morphing.",
      tr: "DSP ve derin öğrenmeyi birlikte kullanan bir ses dönüştürme altyapısı: duygu aktarımı, ses klonlama, cinsiyet ve yaş değiştirme.",
    },
    tags: ["Python", "PyTorch", "DSP", "Deep Learning"],
    href: "https://github.com/HasanBasriEngin/OmniSpeech-A-Hybrid-DSP-Voice-Transformation",
  },
  {
    name: "Automated Assessment Website",
    desc: {
      en: "An AI-based feedback system for English language learning that evaluates learner submissions and returns automated, targeted feedback.",
      tr: "İngilizce öğrenimi için yapay zeka tabanlı bir geri bildirim sistemi; öğrencilerin çalışmalarını değerlendirip otomatik ve ayrıntılı geri bildirim veriyor.",
    },
    tags: ["TypeScript", "React", "Node.js", "Gemini 2.5 Flash", "Groq API"],
    href: "https://github.com/HasanBasriEngin/Automated-Assessment-Website",
  },
  {
    name: "Travel Planner",
    desc: {
      en: "A Java Swing travel planner built around classic design patterns — Singleton, Strategy, Iterator, Observer and Decorator.",
      tr: "Klasik tasarım kalıplarıyla geliştirilmiş bir Java Swing seyahat planlayıcısı — Singleton, Strategy, Iterator, Observer ve Decorator.",
    },
    tags: ["Java", "Swing", "Design Patterns"],
    href: "https://github.com/HasanBasriEngin/travel-planner",
  },
];

export const skillGroups: { title: Bilingual; items: string[] }[] = [
  {
    title: { en: "Languages", tr: "Diller" },
    items: ["C#", "C++", "Java", "Python", "JavaScript", "TypeScript", "Kotlin", "PHP", "SQL"],
  },
  {
    title: { en: "Web & App", tr: "Web & Uygulama" },
    items: [".NET", "Node.js", "Next.js", "React", "Tailwind CSS", "Vite"],
  },
  {
    title: { en: "Security", tr: "Güvenlik" },
    items: ["Kali Linux", "Wireshark", "Burp Suite", "Metasploit", "OWASP"],
  },
  {
    title: { en: "Data & ML", tr: "Veri & ML" },
    items: ["NumPy", "Pandas", "PyTorch", "TensorFlow", "scikit-learn", "SciPy"],
  },
  {
    title: { en: "Infra & Tools", tr: "Altyapı & Araçlar" },
    items: ["Linux", "Git", "GitLab", "VMware", "PostgreSQL", "SQL Server", "Firebase", "Supabase", "Apache", "Vercel", "Raspberry Pi"],
  },
];
