"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import NavIcon from "./NavIcon";
import type { NavLink } from "@/data/portfolio";

export default function NavItem({
  label,
  href,
  icon,
  onClick,
}: NavLink & { onClick?: () => void }) {
  const pathname = usePathname();
  const active = href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <Link
      href={href}
      onClick={onClick}
      aria-current={active ? "page" : undefined}
      className={`group flex items-center gap-2.5 rounded-lg px-3.5 py-2.5 text-[13px] transition-[color,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] active:scale-[0.96] ${
        active
          ? "font-medium text-white"
          : "text-white/60 hover:text-white"
      }`}
    >
      <NavIcon name={icon} className="size-4 shrink-0" />
      <span className="truncate">{label}</span>
    </Link>
  );
}
