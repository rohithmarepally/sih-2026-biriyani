import { FeatureCard } from "@/components/feature-card";

const features = [
  {
    title: "Next.js frontend",
    description: "App Router, TypeScript, and Tailwind CSS are ready for your product UI."
  },
  {
    title: "FastAPI backend",
    description: "A typed API layer with automatic OpenAPI documentation at /docs."
  },
  {
    title: "PostgreSQL database",
    description: "SQLAlchemy 2 models and a Docker Compose database complete the foundation."
  }
];

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen max-w-6xl flex-col px-6 py-10 sm:px-10">
      <nav className="flex items-center justify-between">
        <span className="text-lg font-semibold tracking-tight text-leaf">sih / biriyani</span>
        <span className="rounded-full border border-leaf/20 px-3 py-1 text-xs font-medium text-leaf">
          full-stack starter
        </span>
      </nav>

      <section className="grid flex-1 items-center gap-12 py-20 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.25em] text-saffron">
            Welcome to your workspace
          </p>
          <h1 className="max-w-3xl text-5xl font-semibold leading-tight tracking-tight sm:text-7xl">
            Build something <span className="text-leaf">delicious.</span>
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-8 text-ink/65">
            Your full-stack foundation is ready. Add product features in the frontend and expose
            clean, database-backed endpoints from the FastAPI service.
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <a
              className="rounded-full bg-leaf px-6 py-3 text-sm font-semibold text-white transition hover:bg-leaf/90"
              href="http://localhost:8000/docs"
              target="_blank"
              rel="noreferrer"
            >
              Open API docs
            </a>
            <a
              className="rounded-full border border-ink/15 px-6 py-3 text-sm font-semibold text-ink transition hover:border-leaf hover:text-leaf"
              href="https://nextjs.org/docs"
              target="_blank"
              rel="noreferrer"
            >
              Read the docs
            </a>
          </div>
        </div>

        <div className="rounded-3xl bg-leaf p-8 text-white shadow-2xl shadow-leaf/20">
          <div className="mb-16 flex items-start justify-between">
            <span className="text-4xl" aria-hidden="true">
              🍚
            </span>
            <span className="rounded-full bg-white/15 px-3 py-1 text-xs">v0.1</span>
          </div>
          <p className="text-sm font-medium text-white/70">Project status</p>
          <p className="mt-2 text-3xl font-semibold">Ready to cook</p>
          <div className="mt-8 h-1.5 overflow-hidden rounded-full bg-white/20">
            <div className="h-full w-4/5 rounded-full bg-saffron" />
          </div>
          <p className="mt-3 text-sm text-white/70">Frontend, API, and database connected.</p>
        </div>
      </section>

      <section className="grid gap-4 border-t border-ink/10 pt-8 md:grid-cols-3">
        {features.map((feature) => (
          <FeatureCard key={feature.title} {...feature} />
        ))}
      </section>
    </main>
  );
}
