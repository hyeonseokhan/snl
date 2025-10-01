'use client';

import React, { createContext, useContext, useState, useMemo } from 'react';

interface TestModeContextType {
  isTestMode: boolean;
  toggleTestMode: () => void;
}

const TestModeContext = createContext<TestModeContextType | undefined>(
  undefined,
);

export const TestModeProvider = ({ children }: { children: React.ReactNode }) => {
  const [isTestMode, setIsTestMode] = useState(false);

  const toggleTestMode = () => {
    setIsTestMode((prev) => !prev);
  };

  const value = useMemo(() => ({ isTestMode, toggleTestMode }), [isTestMode]);

  return (
    <TestModeContext.Provider value={value}>{children}</TestModeContext.Provider>
  );
};

export const useTestMode = () => {
  const context = useContext(TestModeContext);
  if (context === undefined) {
    throw new Error('useTestMode must be used within a TestModeProvider');
  }
  return context;
};
