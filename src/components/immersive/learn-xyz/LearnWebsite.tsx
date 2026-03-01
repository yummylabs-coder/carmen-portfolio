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
import { WEBSITE, IMAGES } from "./LearnData";

export function LearnWebsite() {
  const room = learnRooms.website;

  const slides = WEBSITE.screens.map((s) => ({
    src: IMAGES[s.src],
    alt: s.alt,
    caption: s.caption,
  }));

  return (
    <SectionRoom colors={room}>
      <SectionLabel accentColor={room.accent}>Website</SectionLabel>

      <LineMask
        as="h2"
        className="mb-8 text-[clamp(2.5rem,6vw,4.5rem)] font-extrabold leading-[1.02] tracking-tight"
        delay={0.15}
      >
        {WEBSITE.headline}
      </LineMask>

      <SectionBody>{WEBSITE.body}</SectionBody>

      <SectionVisual className="mt-16">
        <DeviceCarousel
          slides={slides}
          device="desktop"
          autoplay={5}
        />
      </SectionVisual>

      {/* Website interaction GIF in iMac frame */}
      <SectionVisual className="mt-16">
        <div
          className="mx-auto w-full max-w-[840px] lg:max-w-[1080px]"
          style={{
            filter:
              "drop-shadow(0 20px 40px rgba(0,0,0,0.12)) drop-shadow(0 8px 16px rgba(0,0,0,0.08))",
          }}
        >
          <div className="overflow-hidden rounded-[10px] border-[6px] border-b-0 border-[#1d1d1f] bg-[#1d1d1f]">
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-white">
              <Image
                src={IMAGES.gifWebsite}
                alt="Learn.xyz website micro-interactions"
                fill
                className="object-cover object-top"
                sizes="(min-width: 1024px) 1080px, 840px"
                unoptimized
              />
            </div>
          </div>
          <div className="flex items-center justify-center rounded-b-[10px] bg-gradient-to-b from-[#e4e4e7] to-[#d4d4d8] py-[8px]">
            <div className="h-[4px] w-[4px] rounded-full bg-[#a1a1aa]" />
          </div>
          <div className="flex justify-center">
            <div
              className="h-[40px] w-[60px] bg-gradient-to-b from-[#d4d4d8] to-[#c4c4c8]"
              style={{ clipPath: "polygon(15% 0%, 85% 0%, 95% 100%, 5% 100%)" }}
            />
          </div>
          <div className="flex justify-center">
            <div className="h-[4px] w-[120px] rounded-[2px] bg-gradient-to-b from-[#c4c4c8] to-[#b4b4b8]" />
          </div>
        </div>
        <p className="mt-4 text-center text-[13px] italic opacity-30">
          Micro-interactions that make the brand feel alive
        </p>
      </SectionVisual>
    </SectionRoom>
  );
}
