import { DashboardShell } from "@/components/dashboard/DashboardShell";

function Pulse({ className }: { className?: string }) {
  return <div className={`animate-pulse rounded-lg bg-neutral-100 ${className ?? ""}`} />;
}

export default function CaseStudyLoading() {
  return (
    <DashboardShell>
      <div className="flex flex-col gap-14">
        {/* Hero skeleton */}
        <div className="full-bleed-panel full-bleed-hero flex flex-col justify-center gap-4 px-4 pb-10 pt-[96px] md:px-6 lg:min-h-[calc(100vh-36px)] lg:px-[44px] lg:pt-10"
          style={{ background: "#F5F5F3" }}
        >
          <Pulse className="h-4 w-32" />
          <div className="flex gap-2">
            <Pulse className="h-7 w-24 rounded-full" />
            <Pulse className="h-7 w-20 rounded-full" />
          </div>
          <Pulse className="h-12 w-[70%] max-w-[600px]" />
          <Pulse className="h-5 w-[50%] max-w-[400px]" />
          <Pulse className="h-5 w-[55%] max-w-[450px]" />
          <Pulse className="h-4 w-32" />
          <div className="flex gap-2">
            <Pulse className="h-8 w-24 rounded-full" />
            <Pulse className="h-8 w-20 rounded-full" />
            <Pulse className="h-8 w-28 rounded-full" />
          </div>
          <Pulse className="mt-2 h-12 w-40 rounded-lg" />
        </div>

        {/* Content skeleton */}
        <div className="flex flex-col gap-6">
          <Pulse className="h-7 w-32" />
          <Pulse className="h-4 w-[90%] max-w-[700px]" />
          <Pulse className="h-4 w-[80%] max-w-[600px]" />
          <Pulse className="h-4 w-[60%] max-w-[500px]" />
        </div>
      </div>
    </DashboardShell>
  );
}
