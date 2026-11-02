import {
  siClaude,
  siExpress,
  siFigma,
  siFramer,
  siGithub,
  siGooglefonts,
  siGooglegemini,
  siHuggingface,
  siLighthouse,
  siLucide,
  siMongodb,
  siNextdotjs,
  siNodedotjs,
  siPayloadcms,
  siPostman,
  siRadixui,
  siReact,
  siShadcnui,
  siTailwindcss,
  siTypescript,
  siUnsplash,
  siV0,
  siVercel,
  type SimpleIcon,
} from "simple-icons";

// Brands that have an icon in simple-icons. Anything else gets a letter tile.
const icons: Record<string, SimpleIcon> = {
  Figma: siFigma,
  Framer: siFramer,
  Motion: siFramer,
  "Next.js": siNextdotjs,
  React: siReact,
  TypeScript: siTypescript,
  "Tailwind CSS": siTailwindcss,
  "shadcn/ui": siShadcnui,
  "Radix UI": siRadixui,
  Lucide: siLucide,
  "Google Fonts": siGooglefonts,
  Unsplash: siUnsplash,
  "Node.js": siNodedotjs,
  Express: siExpress,
  MongoDB: siMongodb,
  "Payload CMS": siPayloadcms,
  Postman: siPostman,
  GitHub: siGithub,
  Vercel: siVercel,
  Lighthouse: siLighthouse,
  Claude: siClaude,
  Gemini: siGooglegemini,
  v0: siV0,
  "Hugging Face": siHuggingface,
};

export default function ResourceIcon({ name }: { name: string }) {
  const icon = icons[name];
  return (
    <span
      aria-hidden
      className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-line bg-white/[0.06] text-white"
    >
      {icon ? (
        <svg viewBox="0 0 24 24" fill="currentColor" className="size-5">
          <path d={icon.path} />
        </svg>
      ) : (
        <span className="text-[15px] font-semibold">{name[0]}</span>
      )}
    </span>
  );
}
