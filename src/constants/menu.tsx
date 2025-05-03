import {
  DashboardOutlined,
  AppstoreOutlined,
  UserOutlined,
  ShopOutlined,
  FileTextOutlined,
  TrophyOutlined,
  TagsOutlined,
} from "@ant-design/icons";

export const menuItems = [
  {
    label: "Dashboard",
    key: "Dashboard",
    path: "",
    type: "item",
    icon: <DashboardOutlined />,
  },
  {
    label: "Categories",
    key: "Category",
    path: "/categories",
    type: "item",
    icon: <TagsOutlined />,
  },
  {
    label: "Subscriptions",
    key: "Subscription",
    type: "submenu",
    icon: <AppstoreOutlined />,
    children: [
      {
        label: "View Subscriptions",
        key: "Subscription_Read",
        path: "/subscriptions",
      },
    ],
  },
  {
    label: "Manage Users",
    key: "User_Manage",
    path: "/users",
    type: "item",
    icon: <UserOutlined />,
  },
  {
    label: "Manage Shops",
    key: "Shop",
    path: "/shops",
    type: "item",
    icon: <ShopOutlined />,
  },
  {
    label: "Reports",
    key: "Report",
    type: "submenu",
    icon: <FileTextOutlined />,
    children: [{ label: "View Reports", key: "Report_Read", path: "/reports" }],
  },
  {
    label: "Challenges",
    key: "Challenge",
    type: "submenu",
    icon: <TrophyOutlined />,
    children: [
      {
        label: "Create Challenge",
        key: "Challenge_Create",
        path: "/challenges/create",
      },
      {
        label: "View Challenges",
        key: "Challenge_Read",
        path: "/challenges",
      },
    ],
  },
];
