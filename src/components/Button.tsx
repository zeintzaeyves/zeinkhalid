import Icon from "./Icon";
import type { IconName } from "@/data/portfolio";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "outline";
  icon?: IconName;
  iconPosition?: "left" | "right";
};

export default function Button({
  href,
  children,
  variant = "primary",
  icon,
  iconPosition = "left",
}: ButtonProps) {
  const styles =
    variant === "primary"
      ? "bg-white text-black hover:bg-white/85"
      : "border border-line text-white hover:bg-white/10";
  const iconEl = icon && <Icon name={icon} className="size-4" />;
  return (
    <a
      href={href}
      className={`inline-flex h-8 items-center gap-2 rounded-full px-3.5 text-[13px] transition-colors ${styles}`}
    >
      {iconPosition === "left" && iconEl}
      {children}
      {iconPosition === "right" && iconEl}
    </a>
  );
}
