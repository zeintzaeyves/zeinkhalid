export type IconName =
  | "command"
  | "user"
  | "layers"
  | "cap"
  | "chat"
  | "arrow";

export type NavIconName =
  | "overview"
  | "experience"
  | "education"
  | "projects"
  | "stacks"
  | "resources"
  | "services"
  | "contact"
  | "gallery"
  | "about";

export type NavLink = { label: string; href: string; icon: NavIconName };
export type NavGroupData = { title: string; links: NavLink[] };

export const navGroups: NavGroupData[] = [
  {
    title: "Portfolio",
    links: [
      { label: "Overview", href: "/", icon: "overview" },
      { label: "Experience", href: "/experience", icon: "experience" },
      { label: "Education", href: "/education", icon: "education" },
      { label: "Projects", href: "/projects", icon: "projects" },
      { label: "Stacks", href: "/stacks", icon: "stacks" },
      { label: "Resources", href: "/resources", icon: "resources" },
    ],
  },
  {
    title: "Work with Zein Khalid",
    links: [
      { label: "Services", href: "/services", icon: "services" },
      { label: "Contact", href: "/contact", icon: "contact" },
    ],
  },
  {
    title: "Personals",
    links: [
      { label: "Gallery", href: "/gallery", icon: "gallery" },
      { label: "More about me", href: "/about", icon: "about" },
    ],
  },
];

export const email = "bulaclaczeinkhalidjornadal@gmail.com";
export const linkedin = "https://www.linkedin.com/in/zeinkhalid/";
export const location = "Quezon City, Metro Manila, Philippines";

export type ProjectCategory = "AI" | "Web" | "Design" | "Dashboards";

export type Project = {
  title: string;
  category: ProjectCategory;
  href?: string;
  /** "ask" opens the Ask Zein chat instead of an external link. */
  action?: "ask";
  /** Optional cover picture used as the card background. */
  image?: string;
  description: string;
  tags: string[];
};

/** Card background: the project cover (dimmed for legible text) or a gradient. */
export function projectBackground(p: Project, i: number): string {
  if (p.image) {
    // border-box: both layers paint under the card border too. With the default
    // padding-box the image spills into the border strip while the dark gradient
    // does not, which leaves a bright, undimmed edge.
    return `linear-gradient(180deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.82) 100%) center / cover no-repeat border-box, url(${p.image}) center / cover no-repeat border-box`;
  }
  return projectGradients[i % projectGradients.length];
}

