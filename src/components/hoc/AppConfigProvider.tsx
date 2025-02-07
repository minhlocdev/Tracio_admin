import React, { useState, useEffect, useCallback } from "react";
import { ConfigProvider } from "antd";
import enUS from "antd/locale/en_US";

interface AppConfigProviderProps {
  children: React.ReactNode;
  isDarkMode: boolean;
}

const AppConfigProvider: React.FC<AppConfigProviderProps> = ({
  children,
  isDarkMode,
}) => {
  type ThemeData = {
    borderRadius: number;
    colorPrimary: string;
    colorBgContainer: string; // Add this
    colorTextBase: string; // Add this
    Button?: {
      colorPrimary: string;
    };
  };

  // Function to get the CSS variable value
  const getCSSVar = (variableName: string): string => {
    return getComputedStyle(document.documentElement)
      .getPropertyValue(variableName)
      .trim();
  };

  // Function to build the theme data
  const buildThemeData = useCallback((isDark: boolean): ThemeData => {
    const themePrefix = isDark ? "dark" : "light";

    return {
      borderRadius: 6, // Or get it from a CSS variable if you have one
      colorPrimary: getCSSVar("--primary"),
      colorBgContainer: getCSSVar(
        `--${themePrefix === "dark" ? "background" : "card"}`
      ), // Dynamically get bg
      colorTextBase: getCSSVar(
        `--${themePrefix === "dark" ? "foreground" : "foreground"}`
      ),
      Button: {
        colorPrimary: getCSSVar("--primary"),
      },
    };
  }, []);

  const [themeData, setThemeData] = useState<ThemeData>(
    buildThemeData(isDarkMode)
  );

  useEffect(() => {
    setThemeData(buildThemeData(isDarkMode));
  }, [isDarkMode, buildThemeData]);

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: themeData.colorPrimary,
          borderRadius: themeData.borderRadius,
          colorBgContainer: themeData.colorBgContainer, // Add this
          colorTextBase: themeData.colorTextBase, // Add this
        },
        components: {
          Button: {
            colorPrimary: themeData.Button?.colorPrimary,
          },
        },
      }}
      locale={enUS}
      componentSize="middle"
      direction="ltr"
    >
      {children}
    </ConfigProvider>
  );
};

export default AppConfigProvider;
