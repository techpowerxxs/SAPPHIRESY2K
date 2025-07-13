import ui from "/42/ui.js";

ui("body", {
  tag: "ui-dialog",
  title: "🎧 Quantum Records Presents",
  content: "✨ The new album <b>'CANVAS'</b> drops In the forseeable future. Click to explore hidden tracks inside your desktop.",
  buttons: [
    {
      label: "Open Album",
      exec: () => {
        ui("body", {
          tag: "ui-folder",
          path: "/album",
          content: [ /* your icons here */ ]
        });
      }
    }
  ]
});



// Render the music folder
ui("body", {
  tag: "ui-folder",
  path: "/",
  content: [
    {
      tag: "ui-icon",
      title: "LVL7 PT3.wav",
      icon: "assets/images/yea.png",
      exec: () => {
        ui("body", {
          tag: "ui-player",
          src: "/assets/tracks/LVL7 PT3.wav",
          autoplay: true
        });
      }
    }
]
});
ui("body", {
  tag: "ui-icon",
  title: "Album Info.txt",
  icon: "assets/images/loveletter.png",
  exec: () => {
    ui("body", {
      tag: "div",
      class: "window",
      content: [
        { tag: "h1", content: "Album Info.txt" },
        {
          tag: "p",
          content: "This album was created by the Quantum Collective, featuring experimental sounds and ambient vibes. Enjoy the journey!"
        }
      ]
    });
  }
});