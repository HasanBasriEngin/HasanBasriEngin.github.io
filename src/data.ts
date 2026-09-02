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
    tr: "Yazılım Mühendisliği öğrencisi — Siber Güvenlik & Yazılım Geliştirme",
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
    en: "On the security side I've moved toward SOC work — log monitoring, alert analysis, threat detection and incident response — learning how attacks show up in real data and how to spot them early. As a software engineering student I also build projects end to end, from backend services and APIs to the frontend on top.",
    tr: "Güvenlik tarafında SOC işlerine yöneldim — log izleme, alarm analizi, tehdit tespiti ve olay müdahalesi. Saldırıların gerçek veride nasıl göründüğünü ve erkenden nasıl fark edileceğini öğreniyorum. Yazılım mühendisliği öğrencisi olarak projeleri baştan sona geliştiriyorum: backend servisleri ve API'lerden üstteki frontend arayüze kadar.",
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
