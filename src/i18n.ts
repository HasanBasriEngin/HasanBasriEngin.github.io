import type { Lang } from "./data";

export const ui = {
  en: {
    sectionAbout: "About",
    sectionProjects: "Projects",
    sectionSkills: "Skills & Tools",
    projectsCurrent: "Current work",
    moreOnGithub: "All repositories on GitHub",
    viewRepo: "View repository",
    footerNote: "Built with React, Vite & Motion.",
    scanToShare: "Scan to open this page",
    sendEmail: "Send email",
    langName: "English",
  },
  tr: {
    sectionAbout: "Hakkımda",
    sectionProjects: "Projeler",
    sectionSkills: "Yetenekler ve Araçlar",
    projectsCurrent: "Güncel çalışmalar",
    moreOnGithub: "GitHub'daki tüm repolar",
    viewRepo: "Repoyu aç",
    footerNote: "React, Vite ve Motion ile geliştirildi.",
    scanToShare: "Bu sayfayı açmak için tarat",
    sendEmail: "Mail gönder",
    langName: "Türkçe",
  },
} satisfies Record<Lang, Record<string, string>>;

export type UIKey = keyof (typeof ui)["en"];
