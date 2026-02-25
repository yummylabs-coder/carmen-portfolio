import { DashboardShell } from "@/components/dashboard/DashboardShell";

function Pulse({ className }: { className?: string }) {
  return <div className={`animate-pulse rounded-lg bg-neutral-100 ${className ?? ""}`} />;
}

export default function ExperienceLoading() {
  return (
    <DashboardShell>
      <div className="flex flex-col gap-2">
        <Pulse className="h-8 w-40" />
        <Pulse className="h-4 w-80" />
      </div>

      {/* Timeline entries */}
      <div className="flex flex-col gap-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex gap-6 rounded-xl border border-neutral-200 p-6">
            <Pulse className="h-12 w-12 shrink-0 rounded-xl" />
            <div className="flex flex-1 flex-col gap-3">
              <Pulse className="h-6 w-40" />
              <Pulse className="h-4 w-24" />
              <Pulse className="h-4 w-full" />
              <Pulse className="h-4 w-[80%]" />
            </div>
          </div>
        ))}
      </div>
    </DashboardShell>
  );
}
