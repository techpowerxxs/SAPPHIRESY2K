import { $window42 } from "libs/window_builder.js";

// Create the app window
const appWindow = $window42({
  title: "🎧 Sapphire System — Album Drop",
  icon: "apps/album-announcement/icon.png",
  width: 420,
  height: 260,
  center: true,
  html: `
    <div style="padding: 16px; font-family: sans-serif; color: white;">
      <h2 style="margin-top: 0;">🌌 Quantum Records</h2>
      <p>The debut album <strong>'Sapphire System'</strong> is now live!</p>
      <p>✨ Explore hidden tracks, liner notes, and ambient remixes.</p>
      <button style="margin-top: 12px;" onclick="playIntro()">▶️ Play Intro</button>
      <button style="margin-left: 8px;" onclick="openAlbum()">📁 Explore Folder</button>
    </div>
  `
});

// Inject window into DOM
document.body.appendChild(appWindow.win.el.body);


// Playback function
window.playIntro = () => {
  ui("body", {
    tag: "ui-player",
    src: "/assets/tracks/intro.wav",
    autoplay: true
  });
};

// Folder open function
window.openAlbum = () => {
  ui("body", {
    tag: "ui-folder",
    path: "/album",
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
};
