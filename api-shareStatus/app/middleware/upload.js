module.exports = {
  async upload(req) {
    try {
      console.log("asdggggggggggggggggggggggggggggggggggggggg")
      if (!req.files || Object.keys(req.files).length === 0) {
        return { data: "No files where uploaded", success: false };
      }
      const file = req.files.file; //file is the name of key files
      //less than 5 mb
      if (file.size > 1025 * 1025 * 5) {
        removeTmp(file.tempFilePath);
        return { data: "size is large", success: false };
      }
      //file type
      if (file.mimetype !== "image/jpeg" && file.mimetype !== "image/png") {
        removeTmp(file.tempFilePath);
        return { data: "file type/format not acceptable", success: false };
      }
      //Uploading to cloudinary
      cloudinary.v2.uploader.upload(
        file.tempFilePath,
        { folder: "share-status" },
        async (err, result) => {
          if (err) return { data: err.message, success: false };
          removeTmp(file.tempFilePath);
          return {
            success: true,
            data: { public_id: result.public_id, url: result.secure_url },
          };
        }
      );
    } catch (error) {
        return { data: error.message, success: false }
    }
  },
  async delete(public_id){
    try {
        cloudinary.v2.uploader.destroy(public_id,async(err, result)=>{
            if(err) throw err;
            return{success:true, data:"Deleted Image"}
        })
    } catch (error) {
        return { data: error.message, success: false }
    }
  }
};
