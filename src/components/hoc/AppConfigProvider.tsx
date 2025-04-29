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
    colorBgContainer: string;
    colorTextBase: string;
    Button?: {
      colorPrimary: string;
    };
  };

  const getCSSVar = (variableName: string): string => {
    return getComputedStyle(document.documentElement)
      .getPropertyValue(variableName)
      .trim();
  };

  const buildThemeData = useCallback((isDark: boolean): ThemeData => {
    return {
      borderRadius: 6,
      colorPrimary: getCSSVar("--primary") || "#1890ff",
      colorBgContainer: getCSSVar(
        isDark ? "--background-dark" : "--background-light"
      ),
      colorTextBase: getCSSVar(
        isDark ? "--foreground-dark" : "--foreground-light"
      ),
      Button: {
        colorPrimary: getCSSVar("--primary") || "#1890ff",
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
          colorBgContainer: themeData.colorBgContainer,
          colorTextBase: themeData.colorTextBase,
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
