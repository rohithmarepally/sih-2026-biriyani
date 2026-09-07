"use client";

import { useState } from "react";

type RiskLevel = "Low" | "Medium" | "High";

type Bidder = {
  id: string;
  name: string;
  category: string;
  score: number;
  risk: RiskLevel;
  submitted: string;
  initials: string;
  accent: string;
};

const bidders: Bidder[] = [
  {
    id: "BD-2048",
    name: "Greenfield Foods Pvt. Ltd.",
    category: "Raw materials",
    score: 94,
    risk: "Low",
    submitted: "Today, 10:42 AM",
    initials: "GF",
    accent: "bg-emerald-100 text-emerald-700"
  },
  {
    id: "BD-2047",
    name: "Harvest Basket Co.",
    category: "Packaging",
    score: 87,
    risk: "Low",
    submitted: "Today, 9:18 AM",
    initials: "HB",
    accent: "bg-sky-100 text-sky-700"
  },
  {
    id: "BD-2046",
    name: "Nourish Supply Network",
    category: "Logistics",
    score: 76,
    risk: "Medium",
    submitted: "Yesterday, 4:32 PM",
    initials: "NS",
    accent: "bg-amber-100 text-amber-700"
  },
  {
    id: "BD-2045",
    name: "Urban Grain Traders",
    category: "Raw materials",
    score: 62,
    risk: "Medium",
    submitted: "Yesterday, 2:09 PM",
    initials: "UG",
    accent: "bg-violet-100 text-violet-700"
  },
  {
    id: "BD-2044",
    name: "Prime Harvest Imports",
    category: "Equipment",
    score: 41,
    risk: "High",
    submitted: "Sep 04, 11:26 AM",
    initials: "PH",
    accent: "bg-rose-100 text-rose-700"
  }
];

const riskStyles: Record<RiskLevel, string> = {
  Low: "bg-emerald-50 text-emerald-700 ring-emerald-600/15",
  Medium: "bg-amber-50 text-amber-700 ring-amber-600/20",
  High: "bg-rose-50 text-rose-700 ring-rose-600/20"
};

