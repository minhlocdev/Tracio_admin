import React from "react";
import { ConfigProvider } from "antd";
import enUS from "antd/locale/en_US";
import { useThemeColorStore } from "../../store/useThemeColorStore";

interface AppConfigProviderProps {
  children: React.ReactNode;
  isDarkMode: boolean;
}

const AppConfigProvider: React.FC<AppConfigProviderProps> = ({ children }) => {
  const colors = useThemeColorStore((state) => state.colors);

  return (
    <ConfigProvider
      theme={
        {
          // token: {
          //   colorPrimary: colors["--primary"] || "#1890ff",
          //   borderRadius: 6,
          //   colorBgContainer: colors["--background"],
          //   colorTextBase: colors["--foreground"],
          // },
          // components: {
          //   Button: {
          //     colorPrimary: colors["--primary"],
          //   },
          //   Table: {
          //     headerBg: colors["--card"],
          //     headerColor: colors["--card-foreground"],
          //     rowHoverBg: colors["--popover"],
          //   },
          // },
        }
      }
      locale={enUS}
      componentSize="small"
      direction="ltr"
    >
      {children}
    </ConfigProvider>
  );
};

export default AppConfigProvider;
