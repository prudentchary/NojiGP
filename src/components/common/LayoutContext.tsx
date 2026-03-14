import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

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
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isGridLayout, setIsGridLayout] = useState(true);

    const toggleSidebar = () => setIsSidebarOpen(prev => !prev);

    const toggleTheme = () => {
        setIsDarkMode(prev => {
            const nextMode = !prev;
            if (nextMode) {
                document.documentElement.classList.add("dark");
            } else {
                document.documentElement.classList.remove("dark");
            }
            return nextMode;
        });
    };

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
