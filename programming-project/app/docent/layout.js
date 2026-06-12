import DocentSidebar from './component/sidebar'

export default function DocentLayout({ children }) {
  return (
    <div className="flex h-screen bg-gray-100">
      <div className="sticky top-0 h-screen">
        <DocentSidebar />
      </div>
      <main className="flex-1 flex flex-col overflow-y-auto">
        {children}
      </main>
    </div>
  )
}