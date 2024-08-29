import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import connection from "./src/db/connect.js";
import router from "./src/routes/authroutes.js";

import adminroutes from "./src/routes/adminroutes.js";

const app = express()

app.use(cors({
    origin: 'http://localhost:3002', 
    credentials: true,
}));
app.use(cookieParser());


connection()

app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use("/api", router)

app.use("/api/admin",adminroutes)

app.listen(7000,()=>{
    console.log("Server is Running on PORT")
})
