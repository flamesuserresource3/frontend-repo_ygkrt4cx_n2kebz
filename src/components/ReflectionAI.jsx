import React, { useState } from 'react';
import { Sparkles, ClipboardCheck } from 'lucide-react';

function craftSummary(input) {
  if (!input.trim()) return '';
  // Lightweight client-side phrasing helper (no backend).
  const sentences = input
    .split(/\n|\.|\!/)
    .map(s => s.trim())
    .filter(Boolean);
  const first = sentences[0] || '';
  const metrics = input.match(/\b\d+%?|\d+\b/g);
  const metricPhrase = metrics ? `, achieving ${metrics.slice(0, 2).join(' and ')}` : '';
  return `Delivered impact by ${first.toLowerCase()}${metricPhrase}. Synthesized findings and translated them into clear next steps to drive measurable outcomes.`;
}

export default function ReflectionAI({ onSave }) {
  const [note, setNote] = useState('');
  const [summary, setSummary] = useState('');

  const handleGenerate = () => {
    const s = craftSummary(note);
    setSummary(s);
  };

  const handleSave = () => {
    if (summary.trim()) onSave(summary);
    setNote('');
    setSummary('');
  };

  return (
    <section className="mx-auto mt-8 max-w-5xl px-6">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-lg backdrop-blur md:p-7">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-fuchsia-400" />
          <h3 className="text-lg font-semibold text-white">Reflection Journal & AI Summary</h3>
        </div>
        <p className="mt-1 text-sm text-white/60">
          Jot down what you did and learned. Turn it into a resume-ready highlight instantly.
        </p>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div>
            <label className="block text-xs uppercase tracking-wide text-white/50">Your reflection</label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="e.g., Built my first feature that improved user engagement by 15%."
              rows={6}
              className="mt-2 w-full rounded-lg border border-white/10 bg-black/40 p-3 text-white outline-none placeholder:text-white/40 focus:border-white/20"
            />
            <button
              onClick={handleGenerate}
              className="mt-3 rounded-lg bg-gradient-to-r from-violet-600 to-fuchsia-500 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-fuchsia-500/20 transition hover:from-violet-500 hover:to-fuchsia-500"
            >
              Generate Summary
            </button>
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wide text-white/50">AI-crafted summary</label>
            <div className="mt-2 min-h-[144px] w-full rounded-lg border border-white/10 bg-black/30 p-3 text-sm text-white/90">
              {summary ? (
                <p>{summary}</p>
              ) : (
                <p className="text-white/40">Your polished summary will appear here.</p>
              )}
            </div>
            <button
              onClick={handleSave}
              disabled={!summary}
              className="mt-3 inline-flex items-center gap-2 rounded-lg border border-emerald-400/30 bg-emerald-500/20 px-4 py-2 text-sm font-medium text-emerald-200 transition enabled:hover:border-emerald-400/60 enabled:hover:bg-emerald-500/30 disabled:opacity-50"
            >
              <ClipboardCheck className="h-4 w-4" /> Save to Achievements
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
