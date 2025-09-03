"use client";
import React, { useMemo, useState } from "react";


// ---------------------------------------------
// Types
// ---------------------------------------------
interface Experience {
  company: string;
  role: string;
  period: string;
  bullets: string[];
  tags: string[];
}

interface Project {
  title: string;
  description: string;
  stack: string[];
  highlights: string[];
  links?: { github?: string; demo?: string };
}

interface Social { name: string; url: string }

interface CurrentRole {
  company: string;
  role: string;
  start: string;
  summary: string;
  bullets: string[];
  links?: { site?: string; repo?: string };
}

// ---------------------------------------------
// Data (replace with your real info)
// ---------------------------------------------
const EXPERIENCE: Experience[] = [
  {
    company: "IFS Copperleaf",
    role: "Software Developer Co-op",
    period: "Sep 2025 – Present",
    bullets: [
      "Working with the PlatOps team on the enterprise Copperleaf Portfolio product - an infrastructure asset investment managmenet software tool."
    ],
    tags: ["Git - Version Control", "AI & Development", "C#", "Angular", ".NET Framework", "Oracle Relational Database", "Object Oriented Programming"],
  },
    {
    company: "UBC Envision",
    role: "Software Developer",
    period: "May 2025 – Sep 2025",
    bullets: [
      "Developed a dynamic recruiting portal with Astro, Express.js, and Tailwind, featuring searchable role cards, secure file handling, and production-ready designs translated from Figma."
    ],
    tags: ["Git - Version Control", "Collaboration with Design", "Web-Development", "JavaScript", "Tailwind", "Docker"],
  },
    {
    company: "Ghella Canada — Broadway Subway Project",
    role: "Project Coordinator",
    period: "Jul 2022 – Sep 2024",
    bullets: [
      "Led cross-functional coordination with government and internal project teams, improving execution workflows, tracking project milestones, reducing monthly cost overruns, and leading labour manpower on Metro Vancouver's largest construction project."
    ],
    tags: ["Project Management", "Communcation", "Teamwork", "Client Management"],
  },
  {
    company: "BBA Consultants",
    role: "Engineering Co-op Student",
    period: "Jan 2021 – Sep 2021",
    bullets: [
      "Shadowed engineering project managers and assisted them with client meetings, technical documentation reports, project budgeting and resource allocation."
    ],
    tags: ["Project Management", "Client Management", "Budget Management", "Microsoft Office"],
  },
];

const CURRENT_ROLE: CurrentRole = {
  company: "IFS Copperleaf",
  role: "Software Developer Co‑op",
  start: "Sep 2025 – Present",
  summary:
    "Currently working with the PlatOps team on the Copperleaf Portfolio product line.",
  bullets: [
    
  ],
  links: {
    site: "https://www.ifs.com/assets/corporate/copperleaf"
  },
};

const PROJECTS: Project[] = [
    {
    title: "AI Equipment Tracker (React + Supabase)",
    description:
      "Minimalist SaaS-style UI for check‑in/out, cost calculator, and maintenance message helper.",
    stack: ["React", "Supabase", "Tailwind", "OpenAI API"],
    highlights: ["Database", "Cost calc", "Export to Excel", "UI"],
    links: {
      github: "https://github.com/akhalifaa/ai-equipment-tracker"
    },
  },
  {
    title: "Personal Finance Tracker & Budgeting (Java)",
    description:
      "Desktop app with transaction logging, monthly budgets, progress bars, and JSON save/load.",
    stack: ["Java", "Swing", "JUnit", "JSON"],
    highlights: ["Add/View transactions", "Budget alerts", "Persisted state"],
    links: {
      github: "https://github.com/akhalifaa/javaBudgetManager"
    },
  },
  {
    title: "Resume Analyzer (Flask + spaCy)",
    description:
      "Uploads a resume & JD, extracts skills, compares keywords, and visualizes alignment.",
    stack: ["Python", "Flask", "spaCy", "Supabase (planned)"],
    highlights: ["Keyword extraction", "Match scoring", "Actionable tips"],
    links: {
      github: "https://github.com/akhalifaa/resume-analyzer-dashboard"
    },
  },
  {
    title: "Microsoft Education Product Case (January 2025 - April 2025)",
    description:
      "Collaborated with Microsoft employees in Vancouver on a term long case project; reasearching, developing and presenting an AI Educational tool that fits the company's product suite and core beliefs.",
    stack: ["Stakeholder Engagement", "Customer Interviews", "Research", "Presenting", "Product Development"],
    highlights: [],
    links: {
      
    },
  }
];

