import React from 'react';
import { Trophy, Flame, Star } from 'lucide-react';

export default function ProgressStats({ progress, achievements }) {
  const streak = Math.min(achievements.length, 7); // playful visual streak cap
  return (
    <section className="mx-auto mt-8 max-w-5xl px-6">
      <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-violet-600/10 via-fuchsia-600/10 to-orange-500/10 p-5 shadow-lg backdrop-blur md:p-7">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-xl border border-white/10 bg-black/30 p-4">
            <div className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-amber-400" />
              <h4 className="font-medium text-white">Overall Progress</h4>
            </div>
            <div className="mt-3 h-2 w-full overflow-hidden rounded bg-white/10">
              <div className="h-2 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-orange-400" style={{ width: `${progress}%` }} />
            </div>
            <p className="mt-2 text-sm text-white/70">{progress}% complete</p>
          </div>

          <div className="rounded-xl border border-white/10 bg-black/30 p-4">
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-violet-300" />
              <h4 className="font-medium text-white">Achievements</h4>
            </div>
            <ul className="mt-3 space-y-2 text-sm text-white/80">
              {achievements.length === 0 ? (
                <li className="text-white/50">No achievements yet — your wins will show up here.</li>
              ) : (
                achievements.slice(0, 3).map((a, i) => (
                  <li key={i} className="rounded border border-white/10 bg-white/5 p-2">{a}</li>
                ))
              )}
            </ul>
          </div>

          <div className="rounded-xl border border-white/10 bg-black/30 p-4">
            <div className="flex items-center gap-2">
              <Flame className={`h-5 w-5 ${streak > 0 ? 'text-orange-400' : 'text-white/40'}`} />
              <h4 className="font-medium text-white">Streak</h4>
            </div>
            <div className="mt-3 flex gap-1">
              {Array.from({ length: 7 }).map((_, i) => (
                <div
                  key={i}
                  className={`h-3 w-6 rounded ${i < streak ? 'bg-orange-400/80' : 'bg-white/10'}`}
                />
              ))}
            </div>
            <p className="mt-2 text-sm text-white/70">{streak} day(s) active</p>
          </div>
        </div>
      </div>
    </section>
  );
}
