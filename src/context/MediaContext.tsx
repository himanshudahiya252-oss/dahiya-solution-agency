import React, { createContext, useContext, useState } from 'react';

export interface MediaLibrary {
  // Cinematic backgrounds
  techStudioBg: string;
  creativeStudioBg: string;
  marketingCommandBg: string;

  // Services
  webDevImage: string;
  webDevVideo: string;
  appDevImage: string;
  appDevVideo: string;
  uiUxImage: string;
  uiUxVideo: string;
  marketingImage: string;
  marketingVideo: string;
  analyticsImage: string;
  analyticsVideo: string;
  videoImage: string;
  videoVideo: string;
  youtubeImage: string;
  youtubeVideo: string;
  socialImage: string;
  socialVideo: string;
  educationImage: string;
  educationVideo: string;
  aiImage: string;
  aiVideo: string;
  biImage: string;
  biVideo: string;
  crmImage: string;
  crmVideo: string;
}

const defaultMedia: MediaLibrary = {
  // Cinematic background presets
  techStudioBg: '/src/assets/images/website_development_studio_1784273706424.jpg',
  creativeStudioBg: '/src/assets/images/video_editing_studio_1784273767977.jpg',
  marketingCommandBg: '/src/assets/images/marketing_dashboard_1784273747900.jpg',

  // Service assets & videos
  webDevImage: '/src/assets/images/website_development_studio_1784273706424.jpg',
  webDevVideo: 'https://www.w3schools.com/html/mov_bbb.mp4',
  
  appDevImage: '/src/assets/images/mobile_app_interface_1784273728384.jpg',
  appDevVideo: 'https://www.w3schools.com/html/movie.mp4',
  
  uiUxImage: '/src/assets/images/futuristic_innovation_lab_1784271765964.jpg',
  uiUxVideo: 'https://www.w3schools.com/html/mov_bbb.mp4',
  
  marketingImage: '/src/assets/images/marketing_dashboard_1784273747900.jpg',
  marketingVideo: 'https://www.w3schools.com/html/movie.mp4',
  
  analyticsImage: '/src/assets/images/ai_visualization_screens_1784271794578.jpg',
  analyticsVideo: 'https://www.w3schools.com/html/mov_bbb.mp4',
  
  videoImage: '/src/assets/images/video_editing_studio_1784273767977.jpg',
  videoVideo: 'https://www.w3schools.com/html/movie.mp4',
  
  youtubeImage: '/src/assets/images/modern_ai_workspace_1784272666662.jpg',
  youtubeVideo: 'https://www.w3schools.com/html/mov_bbb.mp4',
  
  socialImage: '/src/assets/images/abstract_digital_particles_1784271780742.jpg',
  socialVideo: 'https://www.w3schools.com/html/movie.mp4',
  
  educationImage: '/src/assets/images/ai_education_platform_1784273786221.jpg',
  educationVideo: 'https://www.w3schools.com/html/mov_bbb.mp4',
  
  aiImage: '/src/assets/images/ai_dashboard_hologram_1784272685643.jpg',
  aiVideo: 'https://www.w3schools.com/html/movie.mp4',
  
  biImage: '/src/assets/images/semiconductor_macro_1784272705068.jpg',
  biVideo: 'https://www.w3schools.com/html/mov_bbb.mp4',
  
  crmImage: '/src/assets/images/marketing_dashboard_1784273747900.jpg',
  crmVideo: 'https://www.w3schools.com/html/movie.mp4'
};

interface MediaContextType {
  media: MediaLibrary;
  updateMedia: (newMedia: Partial<MediaLibrary>) => void;
  resetMedia: () => void;
}

const MediaContext = createContext<MediaContextType | undefined>(undefined);

export function MediaProvider({ children }: { children: React.ReactNode }) {
  const [media, setMedia] = useState<MediaLibrary>(() => {
    try {
      const saved = localStorage.getItem('ds_media_library');
      if (saved) {
        return { ...defaultMedia, ...JSON.parse(saved) };
      }
    } catch (e) {
      console.error('Failed to load media settings', e);
    }
    return defaultMedia;
  });

  const updateMedia = (newMedia: Partial<MediaLibrary>) => {
    setMedia((prev) => {
      const updated = { ...prev, ...newMedia };
      try {
        localStorage.setItem('ds_media_library', JSON.stringify(updated));
      } catch (e) {
        console.error('Failed to save media settings', e);
      }
      return updated;
    });
  };

  const resetMedia = () => {
    setMedia(defaultMedia);
    try {
      localStorage.setItem('ds_media_library', JSON.stringify(defaultMedia));
    } catch (e) {
      console.error('Failed to reset media settings', e);
    }
  };

  return (
    <MediaContext.Provider value={{ media, updateMedia, resetMedia }}>
      {children}
    </MediaContext.Provider>
  );
}

export function useMedia() {
  const context = useContext(MediaContext);
  if (!context) {
    throw new Error('useMedia must be used within a MediaProvider');
  }
  return context;
}
