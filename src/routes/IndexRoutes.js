import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

// project import
import Loadable from 'components/Loadable';
import MinimalLayout from 'layout/MinimalLayout';

// render - login
const Index = Loadable(lazy(() => import('pages/index/Index')));

// ==============================|| AUTH ROUTING ||============================== //

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
            // newTab
            path: '/payment/:token',
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
