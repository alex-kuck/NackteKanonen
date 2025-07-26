import React, {
    createContext,
    PropsWithChildren,
    use,
    useCallback,
    useEffect,
    useState
} from 'react';

const ThemeContext = createContext({
    theme: 'light',
    setTheme: (theme: 'light' | 'dark') => {
    }
});

export const useTheme = () => use(ThemeContext);

const getSystemTheme = () =>
    window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

export const ThemeProvider = ({children}: PropsWithChildren) => {
    const [theme, setThemeState] = useState<'light' | 'dark'>(() => {
        const stored = localStorage.getItem('theme');
        return stored === 'light' || stored === 'dark' ? stored : getSystemTheme();
    });

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    useEffect(() => {
        const listener = (e: MediaQueryListEvent) => {
            if (!localStorage.getItem('theme')) {
                setThemeState(e.matches ? 'dark' : 'light');
            }
        };
        const mq = window.matchMedia('(prefers-color-scheme: dark)');
        mq.addEventListener('change', listener);
        return () => mq.removeEventListener('change', listener);
    }, []);

    const setTheme = useCallback((t: 'light' | 'dark') => setThemeState(t), [setThemeState]);

    return (
        <ThemeContext.Provider value={{theme, setTheme}}>
            {children}
        </ThemeContext.Provider>
    );
};
