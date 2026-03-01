"use client";

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
    </SectionRoom>
  );
}
