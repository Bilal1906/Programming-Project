import Topbar from "../component/topbar";

export default function DashboardPage() {
  const user = {
    name: "Admin Gebruiker",
  };

  return (
  <main className="flex-1 flex flex-col">
        <Topbar title="Dashboard" />

        <div className="flex-1 p-6">
          {/* Dashboard content komt later hier */}
        </div>
      </main>
  );
}