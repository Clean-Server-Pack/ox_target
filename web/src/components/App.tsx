import '@mantine/dates/styles.css';
import React, { useEffect, useState } from "react";
import "./App.css";
import MyComponent from "./Target/main";
import { MantineProvider } from '@mantine/core';
import theme from '../theme';
import { useSettings } from '../providers/settings/settings';

const App: React.FC = () => {
  const [curTheme, setCurTheme] = useState(theme);
  const settings = useSettings();
  // Ensure the theme is updated when the settings change

  useEffect(() => {
    const updatedTheme = {
      ...theme, // Start with the existing theme object
      colors: {
        ...theme.colors, // Copy the existing colors
        custom: settings.customTheme || theme.colors?.custom
      },
      primaryColor: settings.primaryColor,
      primaryShade: settings.primaryShade,
    };

    setCurTheme(updatedTheme);
  }, [settings]);

  return (
        
    <MantineProvider theme={curTheme} defaultColorScheme='dark'>
      <MyComponent />
    </MantineProvider>
  );
};

export default App;
