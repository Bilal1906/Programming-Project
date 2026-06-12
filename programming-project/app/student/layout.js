import Sidebar from "./component/sidebar";

export default function StudentLayout({ children }) {
  return (
<<<<<<< HEAD
    <div className="flex h-screen bg-gray-100">
      <div className="sticky top-0 h-screen">
        <Sidebar />
      </div>
      <main className="flex-1 flex flex-col overflow-y-auto">
        {children}
      </main>
    </div>
=======
    <AuthGuard>
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar />
        <main className="flex-1 flex flex-col overflow-hidden">{children}</main>
      </div>
    </AuthGuard>
>>>>>>> 72c8280 (feat(security): AuthGuard voor student)
  );
}
