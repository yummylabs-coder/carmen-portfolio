"use client";

import { useEffect, useRef, useCallback } from "react";

// 0=transparent 1=dark hair 2=light hair 3=skin 4=skin shadow
// 5=eye brown 6=white 7=blush 8=lips 9=shirt blue
const avatarData = [
  [0,0,0,0,2,2,2,2,2,2,2,2,0,0,0,0],
  [0,0,0,2,1,1,1,1,1,1,1,1,2,0,0,0],
  [0,0,2,1,1,1,1,1,1,1,1,1,1,2,0,0],
  [0,2,1,1,1,3,3,3,3,3,3,1,1,1,2,0],
  [0,2,1,1,3,3,3,3,3,3,3,3,1,1,2,0],
  [2,1,1,3,3,6,5,3,3,6,5,3,3,1,1,2],
  [2,1,1,3,3,5,5,3,3,5,5,3,3,1,1,2],
  [2,1,1,3,7,3,3,3,3,3,3,7,3,1,1,2],
  [2,1,1,3,3,3,3,4,4,3,3,3,3,1,1,2],
  [2,1,1,3,3,3,3,3,3,3,3,3,3,1,1,2],
  [2,1,1,3,3,3,8,8,8,8,3,3,3,1,1,2],
  [2,1,1,2,3,3,3,3,3,3,3,3,2,1,1,2],
  [2,1,1,9,2,4,3,3,3,3,4,2,9,1,1,2],
  [2,1,1,9,9,9,2,2,2,2,9,9,9,1,1,2],
  [2,2,1,1,9,9,9,9,9,9,9,9,1,1,2,2],
  [0,2,2,1,1,1,1,1,1,1,1,1,1,2,2,0],
];

const COLORS: Record<number, string> = {
  0: "transparent",
  1: "#8B7355",
  2: "#C4A574",
  3: "#FFE4D0",
  4: "#E8C9B8",
  5: "#4A3728",
  6: "#FFFFFF",
  7: "#FFB4A8",
  8: "#E8A090",
  9: "#2216ff",
};

type EyePixel = { x: number; y: number; c: number };
interface EyeState { pixels: EyePixel[] }

const EYE_AREA: EyePixel[] = [
  { x: 5, y: 5, c: 3 }, { x: 5, y: 6, c: 3 }, { x: 6, y: 5, c: 3 }, { x: 6, y: 6, c: 3 },
  { x: 9, y: 5, c: 3 }, { x: 9, y: 6, c: 3 }, { x: 10, y: 5, c: 3 }, { x: 10, y: 6, c: 3 },
];

const EYE_STATES: Record<string, EyeState> = {
  open: {
    pixels: [
      { x: 5, y: 5, c: 6 }, { x: 5, y: 6, c: 5 }, { x: 6, y: 5, c: 5 }, { x: 6, y: 6, c: 5 },
      { x: 9, y: 5, c: 6 }, { x: 9, y: 6, c: 5 }, { x: 10, y: 5, c: 5 }, { x: 10, y: 6, c: 5 },
    ],
  },
  closed: {
    pixels: [
      { x: 5, y: 5, c: 3 }, { x: 5, y: 6, c: 4 }, { x: 6, y: 5, c: 4 }, { x: 6, y: 6, c: 4 },
      { x: 9, y: 5, c: 3 }, { x: 9, y: 6, c: 4 }, { x: 10, y: 5, c: 4 }, { x: 10, y: 6, c: 4 },
    ],
  },
  lookLeft: {
    pixels: [
      { x: 6, y: 5, c: 6 }, { x: 5, y: 5, c: 5 }, { x: 5, y: 6, c: 5 }, { x: 6, y: 6, c: 5 },
      { x: 10, y: 5, c: 6 }, { x: 9, y: 5, c: 5 }, { x: 9, y: 6, c: 5 }, { x: 10, y: 6, c: 5 },
    ],
  },
  lookRight: {
    pixels: [
      { x: 5, y: 5, c: 6 }, { x: 5, y: 6, c: 5 }, { x: 6, y: 5, c: 5 }, { x: 6, y: 6, c: 5 },
      { x: 9, y: 5, c: 6 }, { x: 9, y: 6, c: 5 }, { x: 10, y: 5, c: 5 }, { x: 10, y: 6, c: 5 },
    ],
  },
};

const GRID = 16;
const PX = 6;
const GAP = 1;

function delay(ms: number) {
  return new Promise<void>((r) => setTimeout(r, ms));
}

export function PixelAvatar() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const eyeRunning = useRef(false);
  const animationId = useRef(0);

  const paintPixel = useCallback((x: number, y: number, colorIdx: number) => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    const color = COLORS[colorIdx];
    if (color === "transparent") return;
    ctx.fillStyle = color;
    ctx.fillRect(x * (PX + GAP), y * (PX + GAP), PX, PX);
  }, []);

  const clearPixel = useCallback((x: number, y: number) => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(x * (PX + GAP), y * (PX + GAP), PX, PX);
  }, []);

  const setEyeState = useCallback(
    (state: string) => {
      EYE_AREA.forEach(({ x, y }) => {
        clearPixel(x, y);
        paintPixel(x, y, 3);
      });
      EYE_STATES[state].pixels.forEach(({ x, y, c }) => {
        clearPixel(x, y);
        paintPixel(x, y, c);
      });
    },
    [paintPixel, clearPixel]
  );

  useEffect(() => {
    const id = ++animationId.current;
    let cancelled = false;

    async function render() {
      const ctx = canvasRef.current?.getContext("2d");
      if (!ctx) return;
      ctx.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);

      const order: { x: number; y: number; c: number }[] = [];
      for (let y = 0; y < GRID; y++) {
        const row: typeof order = [];
        for (let x = 0; x < GRID; x++) {
          if (avatarData[y][x] !== 0) row.push({ x, y, c: avatarData[y][x] });
        }
        row.sort(() => Math.random() - 0.5);
        order.push(...row);
      }

      for (const { x, y, c } of order) {
        if (cancelled || id !== animationId.current) return;
        paintPixel(x, y, c);
        await delay(12 + Math.random() * 8);
      }

      if (cancelled || id !== animationId.current) return;

      eyeRunning.current = true;
      while (eyeRunning.current && id === animationId.current) {
        await delay(1500 + Math.random() * 2000);
        if (!eyeRunning.current || id !== animationId.current) break;
        if (Math.random() < 0.7) {
          setEyeState("closed");
          await delay(80);
          if (!eyeRunning.current || id !== animationId.current) break;
          setEyeState("open");
        } else {
          const dirs = ["lookLeft", "open", "lookRight", "open"];
          for (const dir of dirs) {
            if (!eyeRunning.current || id !== animationId.current) break;
            setEyeState(dir);
            await delay(400 + Math.random() * 300);
          }
        }
      }
    }

    render();
    return () => { cancelled = true; eyeRunning.current = false; };
  }, [paintPixel, clearPixel, setEyeState]);

  const canvasSize = GRID * (PX + GAP) - GAP;

  return (
    <div className="flex h-[112px] w-[112px] items-center justify-center rounded-full border border-white/10 bg-white/[0.03]">
      <canvas
        ref={canvasRef}
        width={canvasSize}
        height={canvasSize}
        style={{ imageRendering: "pixelated" }}
      />
    </div>
  );
}
