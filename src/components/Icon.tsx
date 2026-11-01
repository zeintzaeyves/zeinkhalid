import type { IconName } from "@/data/portfolio";

const paths: Record<IconName, React.ReactNode> = {
  command: (
    <path d="M9 6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6Z" />
  ),
  user: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21a8 8 0 0 1 16 0" />
    </>
  ),
  layers: (
    <>
      <path d="m12 3 9 5-9 5-9-5 9-5Z" />
      <path d="m3 13 9 5 9-5" />
    </>
  ),
  cap: (
    <>
      <path d="m12 4 10 5-10 5L2 9l10-5Z" />
      <path d="M6 12v5c3 2.5 9 2.5 12 0v-5" />
    </>
  ),
  chat: (
    <>
      <path d="M14 9a2 2 0 0 1-2 2H7l-3 3V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v4Z" />
      <path d="M18 9h1a2 2 0 0 1 2 2v9l-3-3h-5a2 2 0 0 1-2-2v-1" />
    </>
  ),
  arrow: <path d="M3 12h18m-6-6 6 6-6 6" />,
};

export default function Icon({
  name,
  className = "size-3.5",
}: {
  name: IconName;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={className}
    >
      {paths[name]}
    </svg>
  );
}
