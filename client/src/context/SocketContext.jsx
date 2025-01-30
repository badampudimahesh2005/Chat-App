
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
            if(userInfo){
                socket.current = io(HOST,{
                    withCredentials: true,
                    query: {
                        userId: userInfo._id
                        }
                    });
                    socket.current.on("connect", () => {
                        console.log("connected to socket server");
                        });

                        return () => {
                            socket.current.disconnect();
                        };
                        }
                }, [userInfo]);

                return (
                    <SocketContext.Provider value={socket}>
                        {children}
                    </SocketContext.Provider>
                    );
            }