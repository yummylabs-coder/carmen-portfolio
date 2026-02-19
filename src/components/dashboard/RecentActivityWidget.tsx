"use client";

import { ActivityIcon, UpdateIcon, PublishIcon, WelcomeIcon } from "@/components/icons/NavIcons";
import { ScrollReveal } from "./ScrollReveal";

const activityIconMap = {
  update: UpdateIcon,
  publish: PublishIcon,
  welcome: WelcomeIcon,
} as const;

const activities = [
  {
    id: "1",
    icon: "update" as const,
    text: "Updated ",
    projectName: "Learn.xyz",
    rest: " case study with new outcomes",
    timestamp: "3 days ago",
  },
  {
    id: "2",
    icon: "publish" as const,
    text: "Published ",
    projectName: "Neotaste",
    rest: " sprint retrospective",
    timestamp: "1 week ago",
  },
  {
    id: "3",
    icon: "welcome" as const,
    text: "Welcomed Sprint #3 cohort to ",
    projectName: "Yummy Labs",
    rest: "",
    timestamp: "2 weeks ago",
  },
];

export function RecentActivityWidget() {
  return (
    <ScrollReveal delay={0.3} className="flex-1">
      <div
        className="flex h-full flex-col rounded-xl border border-neutral-200 p-[25px]"
        style={{
          background: "var(--brand-canvas)",
          boxShadow:
            "0px 1px 3px 0px rgba(48,1,1,0.04), 0px 0px 0px 1px rgba(48,1,1,0.04)",
        }}
      >
        {/* Header */}
        <div className="mb-3 flex items-center gap-[10px]">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-blue-50">
            <ActivityIcon size={20} className="text-blue-500" />
          </div>
          <h3 className="font-brand text-14 font-bold text-text-primary">
            Recent activity
          </h3>
        </div>

        {/* Activity items */}
        <div className="flex flex-col gap-2">
          {activities.map((activity) => {
            const Icon = activityIconMap[activity.icon];
            return (
              <div
                key={activity.id}
                className="flex items-start gap-3 rounded-md p-2"
              >
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-bg-muted">
                  <Icon size={14} className="text-neutral-500" />
                </div>
                <div className="flex flex-col">
                  <p className="text-13 leading-[1.5] text-brand-ink">
                    {activity.text}
                    <span className="font-semibold">{activity.projectName}</span>
                    {activity.rest}
                  </p>
                  <span className="text-11 text-text-tertiary">
                    {activity.timestamp}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </ScrollReveal>
  );
}
