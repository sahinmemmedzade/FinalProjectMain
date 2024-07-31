import mongoose from "mongoose";
const BreakingnewsSchema=new mongoose.Schema({
    news:{
        type:String,
        required:true,
        unique:true
    }
})
const BreakingNews=mongoose.model("BreakingNews",BreakingnewsSchema)

export default BreakingNews;