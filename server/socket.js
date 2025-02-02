

import { Server as socketIoServer} from "socket.io";
import Message from "./models/MessagesModel.js";

const setupSocket = (server) => {

    const io =new  socketIoServer(server, {
        cors: {
            origin: process.env.ORIGIN,
            methods: ["GET", "POST"],
            credentials: true
            },
            });

            const userSocketMap = new Map();

            //function to disconnect the user
            const disconnectUser = (socket) => {
                console.log("disconnecting user");

                for(const [userId, socketId] of userSocketMap.entries()){
                    if(socketId === socket.id){
                        userSocketMap.delete(userId);
                        break;
                    }
                }
            }

            // function to send message to the receiver
            const sendMessage = async (message) => {
              
                const  senderSocketId = userSocketMap.get(message.sender);
                const receiverSocketId = userSocketMap.get(message.receiver);

                // if receiver is online we send the message to the receiver
                //  or else we store the message in the database  and send it to the receiver when they come online
                // so we cannot loose the message
                const  createdMessage = await Message.create(message);

                //find the message data with the sender and receiver populated 
                const messageData = await Message.findById(createdMessage._id)
                .populate("sender", "id email firstName lastName image color")
                .populate("receiver", "id email firstName lastName image color")
                .exec();

                //sending the message to the receiver and sender from server side 
                if(receiverSocketId){
                    io.to(receiverSocketId).emit("receiveMessage", messageData);
                    }
                if(senderSocketId){
                    io.to(senderSocketId).emit("receiveMessage", messageData);
                    }

            }

            io.on("connection", (socket) => {
                const userId = socket.handshake.query.userId;
                if(userId) {
                    userSocketMap.set(userId, socket.id);
                    console.log("userId found in socket handshake query");
                }else{
                    console.log("userId not found in socket handshake query");
                }
                 socket.on("sendMessage",sendMessage);

                socket.on("disconnect", ()=> disconnectUser(socket));  
               
                });


}

export default setupSocket;