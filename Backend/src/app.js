import express from "express"

const app = express();

app.use(express.json());
app.use(express.static("public"));


// importing routes here 

import userRoute from './Routers/user.Router.js'

app.use("/api/v1/users",userRoute)

export default app;