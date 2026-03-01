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
        className="mb-8 text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[1.1] tracking-tight"
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

      {/* Website interaction GIF */}
      <SectionVisual className="mt-16">
        <div className="mx-auto max-w-[840px] overflow-hidden rounded-xl shadow-lg">
          <Image
            src={IMAGES.gifWebsite}
            alt="Learn.xyz website micro-interactions"
            width={840}
            height={525}
            className="h-auto w-full"
            unoptimized
          />
        </div>
        <p className="mt-3 text-center text-[13px] italic opacity-30">
          Micro-interactions that make the brand feel alive
        </p>
      </SectionVisual>
    </SectionRoom>
  );
}
