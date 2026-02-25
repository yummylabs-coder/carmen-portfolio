"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  UpdateIcon,
  PublishIcon,
  WelcomeIcon,
  ExperimentsIcon,
} from "@/components/icons/NavIcons";

const activityIconMap = {
  update: UpdateIcon,
  publish: PublishIcon,
  welcome: WelcomeIcon,
  experiment: ExperimentsIcon,
} as const;

interface Activity {
  id: string;
  icon: keyof typeof activityIconMap;
  text: string;
  projectName: string;
  rest: string;
  timestamp: string;
}

const baseActivities: Activity[] = [
  {
    id: "1",
    icon: "update",
    text: "Updated ",
    projectName: "Learn.xyz",
    rest: " case study with new outcomes",
    timestamp: "3 days ago",
  },
  {
    id: "2",
    icon: "publish",
    text: "Published ",
    projectName: "Neotaste",
    rest: " sprint retrospective",
    timestamp: "1 week ago",
  },
  {
    id: "3",
    icon: "welcome",
    text: "Welcomed Sprint #3 cohort to ",
    projectName: "Yummy Labs",
    rest: "",
    timestamp: "2 weeks ago",
  },
];

const liveItem: Activity = {
  id: "live",
  icon: "experiment",
  text: "Added a new experiment to ",
  projectName: "the lab",
  rest: "",
  timestamp: "Just now",
};

/* ── Live pulse indicator ─────────────────────────────── */
function LivePulse() {
  return (
    <span className="relative ml-1 inline-flex h-2 w-2 shrink-0 translate-y-[-1px]">
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
      <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
    </span>
  );
}

export function RecentActivityWidget() {
  const [showLive, setShowLive] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowLive(true), 2200);
    return () => clearTimeout(timer);
  }, []);

  const activities = showLive ? [liveItem, ...baseActivities] : baseActivities;

  return (
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        delay: 0.8,
        duration: 0.5,
        ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number],
      }}
      className="flex-1"
    >
      <div
        className="flex h-full flex-col rounded-xl border border-sand-300 bg-sand-100 p-[25px]"
      >
        {/* Header */}
        <div className="mb-4">
          <h3 className="font-brand text-15 font-bold text-brand-ink">
            Recent activity
          </h3>
        </div>

        {/* Activity feed with timeline connector */}
        <div className="relative flex flex-col">
          {/* Vertical timeline line */}
          <div
            className="absolute left-[13px] top-[28px] bottom-[28px] w-px bg-neutral-150"
            style={{ background: "linear-gradient(to bottom, #e5e5e5, transparent)" }}
          />

          <AnimatePresence initial={false}>
            {activities.map((activity, index) => {
              const Icon = activityIconMap[activity.icon];
              const isLive = activity.id === "live";
              const isLast = index === activities.length - 1;
              return (
                <motion.div
                  key={activity.id}
                  layout
                  initial={isLive ? { opacity: 0, x: -12, height: 0 } : false}
                  animate={{ opacity: 1, x: 0, height: "auto" }}
                  transition={{
                    duration: 0.4,
                    ease: [0.25, 0.4, 0.25, 1],
                    layout: { duration: 0.3 },
                  }}
                  className={`relative flex items-start gap-3 rounded-lg px-1 py-2.5 transition-colors ${
                    isLive ? "bg-blue-50/50" : ""
                  } ${!isLast ? "mb-1" : ""}`}
                >
                  {/* Icon — same size as header icon for alignment */}
                  <div
                    className={`relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-white ${
                      isLive ? "ring-2 ring-blue-200/50" : ""
                    }`}
                  >
                    <Icon
                      size={14}
                      className={isLive ? "text-blue-600" : "text-neutral-500"}
                    />
                  </div>

                  {/* Text content */}
                  <div className="flex min-w-0 flex-1 flex-col gap-[2px]">
                    <p className="text-13 leading-[1.5] text-brand-ink">
                      {activity.text}
                      <span className="font-semibold">
                        {activity.projectName}
                      </span>
                      {activity.rest}
                    </p>
                    <span
                      className={`flex items-center text-11 ${
                        isLive
                          ? "font-medium text-emerald-600"
                          : "text-text-tertiary"
                      }`}
                    >
                      {activity.timestamp}
                      {isLive && <LivePulse />}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
