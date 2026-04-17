"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/share/Button";

export default function HomePage() {
  const router = useRouter();

  return (
    <main className="bg-gray-50">
      {/* HERO / BANNER SECTION */}
      <section className="bg-gradient-to-r from-slate-900 to-slate-700 text-white">
        <div className="max-w-7xl mx-auto px-6 py-24 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Smarter CRM for Growing Businesses
          </h1>

          <p className="text-lg text-slate-200 max-w-2xl mx-auto mb-8">
            Organize leads, automate follow‑ups, and track customer
            relationships — all in one powerful CRM platform.
          </p>

          <div className="flex justify-center gap-4">
            <Button
              onClick={() => router.push("/leads")}
              className="px-8 py-3 text-base"
            >
              Get Started
            </Button>

            <button
              onClick={() => router.push("/templates")}
              className="border border-white px-8 py-3 rounded-md text-base hover:bg-white hover:text-slate-900 transition"
            >
              View Templates
            </button>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-14">
            Why Choose Our CRM?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              title="Centralized Leads"
              description="Store and manage all your leads in a single, easy‑to‑use dashboard."
            />
            <FeatureCard
              title="Automated Follow‑ups"
              description="Schedule emails and reminders automatically so no lead is missed."
            />
            <FeatureCard
              title="Real‑Time Tracking"
              description="Track lead status, conversations, and conversions in real time."
            />
            <FeatureCard
              title="Email Scheduling"
              description="Send personalized email campaigns with intelligent scheduling."
            />
            <FeatureCard
              title="Scalable & Secure"
              description="Built to scale with your business and protected with secure access."
            />
            <FeatureCard
              title="Simple & Intuitive"
              description="Clean interface designed for productivity and fast onboarding."
            />
          </div>
        </div>
      </section>
      {/* DASHBOARD PREVIEW SECTION */}
<section className="py-20 bg-gray-50">
  <div className="max-w-7xl mx-auto px-6">
    <div className="text-center mb-14">
      <h2 className="text-3xl font-bold mb-4">
        CRM Dashboard Preview
      </h2>
      <p className="text-gray-600 max-w-2xl mx-auto">
        Get a bird’s‑eye view of your sales pipeline, lead activity, and
        performance metrics — all in one dashboard.
      </p>
    </div>

    {/* Dashboard Container */}
    <div className="bg-white border rounded-2xl shadow-lg p-6">
      {/* KPI CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <DashboardCard title="Total Leads" value="1,245" trend="+12%" />
        <DashboardCard title="Active Deals" value="328" trend="+8%" />
        <DashboardCard title="Conversion Rate" value="24%" trend="+3%" />
        <DashboardCard title="Emails Sent" value="5,690" trend="+18%" />
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Leads Activity */}
        <div className="lg:col-span-2 bg-gray-50 p-5 rounded-xl border">
          <h3 className="font-semibold mb-4">Recent Lead Activity</h3>
          <ul className="space-y-3 text-sm">
            <ActivityItem text="New lead added – Acme Corp" time="2 mins ago" />
            <ActivityItem text="Email scheduled for John D." time="15 mins ago" />
            <ActivityItem text="Deal moved to Negotiation" time="1 hour ago" />
            <ActivityItem text="Lead converted to customer" time="3 hours ago" />
          </ul>
        </div>

        {/* Sales Pipeline */}
        <div className="bg-gray-50 p-5 rounded-xl border">
          <h3 className="font-semibold mb-4">Sales Pipeline</h3>

          <PipelineItem label="New Leads" value={80} />
          <PipelineItem label="Contacted" value={60} />
          <PipelineItem label="Negotiation" value={40} />
          <PipelineItem label="Closed Deals" value={25} />
        </div>
      </div>
    </div>
  </div>
</section>


      {/* CTA SECTION */}
      <section className="bg-slate-100 py-20">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-3xl font-bold mb-6">
            Start Managing Your Leads Smarter
          </h2>
          <p className="text-gray-600 mb-8">
            Boost productivity, improve conversions, and build stronger
            customer relationships today.
          </p>

          <Button
            onClick={() => router.push("/leads")}
            className="px-10 py-4 text-base"
          >
            Explore CRM
          </Button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-900 text-slate-300 py-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm">
            © {new Date().getFullYear()} CRM System. All rights reserved.
          </p>

          <div className="flex gap-6 mt-4 md:mt-0 text-sm">
            <span className="hover:text-white cursor-pointer">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer">Terms</span>
            <span className="hover:text-white cursor-pointer">Support</span>
          </div>
        </div>
      </footer>
    </main>
  );
}

/* FEATURE CARD COMPONENT */
function FeatureCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition">
      <h3 className="text-lg font-semibold mb-3">{title}</h3>
      <p className="text-gray-600 text-sm leading-relaxed">
        {description}
      </p>
    </div>
  );
}
function DashboardCard({
  title,
  value,
  trend,
}: {
  title: string;
  value: string;
  trend: string;
}) {
  return (
    <div className="bg-gray-50 border rounded-xl p-5">
      <p className="text-sm text-gray-500">{title}</p>
      <div className="flex items-center justify-between mt-2">
        <h3 className="text-2xl font-bold">{value}</h3>
        <span className="text-green-600 text-sm font-medium">
          {trend}
        </span>
      </div>
    </div>
  );
}

function ActivityItem({
  text,
  time,
}: {
  text: string;
  time: string;
}) {
  return (
    <li className="flex justify-between text-gray-700">
      <span>{text}</span>
      <span className="text-gray-400 text-xs">{time}</span>
    </li>
  );
}

function PipelineItem({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="mb-4">
      <div className="flex justify-between text-sm mb-1">
        <span>{label}</span>
        <span className="text-gray-500">{value}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-blue-600 h-2 rounded-full"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}