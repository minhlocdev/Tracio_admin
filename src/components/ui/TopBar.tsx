import React from "react";
import { useDarkModeStore } from "../../store/useDarkModeStore";
import { BulbOutlined, BulbFilled } from "@ant-design/icons";

const TopBar: React.FC = () => {
  const { isDarkMode, toggleDarkMode } = useDarkModeStore();

  return (
    <div
      style={{
        height: "60px",
        width: "100%",
        backgroundColor: isDarkMode ? "#1f1f1f" : "#ffffff",
        borderBottom: "1px solid #e0e0e0",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 16px",
        position: "sticky",
        top: 0,
        zIndex: 10,
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <img
          src="/logo.svg"
          alt="App Logo"
          style={{ height: "40px", marginRight: "12px" }}
        />
        <span
          style={{
            fontSize: "18px",
            fontWeight: "bold",
            color: isDarkMode ? "#ffffff" : "#000000",
          }}
        >
          Tracio Admin
        </span>
      </div>

      {/* ✅ Dark mode toggle on the right */}
      <button
        onClick={toggleDarkMode}
        style={{
          background: "none",
          border: "none",
          fontSize: "24px",
          cursor: "pointer",
          color: isDarkMode ? "#ffffff" : "#000000",
        }}
      >
        {isDarkMode ? <BulbFilled /> : <BulbOutlined />}
      </button>
    </div>
  );
};

export default TopBar;
