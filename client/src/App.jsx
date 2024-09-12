import React from 'react'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';

import Auth from './pages/auth/index.jsx';
import Chat from './pages/chat/index.jsx';
import Profile from './pages/profile/index.jsx';


const App = () => {

  const appRouter = createBrowserRouter([
    {path: '*', element: <Navigate to="/auth" />},
    {path: '/auth', element: <Auth />}, 
    {path: '/chat', element: <Chat />},
    {path: '/profile', element: <Profile />},

  ]);


  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  )
}

export default App