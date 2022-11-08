import {
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { Route } from "react-router";
import { Home, Pokemon } from "../pages";
import { Layout } from "../components";
import { routes } from "../constants/routesPath";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path={routes.layout} element={<Layout />}>
      <Route index element={<Home />} />
      <Route path={routes.pokemon} element={<Pokemon />} />
    </Route>
  )
);