const SOCIALS: Social[] = [
  { name: "GitHub", url: "https://github.com/akhalifaa" },
  { name: "LinkedIn", url: "https://linkedin.com/in/abdulkhalifa" },
  { name: "Email", url: "mailto:akhalifaa99@gmail.com" },
];

// ---------------------------------------------
// Tiny tests (dev-only) to validate filtering
//   Toggle RUN_TESTS to true when developing locally
// ---------------------------------------------
const RUN_TESTS = false;
function filterProjects(projects: Project[], q: string): Project[] {
  const needle = q.trim().toLowerCase();
  if (!needle) return projects;
  return projects.filter((p) =>
    [p.title, p.description, ...p.stack, ...p.highlights]
      .join(" ")
      .toLowerCase()
      .includes(needle)
  );
}
function runTests() {
  console.log("[Portfolio] Running smoke tests...");
  console.assert(filterProjects(PROJECTS, "").length === PROJECTS.length, "Empty query should return all projects");
  const javaHit = filterProjects(PROJECTS, "java").some((p) => p.title.includes("Java"));
  console.assert(javaHit, "Query 'java' should match the Java project");
  const spaCyHit = filterProjects(PROJECTS, "spacy").some((p) => /spaCy/i.test(p.title) || /spaCy/i.test(p.description));
  console.assert(spaCyHit, "Query 'spacy' should match the Resume Analyzer");
  const crudHit = filterProjects(PROJECTS, "crud").some((p) => p.title.includes("Equipment Tracker"));
  console.assert(crudHit, "Query 'crud' should match the Equipment Tracker via highlights");
  console.log("[Portfolio] Smoke tests complete.");
}
if (RUN_TESTS && typeof window !== "undefined") runTests();

