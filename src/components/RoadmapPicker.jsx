import React from 'react';

export default function RoadmapPicker({ roadmaps, selectedId, onSelect }) {
  const selected = roadmaps.find(r => r.id === selectedId);

  return (
    <section id="get-started" className="mx-auto mt-8 max-w-5xl px-6">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-lg backdrop-blur md:p-7">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h2 className="text-xl font-semibold text-white">Select a roadmap</h2>
            <p className="mt-1 text-sm text-white/60">
              Choose a path to start tracking milestones and reflections.
            </p>
          </div>
          <select
            className="w-full rounded-lg border border-white/10 bg-black/40 px-4 py-2 text-white outline-none transition hover:border-white/20 md:w-[320px]"
            value={selectedId}
            onChange={(e) => onSelect(e.target.value)}
          >
            {roadmaps.map(r => (
              <option key={r.id} value={r.id}>
                {r.title}
              </option>
            ))}
          </select>
        </div>
        {selected && (
          <div className="mt-4 rounded-xl bg-black/30 p-4 text-white/80">
            <p className="text-sm">{selected.description}</p>
          </div>
        )}
      </div>
    </section>
  );
}
