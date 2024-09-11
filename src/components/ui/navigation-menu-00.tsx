// @/components/ui/navigation-menu.tsx
import React from 'react';

interface MenuProps {
  children: React.ReactNode;
}

export const Menu: React.FC<MenuProps> = ({ children }) => (
  <div className="relative inline-block text-left">
    {children}
  </div>
);

export const MenuButton: React.FC<MenuProps> = ({ children }) => (
  <button className="px-4 py-2 bg-gray-800 text-white rounded">
    {children}
  </button>
);

export const MenuItems: React.FC<MenuProps> = ({ children }) => (
  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg">
    {children}
  </div>
);

interface MenuItemProps {
  onClick?: () => void;
}

export const MenuItem: React.FC<MenuItemProps> = ({ onClick }) => (
  <button
    onClick={onClick}
    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
  >

  </button>
);
