import { Navbar } from "@/components/navbar/navbar";
import { RouteType } from "@/router/_types";
import Home from "@/screens/home/home";

export const PUBLIC_ROUTES = {
  HOME: "/home",
};

export const PUBLIC_ROUTES_COMPONENT: RouteType[] = [
  {
    path: PUBLIC_ROUTES.HOME,
    element: (
      <Navbar>
        <Home />
      </Navbar>
    ),
  },
];
