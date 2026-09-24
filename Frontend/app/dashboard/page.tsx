"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Clock3,
  FileText,
  MapPin,
  Plus,
} from "lucide-react";

import Navbar from "../../components/navbar";

type BackendComplaint = {
  id: number;
  complaintCode: string;
  description: string;
  location: string;
  photoUrl?: string;
  category: string;
  priority: string;
  department: string;
  status: string;
  createdAt: string;
};

type DashboardComplaint = {
  id: string;
  title: string;
  category: string;
  department: string;
  status: string;
  priority: string;
  location: string;
  date: string;
};

export default function DashboardPage() {
  const [complaints, setComplaints] = useState<DashboardComplaint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchComplaints();
  }, []);

  async function fetchComplaints() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        "http://localhost:8080/api/complaints"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch complaints");
      }

      const data: BackendComplaint[] = await response.json();

      const formattedComplaints: DashboardComplaint[] = data.map(
        (complaint) => ({
          id: complaint.complaintCode,
          title: complaint.description,
          category: complaint.category || "General",
          department: complaint.department || "Not Assigned",
          status: formatStatus(complaint.status),
          priority: formatPriority(complaint.priority),
          location: complaint.location || "Location not provided",
          date: formatDate(complaint.createdAt),
        })
      );

      // Show newest complaints first
      formattedComplaints.reverse();

      setComplaints(formattedComplaints);
    } catch (error) {
      console.error(error);

      setError(
        "Unable to load complaints. Please make sure the backend is running."
      );
    } finally {
      setLoading(false);
    }
  }

  // ================= STATISTICS =================

  const totalComplaints = complaints.length;

  const pendingComplaints = complaints.filter(
    (complaint) =>
      complaint.status.toLowerCase() === "pending"
  ).length;

  const inProgressComplaints = complaints.filter(
    (complaint) =>
      complaint.status.toLowerCase() === "in progress"
  ).length;

  const resolvedComplaints = complaints.filter(
    (complaint) =>
      complaint.status.toLowerCase() === "resolved"
  ).length;

  return (
    <main className="min-h-screen bg-slate-50">

      <Navbar />

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

          <div>

            <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
              CITIZEN DASHBOARD
            </p>

            <h1 className="mt-2 text-3xl font-bold text-slate-900">
              My Complaints
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Track your reported civic problems and their progress.
            </p>

          </div>

          <Link
            href="/report"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 hover:bg-blue-700"
          >
            <Plus size={18} />
            Report a Problem
          </Link>

        </div>

        {/* Statistics */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          <StatCard
            title="Total Complaints"
            value={loading ? "..." : String(totalComplaints)}
            icon={<FileText size={20} />}
            iconClass="bg-blue-50 text-blue-600"
          />

          <StatCard
            title="Pending"
            value={loading ? "..." : String(pendingComplaints)}
            icon={<Clock3 size={20} />}
            iconClass="bg-amber-50 text-amber-600"
          />

          <StatCard
            title="In Progress"
            value={loading ? "..." : String(inProgressComplaints)}
            icon={<AlertTriangle size={20} />}
            iconClass="bg-purple-50 text-purple-600"
          />

          <StatCard
            title="Resolved"
            value={loading ? "..." : String(resolvedComplaints)}
            icon={<CheckCircle2 size={20} />}
            iconClass="bg-green-50 text-green-600"
          />

        </div>

        {/* Error */}
        {error && (
          <div className="mt-8 rounded-2xl border border-red-200 bg-red-50 p-5">

            <p className="text-sm font-semibold text-red-700">
              Unable to load complaints
            </p>

            <p className="mt-1 text-sm text-red-600">
              {error}
            </p>

            <button
              onClick={fetchComplaints}
              className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
            >
              Try Again
            </button>

          </div>
        )}

        {/* Recent Complaints */}
        <section className="mt-8">

          <div className="mb-4 flex items-center justify-between">

            <div>

              <h2 className="text-xl font-bold text-slate-900">
                Recent Complaints
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Your latest reported civic issues.
              </p>

            </div>

            <button className="hidden text-sm font-semibold text-blue-600 hover:text-blue-700 sm:block">
              View all
            </button>

          </div>

          {/* Loading */}
          {loading && (
            <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">

              <div className="mx-auto h-7 w-7 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />

              <p className="mt-3 text-sm text-slate-500">
                Loading your complaints...
              </p>

            </div>
          )}

          {/* Empty state */}
          {!loading && !error && complaints.length === 0 && (
            <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">

              <FileText
                size={32}
                className="mx-auto text-slate-300"
              />

              <h3 className="mt-3 font-semibold text-slate-900">
                No complaints yet
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Report your first civic problem to get started.
              </p>

              <Link
                href="/report"
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
              >
                <Plus size={17} />
                Report a Problem
              </Link>

            </div>
          )}

          {/* Real Complaints */}
          {!loading && !error && complaints.length > 0 && (
            <div className="space-y-4">

              {complaints.map((complaint) => (
                <ComplaintCard
                  key={complaint.id}
                  complaint={complaint}
                />
              ))}

            </div>
          )}

        </section>

      </div>

    </main>
  );
}


