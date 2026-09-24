"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "../../components/navbar";
import {
  ClipboardList,
  Clock,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Search,
  Filter,
  Building2,
} from "lucide-react";

type Complaint = {
  id: number;
  complaintCode: string;
  description: string;
  location: string;
  category: string;
  priority: string;
  department: string;
  status: string;
  createdAt: string;
};

export default function EmployeePage() {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Filters
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [priorityFilter, setPriorityFilter] = useState("ALL");
  const [departmentFilter, setDepartmentFilter] = useState("ALL");

  const [filteredComplaints, setFilteredComplaints] = useState<Complaint[]>(
    []
  );

  // Fetch complaints
  useEffect(() => {
    fetchComplaints();
  }, []);

  // Apply filters
  useEffect(() => {
    const search = searchTerm.toLowerCase().trim();

    const filtered = complaints.filter((complaint) => {
      const matchesSearch =
        !search ||
        complaint.complaintCode.toLowerCase().includes(search) ||
        complaint.description.toLowerCase().includes(search) ||
        complaint.category.toLowerCase().includes(search) ||
        complaint.department.toLowerCase().includes(search) ||
        complaint.location.toLowerCase().includes(search);

      const matchesStatus =
        statusFilter === "ALL" ||
        complaint.status === statusFilter;

      const matchesPriority =
        priorityFilter === "ALL" ||
        complaint.priority === priorityFilter;

      const matchesDepartment =
        departmentFilter === "ALL" ||
        complaint.department === departmentFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesPriority &&
        matchesDepartment
      );
    });

    setFilteredComplaints(filtered);
  }, [
    searchTerm,
    statusFilter,
    priorityFilter,
    departmentFilter,
    complaints,
  ]);

  const fetchComplaints = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/complaints"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch complaints");
      }

      const data = await response.json();

      const sortedData = [...data].reverse();

      setComplaints(sortedData);
      setFilteredComplaints(sortedData);
    } catch (error) {
      console.error(error);
      setError("Unable to load complaints.");
    } finally {
      setLoading(false);
    }
  };

  // Update complaint status
  const updateStatus = async (
    id: number,
    newStatus: string
  ) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/complaints/${id}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: newStatus,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update status");
      }

      const updatedComplaint = await response.json();

      setComplaints((currentComplaints) =>
        currentComplaints.map((complaint) =>
          complaint.id === updatedComplaint.id
            ? updatedComplaint
            : complaint
        )
      );
    } catch (error) {
      console.error(error);
      alert("Unable to update complaint status.");
    }
  };

  // Statistics
  const pendingCount = complaints.filter(
    (complaint) => complaint.status === "PENDING"
  ).length;

  const inProgressCount = complaints.filter(
    (complaint) => complaint.status === "IN_PROGRESS"
  ).length;

  const resolvedCount = complaints.filter(
    (complaint) => complaint.status === "RESOLVED"
  ).length;

  const highPriorityCount = complaints.filter(
    (complaint) => complaint.priority === "HIGH"
  ).length;

  // Format status
  const formatStatus = (status: string) => {
    return status
      ?.toLowerCase()
      .replace("_", " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  // Format date
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // Clear filters
  const clearFilters = () => {
    setSearchTerm("");
    setStatusFilter("ALL");
    setPriorityFilter("ALL");
    setDepartmentFilter("ALL");
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-50 px-6 py-10">
        <div className="mx-auto max-w-7xl">

          {/* Header */}
          <div className="mb-8">
            <p className="text-sm font-semibold text-blue-600">
              Employee Portal
            </p>

            <h1 className="mt-1 text-3xl font-bold text-slate-900">
              Complaint Management
            </h1>

            <p className="mt-2 text-slate-500">
              View and manage civic complaints assigned to your department.
            </p>
          </div>

          {/* Statistics */}
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

            {/* Pending */}
            <div className="rounded-2xl bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">
                    Pending
                  </p>

                  <p className="mt-2 text-3xl font-bold text-slate-900">
                    {pendingCount}
                  </p>
                </div>

                <div className="rounded-xl bg-yellow-100 p-3 text-yellow-600">
                  <Clock size={24} />
                </div>
              </div>
            </div>

            {/* In Progress */}
            <div className="rounded-2xl bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">
                    In Progress
                  </p>

                  <p className="mt-2 text-3xl font-bold text-slate-900">
                    {inProgressCount}
                  </p>
                </div>

                <div className="rounded-xl bg-blue-100 p-3 text-blue-600">
                  <ClipboardList size={24} />
                </div>
              </div>
            </div>

            {/* Resolved */}
            <div className="rounded-2xl bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">
                    Resolved
                  </p>

                  <p className="mt-2 text-3xl font-bold text-slate-900">
                    {resolvedCount}
                  </p>
                </div>

                <div className="rounded-xl bg-green-100 p-3 text-green-600">
                  <CheckCircle2 size={24} />
                </div>
              </div>
            </div>

            {/* High Priority */}
            <div className="rounded-2xl bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">
                    High Priority
                  </p>

                  <p className="mt-2 text-3xl font-bold text-slate-900">
                    {highPriorityCount}
                  </p>
                </div>

                <div className="rounded-xl bg-red-100 p-3 text-red-600">
                  <AlertTriangle size={24} />
                </div>
              </div>
            </div>

          </div>

          {/* Search and Filters */}
          <div className="mt-8 rounded-2xl bg-white p-5 shadow-sm">

            <div className="flex items-center gap-2">
              <Filter
                size={20}
                className="text-blue-600"
              />

              <h2 className="font-semibold text-slate-900">
                Find Complaints
              </h2>
            </div>

            <div className="mt-4 grid gap-3 lg:grid-cols-5">

              {/* Search */}
              <div className="relative lg:col-span-2">

                <Search
                  size={20}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="text"
                  value={searchTerm}
                  onChange={(event) =>
                    setSearchTerm(event.target.value)
                  }
                  placeholder="Search complaint ID, description, category..."
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-12 pr-4 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                />

              </div>

              {/* Status Filter */}
              <select
                value={statusFilter}
                onChange={(event) =>
                  setStatusFilter(event.target.value)
                }
                className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                <option value="ALL">
                  All Status
                </option>

                <option value="PENDING">
                  Pending
                </option>

                <option value="IN_PROGRESS">
                  In Progress
                </option>

                <option value="RESOLVED">
                  Resolved
                </option>
              </select>

              {/* Priority Filter */}
              <select
                value={priorityFilter}
                onChange={(event) =>
                  setPriorityFilter(event.target.value)
                }
                className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                <option value="ALL">
                  All Priority
                </option>

                <option value="HIGH">
                  High
                </option>

                <option value="MEDIUM">
                  Medium
                </option>

                <option value="LOW">
                  Low
                </option>
              </select>

              {/* Department Filter */}
              <select
                value={departmentFilter}
                onChange={(event) =>
                  setDepartmentFilter(event.target.value)
                }
                className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                <option value="ALL">
                  All Departments
                </option>

                <option value="Road Department">
                  Road Department
                </option>

                <option value="Sanitation Department">
                  Sanitation Department
                </option>

                <option value="Electrical Department">
                  Electrical Department
                </option>

                <option value="Water Department">
                  Water Department
                </option>

                <option value="Health Department">
                  Health Department
                </option>
              </select>

            </div>

            {/* Results + Clear */}
            <div className="mt-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">

              <p className="text-sm text-slate-500">
                Showing{" "}
                <span className="font-semibold text-slate-900">
                  {filteredComplaints.length}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-slate-900">
                  {complaints.length}
                </span>{" "}
                complaints
              </p>

              {(searchTerm ||
                statusFilter !== "ALL" ||
                priorityFilter !== "ALL" ||
                departmentFilter !== "ALL") && (
                <button
                  onClick={clearFilters}
                  className="w-fit rounded-lg px-3 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50"
                >
                  Clear Filters
                </button>
              )}

            </div>

          </div>

          {/* Complaints */}
          <section className="mt-6 rounded-2xl bg-white shadow-sm">

            <div className="border-b border-slate-100 p-6">
              <div className="flex items-center gap-3">

                <div className="rounded-xl bg-blue-100 p-3 text-blue-600">
                  <Building2 size={22} />
                </div>

                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    Department Complaints
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    View and manage complaints according to department.
                  </p>
                </div>

              </div>
            </div>

            {/* Loading */}
            {loading && (
              <div className="p-10 text-center text-slate-500">
                Loading complaints...
              </div>
            )}

            {/* Error */}
            {error && (
              <div className="p-10 text-center text-red-600">
                {error}
              </div>
            )}

            {/* Empty */}
            {!loading &&
              !error &&
              filteredComplaints.length === 0 && (
                <div className="p-10 text-center text-slate-500">
                  <Building2
                    size={40}
                    className="mx-auto mb-3 text-slate-300"
                  />

                  <p className="font-medium">
                    No complaints found.
                  </p>

                  <p className="mt-1 text-sm">
                    Try changing your department or other filters.
                  </p>
                </div>
              )}

            {/* Complaint List */}
            {!loading &&
              !error &&
              filteredComplaints.length > 0 && (
                <div className="divide-y divide-slate-100">

                  {filteredComplaints.map((complaint) => (
                    <div
                      key={complaint.id}
                      className="p-6 transition hover:bg-slate-50"
                    >

                      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

                        {/* Complaint Information */}
                        <div className="min-w-0 flex-1">

                          <div className="flex flex-wrap items-center gap-3">

                            <span className="text-sm font-bold text-blue-600">
                              {complaint.complaintCode}
                            </span>

                            {/* Status Badge */}
                            <span
                              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                complaint.status === "RESOLVED"
                                  ? "bg-green-100 text-green-700"
                                  : complaint.status === "IN_PROGRESS"
                                  ? "bg-blue-100 text-blue-700"
                                  : "bg-yellow-100 text-yellow-700"
                              }`}
                            >
                              {formatStatus(complaint.status)}
                            </span>

                            {/* High Priority */}
                            {complaint.priority === "HIGH" && (
                              <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
                                High Priority
                              </span>
                            )}

                          </div>

                          {/* Description */}
                          <h3 className="mt-3 text-lg font-semibold text-slate-900">
                            {complaint.description}
                          </h3>

                          {/* Details */}
                          <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-500">

                            <span>
                              Category: {complaint.category}
                            </span>

                            <span className="font-medium text-slate-700">
                              Department: {complaint.department}
                            </span>

                            <span>
                              Location: {complaint.location}
                            </span>

                            <span>
                              Submitted: {formatDate(complaint.createdAt)}
                            </span>

                          </div>

                        </div>

                        {/* Actions */}
                        <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">

                          {/* Status */}
                          <select
                            value={complaint.status}
                            onChange={(event) =>
                              updateStatus(
                                complaint.id,
                                event.target.value
                              )
                            }
                            className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                          >
                            <option value="PENDING">
                              Pending
                            </option>

                            <option value="IN_PROGRESS">
                              In Progress
                            </option>

                            <option value="RESOLVED">
                              Resolved
                            </option>
                          </select>

                          {/* View */}
                          <Link
                            href={`/complaints/${complaint.complaintCode}`}
                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                          >
                            View Complaint
                            <ArrowRight size={17} />
                          </Link>

                        </div>

                      </div>

                    </div>
                  ))}

                </div>
              )}

          </section>

        </div>
      </main>
    </>
  );
}