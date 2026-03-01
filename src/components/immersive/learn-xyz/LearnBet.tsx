"use client";

import Image from "next/image";
import { LineMask } from "../LineMask";
import { SectionRoom, SectionBody, SectionVisual } from "../SectionRoom";
import { learnRooms } from "@/lib/motion";
import { BET, IMAGES } from "./LearnData";

export function LearnBet() {
  const room = learnRooms.bet;

  return (
    <SectionRoom colors={room} className="flex items-center">
      <div className="space-y-8">
        <LineMask
          as="h2"
          className="text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[1.1] tracking-tight"
          delay={0.1}
        >
          {BET.headline}
        </LineMask>

        <SectionBody>{BET.body}</SectionBody>

        {/* Mobile app swipe GIF — the "scrolling" metaphor in action */}
        <SectionVisual className="mt-12">
          <div className="relative mx-auto max-w-[480px] overflow-hidden rounded-2xl shadow-xl">
            <Image
              src={IMAGES.gifMobile}
              alt="Learn.xyz mobile app swipe interaction"
              width={480}
              height={854}
              className="h-auto w-full"
              unoptimized
            />
          </div>
        </SectionVisual>
      </div>
    </SectionRoom>
  );
}
