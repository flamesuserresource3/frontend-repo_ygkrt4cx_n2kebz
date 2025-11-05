import React, { useMemo, useState } from 'react';
import HeroSection from './components/HeroSection';
import RoadmapPicker from './components/RoadmapPicker';
import MilestonesChecklist from './components/MilestonesChecklist';
import ReflectionAI from './components/ReflectionAI';
import ProgressStats from './components/ProgressStats';

const ROADMAPS = [
  {
    id: 'pm-5y',
    title: 'Become a Product Manager (5 Years)',
    description:
      'Build core product sense, research skills, and delivery excellence from foundation to leadership.',
    milestones: [
      {
        id: 'pm-research',
        title: 'User Research Foundations',
        tasks: [
          { id: 'pmr-1', label: 'Interview 5 users and synthesize insights' },
          { id: 'pmr-2', label: 'Create a problem statement and JTBD' },
          { id: 'pmr-3', label: 'Run a 100-user survey and analyze results' },
        ],
      },
      {
        id: 'pm-roadmap',
        title: 'Roadmapping & Prioritization',
        tasks: [
          { id: 'pmro-1', label: 'Draft a quarterly roadmap with goals' },
          { id: 'pmro-2', label: 'Define success metrics (north star + KPIs)' },
          { id: 'pmro-3', label: 'Run a prioritization workshop' },
        ],
      },
    ],
  },
  {
    id: 'fsd',
    title: 'Master Full Stack Development',
    description:
      'Ship end-to-end apps: frontend, backend, databases, and deployment with best practices.',
    milestones: [
      {
        id: 'fsd-fe',
        title: 'Frontend Fundamentals',
        tasks: [
          { id: 'fe-1', label: 'Build a responsive layout with Tailwind' },
          { id: 'fe-2', label: 'Create a reusable component library' },
          { id: 'fe-3', label: 'Implement client-side routing' },
        ],
      },
      {
        id: 'fsd-be',
        title: 'Backend & APIs',
        tasks: [
          { id: 'be-1', label: 'Create REST API with auth' },
          { id: 'be-2', label: 'Integrate database and models' },
          { id: 'be-3', label: 'Write integration tests' },
        ],
      },
    ],
  },
  {
    id: 'uxd',
    title: 'Grow as a UX Designer',
    description:
      'Design delightful, accessible experiences with strong research and prototyping workflows.',
    milestones: [
      {
        id: 'uxd-discovery',
        title: 'Discovery & Empathy',
        tasks: [
          { id: 'ux-1', label: 'Create 3 personas and journey maps' },
          { id: 'ux-2', label: 'Run usability tests with 5 users' },
          { id: 'ux-3', label: 'Synthesize insights into opportunity areas' },
        ],
      },
      {
        id: 'uxd-proto',
        title: 'Prototyping & Handoff',
        tasks: [
          { id: 'uxp-1', label: 'Design interactive prototype' },
          { id: 'uxp-2', label: 'Define design tokens and components' },
          { id: 'uxp-3', label: 'Hand off with specs and annotations' },
        ],
      },
    ],
  },
];

export default function App() {
  const [selectedId, setSelectedId] = useState(ROADMAPS[0].id);
  const [checkState, setCheckState] = useState({}); // { milestoneId: { taskId: bool } }
  const [achievements, setAchievements] = useState([]);

  const selected = useMemo(
    () => ROADMAPS.find((r) => r.id === selectedId) || ROADMAPS[0],
    [selectedId]
  );

  const overallProgress = useMemo(() => {
    const milestones = selected?.milestones || [];
    let total = 0;
    let done = 0;
    milestones.forEach((m) => {
      m.tasks.forEach((t) => {
        total += 1;
        if (checkState?.[m.id]?.[t.id]) done += 1;
      });
    });
    return total === 0 ? 0 : Math.round((done / total) * 100);
  }, [selected, checkState]);

  const toggleTask = (milestoneId, taskId) => {
    setCheckState((prev) => ({
      ...prev,
      [milestoneId]: {
        ...(prev[milestoneId] || {}),
        [taskId]: !prev?.[milestoneId]?.[taskId],
      },
    }));
  };

  const addAchievement = (text) => {
    setAchievements((prev) => [text, ...prev]);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-black via-[#0b0613] to-[#090b13] font-inter text-white">
      <HeroSection />

      <RoadmapPicker
        roadmaps={ROADMAPS}
        selectedId={selectedId}
        onSelect={setSelectedId}
      />

      <MilestonesChecklist
        roadmap={selected}
        state={checkState}
        onToggle={toggleTask}
      />

      <ReflectionAI onSave={addAchievement} />

      <ProgressStats progress={overallProgress} achievements={achievements} />

      <footer className="mx-auto my-12 max-w-5xl px-6 text-center text-xs text-white/40">
        Built for growth-minded learners and makers. Keep shipping. Keep reflecting.
      </footer>
    </div>
  );
}