export const projects: Project[] = [
  {
    title: "Talk to Zein",
    category: "AI",
    href: "https://talk-to-zein.vercel.app/",
    image: "/gallery/talk-to-zein.jpg?v=2",
    description:
      "A modern personal portfolio built with React and Next.js, showcasing projects, skills, experience and contact info through interactive navigation and project-focused layouts.",
    tags: ["AI", "Next.js"],
  },
  {
    title: "Jetour Flight Booking System",
    category: "Web",
    href: "https://jetour-flight-booking-system.vercel.app/",
    image: "/gallery/jetour.png",
    description:
      "A web-based flight booking system where users search available flights, manage passenger information and complete bookings, with responsive interfaces and backend support for schedules and reservations.",
    tags: ["Full-stack", "Booking"],
  },
  {
    title: "Aspire by Filinvest",
    category: "Web",
    href: "https://aspirebyfilinvest.com/",
    image: "/gallery/aspire.png",
    description:
      "Responsive front-end work on the Aspire by Filinvest website in Next.js, React, TypeScript and Tailwind CSS: property listings with search, filtering and pagination, reusable property cards, Payload CMS content, and faster WebP-optimized images.",
    tags: ["Next.js", "Payload CMS"],
  },
  {
    title: "Futura by Filinvest",
    category: "Web",
    href: "https://futurabyfilinvest.com/",
    image: "/gallery/futura.png",
    description:
      "Responsive front-end work on the Futura by Filinvest website in Next.js, React, TypeScript and Tailwind CSS: property listings with search, filtering and pagination, reusable property cards, Payload CMS content, and faster WebP-optimized images.",
    tags: ["Next.js", "Payload CMS"],
  },
  {
    title: "Prestige by Filinvest",
    category: "Web",
    href: "https://prestigebyfilinvest.com/",
    image: "/gallery/prestige.png",
    description:
      "Responsive front-end work on the Prestige by Filinvest website in Next.js, React, TypeScript and Tailwind CSS: property listings with search, filtering and pagination, reusable property cards, Payload CMS content, and faster WebP-optimized images.",
    tags: ["Next.js", "Payload CMS"],
  },
  {
    title: "Global Currency Invoice Processor",
    category: "Dashboards",
    href: "https://voiceprocessor-phi.vercel.app/",
    image: "/gallery/velora.png",
    description:
      "An invoice dashboard that retrieves live exchange rates, converts multi-currency invoices, calculates outstanding balances and persists invoice records locally.",
    tags: ["Dashboard", "Live rates"],
  },
  {
    title: "Basic Web Redesign",
    category: "Design",
    href: "https://marcimetzger-ashen.vercel.app/",
    description:
      "A homepage redesign for Marci Metzger Homes: a cleaner layout, clearer hierarchy and a responsive build, taken from wireframe to a live preview.",
    tags: ["UI/UX", "Web design"],
  },
  {
    title: "GitHub Developer Analyst Dashboard",
    category: "Dashboards",
    description:
      "A dashboard for analyzing developer activity and insights from GitHub data.",
    tags: ["Dashboard", "GitHub", "In development"],
  },
  {
    title: "Country Intelligence & Weather Dashboard",
    category: "Dashboards",
    description:
      "A dashboard combining live geographic and weather data from multiple APIs, with search, regional filtering, sorting, detailed views and persistent favorites.",
    tags: ["Dashboard", "APIs", "In development"],
  },
];

export type Experience = {
  company: string;
  role: string;
  period: string;
  category: "Development" | "Design" | "Support";
  summary: string;
  points: string[];
  stack: string[];
};

export const experiences: Experience[] = [
  {
    company: "Filinvest Land Philippines",
    role: "Junior Software Developer",
    period: "Mar 2026 – Aug 2026",
    category: "Development",
    summary:
      "Improved website performance and user experience across three Filinvest brands — Futura, Aspire and Prestige — with responsive features built in Next.js, React, TypeScript and Tailwind CSS.",
    points: [
      "Increased page speed and cut image-loading time by optimizing CMS-managed images: converting assets to WebP, resizing and compressing.",
      "Built responsive property listings, search, filtering, pagination and reusable property-card components connected to Payload CMS APIs.",
      "Translated Figma designs into responsive, reusable components, coordinating design adjustments with senior developers.",
      "Resolved hydration errors, TypeScript issues, build failures and cross-browser UI bugs in a monorepo supporting three website applications.",
      "Integrated frontend pages with Payload CMS REST APIs for dynamic projects, news articles and general page content.",
      "Ran Lighthouse audits and accessibility improvements, reaching 93 Accessibility, 92 Best Practices and 92 SEO on the Filinvest Land homepage.",
    ],
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Payload CMS"],
  },
  {
    company: "Freelance",
    role: "Front-end Web Developer",
    period: "2024 – 2026",
    category: "Development",
    summary:
      "Built responsive websites for clients across desktop and mobile devices.",
    points: [
      "Translated UI designs into clean, reusable front-end components while maintaining visual consistency and usability.",
      "Customized landing pages, portfolio websites and e-commerce interfaces based on client requirements and project goals.",
    ],
    stack: ["React", "Next.js", "JavaScript", "HTML", "CSS", "Tailwind CSS"],
  },
  {
    company: "Freelance",
    role: "Full-stack Developer",
    period: "2024 – 2026",
    category: "Development",
    summary:
      "Led the end-to-end design and development of a full-stack mobile application, covering interface design, backend development and database integration.",
    points: [
      "Built an AI-powered chatbot to automate responses and support inquiry management within the application.",
      "Developed REST APIs using Node.js, Express and MongoDB to manage application data and chatbot functionality.",
    ],
    stack: ["Node.js", "Express", "MongoDB", "REST APIs"],
  },
  {
    company: "Freelance",
    role: "UI/UX Designer",
    period: "2024 – 2026",
    category: "Design",
    summary:
      "Designed responsive web and mobile interfaces using wireframes, prototypes and high-fidelity Figma mockups.",
    points: [
      "Created reusable design systems to maintain visual consistency across devices.",
      "Improved user flows, navigation, accessibility and information hierarchy.",
      "Collaborated with clients and developers to deliver practical, development-ready designs.",
    ],
    stack: ["Figma", "Wireframing", "Prototyping", "Design Systems"],
  },
  {
    company: "Bangko Mabuhay",
    role: "Junior Technical Support",
    period: "Jun 2025 – Aug 2025",
    category: "Support",
    summary:
      "Provided technical support to employees, troubleshooting hardware, software and basic network issues to keep day-to-day office operations running smoothly.",
    points: [
      "Assisted with computer and system setup, configuration and basic maintenance so workstations were ready for use.",
      "Diagnosed and resolved common workstation issues, minimizing disruptions and supporting reliable system performance.",
    ],
    stack: ["Troubleshooting", "Basic Networking", "System Setup"],
  },
];

