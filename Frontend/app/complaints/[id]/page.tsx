"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import Navbar from "../../../components/navbar";
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  MapPin,
  Building2,
  AlertTriangle,
  CalendarDays,
  FileText,
} from "lucide-react";

type Complaint = {
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

export default function ComplaintDetailPage() {
  const params = useParams();

  const complaintCode = params.id as string;

  const [complaint, setComplaint] = useState<Complaint | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!complaintCode) return;

    fetchComplaint();
  }, [complaintCode]);

  const fetchComplaint = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/complaints/code/${complaintCode}`
      );

      if (!response.ok) {
        throw new Error("Complaint not found");
      }

      const data = await response.json();

      setComplaint(data);
    } catch (error) {
      console.error(error);
      setError("Unable to load complaint.");
    } finally {
      setLoading(false);
    }
  };

  const formatStatus = (status: string) => {
    return status
      ?.toLowerCase()
      .replace("_", " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const isSubmitted = true;

  const isInProgress =
    complaint?.status === "IN_PROGRESS" ||
    complaint?.status === "RESOLVED";

  const isResolved =
    complaint?.status === "RESOLVED";

  if (loading) {
    return (
      <>
        <Navbar />

        <main className="min-h-screen bg-slate-50 px-6 py-10">
          <div className="mx-auto max-w-5xl">

            <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
              <p className="text-slate-500">
                Loading complaint...
              </p>
            </div>

          </div>
        </main>
      </>
    );
  }

  if (error || !complaint) {
    return (
      <>
        <Navbar />

        <main className="min-h-screen bg-slate-50 px-6 py-10">
          <div className="mx-auto max-w-5xl">

            <div className="rounded-2xl bg-white p-10 text-center shadow-sm">

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-red-600">
                <AlertTriangle size={28} />
              </div>

              <h1 className="mt-4 text-xl font-bold text-slate-900">
                Complaint Not Found
              </h1>

              <p className="mt-2 text-slate-500">
                We could not find a complaint with this complaint ID.
              </p>

              <Link
                href="/dashboard"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
              >
                <ArrowLeft size={17} />
                Back to Dashboard
              </Link>

            </div>

          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-50 px-6 py-10">

        <div className="mx-auto max-w-5xl">

          {/* Back Button */}
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-blue-600"
          >
            <ArrowLeft size={17} />
            Back to Dashboard
          </Link>

          {/* Header */}
          <div className="mt-6 rounded-2xl bg-white p-6 shadow-sm">

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

              <div>

                <p className="text-sm font-semibold text-blue-600">
                  Complaint Tracking
                </p>

                <h1 className="mt-1 text-2xl font-bold text-slate-900">
                  {complaint.complaintCode}
                </h1>

                <p className="mt-2 text-sm text-slate-500">
                  Submitted on {formatDate(complaint.createdAt)}
                </p>

              </div>

              <span
                className={`w-fit rounded-full px-4 py-2 text-sm font-semibold ${
                  complaint.status === "RESOLVED"
                    ? "bg-green-100 text-green-700"
                    : complaint.status === "IN_PROGRESS"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {formatStatus(complaint.status)}
              </span>

            </div>

          </div>

          {/* Complaint Information */}
          <div className="mt-6 grid gap-6 lg:grid-cols-3">

            {/* Main Details */}
            <div className="lg:col-span-2 rounded-2xl bg-white p-6 shadow-sm">

              <div className="flex items-center gap-2">

                <FileText
                  size={21}
                  className="text-blue-600"
                />

                <h2 className="text-lg font-bold text-slate-900">
                  Complaint Details
                </h2>

              </div>

              <div className="mt-6">

                <p className="text-sm font-medium text-slate-500">
                  Description
                </p>

                <p className="mt-2 text-base leading-7 text-slate-800">
                  {complaint.description}
                </p>

              </div>

              <div className="mt-6 grid gap-5 sm:grid-cols-2">

                {/* Category */}
                <div>
                  <p className="text-sm text-slate-500">
                    Category
                  </p>

                  <p className="mt-1 font-semibold text-slate-900">
                    {complaint.category}
                  </p>
                </div>

                {/* Department */}
                <div>
                  <p className="text-sm text-slate-500">
                    Department
                  </p>

                  <p className="mt-1 flex items-center gap-2 font-semibold text-slate-900">
                    <Building2 size={17} className="text-blue-600" />
                    {complaint.department}
                  </p>
                </div>

                {/* Location */}
                <div>
                  <p className="text-sm text-slate-500">
                    Location
                  </p>

                  <p className="mt-1 flex items-center gap-2 font-semibold text-slate-900">
                    <MapPin size={17} className="text-blue-600" />
                    {complaint.location}
                  </p>
                </div>

                {/* Priority */}
                <div>
                  <p className="text-sm text-slate-500">
                    Priority
                  </p>

                  <p
                    className={`mt-1 flex items-center gap-2 font-semibold ${
                      complaint.priority === "HIGH"
                        ? "text-red-600"
                        : complaint.priority === "MEDIUM"
                        ? "text-yellow-600"
                        : "text-green-600"
                    }`}
                  >
                    <AlertTriangle size={17} />
                    {complaint.priority}
                  </p>
                </div>

              </div>

            </div>

            {/* Status Card */}
            <div className="rounded-2xl bg-white p-6 shadow-sm">

              <div className="flex items-center gap-2">

                <Clock
                  size={21}
                  className="text-blue-600"
                />

                <h2 className="text-lg font-bold text-slate-900">
                  Status
                </h2>

              </div>

              <div className="mt-6 space-y-6">

                {/* Submitted */}
                <div className="flex gap-4">

                  <div className="flex flex-col items-center">

                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-100 text-green-600">
                      <CheckCircle2 size={20} />
                    </div>

                    <div className="mt-2 h-10 w-px bg-slate-200" />

                  </div>

                  <div>
                    <p className="font-semibold text-slate-900">
                      Complaint Submitted
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      {formatDate(complaint.createdAt)}
                    </p>
                  </div>

                </div>

                {/* In Progress */}
                <div className="flex gap-4">

                  <div className="flex flex-col items-center">

                    <div
                      className={`flex h-9 w-9 items-center justify-center rounded-full ${
                        isInProgress
                          ? "bg-blue-100 text-blue-600"
                          : "bg-slate-100 text-slate-400"
                      }`}
                    >
                      {isInProgress ? (
                        <CheckCircle2 size={20} />
                      ) : (
                        <Clock size={20} />
                      )}
                    </div>

                    <div className="mt-2 h-10 w-px bg-slate-200" />

                  </div>

                  <div>

                    <p className="font-semibold text-slate-900">
                      Work In Progress
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      {isInProgress
                        ? "Department is working on the complaint."
                        : "Waiting for department action."}
                    </p>

                  </div>

                </div>

                {/* Resolved */}
                <div className="flex gap-4">

                  <div className="flex h-9 w-9 items-center justify-center rounded-full">

                    <div
                      className={`flex h-9 w-9 items-center justify-center rounded-full ${
                        isResolved
                          ? "bg-green-100 text-green-600"
                          : "bg-slate-100 text-slate-400"
                      }`}
                    >
                      <CheckCircle2 size={20} />
                    </div>

                  </div>

                  <div>

                    <p className="font-semibold text-slate-900">
                      Complaint Resolved
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      {isResolved
                        ? "Complaint has been resolved."
                        : "Not resolved yet."}
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </div>

          {/* Location + Submission Information */}
          <div className="mt-6 grid gap-6 sm:grid-cols-2">

            <div className="rounded-2xl bg-white p-6 shadow-sm">

              <div className="flex items-center gap-3">

                <div className="rounded-xl bg-blue-100 p-3 text-blue-600">
                  <MapPin size={21} />
                </div>

                <div>
                  <p className="text-sm text-slate-500">
                    Complaint Location
                  </p>

                  <p className="mt-1 font-semibold text-slate-900">
                    {complaint.location}
                  </p>
                </div>

              </div>

            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm">

              <div className="flex items-center gap-3">

                <div className="rounded-xl bg-blue-100 p-3 text-blue-600">
                  <CalendarDays size={21} />
                </div>

                <div>
                  <p className="text-sm text-slate-500">
                    Submitted
                  </p>

                  <p className="mt-1 font-semibold text-slate-900">
                    {formatDate(complaint.createdAt)}
                  </p>
                </div>

              </div>

            </div>

          </div>

        </div>

      </main>
    </>
  );
}