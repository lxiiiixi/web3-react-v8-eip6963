import { lazy } from "react";

export const Login = lazy(() => import("@/pages/login"));
export const NotFound = lazy(() => import("@/pages/404"));
export const Home = lazy(() => import("@/pages/Home"));
export const About = lazy(() => import("@/pages/About"));
