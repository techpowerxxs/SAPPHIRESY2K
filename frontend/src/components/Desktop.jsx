import React, { useState, useEffect } from 'react';
import { Monitor, Folder, Music, Settings, Trash2, FileText, Image } from 'lucide-react';
import Taskbar from './Taskbar';
import DesktopWindow from './DesktopWindow';
import './Desktop.css';

const Desktop = () => {
  const [openWindows, setOpenWindows] = useState([]);
  const [activeWindow, setActiveWindow] = useState(null);
  const [glitchActive, setGlitchActive] = useState(false);

  const desktopIcons = [
    { id: 'my-computer', name: 'My Computer', icon: Monitor, x: 50, y: 50 },
    { id: 'music-folder', name: 'Music', icon: Music, x: 50, y: 150 },
    { id: 'canvas-folder', name: '???', icon: Folder, x: 150, y: 100, hidden: true },
    { id: 'settings', name: 'Settings', icon: Settings, x: 250, y: 50 },
    { id: 'recycle-bin', name: 'Recycle Bin', icon: Trash2, x: 50, y: 250 },
    { id: 'readme', name: 'README.txt', icon: FileText, x: 150, y: 200 },
    { id: 'album-cover', name: 'image.jpg', icon: Image, x: 250, y: 150, special: true },
  ];

  // Trigger random glitch effects
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 500);
    }, Math.random() * 10000 + 5000);

    return () => clearInterval(glitchInterval);
  }, []);

  const openWindow = (iconId) => {
    const icon = desktopIcons.find(icon => icon.id === iconId);
    if (!icon) return;

    const newWindow = {
      id: `window-${iconId}-${Date.now()}`,
      title: getWindowTitle(iconId),
      content: getWindowContent(iconId),
      x: Math.random() * 300 + 100,
      y: Math.random() * 200 + 100,
      width: getWindowWidth(iconId),
      height: getWindowHeight(iconId),
      iconId: iconId
    };

    setOpenWindows(prev => [...prev, newWindow]);
    setActiveWindow(newWindow.id);
  };

  const closeWindow = (windowId) => {
    setOpenWindows(prev => prev.filter(w => w.id !== windowId));
    if (activeWindow === windowId) {
      const remaining = openWindows.filter(w => w.id !== windowId);
      setActiveWindow(remaining.length > 0 ? remaining[remaining.length - 1].id : null);
    }
  };

  const getWindowTitle = (iconId) => {
    const titles = {
      'my-computer': 'My Computer',
      'music-folder': 'Music Library',
      'canvas-folder': 'CANVAS - Hidden Files',
      'settings': 'System Settings',
      'recycle-bin': 'Recycle Bin',
      'readme': 'README.txt - Notepad',
      'album-cover': 'Image Viewer - CANVAS.jpg'
    };
    return titles[iconId] || 'Unknown';
  };

  const getWindowContent = (iconId) => {
    switch (iconId) {
      case 'my-computer':
        return (
          <div className="window-content">
            <div className="drive-list">
              <div className="drive-item" onClick={() => openWindow('music-folder')}>
                <Music className="drive-icon" />
                <span>Music (C:)</span>
              </div>
              <div className="drive-item">
                <Folder className="drive-icon" />
                <span>System (D:)</span>
              </div>
              <div className="drive-item glitch-text">
                <Folder className="drive-icon" />
                <span>???_HIDDEN_??? (X:)</span>
              </div>
            </div>
          </div>
        );
      
      case 'music-folder':
        return (
          <div className="window-content">
            <div className="file-list">
              <div className="file-item" onClick={() => openWindow('album-cover')}>
                <Image className="file-icon" />
                <span>CANVAS_cover.jpg</span>
              </div>
              <div className="file-item">
                <Music className="file-icon" />
                <span>track01.wav</span>
              </div>
              <div className="file-item">
                <Music className="file-icon" />
                <span>track02.wav</span>
              </div>
              <div className="file-item glitch-text">
                <FileText className="file-icon" />
                <span>announcement.txt</span>
              </div>
            </div>
          </div>
        );

      case 'canvas-folder':
        return (
          <div className="window-content special-content">
            <div className="album-announcement">
              <h2 className="glitch-title">CANVAS</h2>
              <h3>by SapphireDVD</h3>
              <div className="announcement-text">
                <p>A journey through digital landscapes...</p>
                <p>Coming Soon</p>
                <button className="play-button glass-button">▶ PREVIEW TRACK</button>
              </div>
            </div>
          </div>
        );

      case 'album-cover':
        return (
          <div className="window-content image-viewer">
            <img 
              src="https://i.ibb.co/QnBvTqZ/star-album-cover.jpg"
              alt="CANVAS album cover" 
              className="album-cover-large"
            />
            <div className="image-info">
              <p>CANVAS - SapphireDVD</p>
              <p>Resolution: 1024x1024</p>
            </div>
          </div>
        );

      case 'readme':
        return (
          <div className="window-content notepad-content">
            <div className="notepad-text">
              <p>Welcome to the CANVAS experience...</p>
              <p></p>
              <p>Some files are hidden.</p>
              <p>Some require special access.</p>
              <p>Explore carefully.</p>
              <p></p>
              <p className="glitch-text">The announcement is somewhere...</p>
            </div>
          </div>
        );

      default:
        return <div className="window-content">Content not found.</div>;
    }
  };

  const getWindowWidth = (iconId) => {
    const widths = {
      'my-computer': 400,
      'music-folder': 450,
      'canvas-folder': 500,
      'album-cover': 600,
      'readme': 400
    };
    return widths[iconId] || 350;
  };

  const getWindowHeight = (iconId) => {
    const heights = {
      'my-computer': 300,
      'music-folder': 350,
      'canvas-folder': 400,
      'album-cover': 500,
      'readme': 300
    };
    return heights[iconId] || 250;
  };

  return (
    <div className={`desktop ${glitchActive ? 'glitch-active' : ''}`}>
      <div className="desktop-background"></div>
      
      <div className="desktop-icons">
        {desktopIcons.map(icon => (
          <div
            key={icon.id}
            className={`desktop-icon ${icon.hidden ? 'hidden-icon' : ''} ${icon.special ? 'special-icon' : ''}`}
            style={{ left: icon.x, top: icon.y }}
            onDoubleClick={() => openWindow(icon.id)}
          >
            <div className="icon-image glass-element">
              <icon.icon size={24} />
            </div>
            <span className="icon-label">{icon.name}</span>
          </div>
        ))}
      </div>

      {openWindows.map(window => (
        <DesktopWindow
          key={window.id}
          window={window}
          isActive={activeWindow === window.id}
          onClose={() => closeWindow(window.id)}
          onActivate={() => setActiveWindow(window.id)}
        />
      ))}

      <Taskbar openWindows={openWindows} activeWindow={activeWindow} onWindowActivate={setActiveWindow} />
    </div>
  );
};

export default Desktop;