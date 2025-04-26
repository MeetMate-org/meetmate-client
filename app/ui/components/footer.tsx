import React from "react";
import Link from "next/link";

export const Footer: React.FC = () => (
  <footer className="bg-[#0B1A4A] text-white">
    <div className="container mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-5 gap-8">
      {/* Branding */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold">Meet Mate</h2>
        <p className="text-gray-300 text-sm">
          Meet Mate unites teams by making scheduling, voting, and managing
          meetings effortless across any timezone.
        </p>
      </div>

      {/* Meetings */}
      <div>
        <h3 className="font-semibold mb-4">Meetings</h3>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li>
            <Link href="/meetings" className="hover:text-white">
              My Meetings
            </Link>
          </li>
          <li>
            <Link href="/meetings/create" className="hover:text-white">
              Schedule Meeting
            </Link>
          </li>
          <li>
            <Link href="/polls" className="hover:text-white">
              Time Polls
            </Link>
          </li>
        </ul>
      </div>

      {/* Teams */}
      <div>
        <h3 className="font-semibold mb-4">Teams</h3>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li>
            <Link href="/teams" className="hover:text-white">
              Overview
            </Link>
          </li>
          <li>
            <Link href="/teams/integrations" className="hover:text-white">
              Integrations
            </Link>
          </li>
          <li>
            <Link href="/teams/guide" className="hover:text-white">
              Setup Guide
            </Link>
          </li>
        </ul>
      </div>

      {/* Company */}
      <div>
        <h3 className="font-semibold mb-4">Company</h3>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li>
            <Link href="/about" className="hover:text-white">
              About Us
            </Link>
          </li>
          <li>
            <Link href="/careers" className="hover:text-white">
              Careers
            </Link>
          </li>
          <li>
            <Link href="/contact" className="hover:text-white">
              Contact
            </Link>
          </li>
        </ul>
      </div>

      {/* CTA */}
      <div className="space-y-4">
        <h3 className="font-semibold mb-2">Get Started</h3>
        <p className="text-gray-300 text-sm">
          Try Meet Mate free and bring your team together today.
        </p>
        <button
          onClick={() => window.openAuthModal && window.openAuthModal()}
          className="inline-flex items-center px-5 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg text-white text-sm"
        >
          Schedule Now
          <svg
            className="w-4 h-4 ml-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </button>
      </div>
    </div>
    {/* Bottom bar */}
    <div className="border-t border-gray-700 mt-8">
      <div className="container mx-auto px-6 py-4 flex flex-col md:flex-row md:items-center justify-between text-gray-400 text-sm">
        <div className="flex items-center space-x-2 mb-4 md:mb-0">
          <span>English</span>
        </div>

        {/* Legal links */}
        <div className="flex space-x-6 mb-4 md:mb-0">
          <Link href="/terms" className="hover:text-white">
            Terms & Privacy
          </Link>
          <Link href="/security" className="hover:text-white">
            Security
          </Link>
          <Link href="/status" className="hover:text-white">
            Status
          </Link>
        </div>
      </div>
    </div>
  </footer>
);
