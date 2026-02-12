"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const testimonials = [
  "PCOS Plan is worth it. Straight forward, clean eating meal plans and shopping lists.",
  "Lots of options to customize recipes and prep. Helpful for complex health concerns.",
  "I've been using PCOS Plan for many years. Wonderful results and better energy.",
  "I made real progress and got my confidence back.",
  "The app gave me structure and support. Could not be happier.",
  "It is a calm and practical system for everyday life.",
];

export default function GeneratingPage() {
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.push("/email");
    }, 2500);

    return () => clearTimeout(timeout);
  }, [router]);

  return (
    <div className="min-h-screen bg-[#f2c7a4]">
      <header className="bg-white px-4 py-3 text-center border-b border-slate-200">
        <p className="font-bold text-2xl text-slate-900">PCOS Plan</p>
      </header>

      <main className="py-12">
        <div className="w-36 h-36 rounded-full border-4 border-amber-600 mx-auto flex items-center justify-center bg-[#f2c7a4]">
          <span className="text-5xl font-bold text-slate-900">100%</span>
        </div>
        <p className="text-center mt-4 font-semibold text-slate-900">Calculating your results</p>

        <h1 className="text-center mt-8 text-5xl font-extrabold text-slate-900">What our users are saying</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 max-w-7xl mx-auto mt-8 px-3">
          {testimonials.map((text, index) => (
            <div key={index} className="rounded-md bg-white px-4 py-3 border border-[#f0d7c3]">
              <p className="text-xs text-slate-700">{text}</p>
              <p className="mt-2 text-amber-500">★★★★★</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

