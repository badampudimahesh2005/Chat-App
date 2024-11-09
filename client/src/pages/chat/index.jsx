import React from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner';
import { useEffect } from 'react';
import { useAppStore } from '@/store';

const Chat = () => {

  const {userInfo} = useAppStore();
  const navigate = useNavigate();

  useEffect(() => {
 
    if(!userInfo.profileSetup){
      toast.error("Please setup your profile first");
      navigate("/profile");
    }
    }, [userInfo, navigate]);
    

  return (
    <div>
      chat
    </div>
  )
}

export default Chat