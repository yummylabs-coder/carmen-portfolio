"use client";

import { motion, useReducedMotion } from "framer-motion";
import { LineMask } from "../LineMask";
import {
  SectionRoom,
  SectionLabel,
  SectionBody,
} from "../SectionRoom";
import { learnRooms, ease, duration, stagger, spring } from "@/lib/motion";
import { ROLE } from "./LearnData";

const ICONS = {
  phone: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="2" width="14" height="20" rx="3" />
      <line x1="12" y1="18" x2="12" y2="18.01" />
    </svg>
  ),
  laptop: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="12" rx="2" />
      <path d="M2 20h20" />
    </svg>
  ),
  globe: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  ),
};

export function LearnRole() {
  const room = learnRooms.role;
  const shouldReduce = useReducedMotion();

  return (
    <SectionRoom colors={room}>
      <SectionLabel accentColor={room.accent}>The Work</SectionLabel>

      <LineMask
        as="h2"
        className="mb-8 text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[1.1] tracking-tight"
        delay={0.15}
      >
        {ROLE.headline}
      </LineMask>

      <SectionBody>{ROLE.body}</SectionBody>

      {/* Three cards */}
      <motion.div
        className="mt-16 grid gap-6 sm:grid-cols-3"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: stagger.card } },
        }}
      >
        {ROLE.cards.map((card) => (
          <motion.div
            key={card.title}
            className="group relative rounded-2xl border p-6 transition-shadow hover:shadow-lg"
            style={{
              borderColor: `${room.text}12`,
              backgroundColor: `${room.accent}06`,
            }}
            variants={
              shouldReduce
                ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
                : {
                    hidden: { opacity: 0, y: 24 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: {
                        duration: duration.normal,
                        ease: ease.expo,
                      },
                    },
                  }
            }
            whileHover={{ y: -4 }}
            transition={spring.snappy}
          >
            <div
              className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl"
              style={{
                backgroundColor: `${room.accent}14`,
                color: room.accent,
              }}
            >
              {ICONS[card.icon]}
            </div>
            <h3
              className="mb-1 text-[15px] font-semibold"
              style={{ color: room.text }}
            >
              {card.title}
            </h3>
            <p
              className="text-[13px] opacity-60"
              style={{ color: room.text }}
            >
              {card.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </SectionRoom>
  );
}
