import  express  from "express";
const router=express.Router();
import mongoose from "mongoose";
import Genre from'../model/genre.js'

router.get('/', async(req, res) => {
    return res.status(200).json({
        message:'The api service is working amazing'
    })
})
//CRUD -> READ ONE BY OBJECT ID
router.get('/getGenreById/:id', async(req, res) => {
    Genre.findById(req.params.id)
    .then(results => {
        return res.status(200).json({
            message: results
        })
    })
    .catch(error => {
        return res.status(500).json({
            message: error.message
        })
    })
})
//CRUD -> READ ONE WHERE
router.get('/getOnGenre', async(req, res) => {
    Genre.findOne({isActive: true})
    .then(results => {
        return res.status(200).json({
            message: results
        })
    })
    .catch(error => {
        return res.status(500).json({
            message: error.message
        })
    })
})
//CRUD -> READ ALL WHERE
router.get('/getGenresByValue', async(req, res) => {
    //== where
    Genre.find({isActive: true, genreName: 'Comedy'})
    .then(results => {
        return res.status(200).json({
            message: results
        })
    })
    .catch(error => {
        return res.status(500).json({
            message: error.message
        })
    })
})
//CRUD -> READ ALL
router.get('/getAllGenres', async(req, res) => {

    // .find() -> return all results, allways array!!

    //OPTION 1
    // const all_genres = await Genre.find();
    // return res.status(200).json({
    //     all_genres: all_genres
    // })
    //OPTION 2
    Genre.find()
    .then(results => {
        return res.status(200).json({
            message: results
        })
    })
    .catch(error => {
        return res.status(500).json({
            message: error.message
        })
    })
})
//CRUD -> CREATE
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

//CRUD -> UPDATE
router.put('/updateGenre', async(req, res) => {
    const {id, genreName, genreOrder, isActive} = req.body;
    const genre = await Genre.findById(id);
    try {
        if(genre){
            genre.genreName = genreName;
            genre.genreOrder = genreOrder;
            genre.isActive = isActive;
            genre.save()
            .then(genre_updated => {
                return res.status(200).json({
                    message: genre_updated
                });
            })
            .catch(error => {
                return res.status(500).json({
                    message: error.message
                });
            })
        } else {
            return res.status(200).json({
                message: 'Genre not found'
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
})
//CRUD -> DELETE
router.delete('/deleteGenre/:id', async(req, res) => {
    const genreId = req.params.id;

    //Genre.findOneAndDelete({genreOrder:1})

    Genre.findByIdAndDelete(genreId)
    .then(genre_removed => {
        return res.status(200).json({
            message: 'The genre was removed from database'
        });
    })
    .catch(error => {
        return res.status(500).json({
            message: error.message
        });
    })
})
export default router;