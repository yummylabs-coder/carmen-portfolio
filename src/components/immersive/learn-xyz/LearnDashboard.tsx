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
        className="mb-8 text-[clamp(2.5rem,6vw,4.5rem)] font-extrabold leading-[1.02] tracking-tight"
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

      {/* Dashboard interaction GIF in MacBook frame */}
      <SectionVisual className="mt-16">
        <div
          className="mx-auto w-full max-w-[720px] lg:max-w-[960px]"
          style={{
            filter:
              "drop-shadow(0 20px 40px rgba(0,0,0,0.15)) drop-shadow(0 8px 16px rgba(0,0,0,0.1))",
          }}
        >
          <div className="overflow-hidden rounded-t-[10px] border-[6px] border-b-[18px] border-[#1d1d1f] bg-[#1d1d1f]">
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-white">
              <Image
                src={IMAGES.gifDashboard}
                alt="Learn.xyz dashboard AI lesson builder"
                fill
                className="object-cover object-top"
                sizes="(min-width: 1024px) 960px, 720px"
                unoptimized
              />
            </div>
          </div>
          <div
            className="mx-auto h-[8px] rounded-b-md"
            style={{
              width: "104%",
              marginLeft: "-2%",
              background: "linear-gradient(180deg, #3a3a3c 0%, #1d1d1f 100%)",
            }}
          />
        </div>
        <p className="mt-4 text-center text-[13px] italic opacity-30">
          AI-powered lesson builder in action
        </p>
      </SectionVisual>
    </SectionRoom>
  );
}
