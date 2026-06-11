// app/dashboard-test/page.js

export default function DashboardTest() {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>

      {/* Sidebar */}
      <aside style={{
        width: "200px",
        minHeight: "100vh",
        backgroundColor: "#1a2236",
        position: "fixed",
        top: 0,
        left: 0,
        display: "flex",
        flexDirection: "column",
        padding: "20px 0",
      }}>
        <nav style={{ display: "flex", flexDirection: "column", gap: "4px", padding: "0 16px" }}>
          <div>Page 1</div>
          <div>Page 2</div>
          <div>Page 3</div>
          <div>Page 4</div>
        </nav>
      </aside>

      {/* Content */}
      <main style={{
        marginLeft: "200px",
        flex: 1,
        padding: "24px",
        backgroundColor: "#f5f5f5",
      }}>
        <h1>Dashboard</h1>
      </main>

    </div>
  );
}