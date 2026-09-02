import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { profile, socials, projects, skillGroups, type Lang } from "./data";
import { ui } from "./i18n";
import { Reveal } from "./components/Reveal";
import { LangSwitch } from "./components/LangSwitch";
import { TopoField } from "./components/TopoField";
import { Typewriter } from "./components/Typewriter";
import {
  GitHubIcon,
  LinkedInIcon,
  HtbIcon,
  MailIcon,
  ArrowIcon,
  UniIcon,
} from "./components/Icons";

const STORAGE_KEY = "hbe.lang";
const TW_KEY = "hbe.tw";

function getInitialLang(): Lang {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "en" || saved === "tr") return saved;
  } catch {
    /* localStorage unavailable */
  }
  if (typeof navigator !== "undefined" && navigator.language?.startsWith("tr")) {
    return "tr";
  }
  return "en";
}

const socialIcon = {
  github: GitHubIcon,
  linkedin: LinkedInIcon,
  htb: HtbIcon,
  mail: MailIcon,
} as const;

export default function App() {
  const [lang, setLangState] = useState<Lang>(getInitialLang);
  const [avatarOk, setAvatarOk] = useState(true);
  const reduce = useReducedMotion();

  // Run the teletype intro only the first time this tab loads the page
  // (and never when the visitor prefers reduced motion). Read the media
  // query directly — useReducedMotion() can report `true` on first render.
  const [twInstant, setTwInstant] = useState(() => {
    try {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
        return true;
      return sessionStorage.getItem(TW_KEY) === "1";
    } catch {
      return false;
    }
  });
  const finishIntro = () => {
    setTwInstant(true);
    try {
      sessionStorage.setItem(TW_KEY, "1");
    } catch {
      /* ignore */
    }
  };

  const t = ui[lang];

  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem(STORAGE_KEY, l);
    } catch {
      /* ignore */
    }
  };

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const initials = useMemo(
    () =>
      profile.name
        .split(" ")
        .slice(0, 2)
        .map((w) => w[0])
        .join(""),
    []
  );

  return (
    <>
      <TopoField />
      <LangSwitch lang={lang} setLang={setLang} />

      <main className="page">
        {/* ---------- hero ---------- */}
        <motion.header
          className="hero"
          initial={{ opacity: 0, y: reduce ? 0 : 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduce ? 0.2 : 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="avatar-wrap">
            {avatarOk ? (
              <img
                className="avatar"
                src={profile.avatar}
                alt={profile.name}
                width={84}
                height={84}
                onError={() => setAvatarOk(false)}
              />
            ) : (
              <div className="avatar-fallback" aria-label={profile.name}>
                {initials}
              </div>
            )}
          </div>

          <h1 className="name">{profile.name}</h1>
          <p className="role">{profile.role[lang]}</p>

          <div className="meta">
            <span>
              <UniIcon />
              {profile.university[lang]}
            </span>
            <span>{profile.focus[lang]}</span>
          </div>

          <p className="bio">
            <Typewriter
              text={profile.bio[lang]}
              delay={600}
              speed={8}
              instant={twInstant}
              onDone={finishIntro}
            />
          </p>

          <nav className="socials" aria-label="Social links">
            {socials.map((s) => {
              const Icon = socialIcon[s.icon];
              const isMail = s.icon === "mail";
              return (
                <a
                  key={s.label}
                  className="social-link"
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon className={isMail ? "social-mail-icon" : undefined} />
                  <span className="social-label">
                    {isMail ? t.sendEmail : s.label}
                  </span>
                  <ArrowIcon className="ext" />
                </a>
              );
            })}
          </nav>
        </motion.header>

        <div className="content">
        {/* ---------- projects ---------- */}
        <section className="section" aria-labelledby="projects-label">
          <Reveal>
            <p className="section-label" id="projects-label">
              {t.sectionProjects} · {t.projectsCurrent}
            </p>
          </Reveal>

          <div className="projects">
            {projects.map((p, i) => (
              <Reveal key={p.name} delay={i * 0.06}>
                <a
                  className="project"
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="project-head">
                    <span className="project-title">{p.name}</span>
                    <ArrowIcon className="project-arrow" />
                  </div>
                  <p className="project-desc">{p.desc[lang]}</p>
                  <div className="tags">
                    {p.tags.map((tag) => (
                      <span className="tag" key={tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </a>
              </Reveal>
            ))}

            <Reveal delay={0.05}>
              <a
                className="more-link"
                href="https://github.com/HasanBasriEngin?tab=repositories"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t.moreOnGithub}
                <ArrowIcon />
              </a>
            </Reveal>
          </div>
        </section>

        {/* ---------- skills ---------- */}
        <section className="section" aria-labelledby="skills-label">
          <Reveal>
            <p className="section-label" id="skills-label">
              {t.sectionSkills}
            </p>
          </Reveal>

          {skillGroups.map((group, gi) => (
            <Reveal key={group.title.en} delay={gi * 0.05} className="skill-group">
              <h3>{group.title[lang]}</h3>
              <div className="skill-list">
                {group.items.map((item) => (
                  <span className="skill" key={item}>
                    {item}
                  </span>
                ))}
              </div>
            </Reveal>
          ))}
        </section>

        {/* ---------- footer ---------- */}
        <Reveal>
          <footer className="footer">
            <div>
              <p>
                © {new Date().getFullYear()} {profile.name}
              </p>
              <p>{t.footerNote}</p>
            </div>
          </footer>
        </Reveal>
        </div>
      </main>
    </>
  );
}
