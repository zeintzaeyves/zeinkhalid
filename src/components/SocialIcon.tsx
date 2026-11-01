const iconCls = "size-4";

export default function SocialIcon({ name }: { name: string }) {
  switch (name) {
    case "LinkedIn":
      return (
        <svg className={iconCls} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.5h4V21H3zM9.5 9.5h3.8v1.6c.6-1 1.9-1.9 3.7-1.9 3.5 0 4 2.3 4 5.3V21h-4v-5.6c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9V21h-4z" />
        </svg>
      );
    case "Instagram":
      return (
        <svg
          className={iconCls}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" />
        </svg>
      );
    case "Facebook":
      return (
        <svg className={iconCls} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M13.5 21v-7.5H16l.5-3h-3V8.7c0-.9.3-1.5 1.6-1.5h1.5V4.5c-.3 0-1.2-.1-2.2-.1-2.3 0-3.9 1.4-3.9 4v1.6H7.5v3H10V21z" />
        </svg>
      );
    case "Behance":
      return (
        <span aria-hidden className="text-[14px] font-bold leading-none">
          Bē
        </span>
      );
    default:
      return null;
  }
}
