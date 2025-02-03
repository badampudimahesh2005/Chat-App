

import { Server as socketIoServer} from "socket.io";
import Message from "./models/MessagesModel.js";
import Channel from "./models/ChannelModel.js";

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

            //for channels 
            const sendChannelMessage = async (message) => {
             
                const {
                    channelId,
                    sender,
                    content,
                    messageType,
                    fileUrl,
                }=message;

                const createdMessage = await Message.create({
                    sender,
                    receiver: null,
                    content,
                    messageType,
                    timestamp: new Date(),
                    fileUrl,
                });

                const messageData = await Message.findById(createdMessage._id)
                .populate("sender", "id email firstName lastName image color")
                .exec();

                await Channel.findByIdAndUpdate(channelId, {
                    $push: { messages: createdMessage._id },
                });
                
                const channel = await Channel.findById(channelId)
                .populate("members");

                const finalData = { ...messageData._doc, channelId:channelId };

                if(channel && channel.members){
                    channel.members.forEach((member) => {
                        const memberSocketId = userSocketMap.get(member._id.toString());
                        if(memberSocketId){
                            io.to(memberSocketId).emit("receive-channel-message", finalData);
                        }
                       
                    });
                    const adminSocketId = userSocketMap.get(channel.admin._id.toString());
                    if(adminSocketId){
                        io.to(adminSocketId).emit("receive-channel-message", finalData);
                    }
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
                socket.on("send-channel-message",sendChannelMessage);
                socket.on("disconnect", ()=> disconnectUser(socket));  
               
                });


}

export default setupSocket;