// ---------------------------------------------
// Component
// ---------------------------------------------
export default function Page() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return PROJECTS;
    return PROJECTS.filter((p) =>
      [p.title, p.description, ...p.stack, ...p.highlights]
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }, [query]);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 antialiased">
      {/* Header */}
      <header className="sticky top-0 z-10 backdrop-blur supports-[backdrop-filter]:bg-neutral-950/70 border-b border-neutral-800">
        <div className="mx-auto max-w-5xl px-4 py-4 flex items-center justify-between">
          <a href="#home" className="font-semibold tracking-tight">AK</a>
          <nav className="hidden gap-6 text-sm md:flex">
            <a href="#experience" className="hover:text-white/90">Experience</a>
            <a href="#projects" className="hover:text-white/90">Projects</a>
            <a href="#skills" className="hover:text-white/90">Skills</a>
            <a href="#contact" className="hover:text-white/90">Contact</a>
          </nav>
          <a
            href="/Abdul_Khalifa_Resume.pdf"
            className="rounded-2xl px-4 py-2 text-sm bg-white text-neutral-900 font-medium hover:opacity-90"
          >
            Download Resume
          </a>
        </div>
      </header>

      {/* Hero */}
      <section id="home" className="mx-auto max-w-5xl px-4 py-16 md:py-24">
        <div className="grid md:grid-cols-[1.3fr_1fr] gap-10 items-center">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-white/60">Software Developer • Engineer</p>
            <h1 className="mt-3 text-4xl md:text-6xl font-bold leading-tight">
              Abdul Khalifa
            </h1>
            <p className="mt-4 text-white/80 leading-relaxed">
              CS @ UBC. Originally, a civil engineer with two years of production experience. My motivation: figure out people's problems and try to build solutions for them. In my personal life, I love playing soccer competitively and exploring the outdoors with my friends.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {SOCIALS.map((s) => (
                <a key={s.name} href={s.url} className="rounded-xl border border-neutral-800 px-4 py-2 text-sm hover:bg-neutral-900">
                  {s.name}
                </a>
              ))}
            </div>
          </div>

          {/* Current Role (replaces Featured Project) */}
          <div className="rounded-3xl border border-neutral-800 p-6 bg-gradient-to-b from-neutral-900 to-neutral-950 shadow-xl">
            <h3 className="text-lg font-semibold">Current Role</h3>
            <p className="mt-1 text-sm text-white/70">{CURRENT_ROLE.role} @ {CURRENT_ROLE.company}</p>
            <p className="text-xs text-white/50">{CURRENT_ROLE.start}</p>
            <p className="mt-3 text-sm text-white/80">{CURRENT_ROLE.summary}</p>
            <ul className="mt-4 space-y-2 text-sm text-white/80 list-disc pl-5">
              {CURRENT_ROLE.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
            <div className="mt-6 flex gap-3">
              {CURRENT_ROLE.links?.site && (
                <a href={CURRENT_ROLE.links.site} className="rounded-xl bg-white text-neutral-900 px-4 py-2 text-sm font-medium hover:opacity-90">Company</a>
              )}
              {CURRENT_ROLE.links?.repo && (
                <a href={CURRENT_ROLE.links.repo} className="rounded-xl border border-neutral-800 px-4 py-2 text-sm hover:bg-neutral-900">Related Code</a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Experience (now above Projects) */}
      <section id="experience" className="mx-auto max-w-5xl px-4 py-12">
        <h2 className="text-2xl md:text-3xl font-semibold">Experience</h2>
        <div className="mt-6 space-y-6">
          {EXPERIENCE.map((e) => (
            <div key={e.company} className="rounded-2xl border border-neutral-800 p-5">
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <div>
                  <h3 className="text-lg font-semibold">{e.role}</h3>
                  <p className="text-white/70">{e.company}</p>
                </div>
                <p className="text-sm text-white/60">{e.period}</p>
              </div>
              <ul className="mt-4 space-y-2 text-white/80 text-sm list-disc pl-5">
                {e.bullets.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
              <div className="mt-4 flex flex-wrap gap-2">
                {e.tags.map((t) => (
                  <span key={t} className="rounded-full border border-neutral-800 px-2.5 py-1 text-xs text-white/80">{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="mx-auto max-w-5xl px-4 py-12">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-2xl md:text-3xl font-semibold">Projects</h2>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects…"
            className="w-56 rounded-xl border border-neutral-800 bg-neutral-950 px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-white/10"
          />
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {filtered.map((p) => (
            <article key={p.title} className="rounded-2xl border border-neutral-800 p-5 bg-neutral-950/40 hover:bg-neutral-950 transition">
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-lg font-semibold leading-tight">{p.title}</h3>
                <div className="flex gap-2">
                  {p.links?.demo && (
                    <a href={p.links.demo} className="text-sm underline underline-offset-4 hover:opacity-90">Demo</a>
                  )}
                  {p.links?.github && (
                    <a href={p.links.github} className="text-sm underline underline-offset-4 hover:opacity-90">Code</a>
                  )}
                </div>
              </div>
              <p className="mt-2 text-white/80 text-sm">{p.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {p.stack.map((t) => (
                  <span key={t} className="rounded-full border border-neutral-800 px-2.5 py-1 text-xs text-white/80">{t}</span>
                ))}
              </div>
              <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-1 text-sm text-white/80 list-disc pl-5">
                {p.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="mx-auto max-w-5xl px-4 py-12">
        <h2 className="text-2xl md:text-3xl font-semibold">Skills</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <SkillCard title="Languages" items={["Java", "Python", "C/C++", "JavaScript"]} />
          <SkillCard title="Frameworks & Tools" items={["React", "Flask", "Tailwind", "Supabase", "Docker", "Git"]} />
          <SkillCard title="CS Topics" items={["OOP", "Data Structures", "Algorithms", "Testing"]} />
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="mx-auto max-w-5xl px-4 pb-24 pt-12">
        <div className="rounded-3xl border border-neutral-800 p-8 text-center bg-neutral-950/40">
          <h2 className="text-2xl md:text-3xl font-semibold">Let’s work together</h2>
          <p className="mt-2 text-white/80">
            Open to Software Developer Co‑ops, AI/Automation projects, and product work.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a
              href="mailto:akhalifaa99@gmail.com?subject=Let’s chat, Abdul!"
              className="rounded-2xl px-5 py-2 bg-white text-neutral-900 text-sm font-medium hover:opacity-90"
            >
              Email Me
            </a>
            <a
              href="https://linkedin.com/in/abdulkhalifa"
              className="rounded-2xl px-5 py-2 border border-neutral-800 text-sm hover:bg-neutral-900"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </section>

      <footer className="border-t border-neutral-800 py-10 text-center text-sm text-white/60">
        © {new Date().getFullYear()} Abdul Khalifa. Built with React + Tailwind.
      </footer>
    </div>
  );
}

function SkillCard({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-2xl border border-neutral-800 p-5">
      <h3 className="font-semibold">{title}</h3>
      <ul className="mt-3 grid grid-cols-2 gap-2 text-sm text-white/80">
        {items.map((i) => (
          <li key={i} className="rounded-xl border border-neutral-800 px-3 py-1 text-center">{i}</li>
        ))}
      </ul>
    </div>
  );
}
