import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/AuthRoutes.js';



/* `dotenv.config();` is a function call that loads environment variables from a `.env` file into
`process.env`. This allows the application to access configuration settings such as database URLs,
API keys, and other sensitive information without hardcoding them in the code. It helps keep
sensitive information secure and separate from the codebase. */
dotenv.config();

const app = express();
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




app.use(cors({
    origin: [process.env.ORIGIN],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,

}));
app.use(cookieParser());
app.use(express.json());


app.use("/api/auth", authRoutes);




app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}
);