export type Degree = {
  school: string;
  program: string;
  period: string;
  note: string;
  details: string[];
};

export const degree: Degree = {
  school: "City College of Tagaytay",
  program: "BS Computer Science",
  period: "2022 – 2026",
  note: "General Weighted Average (GWA) 1.75 / 1.00 (Cum Laude); Dean's Lister, 2022–2024.",
  details: [
    "Relevant coursework: Web Development, UI/UX Web Design, Data Structures & Algorithms, and Software Engineering.",
    "Troubleshooting and technical documentation.",
    "Based in Tagaytay, Cavite.",
  ],
};

export type Certification = {
  title: string;
  subtitle: string;
  period: string;
  note: string;
  category: "Development" | "Design" | "AI";
};

export const certifications: Certification[] = [
  {
    title: "Front-End Development Coding Bootcamp",
    subtitle: "freeCodeCamp",
    period: "",
    note: "Intensive training in HTML, CSS, JavaScript, responsive design and accessibility.",
    category: "Development",
  },
  {
    title: "UI/UX Designing Bootcamp",
    subtitle: "Flux Academy",
    period: "",
    note: "Focused training in UI/UX design principles, wireframing, prototyping, typography, visual hierarchy and user-centered design.",
    category: "Design",
  },
  {
    title: "Claude Code Certification",
    subtitle: "Anthropic",
    period: "",
    note: "Certified in using Claude Code for AI-assisted software development.",
    category: "AI",
  },
];

export const activity = {
  label: "Oct 2025",
  title: "Caffeine AI Hackathon · Web Developer Member",
  place: "Quezon City",
  text: "Collaborated with the team to develop and present “Bantay Bayan Pilipinas”, an AI-based system for transparency of funds in the Philippines.",
  topics: ["Hackathon", "AI", "Web Development", "Teamwork"],
};

export const stacks: { label: string; items: string[] }[] = [
  {
    label: "Frontend",
    items: ["JavaScript", "TypeScript", "React.js", "Next.js", "HTML", "CSS", "Tailwind CSS", "shadcn/ui"],
  },
  {
    label: "Backend & Databases",
    items: ["Node.js", "Express.js", "MongoDB", "REST APIs", "Convex"],
  },
  {
    label: "AI & Machine Learning",
    items: ["LLM APIs", "Claude Code", "AI Chatbots", "Prompt Design"],
  },
  {
    label: "CMS & No-Code",
    items: ["Payload CMS", "Framer"],
  },
  {
    label: "Developer Tools",
    items: ["Git", "GitHub", "Vercel", "VS Code", "Figma", "Postman", "Lighthouse", "Silktide", "Azure DevOps", "Cisco"],
  },
  {
    label: "Technical Engineering",
    items: ["Hardware & Software Troubleshooting", "Basic Networking", "System Setup & Configuration", "PC Maintenance"],
  },
];

