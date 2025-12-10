import type { ReactElement } from "react";
import { Home } from "./pages/Home";
import { Scanner } from "./pages/Scanner";
import { HowItWorks } from "./pages/HowItWorks";


export interface AppRoute {
  path: string;
  element: ReactElement;
}

export const appRoutes: AppRoute[] = [
  { path: "/", element: <Home /> },
  { path: "/comparar-rostos", element: <Scanner /> },
  { path: "/como-funciona", element: <HowItWorks /> },
];
