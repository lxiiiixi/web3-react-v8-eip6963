import { ReactNode, Suspense } from "react";
import { type RouteObject } from "react-router-dom";
import PageLayout from "@/sections/PageLayout";
import {  NotFound, Home } from "@/pages";

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
        ],
    },
    {
        path: "*",
        element: lazyLoad(<NotFound />),
    },
];

export default routes;
