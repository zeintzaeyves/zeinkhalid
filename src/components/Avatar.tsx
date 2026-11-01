"use client";

import Image from "next/image";
import { useState } from "react";

type Props = {
  /** Container size, shape and extras, e.g. "size-8 rounded-lg". */
  className?: string;
  /** Extra classes for the image itself. */
  imgClassName?: string;
  /** Text size for the "ZK" fallback shown if the image can't load. */
  fallbackClassName?: string;
  sizes?: string;
};

/** Profile photo with a "ZK" monogram fallback. */
export default function Avatar({
  className = "size-8 rounded-lg",
  imgClassName = "",
  fallbackClassName = "text-[12px]",
  sizes = "64px",
}: Props) {
  const [failed, setFailed] = useState(false);

  return (
    <span
      className={`relative inline-flex shrink-0 items-center justify-center overflow-hidden bg-gradient-to-br from-zinc-600 to-zinc-800 ${className}`}
    >
      {failed ? (
        <span className={`font-medium text-white ${fallbackClassName}`}>ZK</span>
      ) : (
        <Image
          src="/icon.jpg"
          alt="Zein Khalid"
          fill
          sizes={sizes}
          onError={() => setFailed(true)}
          className={`object-cover ${imgClassName}`}
        />
      )}
    </span>
  );
}
