import Sidebar from "../component/sidebar";
import Topbar from "../component/topbar";

export default function DashboardPage() {
  const user = {
    name: "Admin Gebruiker",
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar user={user} />

      <main className="flex-1 flex flex-col">
        <Topbar title="Dashboard" />

        <div className="flex-1 p-6">
          {/* Dashboard content komt later hier */}
        </div>
      </main>
    </div>
  );
}