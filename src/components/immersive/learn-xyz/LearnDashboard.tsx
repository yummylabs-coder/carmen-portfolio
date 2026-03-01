"use client";

import Image from "next/image";
import { LineMask } from "../LineMask";
import {
  SectionRoom,
  SectionLabel,
  SectionBody,
  SectionVisual,
} from "../SectionRoom";
import { DeviceCarousel } from "../DeviceCarousel";
import { learnRooms } from "@/lib/motion";
import { DASHBOARD, IMAGES } from "./LearnData";

export function LearnDashboard() {
  const room = learnRooms.dashboard;

  const slides = DASHBOARD.screens.map((s) => ({
    src: IMAGES[s.src],
    alt: s.alt,
    caption: s.caption,
  }));

  return (
    <SectionRoom colors={room}>
      <SectionLabel accentColor={room.accent}>Web Dashboard</SectionLabel>

      <LineMask
        as="h2"
        className="mb-8 text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[1.1] tracking-tight"
        delay={0.15}
      >
        {DASHBOARD.headline}
      </LineMask>

      <SectionBody>{DASHBOARD.body}</SectionBody>

      <SectionVisual className="mt-16">
        <DeviceCarousel
          slides={slides}
          device="laptop"
          autoplay={5}
        />
      </SectionVisual>

      {/* Dashboard interaction GIF */}
      <SectionVisual className="mt-16">
        <div className="mx-auto max-w-[720px] overflow-hidden rounded-xl shadow-lg">
          <Image
            src={IMAGES.gifDashboard}
            alt="Learn.xyz dashboard AI lesson builder"
            width={720}
            height={450}
            className="h-auto w-full"
            unoptimized
          />
        </div>
        <p className="mt-3 text-center text-[13px] italic opacity-30">
          AI-powered lesson builder in action
        </p>
      </SectionVisual>
    </SectionRoom>
  );
}