function Score({ score }: { score: number }) {
  const color = score >= 80 ? "bg-emerald-500" : score >= 60 ? "bg-amber-500" : "bg-rose-500";

  return (
    <div className="flex items-center gap-3">
      <div className="h-2 w-24 overflow-hidden rounded-full bg-slate-100">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${score}%` }} />
      </div>
      <span className="w-7 text-sm font-semibold text-slate-700">{score}</span>
    </div>
  );
}

export function ProcurementDashboard() {
  const [selectedBidder, setSelectedBidder] = useState<Bidder | null>(null);

  return (
    <main className="min-h-screen bg-[#f8fafc] text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-lg font-bold text-white shadow-sm shadow-emerald-600/20">
              P
            </div>
            <div>
              <p className="text-sm font-semibold tracking-tight text-slate-950">Procurewise</p>
              <p className="text-xs text-slate-500">Vendor intelligence platform</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-50 hover:text-slate-700" aria-label="View notifications">
              <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth="1.8">
                <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9ZM10 21h4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <div className="flex items-center gap-2 border-l border-slate-200 pl-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-xs font-semibold text-white">AR</div>
              <div className="hidden sm:block">
                <p className="text-sm font-medium text-slate-800">Ananya Rao</p>
                <p className="text-xs text-slate-500">Procurement Officer</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="mb-2 text-sm font-medium text-emerald-600">Overview</p>
            <h1 className="text-3xl font-semibold tracking-tight text-slate-950">Procurement dashboard</h1>
            <p className="mt-2 text-sm text-slate-500">Review bidder compliance and make confident sourcing decisions.</p>
          </div>
          <button className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm shadow-emerald-600/20 transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2">
            <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14M5 12h14" strokeLinecap="round" />
            </svg>
            New procurement
          </button>
        </div>

        <section className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4" aria-label="Procurement summary">
          {[
            ["Active bidders", "24", "8 awaiting review", "text-emerald-600"],
            ["Average score", "78.4", "↑ 4.2% this month", "text-sky-600"],
            ["Low risk vendors", "16", "67% of all bidders", "text-emerald-600"],
            ["Needs attention", "3", "Requires review", "text-rose-600"]
          ].map(([label, value, detail, color]) => (
            <article key={label} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-900/[0.02]">
              <p className="text-sm text-slate-500">{label}</p>
              <p className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">{value}</p>
              <p className={`mt-2 text-xs font-medium ${color}`}>{detail}</p>
            </article>
          ))}
        </section>

        <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm shadow-slate-900/[0.02]">
          <div className="flex flex-col gap-4 border-b border-slate-200 px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-semibold text-slate-950">Bidder compliance</h2>
              <p className="mt-1 text-sm text-slate-500">All submitted bids for the current procurement cycle</p>
            </div>
            <div className="flex gap-2">
              <button className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 transition hover:border-slate-300 hover:bg-slate-50">
                All risk levels
                <span className="text-slate-400">⌄</span>
              </button>
              <button className="rounded-lg border border-slate-200 p-2 text-slate-500 transition hover:border-slate-300 hover:bg-slate-50" aria-label="Filter bidders">
                <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="1.8">
                  <path d="M4 6h16M7 12h10m-7 6h4" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left">
              <thead className="bg-slate-50/80 text-xs uppercase tracking-wider text-slate-500">
                <tr>
                  <th scope="col" className="px-5 py-3 font-medium">Bidder</th>
                  <th scope="col" className="px-5 py-3 font-medium">Category</th>
                  <th scope="col" className="px-5 py-3 font-medium">Compliance score</th>
                  <th scope="col" className="px-5 py-3 font-medium">Risk level</th>
                  <th scope="col" className="px-5 py-3 font-medium">Submitted</th>
                  <th scope="col" className="px-5 py-3 text-right font-medium">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {bidders.map((bidder) => (
                  <tr key={bidder.id} className="transition hover:bg-slate-50/70">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`flex h-9 w-9 items-center justify-center rounded-lg text-xs font-bold ${bidder.accent}`}>{bidder.initials}</div>
                        <div>
                          <p className="text-sm font-semibold text-slate-800">{bidder.name}</p>
                          <p className="mt-0.5 text-xs text-slate-400">{bidder.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-sm text-slate-600">{bidder.category}</td>
                    <td className="px-5 py-4"><Score score={bidder.score} /></td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${riskStyles[bidder.risk]}`}>{bidder.risk}</span>
                    </td>
                    <td className="px-5 py-4 text-sm text-slate-500">{bidder.submitted}</td>
                    <td className="px-5 py-4 text-right">
                      <button onClick={() => setSelectedBidder(bidder)} className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-1">
                        View details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-between border-t border-slate-200 px-5 py-4 text-sm text-slate-500">
            <span>Showing 5 of 24 bidders</span>
            <button className="font-medium text-emerald-600 hover:text-emerald-700">View all bidders <span aria-hidden="true">→</span></button>
          </div>
        </section>
      </div>

      {selectedBidder && (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-slate-950/30 px-6 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="bidder-details-title">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-emerald-600">{selectedBidder.id}</p>
                <h2 id="bidder-details-title" className="mt-1 text-xl font-semibold text-slate-950">{selectedBidder.name}</h2>
              </div>
              <button onClick={() => setSelectedBidder(null)} className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700" aria-label="Close details">✕</button>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-slate-50 p-4"><p className="text-xs text-slate-500">Compliance score</p><p className="mt-1 text-2xl font-semibold text-slate-900">{selectedBidder.score}/100</p></div>
              <div className="rounded-xl bg-slate-50 p-4"><p className="text-xs text-slate-500">Risk level</p><p className="mt-2"><span className={`rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${riskStyles[selectedBidder.risk]}`}>{selectedBidder.risk}</span></p></div>
            </div>
            <p className="mt-5 text-sm leading-6 text-slate-500">This bidder submitted a {selectedBidder.category.toLowerCase()} proposal on {selectedBidder.submitted.toLowerCase()}. Review the full compliance report before making an award decision.</p>
            <button onClick={() => setSelectedBidder(null)} className="mt-6 w-full rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800">Close</button>
          </div>
        </div>
      )}
    </main>
  );
}
