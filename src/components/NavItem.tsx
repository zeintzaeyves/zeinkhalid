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
      className={`group flex items-center gap-3 rounded-lg px-3 py-2.5 text-[14px] transition-[color,background-color,transform] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] active:scale-[0.97] ${
        active
          ? "bg-white/[0.08] font-medium text-white [&_svg]:text-[#ffffff]"
          : "text-white/60 hover:bg-white/[0.04] hover:text-white"
      }`}
    >
      <NavIcon name={icon} className="size-4 shrink-0" />
      <span className="truncate">{label}</span>
    </Link>
  );
}
