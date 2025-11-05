import React, { useMemo } from 'react';
import { CheckCircle2, Award } from 'lucide-react';

export default function MilestonesChecklist({ roadmap, state, onToggle }) {
  const { milestones = [] } = roadmap || {};

  const { totalTasks, doneTasks, progress } = useMemo(() => {
    let total = 0;
    let done = 0;
    milestones.forEach((m) => {
      m.tasks.forEach((t) => {
        total += 1;
        if (state?.[m.id]?.[t.id]) done += 1;
      });
    });
    return {
      totalTasks: total,
      doneTasks: done,
      progress: total === 0 ? 0 : Math.round((done / total) * 100),
    };
  }, [milestones, state]);

  return (
    <section className="mx-auto mt-8 max-w-5xl px-6" id="how-it-works">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-lg backdrop-blur md:p-7">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-white">Milestones & Checklists</h3>
            <p className="mt-1 text-sm text-white/60">Tick off tasks as you progress. Watch your growth in real-time.</p>
          </div>
          <div className="text-right">
            <div className="text-sm text-white/70">Overall Progress</div>
            <div className="mt-1 flex items-center gap-2">
              <div className="h-2 w-40 overflow-hidden rounded bg-white/10">
                <div
                  className="h-2 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-orange-400"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="text-sm text-white/80">{progress}%</span>
            </div>
            <div className="mt-1 text-xs text-white/50">{doneTasks}/{totalTasks} tasks</div>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {milestones.map((m) => (
            <div key={m.id} className="rounded-xl border border-white/10 bg-black/30 p-4">
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-amber-400" />
                  <h4 className="font-medium text-white">{m.title}</h4>
                </div>
                <span className="text-xs text-white/50">{m.tasks.filter(t => state?.[m.id]?.[t.id]).length}/{m.tasks.length}</span>
              </div>
              <ul className="space-y-2">
                {m.tasks.map((t) => {
                  const checked = Boolean(state?.[m.id]?.[t.id]);
                  return (
                    <li key={t.id} className="flex items-center gap-3">
                      <button
                        onClick={() => onToggle(m.id, t.id)}
                        className={`grid h-6 w-6 place-items-center rounded border transition ${
                          checked ? 'border-violet-400 bg-violet-500/20' : 'border-white/20 bg-black/20'
                        }`}
                        aria-label={checked ? 'Mark incomplete' : 'Mark complete'}
                      >
                        {checked && <CheckCircle2 className="h-4 w-4 text-violet-400" />}
                      </button>
                      <span className={`text-sm ${checked ? 'text-white' : 'text-white/80'}`}>{t.label}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
