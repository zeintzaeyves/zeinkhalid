type ChipProps = {
  children: React.ReactNode;
  size?: "sm" | "md";
};

export default function Chip({ children, size = "md" }: ChipProps) {
  const sizing =
    size === "sm" ? "px-2 py-px text-[11px]" : "px-3 py-1 text-[13px]";
  return (
    <span
      className={`inline-flex items-center rounded-full border border-line text-white/90 ${sizing}`}
    >
      {children}
    </span>
  );
}
