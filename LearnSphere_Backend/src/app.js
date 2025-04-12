import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser'
import {Server} from 'socket.io'
import {createServer} from 'http'
const app = express();

app.use(
    cors({
      origin: ["http://localhost:5173", "https://learnsphere-1-u85v.onrender.com"], // Allow only frontend origin
      credentials: true, // Allow cookies & authentication headers
      methods: ["GET", "POST", "PUT", "DELETE"],
      allowedHeaders: ["Content-Type", "Authorization"],
    })
  );
  app.use("/uploads", express.static("src/uploads"));

app.get('/',(req,res) => {
    res.send('Hello World');
})

const server = createServer(app)
const io = new Server(server, {
  cors: {origin: ["http://localhost:5173","https://learnsphere-1-u85v.onrender.com"], methods: ["GET", 'POST']},
})
app.use((req, res, next) => {
  req.io = io;
  next();
});

io.on("connection", (socket) => {
  console.log("New webSocket connection...");
});


app.use(express.json({limit: '16kb'}))
app.use(cookieParser());

import userRouter from './routes/user.routes.js';
app.use("/api/v1/users",  userRouter)  

import noteRouter from './routes/notes.routes.js';
app.use("/api/v1/notes", noteRouter)

import videoRouter from './routes/videos.routes.js';
app.use("/api/v1/videos", videoRouter)

import discussionRouter from './routes/discussion.routes.js';
app.use("/api/v1/discussions", discussionRouter)


export {app};