export const services: { title: string; description: string; tools: string[] }[] = [
  {
    title: "Front-end development",
    description:
      "Responsive, fast websites and landing pages built from Figma designs into production-ready, reusable components.",
    tools: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
  },
  {
    title: "UI/UX design",
    description:
      "Wireframes, prototypes and high-fidelity mockups, with reusable design systems and clear user flows.",
    tools: ["Figma", "Prototyping", "Design Systems"],
  },
  {
    title: "Full-stack apps",
    description:
      "End-to-end web and mobile apps covering the interface, REST APIs and database integration.",
    tools: ["Node.js", "Express", "MongoDB", "REST APIs"],
  },
  {
    title: "AI chatbots",
    description:
      "AI-powered chatbots that automate responses and handle inquiries, wired into your app or website.",
    tools: ["Chatbot workflows", "APIs", "Automation"],
  },
];

export const projectGradients = [
  "linear-gradient(160deg,#3a3a3d 0%,#18181b 45%,#6b6b70 150%)",
  "linear-gradient(160deg,#1f2a37 0%,#0e1116 50%,#3b82f6 160%)",
  "linear-gradient(160deg,#2b1f33 0%,#120c16 50%,#c026d3 160%)",
  "linear-gradient(160deg,#1c2e26 0%,#0b1310 50%,#10b981 160%)",
  "linear-gradient(160deg,#33261c 0%,#140e09 50%,#f97316 160%)",
  "linear-gradient(160deg,#2a2a2a 0%,#111 50%,#a1a1aa 160%)",
  "linear-gradient(160deg,#1c2433 0%,#0b0e14 50%,#6e7cff 160%)",
];

export const stackHighlights = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "Node.js",
  "MongoDB",
  "Figma",
];

export type GalleryItem = { title: string; caption: string; src?: string };

/** Add photos to /public/gallery and set `src` (e.g. "/gallery/desk.jpg"). */
export const galleryItems: GalleryItem[] = [
  { title: "Graduation day", caption: "BS Computer Science, City College of Tagaytay.", src: "/gallery/gallery-1.jpg" },
  { title: "Caffeine Hackathon", caption: "Badge on as UI/UX designer.", src: "/gallery/gallery-2.jpg" },
  { title: "Movie night", caption: "Marvel on the big screen.", src: "/gallery/gallery-3.jpg" },
  { title: "After hours", caption: "Off the screen for a bit.", src: "/gallery/gallery-4.jpg" },
  { title: "1 AM build session", caption: "LayoutLab, AI-powered UI insights.", src: "/gallery/gallery-5.jpg" },
];

/** Social links shown in the footer. Replace Instagram, Facebook and Behance with your profile URLs. */
export const socials: { label: string; href: string }[] = [
  { label: "LinkedIn", href: linkedin },
  { label: "Instagram", href: "https://www.instagram.com/" },
  { label: "Facebook", href: "https://www.facebook.com/" },
  { label: "Behance", href: "https://www.behance.net/" },
];

export type Resource = { name: string; note: string; href: string };

