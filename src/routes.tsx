import { ImageRegister } from "./pages/ImageRegister";
import { Scanner } from "./pages/Scanner";
import { Home } from "./pages/Home";
import type { ReactElement } from "react";

export interface AppRoute {
  path: string;
  element: ReactElement;
}

export const appRoutes: AppRoute[] = [
  { path: "/", element: <Home /> },
  { path: "/registrar-imagem", element: <ImageRegister /> },
  { path: "/comparar-rostos", element: <Scanner /> },
];
