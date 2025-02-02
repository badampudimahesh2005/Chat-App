
import EmojiPicker from 'emoji-picker-react';
import React, { useState,useRef } from 'react'
import { useEffect } from 'react';
import { GrAttachment } from 'react-icons/gr'
import { IoSend } from 'react-icons/io5';
import { RiEmojiStickerLine } from 'react-icons/ri';
import { useAppStore } from '@/store';
import { useSocket } from '@/context/SocketContext';


const MessageBar = () => {

  const socket =useSocket();
  const emojiRef = useRef();
  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);

  const [message, setMessage] = useState('');

  const {selectedChatData, selectedChatType, userInfo} = useAppStore();

  useEffect(() => {
    function handleEmojiPickerOpen(event) {
      if(emojiRef.current && !emojiRef.current.contains(event.target)) {
        setEmojiPickerOpen(false);
      }
    }
    document.addEventListener('mousedown', handleEmojiPickerOpen);
    return () =>{
      document.removeEventListener('mousedown', handleEmojiPickerOpen);
    }
  },[emojiRef]);


  const handleAddEmoji = (emoji) => {
    setMessage((prev) => prev + emoji.emoji);
  } 

  const handleSendMessage = async () => {
    if(selectedChatType === "contact"){
      socket.emit("sendMessage", {
        sender: userInfo.id,
        receiver: selectedChatData._id,
        content: message,
        messageType: "text",
        fileUrl:undefined,
      });

      
    }

  }
    
  return (
    <div className="h-[10vh] bg-[#1c1d25] flex justify-center items-center px-8 mb-6 gap-6">
      {/* input field  */}
      <div className="flex-1 flex bg-[#2a2b33] rounded-md items-center gap-5 pr-5">
        <input type="text" className="flex-1 p-5 bg-transparent rounded-md focus:border-none focus:outline-none" placeholder="Enter Message" value={message} onChange={(e) => setMessage(e.target.value)} />

        {/* attachment button  */}
        <button className="text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all">
       <GrAttachment  className='text-2xl'/>
        </button>

        {/* emoji button  */}
        <div className="relative">
          <button className="text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all" onClick={() => setEmojiPickerOpen((prev) => !prev)}>
            <RiEmojiStickerLine className='text-2xl'/>
          </button>

          <div className="absolute bottom-16 right-0 " ref={emojiRef}>
            <EmojiPicker 
             theme='dark' 
             onEmojiClick={handleAddEmoji}
              open={emojiPickerOpen}
               autoFocusSearch={false}  
               />
          </div>

        </div>
      </div>

      {/* send button  */}
      <button className="bg-[#8417ff] hover:bg-[#741bda] flex items-center justify-center p-5 rounded-md focus:bg-[#741bda]  focus:border-none focus:outline-none focus:text-white duration-300 transition-all">
        <IoSend className='text-2xl' onClick={handleSendMessage}/>
      </button>
    </div>
  )
}

export default MessageBar