export const resources: { title: string; items: Resource[] }[] = [
  {
    title: "Design",
    items: [
      { name: "Figma", note: "Interface design, prototyping and design systems", href: "https://www.figma.com/" },
      { name: "Framer", note: "Interactive sites and quick prototypes", href: "https://www.framer.com/" },
    ],
  },
  {
    title: "Front-end",
    items: [
      { name: "Next.js", note: "React framework for production sites", href: "https://nextjs.org/" },
      { name: "React", note: "Component-based UI library", href: "https://react.dev/" },
      { name: "TypeScript", note: "Typed JavaScript", href: "https://www.typescriptlang.org/" },
      { name: "Tailwind CSS", note: "Utility-first styling", href: "https://tailwindcss.com/" },
    ],
  },
  {
    title: "UI libraries",
    items: [
      { name: "shadcn/ui", note: "Accessible, copy-and-own components", href: "https://ui.shadcn.com/" },
      { name: "Radix UI", note: "Unstyled, accessible UI primitives", href: "https://www.radix-ui.com/" },
      { name: "Magic UI", note: "Animated components for landing pages", href: "https://magicui.design/" },
      { name: "Aceternity UI", note: "Eye-catching animated components", href: "https://ui.aceternity.com/" },
      { name: "21st.dev", note: "Community library of React UI components", href: "https://21st.dev/" },
      { name: "Motion", note: "Animation library for React", href: "https://motion.dev/" },
    ],
  },
  {
    title: "Icons, fonts & assets",
    items: [
      { name: "Lucide", note: "Clean, consistent open-source icons", href: "https://lucide.dev/" },
      { name: "Google Fonts", note: "Free web fonts", href: "https://fonts.google.com/" },
      { name: "Unsplash", note: "Free high-quality photos", href: "https://unsplash.com/" },
    ],
  },
  {
    title: "Back-end & data",
    items: [
      { name: "Node.js", note: "JavaScript runtime", href: "https://nodejs.org/" },
      { name: "Express", note: "Minimal web framework for Node", href: "https://expressjs.com/" },
      { name: "MongoDB", note: "Document database", href: "https://www.mongodb.com/" },
      { name: "Payload CMS", note: "Headless CMS with REST APIs", href: "https://payloadcms.com/" },
      { name: "Postman", note: "Testing and documenting APIs", href: "https://www.postman.com/" },
    ],
  },
  {
    title: "Workflow & deployment",
    items: [
      { name: "GitHub", note: "Version control and collaboration", href: "https://github.com/" },
      { name: "Vercel", note: "Hosting and deployments", href: "https://vercel.com/" },
      { name: "Visual Studio Code", note: "Main code editor", href: "https://code.visualstudio.com/" },
      { name: "Lighthouse", note: "Performance, accessibility and SEO audits", href: "https://developer.chrome.com/docs/lighthouse/overview" },
    ],
  },
  {
    title: "AI",
    items: [
      { name: "Claude", note: "AI assistant and coding partner", href: "https://claude.ai/" },
      { name: "ChatGPT", note: "AI assistant for brainstorming and drafting", href: "https://chatgpt.com/" },
      { name: "Gemini", note: "Google's AI assistant", href: "https://gemini.google.com/" },
      { name: "v0", note: "Generate UI components with AI", href: "https://v0.dev/" },
      { name: "Hugging Face", note: "Open models, datasets and demos", href: "https://huggingface.co/" },
    ],
  },
];

export const howIWork: { title: string; note: string }[] = [
  { title: "Discover", note: "We talk through your goals, audience and scope." },
  { title: "Design", note: "Wireframes and high-fidelity Figma mockups you can react to." },
  { title: "Build", note: "Responsive, accessible code in Next.js, React and TypeScript." },
  { title: "Launch", note: "Performance and accessibility checks, then deploy and hand off." },
];

/**
 * Cards on the "More about me" page. Optional images go in /public/about
 * (e.g. "/about/filinvest.jpg") and are set on each card's `image`.
 */
export const personal = {
  profile: {
    name: "Zein Khalid",
    role: "Full-stack developer and aspiring AI engineer",
    city: "Quezon City",
    badge: "Open to work",
    bio: "Front-end and full-stack developer, UI/UX designer, and aspiring AI engineer building AI-powered chatbots.",
    since: "2024",
  },
  shipped: {
    label: "Last shipped",
    tag: "2026",
    title: "Filinvest Websites",
    note: "Futura · Aspire · Prestige",
    image: undefined as string | undefined,
  },
  building: {
    label: "Building now",
    title: "Elevate",
    note: "AI-powered gym tracker",
    image: "/about/elevate.png" as string | undefined,
    imageRatio: 4960 / 2720,
    imagePosition: "80% 50%",
  },
  focus: {
    label: "Currently focused on",
    title: "Learning AI Engineering",
    note: "LLM apps and chatbots",
    image: undefined as string | undefined,
  },
  acquired: {
    label: "Currently acquired",
    tag: "Certified",
    title: "Claude Code",
    note: "Claude Code 101 · Claude Academy",
    // Drop the certificate picture in /public/about and set e.g. "/about/claude-code.png"
    image: "/about/claude-code.jpg" as string | undefined,
    imageRatio: 1046 / 711,
    imagePosition: "50% 50%",
  },
  place: {
    name: "Philippines",
    image: "/about/philippines.jpg" as string | undefined,
    imageRatio: 1993 / 2365,
    imagePosition: "50% 35%",
  },
};

