import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

// project import
import Loadable from 'components/Loadable';
import MinimalLayout from 'layout/MinimalLayout';

// render - login
const Index = Loadable(lazy(() => import('pages/index/Index')));
const Iframe = Loadable(lazy(() => import('pages/index/Iframe')));

// ==============================|| AUTH ROUTING ||============================== //

// const payment = /^\/payment\/(success|fail)(\/[a-zA-Z0-9_\-]*)?/g;
const IndexRouters = {
    path: '/',
    element: <MinimalLayout />,
    children: [
        {
            path: '/',
            element: <Navigate to="/payment" replace />
        },
        {
            // 首页/支付
            path: '/payment',
            element: <Index />
        },
        {
            path: '/iframe',
            element: <Iframe />
        },
        {
            path: '/payment/:status',
            element: <Index />
        },
        {
            // fail 无token
            path: '/payment/:status/:token',
            element: <Index />
        },
        {
            // todo effect
            path: '*',
            element: <Navigate to="/payment" replace />
        }
    ]
};

export default IndexRouters;
