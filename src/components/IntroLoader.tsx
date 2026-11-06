"use client";

import { useEffect, useState } from "react";

const TEXT = "zeinkhalid.com";

export default function AsciiLoader() {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);
  const [n, setN] = useState(0);

  useEffect(() => {
    try {
      if (sessionStorage.getItem("loaded")) {
        setVisible(false);
        return;
      }
    } catch {}
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    let i = 0;
    let t: ReturnType<typeof setTimeout>;
    const iv = setInterval(() => {
      i++;
      setN(i);
      if (i >= TEXT.length) {
        clearInterval(iv);
        t = setTimeout(() => {
          setFading(true);
          t = setTimeout(() => {
            setVisible(false);
            document.body.style.overflow = prev;
            try {
              sessionStorage.setItem("loaded", "1");
            } catch {}
          }, 450);
        }, 600);
      }
    }, 90);
    return () => {
      clearInterval(iv);
      clearTimeout(t);
      document.body.style.overflow = prev;
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      role="status"
      aria-label="Loading zeinkhalid.com"
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-black px-4 transition-opacity duration-500 ${
        fading ? "opacity-0" : "opacity-100"
      }`}
    >
      <p className="text-[clamp(1.5rem,6vw,2.75rem)] font-light tracking-[-0.02em] text-white">
        {TEXT.slice(0, n)}
        <span className="ml-1 inline-block h-[1em] w-0.5 animate-pulse bg-[#ffffff] align-[-0.12em]" />
      </p>
    </div>
  );
}
