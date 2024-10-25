import React from "react";

export interface RouteType {
  path: string;
  element: React.JSX.Element;
  isProtected?: boolean;
}
