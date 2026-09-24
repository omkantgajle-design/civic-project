"use client";

import { useState } from "react";
import {
  ArrowRight,
  Camera,
  CheckCircle2,
  MapPin,
  Sparkles,
  Upload,
  X,
} from "lucide-react";

import Navbar from "../../components/navbar";

export default function ReportPage() {
  const [description, setDescription] = useState("");
  const [locationAdded, setLocationAdded] = useState(false);
  const [photoAdded, setPhotoAdded] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [showResult, setShowResult] = useState(false);

  // Backend states
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [complaintCode, setComplaintCode] = useState("");
  const [error, setError] = useState("");

  // Step 1: Simulated AI understanding
  function handleAnalyze() {
    if (!description.trim()) return;

    setAnalyzing(true);
    setError("");

    setTimeout(() => {
      setAnalyzing(false);
      setShowResult(true);
    }, 1500);
  }

  // Step 2: Send complaint to Spring Boot backend
  async function handleSubmitComplaint() {
    if (!description.trim()) return;

    setSubmitting(true);
    setError("");

    try {
      const response = await fetch(
        "http://localhost:8080/api/complaints",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            description: description,
            location: locationAdded
              ? "Pune, Maharashtra"
              : "Location not provided",
            category: "Road / Pothole",
            priority: "HIGH",
            department: "Road Department",
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit complaint");
      }

      const data = await response.json();

      setComplaintCode(data.complaintCode);
      setSubmitted(true);

    } catch (err) {
      console.error(err);

      setError(
        "Unable to submit your complaint. Please make sure the backend is running."
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-50">

      <Navbar />

      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-8">

          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            REPORT A PROBLEM
          </p>

          <h1 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">
            Tell us what happened
          </h1>

          <p className="mt-3 max-w-2xl text-slate-500">
            Describe the problem in your own words. You don't need to know
            which department handles it.
          </p>

        </div>

        {/* Progress */}
        <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-4">

          <div className="flex items-center justify-between text-xs font-medium text-slate-500">
            <span>Complaint details</span>
            <span>Step 1 of 3</span>
          </div>

          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-100">
            <div
              className={`h-full rounded-full bg-blue-600 transition-all ${
                submitted
                  ? "w-full"
                  : showResult
                    ? "w-2/3"
                    : "w-1/3"
              }`}
            />
          </div>

        </div>

        {/* SUCCESS MESSAGE */}
        {submitted && (
          <section className="mb-5 rounded-2xl border border-green-200 bg-green-50 p-6">

            <div className="flex items-start gap-3">

              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-600 text-white">
                <CheckCircle2 size={20} />
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-green-700">
                  COMPLAINT SUBMITTED
                </p>

                <h2 className="mt-1 text-lg font-bold text-slate-900">
                  Your complaint has been submitted successfully
                </h2>

                <p className="mt-2 text-sm text-slate-600">
                  Your complaint has been saved in the CivicFlow system.
                </p>

                <div className="mt-4 rounded-xl border border-green-200 bg-white p-4">
                  <p className="text-xs text-slate-500">
                    Complaint ID
                  </p>

                  <p className="mt-1 text-xl font-bold text-green-700">
                    {complaintCode}
                  </p>
                </div>
              </div>

            </div>

          </section>
        )}

        {/* Description Card */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

          <div className="flex items-start gap-3">

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <Sparkles size={19} />
            </div>

            <div>
              <h2 className="font-semibold text-slate-900">
                What happened?
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Explain the problem naturally. Our system will understand it.
              </p>
            </div>

          </div>

          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            maxLength={1000}
            rows={7}
            disabled={submitted}
            placeholder="Example: There is a large pothole near the college entrance. Many bikes are passing through this road and it is becoming dangerous..."
            className="mt-6 w-full resize-none rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50 disabled:cursor-not-allowed disabled:opacity-60"
          />

          <div className="mt-2 flex justify-between text-xs text-slate-400">

            <span>
              Be as specific as possible
            </span>

            <span>
              {description.length}/1000
            </span>

          </div>

        </section>

        {/* Location Card */}
        <section className="mt-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

          <div className="flex items-start gap-3">

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-600">
              <MapPin size={19} />
            </div>

            <div>
              <h2 className="font-semibold text-slate-900">
                Where is the problem?
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Location helps us send your complaint to the right team.
              </p>
            </div>

          </div>

          {!locationAdded ? (
            <button
              onClick={() => setLocationAdded(true)}
              disabled={submitted}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-blue-200 bg-blue-50 px-4 py-3.5 text-sm font-semibold text-blue-700 transition hover:bg-blue-100 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <MapPin size={18} />
              Use my location
            </button>
          ) : (
            <div className="mt-5 flex items-center justify-between rounded-xl border border-green-200 bg-green-50 p-4">

              <div className="flex items-center gap-3">

                <div className="rounded-lg bg-green-100 p-2 text-green-600">
                  <CheckCircle2 size={18} />
                </div>

                <div>
                  <p className="text-sm font-semibold text-green-800">
                    Location added
                  </p>

                  <p className="mt-0.5 text-xs text-green-700">
                    Pune, Maharashtra
                  </p>
                </div>

              </div>

              {!submitted && (
                <button
                  onClick={() => setLocationAdded(false)}
                  className="rounded-lg p-2 text-green-700 hover:bg-green-100"
                  aria-label="Remove location"
                >
                  <X size={17} />
                </button>
              )}

            </div>
          )}

        </section>

        {/* Photo Card */}
        <section className="mt-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

          <div className="flex items-start gap-3">

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
              <Camera size={19} />
            </div>

            <div>
              <h2 className="font-semibold text-slate-900">
                Add a photo
                <span className="ml-2 text-xs font-normal text-slate-400">
                  Optional
                </span>
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                A photo can help the responsible team understand the issue.
              </p>
            </div>

          </div>

          {!photoAdded ? (
            <button
              onClick={() => setPhotoAdded(true)}
              disabled={submitted}
              className="mt-5 flex w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 p-8 transition hover:border-blue-300 hover:bg-blue-50/30 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Upload size={27} className="text-slate-400" />

              <span className="mt-3 text-sm font-semibold text-slate-700">
                Upload a photo
              </span>

              <span className="mt-1 text-xs text-slate-400">
                JPG, PNG up to 10 MB
              </span>
            </button>
          ) : (
            <div className="mt-5 flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 p-4">

              <div className="flex items-center gap-3">

                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-slate-200">
                  <Camera size={20} className="text-slate-500" />
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    complaint-photo.jpg
                  </p>

                  <p className="mt-0.5 text-xs text-slate-400">
                    Photo added
                  </p>
                </div>

              </div>

              {!submitted && (
                <button
                  onClick={() => setPhotoAdded(false)}
                  className="rounded-lg p-2 text-slate-500 hover:bg-slate-200"
                  aria-label="Remove photo"
                >
                  <X size={17} />
                </button>
              )}

            </div>
          )}

        </section>

        {/* AI Result */}
        {showResult && (
          <section className="mt-5 rounded-2xl border border-blue-200 bg-blue-50 p-6">

            <div className="flex items-start gap-3">

              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white">
                <Sparkles size={19} />
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-blue-700">
                  AI UNDERSTANDING
                </p>

                <h2 className="mt-1 text-lg font-bold text-slate-900">
                  We understood your complaint
                </h2>
              </div>

            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">

              <Info
                label="Category"
                value="Road / Pothole"
              />

              <Info
                label="Priority"
                value="HIGH"
              />

              <Info
                label="Department"
                value="Road Department"
              />

            </div>

            <div className="mt-5 rounded-xl bg-white p-4">

              <p className="text-sm font-semibold text-slate-900">
                Why HIGH priority?
              </p>

              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                <li>• Possible safety risk</li>
                <li>• Public road obstruction</li>
                <li>• Potential accident risk</li>
              </ul>

            </div>

          </section>
        )}

        {/* Error */}
        {error && (
          <div className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Submit */}
        <div className="mt-6">

          {!submitted && (
            <button
              onClick={
                showResult
                  ? handleSubmitComplaint
                  : handleAnalyze
              }
              disabled={
                !description.trim() ||
                analyzing ||
                submitting
              }
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-4 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >

              {analyzing ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Understanding your complaint...
                </>
              ) : submitting ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Submitting complaint...
                </>
              ) : showResult ? (
                <>
                  Confirm Complaint
                  <ArrowRight size={18} />
                </>
              ) : (
                <>
                  Understand My Complaint
                  <ArrowRight size={18} />
                </>
              )}

            </button>
          )}

          <p className="mt-3 text-center text-xs text-slate-400">
            Your complaint will be reviewed before it is routed to the
            responsible department.
          </p>

        </div>

      </div>

    </main>
  );
}


/* ================= INFO CARD ================= */

function Info({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-blue-100 bg-white p-4">

      <p className="text-xs text-slate-500">
        {label}
      </p>

      <p
        className={`mt-1 text-sm font-bold ${
          value === "HIGH"
            ? "text-red-600"
            : "text-slate-900"
        }`}
      >
        {value}
      </p>

    </div>
  );
}