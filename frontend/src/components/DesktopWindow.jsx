import React, { useState, useRef } from 'react';
import { X, Minus, Square } from 'lucide-react';
import './DesktopWindow.css';

const DesktopWindow = ({ window, isActive, onClose, onActivate }) => {
  const [position, setPosition] = useState({ x: window.x, y: window.y });
  const [size, setSize] = useState({ width: window.width, height: window.height });
  const [isMinimized, setIsMinimized] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef({ startX: 0, startY: 0 });

  const handleMouseDown = (e) => {
    if (e.target.closest('.window-controls')) return;
    
    setIsDragging(true);
    onActivate();
    dragRef.current = {
      startX: e.clientX - position.x,
      startY: e.clientY - position.y
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    
    setPosition({
      x: e.clientX - dragRef.current.startX,
      y: e.clientY - dragRef.current.startY
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  const handleMinimize = () => {
    setIsMinimized(true);
  };

  const handleRestore = () => {
    setIsMinimized(false);
    onActivate();
  };

  if (isMinimized) {
    return null; // Window is minimized, handled by taskbar
  }

  return (
    <div
      className={`desktop-window ${isActive ? 'active' : ''} ${isDragging ? 'dragging' : ''}`}
      style={{
        left: position.x,
        top: position.y,
        width: size.width,
        height: size.height,
        zIndex: isActive ? 1000 : 999
      }}
      onClick={onActivate}
    >
      <div 
        className="window-titlebar"
        onMouseDown={handleMouseDown}
      >
        <div className="window-title">
          {window.title}
        </div>
        <div className="window-controls">
          <button 
            className="control-button minimize-button"
            onClick={handleMinimize}
          >
            <Minus size={12} />
          </button>
          <button 
            className="control-button maximize-button"
            onClick={() => {/* Handle maximize */}}
          >
            <Square size={10} />
          </button>
          <button 
            className="control-button close-button"
            onClick={onClose}
          >
            <X size={12} />
          </button>
        </div>
      </div>
      
      <div className="window-body">
        {window.content}
      </div>
    </div>
  );
};

export default DesktopWindow;