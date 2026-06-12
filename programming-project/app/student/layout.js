import Sidebar from './component/sidebar';

export default function StudentLayout({ children }) {
  return (
    <div className="flex h-screen bg-gray-100">
      <div className="sticky top-0 h-screen">
        <Sidebar />
      </div>
      <main className="flex-1 flex flex-col overflow-y-auto">
        {children}
      </main>
    </div>
  );
}