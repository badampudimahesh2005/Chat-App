

import { Server as socketIoServer} from "socket.io";

const setupSocket = (server) => {

    const io =new  socketIoServer(server, {
        cors: {
            origin: process.env.ORIGIN,
            methods: ["GET", "POST"],
            credentials: true
            },
            });

            const userSocketMap = new Map();

            const disconnectUser = (socket) => {
                console.log("disconnecting user");

                for(const [userId, socketId] of userSocketMap.entries()){
                    if(socketId === socket.id){
                        userSocketMap.delete(userId);
                        break;
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

                socket.on("disconnect", ()=> disconnectUser(socket));
               
                });


}

export default setupSocket;