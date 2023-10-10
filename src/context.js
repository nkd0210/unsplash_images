import { createContext, useContext, useState, useEffect } from "react";
// Tao 1 context
const AppContext = createContext();

// Tao 1 provider
export const AppProvider = ({ children }) => {
    const [isDarkTheme, setIsDarkTheme] = useState(false);
    const [searchTerm, setSearchTerm] = useState('cat');

    const toggleDarkTheme = () => {
        const newDarkTheme = !isDarkTheme;
        setIsDarkTheme(newDarkTheme);
        const body = document.querySelector('body');
        body.classList.toggle('dark-theme', newDarkTheme);
    }

    return (
        <AppContext.Provider
            value={{ isDarkTheme, toggleDarkTheme, searchTerm, setSearchTerm }}
        >
            {children}
        </AppContext.Provider>
    );
};

// Su dung context trong cac thanh phan con
export const useGlobalContext = () => useContext(AppContext);