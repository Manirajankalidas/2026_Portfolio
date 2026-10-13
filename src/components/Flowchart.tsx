import type { Project } from "@/content/projects";

type Lane = NonNullable<Project["flow"]>[number];

export default function Flowchart({ lanes }: { lanes: Lane[] }) {
  return (
    <div className="space-y-6">
      {lanes.map((lane, li) => (
        <div key={lane.label} className="rounded-[28px] bg-alt p-6 md:p-8">
          <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
            <span className="flex size-7 items-center justify-center rounded-full bg-btn text-sm font-semibold text-white">
              {li + 1}
            </span>
            <h3 className="text-xl font-bold tracking-tight">{lane.label}</h3>
            <p className="text-[15px] text-muted">{lane.note}</p>
          </div>
          <ol
            className="mt-7 grid gap-9 md:gap-6 md:[grid-template-columns:repeat(var(--n),minmax(0,1fr))]"
            style={{ "--n": lane.steps.length } as React.CSSProperties}
          >
            {lane.steps.map((step, i) => (
              <li key={step.title} className="relative rounded-2xl border border-line bg-card p-5">
                <span className="text-xs font-semibold text-accent">Step {i + 1}</span>
                <p className="mt-1 text-lg font-semibold leading-tight">{step.title}</p>
                <p className="mt-2 text-[15px] leading-snug text-muted">{step.detail}</p>
                {i < lane.steps.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="absolute -bottom-[26px] left-1/2 flex size-6 -translate-x-1/2 items-center justify-center text-accent md:-right-[22px] md:bottom-auto md:left-auto md:top-1/2 md:-translate-y-1/2 md:translate-x-0"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="rotate-90 md:rotate-0">
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </span>
                )}
              </li>
            ))}
          </ol>
        </div>
      ))}
    </div>
  );
}
