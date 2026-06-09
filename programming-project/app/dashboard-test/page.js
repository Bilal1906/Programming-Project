export default function Home() {
  return (
    <div>
      {/* Topbar */}
      <div className = 'topbar'
        style={{
          height: "60px",
          backgroundColor: "#808080",
          width: "100%",
        }}
      />

      {/* Sidebar */}
      <div className = 'sidebar'
        style={{
          width: "200px",
          height: "calc(100vh - 60px)",
          backgroundColor: "#808080",
          position: "fixed",
          left: 0,
          top: "60px",
          padding: "20px",
          color: "white",
        }}
      />
        <div>page1</div>
        <div>page2</div>
        <div>page3</div>
        <div>page4</div>
        <div>page5</div>
        <div>page6</div>

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