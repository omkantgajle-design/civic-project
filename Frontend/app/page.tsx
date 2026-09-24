import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  MapPin,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import Navbar from "../components/navbar";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50">

      {/* Navbar */}
      <Navbar />

      {/* ================= HERO SECTION ================= */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">

        <div className="grid items-center gap-12 lg:grid-cols-2">

          {/* LEFT SIDE */}
          <div>

            {/* Small Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700">
              <Sparkles size={14} />
              SMART CIVIC PLATFORM
            </div>

            {/* Heading */}
            <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Report a problem.

              <span className="block text-blue-600">
                We&apos;ll handle the rest.
              </span>
            </h1>

            {/* Description */}
            <p className="mt-6 max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
              Report potholes, garbage, street lights, water leaks and other
              civic issues in a few simple steps. CivicFlow helps understand,
              prioritize and route every complaint.
            </p>

            {/* Buttons */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">

              <Link
                href="/report"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
              >
                Report a Problem
                <ArrowRight size={18} />
              </Link>

              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Track Complaint
              </Link>

            </div>

            {/* Trust Points */}
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-500">

              <div className="flex items-center gap-2">
                <CheckCircle2
                  size={17}
                  className="text-green-600"
                />
                Simple reporting
              </div>

              <div className="flex items-center gap-2">
                <ShieldCheck
                  size={17}
                  className="text-green-600"
                />
                Secure platform
              </div>

              <div className="flex items-center gap-2">
                <MapPin
                  size={17}
                  className="text-green-600"
                />
                Location aware
              </div>

            </div>

          </div>

          {/* RIGHT SIDE */}
          <div className="relative">

            {/* Background glow */}
            <div className="absolute -inset-6 rounded-[40px] bg-blue-100/60 blur-3xl" />

            {/* Dashboard preview */}
            <div className="relative rounded-3xl border border-slate-200 bg-white p-4 shadow-2xl sm:p-6">

              <div className="rounded-2xl bg-slate-950 p-5 text-white">

                {/* Dashboard Header */}
                <div className="flex items-center justify-between">

                  <div>
                    <p className="text-xs text-slate-400">
                      CIVIC OPERATIONS
                    </p>

                    <h2 className="mt-1 text-lg font-semibold">
                      Today&apos;s Overview
                    </h2>
                  </div>

                  <div className="rounded-xl bg-white/10 p-3">
                    <ShieldCheck size={20} />
                  </div>

                </div>

                {/* Stats */}
                <div className="mt-6 grid grid-cols-3 gap-3">

                  <div className="rounded-xl bg-white/10 p-3">
                    <p className="text-xs text-slate-400">
                      Complaints
                    </p>

                    <p className="mt-1 text-xl font-bold">
                      1,284
                    </p>
                  </div>

                  <div className="rounded-xl bg-white/10 p-3">
                    <p className="text-xs text-slate-400">
                      Resolved
                    </p>

                    <p className="mt-1 text-xl font-bold">
                      932
                    </p>
                  </div>

                  <div className="rounded-xl bg-white/10 p-3">
                    <p className="text-xs text-slate-400">
                      Impact
                    </p>

                    <p className="mt-1 text-xl font-bold">
                      86
                    </p>
                  </div>

                </div>

                {/* Complaint Preview */}
                <div className="mt-5 rounded-2xl bg-white p-5 text-slate-900">

                  <div className="flex items-start justify-between gap-3">

                    <div>
                      <p className="text-xs font-semibold text-red-600">
                        HIGH PRIORITY
                      </p>

                      <h3 className="mt-1 font-semibold">
                        Large pothole near college
                      </h3>
                    </div>

                    <span className="rounded-full bg-red-50 px-2.5 py-1 text-xs font-semibold text-red-600">
                      82 Impact
                    </span>

                  </div>

                  {/* Location */}
                  <div className="mt-5 flex items-center gap-2 text-sm text-slate-500">
                    <MapPin size={16} />
                    Pune, Maharashtra
                  </div>

                  {/* Progress */}
                  <div className="mt-5">

                    <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                      <div className="h-full w-[72%] rounded-full bg-blue-600" />
                    </div>

                    <div className="mt-2 flex justify-between text-xs text-slate-400">
                      <span>Assigned</span>
                      <span>72% complete</span>
                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="border-y border-slate-200 bg-white py-20">

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* Heading */}
          <div className="mx-auto max-w-2xl text-center">

            <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
              HOW IT WORKS
            </p>

            <h2 className="mt-3 text-3xl font-bold text-slate-900">
              Simple for citizens. Intelligent behind the scenes.
            </h2>

            <p className="mt-4 text-slate-600">
              You describe the problem. CivicFlow handles the complexity.
            </p>

          </div>

          {/* Four Steps */}
          <div className="mt-12 grid gap-6 md:grid-cols-4">

            <Step
              number="01"
              title="Report"
              description="Describe the civic problem in simple language."
            />

            <Step
              number="02"
              title="Understand"
              description="The system identifies the issue and severity."
            />

            <Step
              number="03"
              title="Route"
              description="The complaint reaches the responsible department."
            />

            <Step
              number="04"
              title="Resolve"
              description="Track progress until the issue is resolved."
            />

          </div>

        </div>

      </section>

    </main>
  );
}


/* ================= STEP CARD ================= */

function Step({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">

      <div className="text-sm font-bold text-blue-600">
        {number}
      </div>

      <h3 className="mt-4 text-lg font-bold text-slate-900">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-slate-600">
        {description}
      </p>

    </div>
  );
}