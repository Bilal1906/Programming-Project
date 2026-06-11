import Topbar from "../component/topbar";

export default function StagePage() {
  const user = {
    name: "Admin Gebruiker",
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar user={user} />

      <main className="flex-1 flex flex-col">
        <Topbar title="Stage" />

        <div className="flex-1 p-6">
        </div>
      </main>
    </div>
  );
}