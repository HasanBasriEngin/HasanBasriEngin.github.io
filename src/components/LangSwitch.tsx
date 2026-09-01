import { motion } from "motion/react";
import type { Lang } from "../data";

const options: Lang[] = ["en", "tr"];

interface Props {
  lang: Lang;
  setLang: (l: Lang) => void;
}

export function LangSwitch({ lang, setLang }: Props) {
  return (
    <div className="lang-switch" role="group" aria-label="Language / Dil">
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          className={opt === lang ? "active" : ""}
          aria-pressed={opt === lang}
          onClick={() => setLang(opt)}
        >
          {opt === lang && (
            <motion.span
              layoutId="lang-pill"
              className="pill"
              transition={{ type: "spring", stiffness: 420, damping: 34 }}
            />
          )}
          {opt.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
