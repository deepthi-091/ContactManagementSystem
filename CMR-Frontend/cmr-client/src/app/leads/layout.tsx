import Sidebar from "@/components/core/Sidebar";

export default function LeadsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex bg-gray-50 min-h-screen">
      {/* SIDEBAR */}
      <Sidebar />

      {/* CONTENT AREA */}
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}