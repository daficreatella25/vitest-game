import React from "react";
import {
  Navigate,
  RouterProvider,
  RouterProviderProps,
  createBrowserRouter,
} from "react-router-dom";

import { RouteType } from "./_types";

import { PUBLIC_ROUTES, PUBLIC_ROUTES_COMPONENT } from "@/config/routes.public";

const fallbackRoute = {
  path: "*",
  element: <Navigate to={PUBLIC_ROUTES.HOME} />,
};

const createRouter = (routes: RouteType[]): RouterProviderProps => {
  const browserRoutes = routes.map(({ path, element }) => ({
    path,
    element: <>{element} </>,
  }));

  browserRoutes.push(fallbackRoute);

  return {
    router: createBrowserRouter(browserRoutes),
  };
};

const router = createRouter([...PUBLIC_ROUTES_COMPONENT]);

export const Router = (): React.JSX.Element => {
  return (
    <>
      <RouterProvider router={router.router} />
    </>
  );
};
