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
import { MOBILE_APP, IMAGES } from "./LearnData";

export function LearnMobileApp() {
  const room = learnRooms.mobileApp;

  const slides = MOBILE_APP.screens.map((s) => ({
    src: IMAGES[s.src],
    alt: s.alt,
    caption: s.caption,
  }));

  return (
    <SectionRoom colors={room}>
      <SectionLabel accentColor={room.accent}>Mobile App</SectionLabel>

      <LineMask
        as="h2"
        className="mb-8 text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[1.1] tracking-tight"
        delay={0.15}
      >
        {MOBILE_APP.headline}
      </LineMask>

      <SectionBody>{MOBILE_APP.body}</SectionBody>

      <SectionVisual className="mt-16">
        <DeviceCarousel
          slides={slides}
          device="phone"
          autoplay={3.5}
        />
      </SectionVisual>

      {/* Interactive prototype GIF */}
      <SectionVisual className="mt-16">
        <div className="mx-auto max-w-[400px] overflow-hidden rounded-[28px] shadow-xl">
          <Image
            src={IMAGES.gifMobile}
            alt="Learn.xyz mobile app interactive prototype"
            width={400}
            height={711}
            className="h-auto w-full"
            unoptimized
          />
        </div>
        <p className="mt-3 text-center text-[13px] italic opacity-30">
          Interactive prototype — swipe through a real lesson flow
        </p>
      </SectionVisual>
    </SectionRoom>
  );
}
