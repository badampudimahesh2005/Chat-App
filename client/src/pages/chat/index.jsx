import React from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner';
import { useEffect } from 'react';
import { useAppStore } from '@/store';
import ChatContainer from './components/chatContainer/ChatContainer';
import ContactsContainer from './components/ContactsContainer/contactsContainer';
import EmptyChatContainer from './components/EmptyChatContainer/EmptyChatContainer';
const Chat = () => {

  const {
    userInfo, 
    selectedChatType,
    isUploading,
    isDownloading,
    fileUploadProgress,
    fileDownloadProgress,
  } = useAppStore();
  const navigate = useNavigate();

  useEffect(() => {
 
    if(!userInfo.profileSetup){
      toast.error("Please setup your profile first");
      navigate("/profile");
    }
    }, [userInfo, navigate]);
    

  return (
    <div className='flex h-[100vh] text-white overflow-hidden'>
      {isUploading && (
        <div className="h-[100vh] w-[100vw] fixed top-0 z-10 left-0 bg-black/80 flex items-center justify-center flex-col gap-5">
          <h5 className="text-5xl animate-pulse">Uploading File</h5>
          {fileUploadProgress}%
        </div>
      )}
      {isDownloading && (
        <div className="h-[100vh] w-[100vw] fixed top-0 z-10 left-0 bg-black/80 flex items-center justify-center flex-col gap-5">
          <h5 className="text-5xl animate-pulse">Downloading File</h5>
          {fileDownloadProgress}%
        </div>
      )}
     <ContactsContainer />

     {
      selectedChatType === undefined 
      ? <EmptyChatContainer /> 
       : <ChatContainer />
     }

     {/* <EmptyChatContainer /> */}
      {/* <ChatContainer /> */}
    </div>
  )
}

export default Chat