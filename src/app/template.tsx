// Re-mounts on every navigation, so each tab switch plays the page-in animation.
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-in flex flex-col gap-14">{children}</div>;
}
