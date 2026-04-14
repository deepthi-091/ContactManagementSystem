import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <header className="w-full bg-white border-b border-slate-200">
        <div className="mx-auto max-w-7xl h-16 px-6 flex items-center justify-between">
          {/* Left: Brand */}
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-md bg-blue-600 text-white flex items-center justify-center text-sm font-semibold">
              CRM
            </div>
            <span className="text-base font-semibold text-slate-900">
              CRM
            </span>
          </div>

          {/* Right: Navigation */}
          <nav className="flex items-center gap-6 text-sm text-slate-600">
            <span className="hover:text-slate-900 cursor-pointer">
              Templates
            </span>
            <span className="hover:text-slate-900 cursor-pointer">
              Schedules
            </span>
            <span className="hover:text-slate-900 cursor-pointer">
              Contacts
            </span>

            <Link
              href="/leads/new"
              className="inline-flex items-center gap-1 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition"
            >
              <span className="text-base leading-none">+</span>
              Add Lead
            </Link>
          </nav>
        </div>
      </header>
    </main>
  );
}