/**
 * Interests shown under the bento on "More about me".
 * Games shows three pictures from /public/about.
 */
export type Interest = {
  label: string;
  items: string[];
  pictures?: { title: string; src?: string; position?: string }[];
};

export const interests: Interest[] = [
  {
    label: "Movies",
    items: ["Marvel movies", "DC movies", "Console game adaptation movies"],
  },
  {
    label: "Music",
    items: ["Anything, as long as it's Drake", "The 1975", "Sports"],
  },
  {
    label: "Games",
    items: [],
    pictures: [
      { title: "Call of Duty: Modern Warfare", src: "/about/game-mwf.jpg", position: "50% 50%" },
      { title: "Tekken 8", src: "/about/game-tekken.jpg", position: "65% 40%" },
      { title: "The Last of Us Part II", src: "/about/game-last-of-us.jpg", position: "72% 40%" },
    ],
  },
  {
    label: "Hobbies",
    items: [
      "Watching",
      "Listening to music",
      "Playing",
      "Observing magazine designs",
    ],
  },
];

export const faqs: { q: string; a: string }[] = [
  {
    q: "Are you available for freelance work?",
    a: "Yes. I'm open to freelance projects and collaborations. Send me a message with what you're building and I'll get back to you.",
  },
  {
    q: "What kind of work do you take on?",
    a: "Front-end and full-stack web development, UI/UX design, and AI features like LLM-powered chatbots. The Services page has the full list.",
  },
  {
    q: "What do you build with?",
    a: "Mostly Next.js, React, TypeScript and Tailwind CSS, with Figma for design. I also work with Node.js, databases and AI tools like OpenAI and Claude Code.",
  },
  {
    q: "How does a project work?",
    a: "We start by talking through your goals and scope, then I design in Figma, build it responsively in code, and finish with performance and accessibility checks before launch.",
  },
  {
    q: "Do you handle both design and development?",
    a: "Yes. I can take a project from wireframes and mockups all the way to a deployed site, or just do one side of it.",
  },
  {
    q: "How much does it cost?",
    a: "It depends on the scope. Email me the details of what you need and I'll come back with an estimate.",
  },
  {
    q: "What's the best way to reach you?",
    a: "Email is the fastest. You can also message me on LinkedIn or use the form above.",
  },
];

export type Testimonial = { quote: string; name: string; tag: string };

/**
 * Real recommendations only. The Testimonials section on the Overview
 * stays hidden until this list has at least one entry.
 */
export const testimonials: Testimonial[] = [
  {
    quote: "Your designs look better than 90% of the websites I’ve seen.",
    name: "Website Visitor",
    tag: "Visitor",
  },
  {
    quote: "I just want to say that your website looks amazing, and your projects have some really impressive designs.",
    name: "Portfolio Visitor",
    tag: "Visitor",
  },
  {
    quote: "How do you create designs like that in Figma? I can’t seem to make anything like that whenever I try designing.",
    name: "Developer Peer",
    tag: "Peer",
  },
  {
    quote: "He’s genuinely kind, approachable, and always willing to help. Even when the work is no longer part of his responsibilities, he still makes time to offer assistance.",
    name: "Former Client",
    tag: "Client",
  },
  {
    quote: "The UI and overall system design are impressive. Everything feels thoughtfully designed, visually appealing, and easy to navigate.",
    name: "STI Client",
    tag: "STI",
  },
  {
    quote: "The portal was well-built and thoughtfully put together. The overall implementation and user experience were great.",
    name: "NU Client",
    tag: "NU",
  },
  {
    quote: "The UI looks great. I honestly don’t have anything to point out.",
    name: "Filinvest Lead Developer",
    tag: "Filinvest",
  },
];
