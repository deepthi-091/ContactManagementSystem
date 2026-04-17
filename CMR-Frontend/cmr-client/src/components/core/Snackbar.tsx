'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

type SnackbarType = 'success' | 'error' | 'info';

interface SnackbarState {
  open: boolean;
  message: string;
  type: SnackbarType;
}

interface SnackbarContextProps {
  showSnackbar: (message: string, type?: SnackbarType) => void;
}

const SnackbarContext = createContext<SnackbarContextProps | null>(null);

export function SnackbarProvider({ children }: { children: ReactNode }) {
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    open: false,
    message: '',
    type: 'success',
  });

  const showSnackbar = (message: string, type: SnackbarType = 'success') => {
    setSnackbar({ open: true, message, type });

    setTimeout(() => {
      setSnackbar(prev => ({ ...prev, open: false }));
    }, 3000);
  };

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      {snackbar.open && (
        <div
          className={`fixed bottom-6 right-6 z-50 px-4 py-3 rounded-md text-white shadow-lg transition-all
            ${
              snackbar.type === 'success'
                ? 'bg-green-600'
                : snackbar.type === 'error'
                ? 'bg-red-600'
                : 'bg-blue-600'
            }`}
        >
          {snackbar.message}
        </div>
      )}
    </SnackbarContext.Provider>
  );
}

export function useSnackbar() {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error('useSnackbar must be used inside SnackbarProvider');
  }
  return context;
}
