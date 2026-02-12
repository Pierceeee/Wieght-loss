"use client";

const sources = [
  "World Health Organization (WHO)",
  "Pubmed",
  "The American Journal of Clinical Nutrition",
  "National Center for Biotechnology Information (NCBI)",
  "WebMD",
  "Medscape",
];

export function ScienceList() {
  return (
    <div className="max-w-lg mx-auto">
      <div className="bg-white border border-slate-200 rounded-md overflow-hidden">
        {sources.map((source, index) => (
          <div key={source} className="flex items-center justify-between px-4 py-4 border-b border-slate-200 last:border-b-0">
            <span className="text-sm font-semibold text-slate-800">{source}</span>
            <span className="text-xs text-slate-400">{index + 1}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

