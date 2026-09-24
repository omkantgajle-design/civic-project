"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Menu,
  X,
  Bell,
  MapPin,
} from "lucide-react";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">

      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">

          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white">
            <MapPin size={20} />
          </div>

          <div>
            <div className="text-lg font-bold text-slate-900">
              Civic<span className="text-blue-600">Flow</span>
            </div>

            <div className="hidden text-[10px] font-medium text-slate-500 sm:block">
              SMART CIVIC PLATFORM
            </div>
          </div>

        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-7 md:flex">

          <Link
            href="/"
            className="text-sm font-medium text-slate-600 hover:text-blue-600"
          >
            Home
          </Link>

          <Link
            href="/dashboard"
            className="text-sm font-medium text-slate-600 hover:text-blue-600"
          >
            My Complaints
          </Link>

          <Link
            href="/employee"
            className="text-sm font-medium text-slate-600 hover:text-blue-600"
          >
            Employee
          </Link>

          <Link
            href="/admin"
            className="text-sm font-medium text-slate-600 hover:text-blue-600"
          >
            Admin
          </Link>

        </nav>

        {/* Right Side */}
        <div className="hidden items-center gap-3 md:flex">

          <button
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
            aria-label="Notifications"
          >
            <Bell size={19} />
          </button>

          <Link
            href="/login"
            className="text-sm font-medium text-slate-700 hover:text-blue-600"
          >
            Login
          </Link>

          <Link
            href="/report"
            className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700"
          >
            Report Problem
          </Link>

        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="rounded-lg p-2 text-slate-700 md:hidden"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={23} /> : <Menu size={23} />}
        </button>

      </div>

      {/* Mobile Navigation */}
      {mobileOpen && (
        <div className="border-t border-slate-200 bg-white px-4 py-4 md:hidden">

          <div className="flex flex-col gap-1">

            <Link
              href="/"
              onClick={() => setMobileOpen(false)}
              className="rounded-lg px-3 py-3 text-sm font-medium hover:bg-slate-100"
            >
              Home
            </Link>

            <Link
              href="/dashboard"
              onClick={() => setMobileOpen(false)}
              className="rounded-lg px-3 py-3 text-sm font-medium hover:bg-slate-100"
            >
              My Complaints
            </Link>

            <Link
              href="/employee"
              onClick={() => setMobileOpen(false)}
              className="rounded-lg px-3 py-3 text-sm font-medium hover:bg-slate-100"
            >
              Employee Dashboard
            </Link>

            <Link
              href="/admin"
              onClick={() => setMobileOpen(false)}
              className="rounded-lg px-3 py-3 text-sm font-medium hover:bg-slate-100"
            >
              Admin Dashboard
            </Link>

            <Link
              href="/report"
              onClick={() => setMobileOpen(false)}
              className="mt-2 rounded-xl bg-blue-600 px-4 py-3 text-center text-sm font-semibold text-white hover:bg-blue-700"
            >
              Report a Problem
            </Link>

          </div>

        </div>
      )}

    </header>
  );
}