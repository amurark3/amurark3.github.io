// Single source of truth for portfolio content.
// Mirrors public/Aditya_Murarka_Resume.pdf — update both together.

export interface Basics {
  name: string;
  firstName: string;
  role: string;
  location: string;
  email: string;
  links: {
    github: string;
    linkedin: string;
    resume: string;
  };
  intro: string;
  summary: string;
  openTo: string;
  /** Optional transparent-background portrait for the hero ASCII canvas. Falls back to a lit sphere. */
  heroImage?: string;
}

export interface Experience {
  company: string;
  tabLabel: string;
  url: string;
  role: string;
  period: string;
  location: string;
  bullets: readonly string[];
}

export interface Project {
  title: string;
  subtitle: string;
  organization: string;
  period: string;
  description: string;
  tech: readonly string[];
  github?: string;
  live?: string;
}

export interface SkillGroup {
  category: string;
  items: readonly string[];
}

export interface Education {
  school: string;
  url: string;
  degree: string;
  period: string;
  location: string;
  gpa?: string;
  coursework?: readonly string[];
}

export interface Award {
  title: string;
  organization: string;
  date?: string;
  detail: string;
}

export interface Highlight {
  metric: string;
  label: string;
}

export interface Resume {
  basics: Basics;
  aboutTech: readonly string[];
  highlights: readonly Highlight[];
  experience: readonly Experience[];
  projects: readonly Project[];
  skills: readonly SkillGroup[];
  education: readonly Education[];
  awards: readonly Award[];
}

