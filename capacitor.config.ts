import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'MyPersonalGallery',
  appName: 'My Personal Gallery',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    LiveUpdates: {
      appId: 'c8e1a38d',
      channel: 'Production',
      autoUpdateMethod: 'background',
      maxVersions: 3
    }
  }
};

export default config;
