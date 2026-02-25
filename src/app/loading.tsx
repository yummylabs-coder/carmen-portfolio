import { DashboardShell } from "@/components/dashboard/DashboardShell";

function Pulse({ className }: { className?: string }) {
  return <div className={`animate-pulse rounded-lg bg-neutral-100 ${className ?? ""}`} />;
}

export default function HomeLoading() {
  return (
    <DashboardShell>
      {/* Greeting skeleton */}
      <div className="flex flex-col gap-2">
        <Pulse className="h-8 w-72" />
        <Pulse className="h-4 w-96" />
      </div>

      {/* Featured work skeleton */}
      <div className="rounded-3xl bg-neutral-50 p-6">
        <Pulse className="mb-6 h-5 w-28" />
        <div className="flex gap-6">
          <div className="w-[320px] shrink-0 rounded-3xl bg-white p-0">
            <Pulse className="h-[200px] w-full rounded-t-3xl" />
            <div className="flex flex-col gap-2 p-4">
              <Pulse className="h-5 w-32" />
              <Pulse className="h-4 w-full" />
              <Pulse className="mt-2 h-11 w-full rounded-lg" />
            </div>
          </div>
          <div className="hidden w-[320px] shrink-0 rounded-3xl bg-white p-0 sm:block">
            <Pulse className="h-[200px] w-full rounded-t-3xl" />
            <div className="flex flex-col gap-2 p-4">
              <Pulse className="h-5 w-32" />
              <Pulse className="h-4 w-full" />
              <Pulse className="mt-2 h-11 w-full rounded-lg" />
            </div>
          </div>
          <div className="hidden w-[320px] shrink-0 rounded-3xl bg-white p-0 xl:block">
            <Pulse className="h-[200px] w-full rounded-t-3xl" />
            <div className="flex flex-col gap-2 p-4">
              <Pulse className="h-5 w-32" />
              <Pulse className="h-4 w-full" />
              <Pulse className="mt-2 h-11 w-full rounded-lg" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom widgets skeleton */}
      <div className="flex w-full flex-col gap-5 lg:flex-row">
        <div className="flex-1 rounded-xl border border-neutral-200 p-[25px]">
          <div className="mb-4 flex items-center gap-2">
            <Pulse className="h-7 w-7 rounded-md" />
            <Pulse className="h-4 w-24" />
          </div>
          <div className="flex gap-8">
            <div className="flex flex-1 flex-col gap-2">
              <Pulse className="h-8 w-8 rounded-lg" />
              <Pulse className="h-7 w-12" />
              <Pulse className="h-4 w-24" />
            </div>
            <div className="flex flex-1 flex-col gap-2">
              <Pulse className="h-8 w-8 rounded-lg" />
              <Pulse className="h-7 w-12" />
              <Pulse className="h-4 w-28" />
            </div>
            <div className="flex flex-1 flex-col gap-2">
              <Pulse className="h-8 w-8 rounded-lg" />
              <Pulse className="h-7 w-14" />
              <Pulse className="h-4 w-32" />
            </div>
          </div>
        </div>
        <div className="flex-1 rounded-xl border border-neutral-200 p-[25px]">
          <div className="mb-3 flex items-center gap-2">
            <Pulse className="h-8 w-8 rounded-md" />
            <Pulse className="h-4 w-28" />
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex items-start gap-3 p-2">
              <Pulse className="h-7 w-7 shrink-0 rounded-md" />
              <div className="flex flex-1 flex-col gap-1">
                <Pulse className="h-4 w-full" />
                <Pulse className="h-3 w-16" />
              </div>
            </div>
            <div className="flex items-start gap-3 p-2">
              <Pulse className="h-7 w-7 shrink-0 rounded-md" />
              <div className="flex flex-1 flex-col gap-1">
                <Pulse className="h-4 w-[80%]" />
                <Pulse className="h-3 w-16" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
