export default function Home() {
  return (
    <div>
      {/* Topbar */}
      <div
        style={{
          height: "60px",
          backgroundColor: "#808080",
          width: "100%",
        }}
      />

      {/* Sidebar */}
      <div
        style={{
          width: "200px",
          height: "calc(100vh - 60px)",
          backgroundColor: "#808080",
          position: "fixed",
          left: 0,
          top: "60px",
        }}
      />

      {/* Content */}
      <div
        style={{
          marginLeft: "200px",
          marginTop: "60px",
          padding: "20px",
          backgroundColor: "white",
          minHeight: "calc(100vh - 60px)",
        }}
      >
      </div>
    </div>
  );
}