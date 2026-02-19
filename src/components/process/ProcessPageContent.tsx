"use client";

import { useState, useCallback } from "react";
import { ProjectTypeSelector } from "./ProjectTypeSelector";
import { GanttTimeline } from "./GanttTimeline";
import { PhaseDetailsPanel } from "./PhaseDetailsPanel";
import { blocks, modes } from "./processData";
import type { ModeId } from "./processData";

export function ProcessPageContent() {
  const [activeMode, setActiveMode] = useState<ModeId>("zero-to-one");
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);

  const handleModeChange = useCallback((mode: ModeId) => {
    setActiveMode(mode);
    setSelectedBlockId(null); // reset selection when switching modes
  }, []);

  const handleSelectBlock = useCallback((id: string) => {
    setSelectedBlockId((prev) => (prev === id ? null : id));
  }, []);

  const config = modes[activeMode];
  const selectedPhase = selectedBlockId ? blocks[selectedBlockId] ?? null : null;

  return (
    <>
      {/* Page header */}
      <div className="flex flex-col gap-2">
        <h1 className="font-brand text-22 font-bold text-brand-ink">
          My Process
        </h1>
        <p className="max-w-[600px] text-15 leading-[1.6] text-neutral-500">
          I don&apos;t believe in one-size-fits-all.{" "}
          <strong className="text-brand-ink">
            Every project gets the approach it needs
          </strong>{" "}
          — sometimes deep research, sometimes shipping code in a day.
        </p>
      </div>

      {/* Project type selector */}
      <ProjectTypeSelector activeMode={activeMode} onChange={handleModeChange} />

      {/* Main layout: timeline + details panel */}
      <div className="grid items-start gap-6 lg:grid-cols-[1fr_320px]">
        <GanttTimeline
          config={config}
          selectedBlock={selectedBlockId}
          onSelectBlock={handleSelectBlock}
        />
        <PhaseDetailsPanel phase={selectedPhase} />
      </div>

      {/* Philosophy note */}
      <div className="flex items-start gap-[10px] rounded-lg border border-blue-100 bg-blue-50 p-[14px_16px]">
        <span className="shrink-0 text-[18px]">&#x1F4A1;</span>
        <p className="text-12 leading-[1.5] text-blue-700">
          <strong className="font-semibold">Switch project types</strong> to see
          how the timeline adapts. Same toolkit, different sequences — that&apos;s
          how I actually work.
        </p>
      </div>
    </>
  );
}
