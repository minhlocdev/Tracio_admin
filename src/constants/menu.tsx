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
    label: "Category",
    key: "Category",
    type: "submenu",
    icon: <TagsOutlined />,
    children: [
      {
        label: "Create Category",
        key: "Category_Create",
        path: "/categories/create",
      },
      {
        label: "View Categories",
        key: "Category_Read",
        path: "/categories",
      },
    ],
  },
  {
    label: "Subscription",
    key: "Subscription",
    type: "submenu",
    icon: <AppstoreOutlined />,
    children: [
      {
        label: "Create Subscription",
        key: "Subscription_Create",
        path: "/subscriptions/create",
      },
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
    label: "Shop",
    key: "Shop",
    type: "submenu",
    icon: <ShopOutlined />,
    children: [
      { label: "Create Shop", key: "Shop_Create", path: "/shops/create" },
      { label: "View Shops", key: "Shop_Read", path: "/shops" },
    ],
  },
  {
    label: "Report",
    key: "Report",
    type: "submenu",
    icon: <FileTextOutlined />,
    children: [
      { label: "Create Report", key: "Report_Create", path: "/reports/create" },
      { label: "View Reports", key: "Report_Read", path: "/reports" },
    ],
  },
  {
    label: "Challenge",
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
