import {
  Briefcase,
  FolderKanban,
  GraduationCap,
  Images,
  Layers,
  LayoutGrid,
  Library,
  Mail,
  Handshake,
  User,
  type LucideIcon,
} from "lucide-react";
import type { NavIconName } from "@/data/portfolio";

const icons: Record<NavIconName, LucideIcon> = {
  overview: LayoutGrid,
  experience: Briefcase,
  education: GraduationCap,
  projects: FolderKanban,
  stacks: Layers,
  resources: Library,
  services: Handshake,
  contact: Mail,
  gallery: Images,
  about: User,
};

export default function NavIcon({
  name,
  className = "size-4 shrink-0",
}: {
  name: NavIconName;
  className?: string;
}) {
  const Cmp = icons[name];
  return <Cmp className={className} strokeWidth={1.7} aria-hidden />;
}
