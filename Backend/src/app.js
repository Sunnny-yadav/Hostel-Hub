import express from "express"
import cors from 'cors'
const app = express();


const corsOption = {
    origin: "http://localhost:5173",
    methods: "GET, POST,PUT, DELETE, PATCH, HEAD",
    Credentials : true
};

app.use(express.json());
app.use(express.static("public"));
app.use(cors(corsOption))


// importing routes here 

import userRoute from './Routers/user.Router.js'
import complaintRoute from './Routers/complain.Router.js'
import commentRoute from './Routers/comment.Router.js'
import mealRoute from './Routers/meal.Router.js'

app.use("/api/v1/users",userRoute)
app.use("/api/v1/complaints",complaintRoute)
app.use("/api/v1/comments",commentRoute)
app.use("/api/v1/meals",mealRoute)

export default app;