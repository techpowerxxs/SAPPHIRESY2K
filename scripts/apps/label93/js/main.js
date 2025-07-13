setTimeout(() => {
  document.getElementById("splash").style.display = "none";
  document.getElementById("desktop").style.display = "flex";
}, 3000);

function launchApp(path, title) {
  const win = document.createElement('div');
  win.className = 'window';
  win.innerHTML = `
    <div style="background:#222; color:#fff; padding:4px; font-size:0.8rem;">
      ${title}
    </div>
    <iframe src="${path}" style="width:100%; height:90%; border:none;"></iframe>
  `;
  document.body.appendChild(win);
}

document.getElementById("blorb-icon").onclick = () => {
  launchApp("apps/blorb/index.html", "BLORB.EXE");
};
