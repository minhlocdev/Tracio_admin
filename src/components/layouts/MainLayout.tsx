import React from "react";
import { Outlet } from "react-router-dom";
import { useSidebarStore } from "../../store/useSidebarStore";
import { useThemeColorStore } from "../../store/useThemeColorStore";
import TopBar from "../ui/TopBar";
import SideBar from "../ui/Sidebar";

const MainLayout: React.FC = () => {
  const { isCollapsed } = useSidebarStore();
  const backgroundColor =
    useThemeColorStore((state) => state.colors["--background"]) || "#f0f2f5";

  return (
    <div style={{ display: "flex", height: "100vh", flexDirection: "row" }}>
      <SideBar collapsed={isCollapsed} />
      <div style={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        <TopBar />
        <main
          style={{
            flexGrow: 1,
            padding: "16px",
            backgroundColor: backgroundColor,
          }}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
