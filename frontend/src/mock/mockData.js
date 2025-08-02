// Mock data for the CANVAS album announcement website
export const albumData = {
  title: "CANVAS",
  artist: "SapphireDVD",
  coverArt: "https://i.ibb.co/QnBvTqZ/star-album-cover.jpg",
  releaseDate: "Coming Soon",
  description: "A journey through digital landscapes and synthetic dreams",
  tracks: [
    {
      id: 1,
      title: "Digital Dreams",
      duration: "3:42",
      preview: null // In real app, would be audio URL
    },
    {
      id: 2,
      title: "Neon Nights", 
      duration: "4:15",
      preview: null
    },
    {
      id: 3,
      title: "Glass Cathedral",
      duration: "5:23",
      preview: null
    },
    {
      id: 4,
      title: "Synthwave Memories",
      duration: "4:08",
      preview: null
    },
    {
      id: 5,
      title: "Electric Dawn",
      duration: "6:12",
      preview: null
    }
  ],
  announcement: {
    message: "Dive into a world where reality bends and digital dreams come alive. CANVAS is more than an album - it's an experience that blurs the line between the synthetic and the sublime.",
    specialMessage: "Hidden throughout this system are clues to unlock exclusive content. Explore every corner of this digital realm.",
    releaseInfo: "First single drops soon. Full album following this winter."
  }
};

export const systemFiles = [
  {
    id: 'readme',
    name: 'README.txt',
    type: 'text',
    content: `Welcome to the CANVAS experience...

Some files are hidden.
Some require special access.  
Explore carefully.

The announcement is somewhere...`,
    location: 'desktop'
  },
  {
    id: 'music-folder',
    name: 'Music',
    type: 'folder',
    contents: [
      {
        name: 'CANVAS_cover.jpg',
        type: 'image',
        src: albumData.coverArt
      },
      {
        name: 'track01.wav',
        type: 'audio',
        title: 'Digital Dreams'
      },
      {
        name: 'track02.wav', 
        type: 'audio',
        title: 'Neon Nights'
      },
      {
        name: 'announcement.txt',
        type: 'text',
        content: albumData.announcement.message,
        special: true
      }
    ]
  },
  {
    id: 'hidden-folder',
    name: '???',
    type: 'folder',
    hidden: true,
    contents: [
      {
        name: 'CANVAS_announcement.txt',
        type: 'text',
        content: `${albumData.announcement.message}\n\n${albumData.announcement.specialMessage}\n\n${albumData.announcement.releaseInfo}`,
        special: true
      }
    ]
  }
];

export const desktopConfig = {
  background: {
    type: 'gradient',
    colors: ['#0a0a0a', '#1a1a2e', '#16213e'],
    effects: ['noise', 'scanlines', 'glitch']
  },
  icons: [
    {
      id: 'my-computer',
      name: 'My Computer',
      icon: 'monitor',
      position: { x: 50, y: 50 }
    },
    {
      id: 'music-folder',
      name: 'Music',
      icon: 'music',
      position: { x: 50, y: 150 }
    },
    {
      id: 'canvas-folder',
      name: '???',
      icon: 'folder',
      position: { x: 150, y: 100 },
      hidden: true
    },
    {
      id: 'settings',
      name: 'Settings',
      icon: 'settings',
      position: { x: 250, y: 50 }
    },
    {
      id: 'recycle-bin',
      name: 'Recycle Bin',
      icon: 'trash',
      position: { x: 50, y: 250 }
    },
    {
      id: 'readme',
      name: 'README.txt',
      icon: 'file-text',
      position: { x: 150, y: 200 }
    },
    {
      id: 'album-cover',
      name: 'image.jpg',
      icon: 'image',
      position: { x: 250, y: 150 },
      special: true
    }
  ]
};

// Mock functions that would be replaced with real API calls
export const mockAPI = {
  getAlbumData: () => Promise.resolve(albumData),
  
  getDesktopFiles: () => Promise.resolve(systemFiles),
  
  openFile: (fileId) => {
    const file = systemFiles.find(f => f.id === fileId);
    return Promise.resolve(file);
  },
  
  playTrack: (trackId) => {
    console.log(`Playing track ${trackId} - This would be real audio in production`);
    return Promise.resolve({ playing: true, trackId });
  },
  
  unlockHiddenContent: () => {
    console.log('Unlocking hidden content - This would trigger special effects');
    return Promise.resolve({ unlocked: true });
  }
};