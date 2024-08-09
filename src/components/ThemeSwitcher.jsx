import { NavbarItem, Switch } from "@nextui-org/react";
import { useEffect, useState } from "react";

const ThemeSwitcher = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const currentTheme = localStorage.getItem('theme');
        if (currentTheme === 'dark') {
            setIsDarkMode(true);
        }
    }, []);

    const toggleTheme = () => {
        setIsDarkMode((prev) => !prev);
        const newTheme = !isDarkMode ? 'dark' : 'light';
        localStorage.setItem('theme', newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
    };

    return (
        <div className="flex items-center">
            <Switch
                checked={isDarkMode}
                onChange={toggleTheme}
                size="lg"
            />
            <span style={{ marginLeft: '0.5rem' }}>
                {isDarkMode ? 'Dark Mode' : 'Light Mode'}
            </span>

        </div>
    );
}

export default ThemeSwitcher;