import ui from "/42/ui.js"

ui("body", {
  tag: "div",
  attrs: { id: "bootSplash" },
  content: "💿 Booting Label OS93...",
  style: {
    position: "fixed",
    top: "0", left: "0",
    width: "100%", height: "100%",
    background: "#000",
    color: "#0ff",
    fontSize: "2rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: "9999"
  }
})

setTimeout(() => {
  document.getElementById("bootSplash").remove()
}, 3000)
// This will remove the splash screen after 3 seconds