export const resume: Resume = {
  basics: {
    name: "Aditya Murarka",
    firstName: "aditya",
    role: "Software Engineer",
    heroImage: "/profile.png",
    location: "San Jose, CA",
    email: "adityamurarka14@gmail.com",
    links: {
      github: "https://github.com/amurark3",
      linkedin: "https://www.linkedin.com/in/adityamurarka14",
      resume: "/Aditya_Murarka_Resume.pdf",
    },
    intro:
      "Software engineer in San Jose, CA with 5+ years of experience building React and TypeScript applications, Python and Node.js APIs, and real-time, AI-powered systems.",
    summary:
      "Software Engineer with 5+ years of experience developing React and TypeScript applications, Python and Node.js APIs, and real-time systems. Skilled in micro frontend architecture, WebSockets, event-driven integrations, AI agents, SQL, performance optimization, and CI/CD. Delivered measurable gains in application performance, test coverage, code reuse, and cloud efficiency.",
    openTo: "Open to full-time software engineering roles in the U.S.",
  },

  aboutTech: [
    "TypeScript",
    "React / Next.js",
    "Python",
    "Node.js",
    "FastAPI",
    "LangChain",
    "Kafka",
    "PostgreSQL",
  ],

  highlights: [
    { metric: "30%", label: "faster screens after the React micro-frontend migration" },
    { metric: "93%", label: "unit and component test coverage" },
    { metric: "15%", label: "reduction in cloud spend from analytics dashboards" },
    { metric: "30%", label: "less duplicate UI code via a shared component library" },
  ],

  experience: [
    {
      company: "Walmart Global Tech",
      tabLabel: "Walmart",
      url: "https://tech.walmart.com/",
      role: "Software Engineer III",
      period: "Mar 2022 – Jul 2024",
      location: "Bangalore, India",
      bullets: [
        "Designed and developed the conversational UI for an enterprise RAG assistant, supporting multi-turn natural-language queries over supply chain and inventory data with streaming responses and dynamic rendering of text, tables, and interactive charts.",
        "Modernized legacy AngularJS screens and JavaScript modules into React and TypeScript within a Module Federation micro-frontend architecture, improving screen performance by up to 30%.",
        "Engineered a real-time notification system using React, Server-Sent Events (SSE), Kafka, and Spring Boot; leveraged SharedWorker to coordinate connections across browser tabs and synchronize notifications without redundant polling.",
        "Led an Adobe Analytics proof of concept and 20-screen MVP, guiding instrumentation across 80+ screens; developed supply chain dashboards exposing idle resources and supporting a 15% reduction in cloud spend.",
        "Performed root-cause analysis and rollback of a failed shared component library release, improving versioning and release coordination practices across teams.",
        "Raised unit and component test coverage to 93% using Jest, React Testing Library, and API mocking; resolved accessibility findings identified by external WCAG audits.",
      ],
    },
    {
      company: "Nineleaps Technology Solutions",
      tabLabel: "Nineleaps",
      url: "https://www.nineleaps.com/",
      role: "Software Engineer I",
      period: "Aug 2019 – Mar 2022",
      location: "Bangalore, India",
      bullets: [
        "Led and mentored a five-engineer team delivering SPRY, a sports compliance platform; owned sprint planning, technical scoping, client communication, and releases.",
        "Developed React and Redux workflows for contracts, multi-step forms, file uploads, and earnings dashboards, integrating frontend features with backend services.",
        "Built a shared Storybook component library, introduced ESLint and Prettier standards, and organized code into a Yarn Workspaces monorepo, reducing duplicate UI code by 30%.",
        "Architected a TypeScript-based content management platform using Redux-Saga, React Router, recursive tree navigation, and reusable widgets for non-technical content authors.",
        "Improved page-load performance through route-level code splitting and bundle optimization; used Lighthouse audits to investigate regressions and guide frontend improvements.",
      ],
    },
  ],

  projects: [
    {
      title: "F1 AI",
      subtitle: "Agentic Race Engineer Assistant",
      organization: "Personal project",
      period: "May 2025 – Jul 2025",
      description:
        "An AI Formula 1 race engineer built on LangChain and Groq that orchestrates 15 specialized tools for race analysis, live telemetry, strategy, and ML predictions. Answers are grounded in FIA regulations and 75+ years of race records through pgvector retrieval, cross-encoder reranking, and constrained text-to-SQL, and 11 tools are exposed to external AI clients over MCP.",
      tech: ["Next.js", "FastAPI", "LangChain", "Groq", "Supabase pgvector", "WebSockets", "MCP"],
      github: "https://github.com/amurark3/F1-AI",
      live: "https://f1-ai-delta.vercel.app",
    },
    {
      title: "WeVibe",
      subtitle: "iOS Dating App",
      organization: "Arizona State University",
      period: "Jan 2026 – May 2026",
      description:
        "End-to-end product flows across a SwiftUI iOS client and a Node.js, Express, and TypeScript backend: Firebase auth, onboarding, photo uploads, location sync, and matchmaking. Real-time Socket.IO chat with typing indicators, unread badges, queue recovery, and FCM push notifications, plus Gemini-powered bio generation with daily rate limits.",
      tech: ["SwiftUI", "Node.js", "Express", "TypeScript", "Prisma", "PostgreSQL", "Socket.IO", "Firebase"],
    },
    {
      title: "Gotham Watch",
      subtitle: "Crime Analysis Platform",
      organization: "Arizona State University",
      period: "Oct 2024 – Dec 2024",
      description:
        "An interactive crime analysis platform with React data visualizations, powered by Python and Flask APIs running SPARQL queries over a GraphDB knowledge graph and deployed on Microsoft Azure.",
      tech: ["React", "Python", "Flask", "SPARQL", "GraphDB", "Azure"],
      github: "https://github.com/amurark3/gotham-watch",
    },
  ],

  skills: [
    {
      category: "Languages",
      items: ["JavaScript", "TypeScript", "Python", "Java", "SQL", "Swift", "SPARQL"],
    },
    {
      category: "Frontend",
      items: [
        "React.js", "Next.js", "Redux", "Zustand", "React Router", "SWR", "Tailwind CSS",
        "Material UI", "Storybook", "HTML5", "CSS3", "Responsive Design", "SwiftUI",
      ],
    },
    {
      category: "Backend & Data",
      items: [
        "Node.js", "Express", "FastAPI", "Spring Boot", "REST APIs", "GraphQL", "PostgreSQL",
        "Supabase", "SQLite", "Firebase", "Prisma ORM", "Flask", "OAuth", "SSO", "JWT", "pgvector",
      ],
    },
    {
      category: "Real-Time & AI",
      items: [
        "WebSockets", "Server-Sent Events (SSE)", "Kafka", "SharedWorker", "Socket.IO", "asyncio",
        "LangChain", "Agentic AI", "RAG", "MCP", "Groq", "scikit-learn", "NumPy", "Pandas",
      ],
    },
    {
      category: "Architecture & Performance",
      items: [
        "Micro Frontends", "Module Federation", "React Server Components", "Webpack",
        "Code Splitting", "Lazy Loading", "Core Web Vitals", "Lighthouse", "WCAG",
      ],
    },
    {
      category: "Testing & Cloud",
      items: [
        "Jest", "React Testing Library", "pytest", "Git", "CI/CD", "GitHub Actions", "AWS",
        "Azure", "Vercel", "Render", "ESLint", "Ruff", "Adobe Analytics",
      ],
    },
  ],

  education: [
    {
      school: "Arizona State University",
      url: "https://www.asu.edu/",
      degree: "Master of Science in Software Engineering",
      period: "Aug 2024 – May 2026",
      location: "Tempe, AZ",
      gpa: "3.63 / 4.0",
      coursework: ["Data Structures & Algorithms", "Data Visualization", "Cybersecurity", "Cloud Computing"],
    },
    {
      school: "Manipal University Jaipur",
      url: "https://jaipur.manipal.edu/",
      degree: "Bachelor of Technology in Computer Science and Engineering",
      period: "Aug 2015 – May 2019",
      location: "Jaipur, India",
    },
  ],

  awards: [
    {
      title: "Excellence Award",
      organization: "Walmart Global Tech",
      date: "May 2023",
      detail: "Omni Item Allocation features, performance optimizations, and analytics tracking.",
    },
    {
      title: "Spotlight Award",
      organization: "Nineleaps",
      date: "Mar 2021",
      detail: "Outstanding project execution and team collaboration.",
    },
    {
      title: "Hackathon Champion — “Million Dollar Idea”",
      organization: "Nineleaps",
      date: "Jun 2019",
      detail: "Innovative business solution.",
    },
    {
      title: "“Feather on the Hat” Awards",
      organization: "Nineleaps",
      detail: "Multiple recognitions for consistent high performance and work quality.",
    },
  ],
};
