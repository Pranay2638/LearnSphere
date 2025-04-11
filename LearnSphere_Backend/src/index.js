import connectDB from "./db/db.js";
import dotenv from 'dotenv';
import {app} from "./app.js";
dotenv.config({
    path: './env'
})
// import cors from 'cors';

// cors({
//     allowedHeaders: ["Content-Type", "Authorization"],
// })


const port = process.env.PORT || 8000;

//connectDB()
connectDB()
    .then(() => {
        const server = app.listen(port, () => {
            console.log(`⚙️ Server is running at port: http://localhost:${port}`);
        });

        server.on('error', (err) => {
            console.error(`❌ Server error: ${err.message}`);
        });
    })
    .catch((err) => {
        console.log("❌ MONGO DB connection failed!!!", err);
    });
