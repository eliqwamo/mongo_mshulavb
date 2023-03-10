import mongoose from "mongoose";
const Schema=mongoose.Schema;

const genreSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    genreName: String,
    genreOrder: Number,
    isActive: {type: Boolean,default: true},
    createdAt: {type: Date,default: Date.now}
})


export default mongoose.model('Genre',genreSchema);