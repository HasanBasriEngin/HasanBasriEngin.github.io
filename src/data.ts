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
  avatar: "/avatar.jpg", // drop your photo at public/avatar.jpg — falls back to initials
  role: {
    en: "Software Engineering student — Cybersecurity & Software Development",
    tr: "Yazılım Mühendisliği öğrencisi — Siber Güvenlik & Yazılım Geliştirme",
  } satisfies Bilingual,
  university: {
    en: "Ankara Science University · 4th year",
    tr: "Ankara Bilim Üniversitesi · 4. sınıf",
  } satisfies Bilingual,
  focus: {
    en: "Blue Team · Security Automation",
    tr: "Blue Team · Güvenlik Otomasyonu",
  } satisfies Bilingual,
  bio: {
    en: "I focus on network security, blue team operations, secure systems and security automation — digging into how protocols actually work and building tooling around them. Alongside that I ship full-stack web apps with React, TypeScript and modern backends.",
    tr: "Ağ güvenliği, blue team operasyonları, güvenli sistemler ve güvenlik otomasyonu üzerine çalışıyorum — protokollerin gerçekte nasıl çalıştığını inceleyip bunların etrafında araçlar geliştiriyorum. Bununla birlikte React, TypeScript ve modern backend'lerle full-stack web uygulamaları geliştiriyorum.",
  } satisfies Bilingual,
  available: {
    en: "Open to collaborations",
    tr: "İş birliğine açık",
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
      tr: "3D baskı ürünleri için modern bir e-ticaret platformu; dinamik ürün yönetimi, kimlik doğrulama ve yönetici paneli.",
    },
    tags: ["React", "TypeScript", "Supabase", "Tailwind CSS"],
    href: "https://github.com/HasanBasriEngin/printshop-ecommerce-web-site",
  },
  {
    name: "OmniSpeech",
    desc: {
      en: "A hybrid DSP + deep-learning framework for multi-dimensional speech transformation: emotion conversion, voice cloning, gender/age morphing and singing-voice synthesis.",
      tr: "Çok boyutlu ses dönüşümü için hibrit DSP + derin öğrenme çatısı: duygu dönüşümü, ses klonlama, cinsiyet/yaş morphing ve şarkı sesi sentezi.",
    },
    tags: ["Python", "PyTorch", "DSP", "Deep Learning"],
    href: "https://github.com/HasanBasriEngin/OmniSpeech-A-Hybrid-DSP-Voice-Transformation",
  },
  {
    name: "Automated Assessment Website",
    desc: {
      en: "A web platform for creating and running automated assessments and grading.",
      tr: "Otomatik değerlendirme ve notlandırma oluşturup çalıştırmak için bir web platformu.",
    },
    tags: ["TypeScript", "React", "Node.js"],
    href: "https://github.com/HasanBasriEngin/Automated-Assessment-Website",
  },
  {
    name: "Travel Planner",
    desc: {
      en: "A Java Swing travel planner built around classic design patterns — Singleton, Strategy, Iterator, Observer and Decorator.",
      tr: "Klasik tasarım kalıpları üzerine kurulu Java Swing seyahat planlayıcı — Singleton, Strategy, Iterator, Observer ve Decorator.",
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
