import React, { createContext, useContext, useRef, useState } from 'react';
import { Box, Flex } from '@radix-ui/themes';

const SideBarContext = createContext<{
  isOpen: boolean;
  toggleSideBar: () => void;
} | null>(null);

const SideBarRoot: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSideBar = () => setIsOpen((prev) => !prev);
  return (
    <SideBarContext.Provider value={{ isOpen, toggleSideBar }}>
      <Box className="relative">{children}</Box>
    </SideBarContext.Provider>
  );
};

const SideBarButton: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const context = useContext(SideBarContext);
  if (!context)
    throw new Error('SideBarButton must be used within SideBarRoot');
  const { toggleSideBar } = context;
  return (
    <Flex
      align="center"
      py="2"
      justify="center"
      onClick={toggleSideBar}
      className="cursor-pointer text-[var(--gray-12)]"
    >
      {children}
    </Flex>
  );
};

interface SideBarContentProps {
  children: React.ReactNode;
  position?: 'left' | 'right';
}

const SideBarContent: React.FC<SideBarContentProps> = ({
  children,
  position,
}) => {
  const context = useContext(SideBarContext);
  if (!context)
    throw new Error('SideBarContent must be used within SideBarRoot');
  const { isOpen, toggleSideBar } = context;
  const target = useRef<HTMLDivElement>(null);
  const width = window.innerWidth <= 768 ? 'w-3/4' : 'w-64';
  const hidden = position === 'left' ? '-translate-x-full' : 'translate-x-full';
  const pos = position === 'left' ? 'left-0' : 'right-0';
  return (
    <>
      <div
        className={`fixed inset-0 bg-black transition-opacity duration-300 ${
          isOpen ? 'opacity-30' : 'pointer-events-none opacity-0'
        } z-40`}
        onClick={() => toggleSideBar()}
      />
      <div
        ref={target}
        className={`fixed ${pos} top-0 z-50 h-full ${width} transform bg-[var(--color-background)] p-5 shadow-lg transition-all duration-300 ${
          isOpen ? 'opacity-100' : `${hidden} opacity-0`
        }`}
      >
        {children}
      </div>
    </>
  );
};

const SideBar = {
  Root: SideBarRoot,
  Button: SideBarButton,
  Content: SideBarContent,
};

export default SideBar;
