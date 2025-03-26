
import React from 'react';
import AppSidebar from './AppSidebar';
import { Outlet } from 'react-router-dom';
import { X, Minus, Square } from 'lucide-react';

const Layout = () => {
  // Only add window controls when running in Electron
  const isElectron = window.navigator.userAgent.toLowerCase().indexOf('electron') > -1;

  const closeWindow = () => {
    if (window.electron) {
      window.electron.send('toMain', { action: 'close' });
    }
  };

  const minimizeWindow = () => {
    if (window.electron) {
      window.electron.send('toMain', { action: 'minimize' });
    }
  };

  const maximizeWindow = () => {
    if (window.electron) {
      window.electron.send('toMain', { action: 'maximize' });
    }
  };

  return (
    <div className="flex min-h-screen bg-tube-darkest relative">
      {isElectron && (
        <div className="absolute top-0 right-0 flex items-center h-8 px-2 z-50 window-controls">
          <button onClick={minimizeWindow} className="p-1 text-tube-white/70 hover:text-tube-white">
            <Minus size={16} />
          </button>
          <button onClick={maximizeWindow} className="p-1 text-tube-white/70 hover:text-tube-white mx-1">
            <Square size={16} />
          </button>
          <button onClick={closeWindow} className="p-1 text-tube-white/70 hover:text-tube-white hover:bg-tube-red hover:bg-opacity-70 rounded">
            <X size={16} />
          </button>
        </div>
      )}
      <AppSidebar />
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
