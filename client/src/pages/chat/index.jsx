import React from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner';
import { useEffect } from 'react';
import { useAppStore } from '@/store';
import ChatContainer from './components/chatContainer/ChatContainer';
import ContactsContainer from './components/ContactsContainer/contactsContainer';
import EmptyChatContainer from './components/EmptyChatContainer/EmptyChatContainer';
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
    <div className='flex h-[100vh] text-white overflow-hidden'>
     <ContactsContainer />
     {/* <EmptyChatContainer /> */}
      {/* <ChatContainer /> */}
    </div>
  )
}

export default Chat