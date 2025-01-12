import mongoose from "mongoose"

const noticeBoardSchema = new mongoose.Schema({
    notice:{
        type:String,
        trim:true,
        required:true,
    },
    wardenId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
},{timestamps:true});


export const NoticeBoard = mongoose.model("NoticeBoard",noticeBoardSchema);