const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')
const multer = require('multer')
const { User, Room } = require('./schema')
const { clearCache } = require('ejs')


const app = express()

const MONGO_URL = 'mongodb+srv://yashwant:yashwant@cluster0.n8lyem8.mongodb.net/Xchange?retryWrites=true&w=majority&appName=Cluster0'

mongoose.connect(MONGO_URL)
.then(()=>{
    console.log("Connected to database")
})
.catch((err)=>{
    console.log(err)
})

app.use(cors({ origin: '*' }));
app.use(express.urlencoded({extended: true}))
app.use(bodyParser.json());



app.listen(8000,()=>{
    console.log("Server Started at http://localhost:8000")
})


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Destination folder for uploaded files
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Use original filename
    }
});

const upload = multer({ storage: storage })
app.use(express.static('uploads'))

app.post('/create-room', upload.single('image'), async(req, res) => {
    try{
        const link = `${req.protocol}://${req.get('host')}/${req.file.filename}`
        console.log(link)
        const room = Room({
            name: req.body.name,
            description: req.body.description,
            image: link
        })
        const result = await room.save()
        console.log(result)
        res.json({message: 'room_created'})
    }
    catch(err){
        console.log(err)
    }
})


app.post('/login',async(req,res)=>{
    try{
        const result = await User.findOne(req.body)
        res.json({name: result.name, vtu: result.vtu})
    }
    catch(err)
    {
        res.json({message: 'login_error'})
    }
})
