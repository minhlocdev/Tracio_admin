import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useSidebarStore } from "../../store/useSidebarStore";
import { useThemeColorStore } from "../../store/useThemeColorStore";
import TopBar from "../ui/TopBar";
import SideBar from "../ui/Sidebar";
import useAuthStore from "../../store/auth/useAuthStore";

const MainLayout: React.FC = () => {
  const { isCollapsed } = useSidebarStore();
  const backgroundColor =
    useThemeColorStore((state) => state.colors["--background"]) || "#f0f2f5";
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login", { replace: true });
    }
  }, [isAuthenticated, navigate]);

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
