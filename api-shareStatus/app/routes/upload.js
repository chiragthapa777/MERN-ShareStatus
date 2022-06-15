const router = require("express").Router();
const cloudinary = require("cloudinary");
require("dotenv").config();
const fs=require("fs")
const authenticate = require("../middleware/authenticate");

// cloudinary connection
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

//image upload
router.post("/upload", (req, res) => {
  try {
    console.log("uploading image")
    //checking if file exist
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ error: "No files where uploaded" });
    }
    const file = req.files.file; //file is the name of key files
    //less than 5 mb
    if (file.size > 1025 * 1025*5) {
        removeTmp(file.tempFilePath)
        return res.status(400).json({ error: "size is large" });
    }
    //file type
    if (file.mimetype !== "image/jpeg" && file.mimetype !== "image/png") {
        removeTmp(file.tempFilePath)
        return res.status(400).json({ error: "file type/format not acceptable" });
    }   
    //Uploading to cloudinary
    cloudinary.v2.uploader.upload(file.tempFilePath, {folder:"share-status"}, async(err, result)=>{
        if(err) throw err;
        removeTmp(file.tempFilePath)
        res.status(200).json({public_id:result.public_id, url:result.secure_url})
    })
  } catch (error) {
    res.status(500).json({ error:error.message });
  }
});

//deleting
router.post('/destroy',(req, res)=>{
    try {
        console.log(req.body)
        const {public_id}=req.body
        if(!public_id) return res.status(400).json({msg:"no image selected"})
        cloudinary.v2.uploader.destroy(public_id,async(err, result)=>{
            if(err) throw err;
            res.status(200).json({msg:"Deleted Image"})
        })
    } catch (error) {
        res.status(500).json({error:error.message})
    }
    
})


const removeTmp=(path)=>{
    fs.unlink(path,err=>{
        if(err) throw err;
    })
}

module.exports = router;



module.exports = router;