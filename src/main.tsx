
import { createRoot } from 'react-dom/client'
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import App from './App.tsx'
import './index.css'
import { Capacitor } from '@capacitor/core';

// Call the element loader after the platform has been bootstrapped
defineCustomElements(window);

// Initialize Capacitor
if (Capacitor.isNativePlatform()) {
  console.log('Running on a native platform');
}

createRoot(document.getElementById("root")!).render(<App />);
