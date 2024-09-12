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
    const cloned = { ...curTheme };
    cloned.primaryColor = settings.primaryColor;
    cloned.primaryShade = settings.primaryShade;
    setCurTheme(cloned);
  }, [settings]);

  return (
        
    <MantineProvider theme={curTheme} defaultColorScheme='dark'>
      <MyComponent />
    </MantineProvider>
  );
};

export default App;
