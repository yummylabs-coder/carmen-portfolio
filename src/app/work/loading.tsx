import { DashboardShell } from "@/components/dashboard/DashboardShell";

function Pulse({ className }: { className?: string }) {
  return <div className={`animate-pulse rounded-lg bg-neutral-100 ${className ?? ""}`} />;
}

export default function WorkLoading() {
  return (
    <DashboardShell>
      {/* Page header skeleton */}
      <div className="flex flex-col gap-2">
        <Pulse className="h-8 w-32" />
        <Pulse className="h-4 w-72" />
      </div>

      {/* Featured skeleton */}
      <div className="rounded-3xl bg-neutral-50 p-6">
        <Pulse className="mb-4 h-5 w-28" />
        <div className="flex flex-col overflow-hidden rounded-3xl bg-white md:h-[338px] md:flex-row">
          <Pulse className="h-[220px] w-full md:h-full md:w-1/2" />
          <div className="flex flex-1 flex-col gap-3 p-5 md:p-6">
            <Pulse className="h-7 w-40" />
            <Pulse className="h-4 w-full" />
            <Pulse className="h-4 w-[80%]" />
            <div className="flex gap-2">
              <Pulse className="h-6 w-20 rounded-full" />
              <Pulse className="h-6 w-24 rounded-full" />
            </div>
            <Pulse className="mt-auto h-11 w-full rounded-lg" />
          </div>
        </div>
      </div>

      {/* Grid skeleton */}
      <div className="flex flex-col gap-3">
        <Pulse className="h-5 w-28" />
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="overflow-hidden rounded-3xl border border-neutral-50 bg-white">
              <Pulse className="h-[200px] w-full" />
              <div className="flex flex-col gap-2 p-4">
                <Pulse className="h-5 w-32" />
                <Pulse className="h-4 w-full" />
                <Pulse className="h-4 w-[60%]" />
                <Pulse className="mt-2 h-11 w-full rounded-lg" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardShell>
  );
}
