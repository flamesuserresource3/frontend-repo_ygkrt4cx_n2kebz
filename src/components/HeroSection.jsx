import React from 'react';
import Spline from '@splinetool/react-spline';

export default function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden bg-black text-white">
      <div className="relative h-[520px] w-full">
        <Spline
          scene="https://prod.spline.design/4cHQr84zOGAHOehh/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
        {/* Soft gradient overlay for readability without blocking interaction */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/70" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <h1 className="text-3xl font-semibold leading-tight text-white/90 sm:text-4xl md:text-5xl">
              AI-Powered Roadmap & Growth Reflection Tracker
            </h1>
            <p className="mt-4 text-base text-white/70 sm:text-lg">
              Turn your learning journey into a living story — with milestones, achievements, and AI-crafted summaries you can use on your resume.
            </p>
            <div className="mt-6 flex items-center justify-center gap-3">
              <a
                href="#get-started"
                className="rounded-full bg-violet-600 px-5 py-3 text-sm font-medium text-white shadow-lg shadow-violet-600/30 transition hover:bg-violet-500"
              >
                Get Started
              </a>
              <a
                href="#how-it-works"
                className="rounded-full border border-white/20 px-5 py-3 text-sm font-medium text-white/80 backdrop-blur transition hover:border-white/40 hover:text-white"
              >
                How it works
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
