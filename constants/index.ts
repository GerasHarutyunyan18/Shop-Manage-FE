import {
  GridView,
  Home,
  ListAlt,
  Logout,
  Storefront,
  SupervisedUserCircle,
} from "@mui/icons-material";

export const RoutesWithoutSidebar = ["/login", "/signup"];

export const SidebarLinks = [
  {
    label: "Home",
    link: "/",
    icon: Home,
  },
  {
    label: "Orders",
    link: "/orders",
    icon: ListAlt,
  },
  {
    label: "Markets",
    link: "/markets",
    icon: Storefront,
  },
  {
    label: "User/Workers",
    link: "/workers",
    icon: SupervisedUserCircle,
  },
  {
    label: "Overview",
    link: "/overview",
    icon: GridView,
  },
  {
    label: "Register",
    link: "/signup",
    icon: Home,
  },
];
