import React, { useEffect, useState } from 'react'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import { useAppStore } from './store';
import Auth from './pages/auth/index.jsx';
import Chat from './pages/chat/index.jsx';
import Profile from './pages/profile/index.jsx';


import { GET_USER_INFO_ROUTE } from '@/utils/constants';
import apiClient from './lib/apiClient';



const PrivateRoute = ({element}) => {
  const {userInfo} = useAppStore();
  const isAuthenticated = !!userInfo;
  return isAuthenticated ? element : <Navigate to="/auth" />
}

const AuthRoute = ({element}) => {
  const {userInfo} = useAppStore();
  const isAuthenticated = !!userInfo;
  return isAuthenticated ? <Navigate to="/chat" /> : element;
}


const App = () => {

  const  {userInfo, setUserInfo} = useAppStore();
  const [loading, setLoading] = useState( true);

  useEffect(() => {

    const getUserData = async () => {
      try{
    const response = await apiClient.get(GET_USER_INFO_ROUTE, {withCredentials: true,});
    if(response.status === 200 && response.data.id){
      setUserInfo(response.data);
    }else{
      setUserInfo(undefined);
    }
    
    }catch(error){
          console.log({error});
    }finally{
      setLoading(false);
      }
     
    };

    if(!userInfo){
      getUserData();
    }else{
      setLoading(false);
    }

  }, [userInfo, setUserInfo]);

  if(loading){
    return <div>Loading...</div>
  }

  const appRouter = createBrowserRouter([
    {path: '*', element: <Navigate to="/auth" />},
    {path: '/auth', element: <AuthRoute element={<Auth />} />}, 
    {path: '/chat', element: <PrivateRoute element={<Chat />} />},
    {path: '/profile', element: <PrivateRoute element={<Profile />} />},

  ]);


  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  )
}

export default App