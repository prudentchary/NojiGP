import React, { createContext, useContext, useState, ReactNode } from "react";
import { useTheme } from "../../app/providers/ThemeProvider";

interface LayoutContextProps {
    isSidebarOpen: boolean;
    toggleSidebar: () => void;
    isDarkMode: boolean;
    toggleTheme: () => void;
    isGridLayout: boolean;
    toggleLayoutMode: () => void;
}

const LayoutContext = createContext<LayoutContextProps | undefined>(undefined);

export const LayoutProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isGridLayout, setIsGridLayout] = useState(true);
    
    // Connect to the global ThemeProvider
    const { theme, toggleTheme } = useTheme();
    const isDarkMode = theme === 'dark';

    const toggleSidebar = () => setIsSidebarOpen(prev => !prev);
    const toggleLayoutMode = () => setIsGridLayout(prev => !prev);

    return (
        <LayoutContext.Provider value={{
            isSidebarOpen,
            toggleSidebar,
            isDarkMode,
            toggleTheme,
            isGridLayout,
            toggleLayoutMode
        }}>
            {children}
        </LayoutContext.Provider>
    );
};

export const useLayoutContext = () => {
    const context = useContext(LayoutContext);
    if (!context) {
        throw new Error("useLayoutContext must be used within a LayoutProvider");
    }
    return context;
};