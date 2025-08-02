import React, { useState } from 'react';
import { Menu, Search, Volume2, Wifi, Battery } from 'lucide-react';
import './Taskbar.css';

const Taskbar = ({ openWindows, activeWindow, onWindowActivate }) => {
  const [showStartMenu, setShowStartMenu] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every second
  React.useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const toggleStartMenu = () => {
    setShowStartMenu(!showStartMenu);
  };

  return (
    <>
      <div className="taskbar">
        <div className="taskbar-left">
          <button 
            className={`start-button ${showStartMenu ? 'active' : ''}`}
            onClick={toggleStartMenu}
          >
            <Menu size={16} />
            <span>Start</span>
          </button>
          
          <div className="taskbar-separator"></div>
          
          <div className="taskbar-buttons">
            {openWindows.map(window => (
              <button
                key={window.id}
                className={`taskbar-button ${activeWindow === window.id ? 'active' : ''}`}
                onClick={() => onWindowActivate(window.id)}
              >
                {window.title}
              </button>
            ))}
          </div>
        </div>

        <div className="taskbar-right">
          <div className="system-tray">
            <div className="tray-icon">
              <Volume2 size={14} />
            </div>
            <div className="tray-icon">
              <Wifi size={14} />
            </div>
            <div className="tray-icon">
              <Battery size={14} />
            </div>
          </div>
          
          <div className="taskbar-separator"></div>
          
          <div className="taskbar-clock">
            <span className="time">{formatTime(currentTime)}</span>
            <span className="date">{currentTime.toLocaleDateString()}</span>
          </div>
        </div>
      </div>

      {showStartMenu && (
        <div className="start-menu">
          <div className="start-menu-header">
            <span>SapphireDVD OS</span>
          </div>
          
          <div className="start-menu-items">
            <div className="start-menu-item">
              <Search size={16} />
              <span>Search</span>
            </div>
            <div className="start-menu-item">
              <Menu size={16} />
              <span>Programs</span>
            </div>
            <div className="start-menu-separator"></div>
            <div className="start-menu-item special-item">
              <span className="glitch-text">CANVAS Files</span>
            </div>
            <div className="start-menu-item">
              <span>Settings</span>
            </div>
            <div className="start-menu-separator"></div>
            <div className="start-menu-item">
              <span>Shut Down...</span>
            </div>
          </div>
        </div>
      )}
      
      {showStartMenu && (
        <div 
          className="start-menu-overlay"
          onClick={() => setShowStartMenu(false)}
        ></div>
      )}
    </>
  );
};

export default Taskbar;