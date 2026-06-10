import Sidebar from "./component/sidebar";

export default function Layout({ children }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar/>
      <main className="flex-1 flex flex-col overflow-hidden bg-[#f0F2F5]">
        {children}
      </main>
    </div>
  );
}
