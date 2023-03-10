import  express  from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import actions from'./controllers/actions.js'

dotenv.config();

const app = express();

app.use(express.urlencoded({extended: false}))
app.use(express.json());

app.use('/api', actions);

mongoose.connect(process.env.MONGO_URL)

.then(result => {
    app.listen(process.env.PORT, function(){
        console.log(`The server runing via port ${process.env.PORT}`);
    })
})
.catch(error => {
    console.log(error.message)
})
