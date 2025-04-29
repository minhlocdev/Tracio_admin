import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { menuItems } from "../../constants/menu";
import { useThemeColorStore } from "../../store/useThemeColorStore";

interface SideBarProps {
  collapsed: boolean;
}

const SideBar: React.FC<SideBarProps> = ({ collapsed }) => {
  const { colors } = useThemeColorStore();
  const [activeMenu, setActiveMenu] = useState<string>("Dashboard");
  const navigate = useNavigate();

  const handleMenuClick = (key: string, path: string) => {
    setActiveMenu(key);
    navigate(path);
  };

  return (
    <Sidebar
      collapsed={collapsed}
      backgroundColor={colors["--sidebar"] || "#ffffff"}
      rootStyles={{
        color: colors["--sidebar-foreground"] || "#000000",
        height: "100vh",
      }}
    >
      <Menu
        menuItemStyles={{
          button: ({ level, active, disabled }) => ({
            color: disabled
              ? "rgba(0, 0, 0, 0.25)"
              : colors["--sidebar-foreground"] || "rgba(0,0,0,0.88)",
            backgroundColor: active
              ? colors["--sidebar-accent"] || "#e6f7ff"
              : "transparent",
            fontWeight: active ? 600 : 400,
            fontSize: "14px",
            borderRadius: "6px",
            margin: "4px 8px",
            height: "40px",
            display: "flex",
            alignItems: "center",
            paddingLeft: level === 0 ? "16px" : "32px",
            paddingRight: "16px",
            transition: "all 0.3s",
            "&:hover": {
              backgroundColor: colors["--sidebar-accent"] || "#f5f5f5",
              color: colors["--sidebar-primary"] || "#1890ff",
            },
          }),
          label: {
            fontSize: "14px",
          },
        }}
      >
        {menuItems.map((item) => {
          if (item.type === "submenu" && item.children) {
            return (
              <SubMenu key={item.key} label={item.label} icon={item.icon}>
                {item.children.map((child) => (
                  <MenuItem
                    key={child.key}
                    active={activeMenu === child.key}
                    onClick={() => handleMenuClick(child.key, child.path)}
                    icon={item.icon}
                  >
                    {child.label}
                  </MenuItem>
                ))}
              </SubMenu>
            );
          } else {
            return (
              <MenuItem
                key={item.key}
                active={activeMenu === item.key}
                onClick={() => handleMenuClick(item.key, item.path!)}
                icon={item.icon}
              >
                {item.label}
              </MenuItem>
            );
          }
        })}
      </Menu>
    </Sidebar>
  );
};

export default SideBar;
