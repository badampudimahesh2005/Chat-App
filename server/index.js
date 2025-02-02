import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/AuthRoutes.js';
import contactRoutes from './routes/ContactRoutes.js';
import setupSocket from './socket.js';
import messagesRoutes from './routes/MessageRoutes.js';

const app = express();


/* `dotenv.config();` is a function call that loads environment variables from a `.env` file into
`process.env`. This allows the application to access configuration settings such as database URLs,
API keys, and other sensitive information without hardcoding them in the code. It helps keep
sensitive information secure and separate from the codebase. */
dotenv.config();


/* This code snippet is setting up CORS (Cross-Origin Resource Sharing) middleware in a Node.js
application using the `cors` package. Here's what each part of the configuration does: */

/* this CORS configuration is used to enable the backend server to accept requests from a frontend application that is hosted on a different origin (domain, protocol, or port).*/
app.use(cors({
  origin: [process.env.ORIGIN],
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  credentials: true,

}));


const PORT = process.env.PORT || 3001;
const databaseUrl = process.env.DATABASE_URL;


main()
 .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

 async function main() {
    await mongoose.connect(databaseUrl);
  }



  
app.use("/uploads/profile", express.static("uploads/profile"));
app.use("/uploads/files", express.static("uploads/files"));


/* `app.use(cookieParser());` is setting up the middleware function `cookieParser` in the Express
application. This middleware parses cookies attached to the client request object (`req.cookies`)
and makes them available in the request object for further processing in the application. */
app.use(cookieParser());
app.use(express.json());


app.use("/api/auth", authRoutes);

app.use("/api/contacts", contactRoutes);

app.use("/api/messages", messagesRoutes);



const server=app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}
);

setupSocket(server);
