const express = require("express")
const router = express.Router();
const {check,resultValidation} = require('express-validator')

const multer = require('multer')

const fileStorageEngiene = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./client/src/uploads')
    },
    filename:(req,file,cb)=>{
        cb(null,`${Date.now()}-${file.originalname}`)
    }
})

const upload = multer({storage:fileStorageEngiene})

const fields= [
    {name: 'name', maxCount: 1},
   { name: 'email', maxCount: 1},
   {name: 'phone', maxCount: 1},
   {name: 'image', maxCount: 1}
]


router.post('/',upload.fields(fields),async(req,res)=>{

    try{

    const body = Object.values(JSON.parse(JSON.stringify(req.body)));
    const files = Object.values(JSON.parse(JSON.stringify(req.files)));
    
        // console.log(files[0][0].path);
        console.log(body);
        res.send({
            name:body[0],
            email:body[1],
            phone:body[2],
            image:files[0][0].path
        })
        }catch(err){
        res.status(500).send("Server error !")
    }

})



module.exports = router;