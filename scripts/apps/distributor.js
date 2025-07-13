import ui from "/42/ui.js"

ui(".desktop", {
  tag: "window",
  content: [
    {
      tag: "iframe",
      attrs: {
        src: "http://localhost:5000/dashboard",
        style: "width:100%; height:100%; border:none;"
      }
    }
  ],
  style: {
    width: "800px",
    height: "600px",
    top: "100px",
    left: "100px",
    background: "rgba(40,40,40,0.9)",
    border: "2px solid #ff00cc",
    boxShadow: "0 0 20px #ff00cc88"
  }
})
