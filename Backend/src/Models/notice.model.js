import mongoose from "mongoose"

const noticeBoardSchema = new mongoose.Schema({
    textmsg:{
        Type:String,
        required:true,
        trim:true
    }
},{timestamps:true});


export const NoticeBoard = mongoose.model("NoticeBoard",noticeBoardSchema);