import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { ProtectedRoute } from '@components/protected-route/protected-route.tsx';
import { WrapperPage } from '@components/wrapper-page/wrapper-page.tsx';
import { FeedPage } from '@pages/feed/feed.tsx';
import { ForgotPasswordPage } from '@pages/forgot-password/forgot-password.tsx';
import { Home } from '@pages/home/home.tsx';
import { Ingredient } from '@pages/ingredient/ingredient.tsx';
import { LoginPage } from '@pages/login/login.tsx';
import { NotFoundPage } from '@pages/not-found/not-found.tsx';
import { OrdersPage } from '@pages/orders/orders.tsx';
import { ProfilePage } from '@pages/profile/profile.tsx';
import { RegisterPage } from '@pages/register/register.tsx';
import { ResetPasswordPage } from '@pages/reset-password/reset-password.tsx';
import { checkUserAuth } from '@services/user/action.ts';

import type { AppDispatch } from '@services/store.ts';

const router = createBrowserRouter([
  {
    path: '/',
    element: <WrapperPage />,
    children: [
      {
        path: '/',
        element: <Home />,
        children: [
          {
            path: '/ingredients/:id',
            element: <Ingredient />,
          },
        ],
      },
      {
        path: '/feed',
        element: <FeedPage />,
      },
      {
        path: '/profile',
        element: <ProtectedRoute component={<ProfilePage />} />,
        children: [{ path: 'orders', element: <OrdersPage /> }],
      },
    ],
  },
  {
    path: '/',
    element: <ProtectedRoute onlyUnAuth component={<WrapperPage />} />,
    children: [
      {
        path: '/register',
        element: <RegisterPage />,
      },
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/forgot-password',
        element: <ForgotPasswordPage />,
      },
      {
        path: '/reset-password',
        element: <ResetPasswordPage />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);

export const App = (): React.JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(checkUserAuth()).catch((error) => {
      console.error('Auth check failed:', error);
    });
  }, [dispatch]);

  return <RouterProvider router={router} />;
};
