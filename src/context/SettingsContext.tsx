import React, { createContext, useContext, useState } from 'react';

export interface BusinessSettings {
  businessName: string;
  businessLogoText: string;
  ceoName: string;
  ceoDesignation: string;
  certificateSignatoryName: string;
  certificateSignatoryDesignation: string;
  contactEmail: string;
  contactPhone: string;
  contactAddress: string;
}

const defaultSettings: BusinessSettings = {
  businessName: 'Dahiya Solution',
  businessLogoText: 'DAHIYA SOLUTION',
  ceoName: 'Sahil Dahiya',
  ceoDesignation: 'Authorized CEO',
  certificateSignatoryName: 'Sahil Dahiya',
  certificateSignatoryDesignation: 'CEO',
  contactEmail: 'contact@dahiyasolution.com',
  contactPhone: '+91 9992618109',
  contactAddress: 'Dahiya Town, Devilal Colony, Mahendragarh, Haryana, 123029, India'
};

interface SettingsContextType {
  settings: BusinessSettings;
  updateSettings: (newSettings: Partial<BusinessSettings>) => void;
  resetSettings: () => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<BusinessSettings>(() => {
    try {
      const saved = localStorage.getItem('ds_business_settings');
      if (saved) {
        return { ...defaultSettings, ...JSON.parse(saved) };
      }
    } catch (e) {
      console.error('Failed to load settings', e);
    }
    return defaultSettings;
  });

  const updateSettings = (newSettings: Partial<BusinessSettings>) => {
    setSettings((prev) => {
      const updated = { ...prev, ...newSettings };
      try {
        localStorage.setItem('ds_business_settings', JSON.stringify(updated));
      } catch (e) {
        console.error('Failed to save settings', e);
      }
      return updated;
    });
  };

  const resetSettings = () => {
    setSettings(defaultSettings);
    try {
      localStorage.setItem('ds_business_settings', JSON.stringify(defaultSettings));
    } catch (e) {
      console.error('Failed to reset settings', e);
    }
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings, resetSettings }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}
