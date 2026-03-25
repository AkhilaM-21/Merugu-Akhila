"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

// Dynamically import the Scene component (useful for Three.js inside Next.js)
const Scene = dynamic(() => import("./Scene"), { ssr: false });

export default function Background() {
  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none bg-gradient-to-tr from-slate-50 to-purple-50">
      <Suspense fallback={<div className="w-full h-full" />}>
        <Scene />
      </Suspense>
    </div>
  );
}