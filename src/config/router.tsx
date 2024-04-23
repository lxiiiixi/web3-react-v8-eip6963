import { ReactNode, Suspense } from "react";
import { type RouteObject } from "react-router-dom";
import PageLayout from "@/sections/PageLayout";
import { Login, NotFound, About, Home } from "@/pages";

const lazyLoad = (conponent: ReactNode): ReactNode => {
    return <Suspense fallback={<span>A loading component here</span>}>{conponent}</Suspense>;
};

const routes: RouteObject[] = [
    {
        path: "/",
        element: <PageLayout />,
        children: [
            {
                path: "/",
                element: lazyLoad(<Home />),
            },
            {
                path: "/home",
                element: lazyLoad(<Home />),
            },
            {
                path: "/about",
                element: lazyLoad(<About />),
            },
        ],
    },
    {
        path: "/login",
        element: lazyLoad(<Login />),
    },
    {
        path: "*",
        element: lazyLoad(<NotFound />),
    },
];

export default routes;
