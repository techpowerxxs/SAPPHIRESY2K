import React, { useState, useRef } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Shuffle, Repeat } from 'lucide-react';
import './MusicPlayer.css';

const MusicPlayer = ({ onClose, isMinimized = false }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(75);
  const [isShuffled, setIsShuffled] = useState(false);
  const [repeatMode, setRepeatMode] = useState('off'); // off, one, all
  const audioRef = useRef(null);

  const tracks = [
    {
      id: 1,
      title: 'Digital Dreams',
      artist: 'SapphireDVD',
      album: 'CANVAS',
      duration: '3:42',
      waveform: 'data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAwKbWV0YQAAAAAEAAAAdGVzdAAAABXR'
    },
    {
      id: 2,
      title: 'Neon Nights',
      artist: 'SapphireDVD', 
      album: 'CANVAS',
      duration: '4:15',
      waveform: 'data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAwKbWV0YQAAAAAEAAAAdGVzdAAAABXR'
    },
    {
      id: 3,
      title: 'Glass Cathedral',
      artist: 'SapphireDVD',
      album: 'CANVAS', 
      duration: '5:23',
      waveform: 'data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAwKbWV0YQAAAAAEAAAAdGVzdAAAABXR'
    }
  ];

  const currentTrackInfo = tracks[currentTrack];

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    // In real implementation, would control actual audio playback
  };

  const skipTrack = (direction) => {
    if (direction === 'next') {
      setCurrentTrack((prev) => (prev + 1) % tracks.length);
    } else {
      setCurrentTrack((prev) => (prev - 1 + tracks.length) % tracks.length);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (isMinimized) {
    return (
      <div className="music-player-mini">
        <div className="mini-track-info">
          <span className="mini-title">{currentTrackInfo.title}</span>
          <div className="mini-controls">
            <button onClick={() => skipTrack('prev')} className="mini-control-btn">
              <SkipBack size={12} />
            </button>
            <button onClick={togglePlay} className="mini-control-btn play-btn">
              {isPlaying ? <Pause size={12} /> : <Play size={12} />}
            </button>
            <button onClick={() => skipTrack('next')} className="mini-control-btn">
              <SkipForward size={12} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="music-player-container">
      <div className="music-player">
        <div className="player-header">
          <div className="now-playing-label">NOW PLAYING</div>
          <button className="close-player" onClick={onClose}>×</button>
        </div>

        <div className="track-display">
          <div className="album-art-container">
            <img 
              src="https://i.ibb.co/QnBvTqZ/star-album-cover.jpg" 
              alt="CANVAS album cover"
              className="album-art"
            />
            <div className="album-art-overlay">
              <div className="visualizer">
                {Array.from({ length: 20 }).map((_, i) => (
                  <div 
                    key={i} 
                    className={`bar ${isPlaying ? 'animate' : ''}`}
                    style={{ 
                      animationDelay: `${i * 0.1}s`,
                      height: `${Math.random() * 60 + 20}%`
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="track-info">
            <h2 className="track-title">{currentTrackInfo.title}</h2>
            <h3 className="track-artist">{currentTrackInfo.artist}</h3>
            <p className="track-album">{currentTrackInfo.album}</p>
          </div>
        </div>

        <div className="progress-section">
          <div className="time-display">
            <span className="current-time">{formatTime(progress)}</span>
            <span className="total-time">{currentTrackInfo.duration}</span>
          </div>
          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{ width: `${(progress / 300) * 100}%` }}
            />
            <div className="progress-handle" style={{ left: `${(progress / 300) * 100}%` }} />
          </div>
        </div>

        <div className="player-controls">
          <div className="control-buttons">
            <button 
              className={`control-btn ${isShuffled ? 'active' : ''}`}
              onClick={() => setIsShuffled(!isShuffled)}
            >
              <Shuffle size={18} />
            </button>
            
            <button 
              className="control-btn"
              onClick={() => skipTrack('prev')}
            >
              <SkipBack size={20} />
            </button>
            
            <button 
              className="control-btn play-pause-btn"
              onClick={togglePlay}
            >
              {isPlaying ? <Pause size={24} /> : <Play size={24} />}
            </button>
            
            <button 
              className="control-btn"
              onClick={() => skipTrack('next')}
            >
              <SkipForward size={20} />
            </button>
            
            <button 
              className={`control-btn ${repeatMode !== 'off' ? 'active' : ''}`}
              onClick={() => {
                const modes = ['off', 'one', 'all'];
                const nextMode = modes[(modes.indexOf(repeatMode) + 1) % modes.length];
                setRepeatMode(nextMode);
              }}
            >
              <Repeat size={18} />
            </button>
          </div>

          <div className="volume-control">
            <Volume2 size={16} />
            <div className="volume-slider">
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={volume}
                onChange={(e) => setVolume(e.target.value)}
                className="volume-input"
              />
            </div>
          </div>
        </div>

        <div className="playlist-section">
          <h4 className="playlist-title">CANVAS - Track List</h4>
          <div className="track-list">
            {tracks.map((track, index) => (
              <div 
                key={track.id}
                className={`track-item ${index === currentTrack ? 'active' : ''}`}
                onClick={() => setCurrentTrack(index)}
              >
                <div className="track-number">{String(index + 1).padStart(2, '0')}</div>
                <div className="track-details">
                  <span className="track-name">{track.title}</span>
                  <span className="track-duration">{track.duration}</span>
                </div>
                <div className="track-waveform">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <div 
                      key={i} 
                      className="waveform-bar"
                      style={{ height: `${Math.random() * 100}%` }}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;