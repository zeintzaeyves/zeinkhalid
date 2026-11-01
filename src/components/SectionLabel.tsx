export default function SectionLabel({
  children,
}: {
  children: React.ReactNode;
}) {
  return <p className="text-[13px] text-muted">{children}</p>;
}
