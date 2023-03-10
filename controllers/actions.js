import  express  from "express";
const router=express.Router();
import mongoose from "mongoose";
import Genre from'../model/genre.js'

router.get('/', async(req, res) => {
    return res.status(200).json({
        message:'The api service is working amazing'
    })
})

router.post('/addNewGenre', async(req, res) => {
    const {genreName,genreOrder} = req.body;
    const id = new mongoose.Types.ObjectId();
    const _genre = new Genre({
        _id:id,
        genreName: genreName, 
        genreOrder: genreOrder
    })
    _genre.save()
    .then(result => {
        return res.status(200).json({
            message:result
        })
    })
    .catch(error => {
        return res.status(500).json({
            message:error.message
        })
    })
})

export default router;