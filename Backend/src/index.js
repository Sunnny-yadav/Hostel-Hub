import dotenv from 'dotenv';
import { ConnectDB } from './db/index.js';
import { app } from './app.js';


dotenv.config({
    path:'../.env'
});


const PORT = process.env.PORT || 4000 ;

ConnectDB()
.then(()=>{
    app.listen(PORT,()=>{
        console.log("Server is Running at Port : ", PORT)
    })
})
.catch((err)=>{
    console.log("MongoDb connection failed ",err)
})

