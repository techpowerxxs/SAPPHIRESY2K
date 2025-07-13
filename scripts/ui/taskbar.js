import ui from "/42/ui.js"

ui("body", {
  tag: "div",
  attrs: { id: "taskbar" },
  content: [
    { tag: "button", content: "Start", on: { click: "() => alert('Start menu coming soon')" } },
    { tag: "button", content: "Upload", on: { click: "() => window.open('/upload')" } },
    { tag: "button", content: "Royalties", on: { click: "() => window.open('/royalties')" } },
    { tag: "button", content: "Downloads", on: { click: "() => window.open('/dashboard')" } },
    { tag: "button", content: "Logout", on: { click: "() => window.open('/logout')" } }
  ],
  style: {
    position: "fixed",
    bottom: "0",
    width: "100%",
    background: "rgba(40,40,40,0.9)",
    display: "flex",
    gap: "1rem",
    padding: "0.5rem",
    zIndex: "1000"
  }
})
