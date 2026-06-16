import Sidebar from "../../component/sidebar";
import AuthGuard from '../../component/authGuard';

export default function StudentLayout({ children }) {
  return (
    <AuthGuard>
      <div className="flex min-h-screen">
        <Sidebar />
        <main className="flex-1 flex flex-col overflow-hidden bg-[#f0F2F5]">
          {children}
        </main>
      </div>
    </AuthGuard>
  );
}