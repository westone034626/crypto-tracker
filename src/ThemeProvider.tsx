import React, {
  useState,
  createContext,
  useContext,
  useMemo,
  ReactChildren,
  ReactChild,
} from 'react';
import { ThemeProvider as ThemeColorProvider } from 'styled-components';
import { darkTheme, lightTheme } from './theme';

interface ContextProps {
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

const ThemeContext = createContext<ContextProps | undefined>(undefined);

export const useTheme = () => {
  return useContext(ThemeContext);
};

interface AuxProp {
  children: ReactChild | ReactChildren;
}

const ThemeProvider = ({ children }: AuxProp) => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const onToggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };
  return (
    <ThemeContext.Provider value={{ isDarkMode, onToggleTheme }}>
      <ThemeColorProvider theme={isDarkMode ? darkTheme : lightTheme}>
        {children}
      </ThemeColorProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