/* ================= STAT CARD ================= */

function StatCard({
  title,
  value,
  icon,
  iconClass,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
  iconClass: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

      <div className="flex items-center justify-between">

        <div
          className={`flex h-10 w-10 items-center justify-center rounded-xl ${iconClass}`}
        >
          {icon}
        </div>

      </div>

      <p className="mt-5 text-sm text-slate-500">
        {title}
      </p>

      <p className="mt-1 text-2xl font-bold text-slate-900">
        {value}
      </p>

    </div>
  );
}


/* ================= COMPLAINT CARD ================= */

function ComplaintCard({
  complaint,
}: {
  complaint: DashboardComplaint;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">

      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

        {/* Complaint Information */}
        <div className="flex gap-4">

          <div className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 sm:flex">
            <FileText size={20} />
          </div>

          <div>

            <div className="flex flex-wrap items-center gap-2">

              <span className="text-xs font-semibold text-slate-400">
                {complaint.id}
              </span>

              <PriorityBadge
                priority={complaint.priority}
              />

            </div>

            <h3 className="mt-2 font-semibold text-slate-900">
              {complaint.title}
            </h3>

            <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500">

              <span>
                {complaint.category}
              </span>

              <span>
                {complaint.department}
              </span>

              <span className="flex items-center gap-1">
                <MapPin size={13} />
                {complaint.location}
              </span>

            </div>

          </div>

        </div>

        {/* Status + Action */}
        <div className="flex items-center justify-between gap-5 lg:justify-end">

          <div>

            <StatusBadge
              status={complaint.status}
            />

            <p className="mt-2 text-right text-xs text-slate-400">
              {complaint.date}
            </p>

          </div>

          <Link
            href={`/complaints/${complaint.id}`}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-500 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
            aria-label="Track complaint"
          >
            <ArrowRight size={18} />
          </Link>

        </div>

      </div>

    </div>
  );
}


/* ================= STATUS ================= */

function StatusBadge({
  status,
}: {
  status: string;
}) {
  const styles: Record<string, string> = {
    "In Progress": "bg-blue-50 text-blue-700",
    Assigned: "bg-purple-50 text-purple-700",
    Resolved: "bg-green-50 text-green-700",
    Pending: "bg-amber-50 text-amber-700",
  };

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
        styles[status] || "bg-slate-100 text-slate-600"
      }`}
    >
      {status}
    </span>
  );
}


/* ================= PRIORITY ================= */

function PriorityBadge({
  priority,
}: {
  priority: string;
}) {
  const styles: Record<string, string> = {
    High: "bg-red-50 text-red-600",
    Medium: "bg-amber-50 text-amber-700",
    Low: "bg-green-50 text-green-700",
  };

  return (
    <span
      className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${
        styles[priority] || "bg-slate-100 text-slate-600"
      }`}
    >
      {priority} Priority
    </span>
  );
}


/* ================= HELPERS ================= */

function formatStatus(status: string) {
  if (!status) {
    return "Pending";
  }

  const normalized = status.toLowerCase();

  if (normalized === "pending") {
    return "Pending";
  }

  if (normalized === "in progress") {
    return "In Progress";
  }

  if (normalized === "assigned") {
    return "Assigned";
  }

  if (normalized === "resolved") {
    return "Resolved";
  }

  return status;
}


function formatPriority(priority: string) {
  if (!priority) {
    return "Medium";
  }

  const normalized = priority.toLowerCase();

  if (normalized === "high") {
    return "High";
  }

  if (normalized === "medium") {
    return "Medium";
  }

  if (normalized === "low") {
    return "Low";
  }

  return priority;
}


function formatDate(date: string) {
  if (!date) {
    return "Unknown date";
  }

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "Unknown date";
  }

  return parsedDate.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}