// src/components/FAQ.jsx
import { useState, useRef, useEffect } from 'react';
import { BiChevronRight } from 'react-icons/bi';

const FAQ_DATA = [
  {
    q: 'What is GitHub Finder?',
    a: 'GitHub Finder is a tool to quickly search GitHub users and repositories. You can filter by username, repo name, language, or location to find exactly what you need.',
  },
  {
    q: 'How do I search for users or repositories?',
    a: 'Type your query in the search bar and select one or multiple filters. Press Enter or click Search to see the results in a responsive card layout.',
  },
  {
    q: 'Can I search by multiple filters at once?',
    a: 'Yes! You can select multiple filters (e.g., username and location, or repo and language) and the results will show matches according to your selection.',
  },
  {
    q: 'How are search results displayed?',
    a: 'Results are shown as cards. User cards display the avatar and username, while repo cards show repo name, owner avatar, description, and matched filter badges.',
  },
  {
    q: 'What do the badges on each card mean?',
    a: 'Badges indicate which filter(s) matched your query. For example, "By Username" or "By Language" shows why this result appeared.',
  },
  {
    q: 'Can I open a repository or user profile from the results?',
    a: 'Yes! Clicking a repository card opens the GitHub repo in a new tab, and clicking a user card opens a detailed modal with profile information.',
  },
  {
    q: 'How does pagination work?',
    a: 'Results are split into pages with a fixed number of items per page. Use the page buttons below the grid to navigate between pages.',
  },
  {
    q: 'What happens if no results are found?',
    a: 'A friendly message will appear indicating no results were found. Try changing your query or adjusting the filters for better results.',
  },
];

export default function FAQ() {
  const [openId, setOpenId] = useState(null);
  const toggle = (id) => setOpenId((cur) => (cur === id ? null : id));

  return (
    <section id="faq" className="py-16 bg-[#e4f1fc]">
      {/* ── Heading ── */}
      <div className="relative mb-14 text-center">
        {/* glow behind text */}
        <div className="absolute left-1/2 top-1/2 -z-10 h-24 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full
                        bg-gradient-to-r from-[#002244]/30 via-sky-500/40 to-sky-300/30 blur-3xl" />
        <h2 className="inline-block bg-gradient-to-r from-[#002244] via-sky-500 to-sky-300 
                       bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl">
          GitHub Finder FAQs
        </h2>
      </div>

      {/* ── Accordion ── */}
      <div className="container mx-auto max-w-3xl px-4">
        {FAQ_DATA.map(({ q, a }, idx) => {
          const open = openId === idx;
          return (
            <FAQItem
              key={idx}
              question={q}
              answer={a}
              open={open}
              onToggle={() => toggle(idx)}
            />
          );
        })}
      </div>
    </section>
  );
}

/* --------- sub-component with smooth transition --------- */
function FAQItem({ question, answer, open, onToggle }) {
  const ref = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) setHeight(ref.current.scrollHeight);
  }, [answer]);

  return (
    <div className="mb-4 rounded-xl border border-sky-100 bg-white shadow transition-shadow hover:shadow-md">
      {/* question row */}
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between px-6 py-4 text-left"
      >
        <span className="text-base font-semibold text-slate-800">{question}</span>
        <BiChevronRight
          className={`text-2xl transition-transform duration-300 ${open ? 'rotate-90 text-sky-500' : ''}`}
        />
      </button>

      {/* answer with smooth max-height */}
      <div
        className="overflow-hidden px-6 transition-[max-height] duration-300 ease-in-out"
        style={{ maxHeight: open ? height : 0 }}
      >
        <p ref={ref} className="pb-4 text-sm leading-relaxed text-slate-600">
          {answer}
        </p>
      </div>
    </div>
  );
}
