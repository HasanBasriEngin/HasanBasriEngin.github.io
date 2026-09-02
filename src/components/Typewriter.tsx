import { useEffect, useRef, useState } from "react";

interface Props {
  text: string;
  /** ms per character */
  speed?: number;
  /** ms to wait before the first character */
  delay?: number;
  className?: string;
  /** render the whole string at once (reduced motion / already seen this session) */
  instant?: boolean;
  /** fired once when the string is fully typed (or immediately when instant) */
  onDone?: () => void;
}

/**
 * Types `text` out character by character with a blinking caret, like a
 * teletype / tactical readout. A hidden copy of the full string reserves the
 * final layout box so nothing below it shifts while typing. Once finished it
 * collapses to plain text.
 */
export function Typewriter({
  text,
  speed = 24,
  delay = 0,
  className,
  instant = false,
  onDone,
}: Props) {
  const [n, setN] = useState(instant ? text.length : 0);
  const doneRef = useRef(false);
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;

  useEffect(() => {
    doneRef.current = false;
    if (instant) {
      setN(text.length);
      doneRef.current = true;
      onDoneRef.current?.();
      return;
    }
    setN(0);
    let i = 0;
    let step = 0;
    const start = window.setTimeout(function tick() {
      i += 1;
      setN(i);
      if (i < text.length) {
        step = window.setTimeout(tick, speed);
      } else if (!doneRef.current) {
        doneRef.current = true;
        onDoneRef.current?.();
      }
    }, delay);
    return () => {
      clearTimeout(start);
      clearTimeout(step);
    };
  }, [text, speed, delay, instant]);

  if (n >= text.length) {
    return <span className={className}>{text}</span>;
  }

  return (
    <span className={"tw" + (className ? " " + className : "")}>
      <span className="tw-ghost">{text}</span>
      <span className="tw-real" aria-hidden="true">
        {text.slice(0, n)}
        <span className="tw-caret" />
      </span>
    </span>
  );
}
