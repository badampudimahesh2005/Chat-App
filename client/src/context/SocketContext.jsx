
import { HOST } from '@/utils/constants';
import { createContext, useContext,useEffect, useRef } from 'react';
import {io} from "socket.io-client";
import { useAppStore } from '@/store';


const SocketContext = createContext(null);

export const useSocket = () => {
    return useContext(SocketContext);
    }


    export const SocketProvider = ({children}) => {
        const socket = useRef();
        const {userInfo} = useAppStore();

        useEffect(() => {
            if(userInfo ){
                socket.current = io(HOST,{
                    withCredentials: true,
                    query: {
                        userId: userInfo.id
                        }
                    });
                    socket.current.on("connect", () => {
                        console.log("connected to socket server");
                        });


                        // function to handle receiving personal messages
                        const handleReceiveMessage = (message) => {
                            const {
                                selectedChatData,
                                 selectedChatType, 
                                 addMessage,
                                 addContactInDMContacts
                                }= useAppStore.getState();
                             
                            if(selectedChatType !== undefined &&  (selectedChatData._id === message.sender._id|| selectedChatData._id === message.receiver._id) ){
                                addMessage(message);
                                
                            }
                            addContactInDMContacts(message);

                        }
                        // function to handle receiving channel messages
                        const handleReceiveChannelMessage = (message) => {
                            const {selectedChatData, selectedChatType, addMessage,addChannelInChannelList}= useAppStore.getState();
                            if(selectedChatType !== undefined && selectedChatData._id === message.channelId){
                                addMessage(message);
                            }
                            addChannelInChannelList(message);
                        }


                        socket.current.on("receiveMessage", handleReceiveMessage);
                        socket.current.on("receive-channel-message", handleReceiveChannelMessage);
                        

                        return () => {
                            socket.current.disconnect();
                        };
                        }
                }, [userInfo]);

                return (
                    <SocketContext.Provider value={socket.current}>
                        {children}
                    </SocketContext.Provider>
                    );
            }