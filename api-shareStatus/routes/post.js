//crud post
//like and commentpost by any user
const router = require("express").Router();
const Post = require("../models/Post");
const User=require("../models/User")
const { body, validationResult } = require("express-validator");
const authenticate = require("../middleware/authenticate");

// =============================================================================
//fetch user Post(crud)======================================================
// =============================================================================
//fetch all Post of user
router.get("/getuserpost", authenticate, async (req, res) => {
  try {
      const posts = await Post.find({ user: req.user.id }).sort({date:-1});
      res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

//add Post of the user
router.post(
  "/addpost",
  authenticate,
  [
    body("status", "length of status must be atleast one").isLength({ min: 1 }),
  ],
  async (req, res) => {
    try {
      //checking in-coming req body
      const error = validationResult(req);
      if (!error.isEmpty())
        return res.status(400).json({ error: error.array()[0].msg });
      //creating and saving Post
      let newPost = {
        user: req.user.id,
        userName: req.user.name,
        status: req.body.status
      };
      let post = await Post.create({ ...newPost });
      res
        .status(200)
        .json({ post, message: "A Post is successfully created!" });
    } catch (error) {
      res.status(500).json({ error: error });
      console.log(error);
      
    }
  }
);
//deleting the user Post
router.delete("/deletepost/:id", authenticate, async (req, res) => {
  try {
    let PostId = req.params.id;
    //checking the Post's user
    let post = await Post.findOne({ _id: PostId });
    if (!post) return res.status(401).json({ error: "Cannot find the Post" });
    //since user is object type so need to be converted to string or else you can change Post scheme of user to String
    if (post.user !== req.user.id)
      return res
        .status(401)
        .json({ error: "You are not authorized to delete the Post" });
    //deleting the Post
    post = await Post.findByIdAndDelete(PostId);
    res.status(200).json({ message: "Post is successfully deleted", post });
  } catch (error) {
    res.status(500).json({ error: error });
    console.log(error);
    
  }
});
//updating the Post
router.put(
  "/updatepost/:id",
  authenticate,
  async (req, res) => {
    try {
      //checking the Post's user
      let post = await Post.findOne({ _id:req.params.id });
      if (!post) return res.status(401).json({ error: "Cannot find the Post" });
      // console.log(Post.user, req.user.id);
      //since user is object type so need to be converted to string or else you can change Post scheme of user to String
      if (post.user !== req.user.id)
        return res
          .status(401)
          .json({ error: "You are not authorized to delete the Post" });
      //updating the Post
      post = await Post.findByIdAndUpdate(req.params.id, req.body, {new: true})
      res.status(200).json({ message: "Post is successfully updated", post });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
);

// =============================================================================
//see all users Post public Post share===========================================
// =============================================================================

router.get("/getfollowpost", authenticate, async (req, res) => {
    try {
        let user=await User.findOne({_id:req.user.id})
        let array=user.following
        const posts = await Post.find({ user:{$in:[...array,req.user.id]} }).sort({date:-1});
      res.status(200).json(posts);
        
    //    const posts = await Post.find({public:true});
    } catch (error) {
        res.status(500).json({ error: error });
    }
  });

// =============================================================================
//likes and comment=============================================
// =============================================================================
// router.put(
//     "/like/:id",
//     authenticate,
//     async (req, res) => {
//       try {
//         //checking the Post's user
//         let post = await Post.findOne({ _id:req.params.id });
//         if (!post) return res.status(401).json({ error: "Cannot find the Post" });
//         // console.log(Post.user, req.user.id);
//         if(post.likes.includes(req.user.id))
//         {
//             //unlike
//             let newlikes=post.likes.filter((item)=>item!==req.user.id)
//             post = await Post.findByIdAndUpdate(req.params.id, {likes:[...newlikes]}, {new: true})
//         }
//         else{
//             //like
//             post = await Post.findByIdAndUpdate(req.params.id, {likes:[...post.likes,req.user.id]}, {new: true})
//         }
//         //updating the Post
//         res.status(200).json({ message: "Post is successfully updated", post });
//       } catch (error) {
//         res.status(500).json({ error: error });
//         console.log(error);
        
//       }
//     }
//   );
router.patch(
    "/like/:id",
    authenticate,
    async (req, res) => {
      try {
        //checking the Post's user
        let post = await Post.findOne({ _id:req.params.id });
        if (!post) return res.status(401).json({ error: "Cannot find the Post" });
        // console.log(Post.user, req.user.id);
        if(post.likes.includes(req.user.id))
        {
            //unlike
            let newlikes=post.likes.filter((item)=>item!==req.user.id)
            post = await Post.findByIdAndUpdate(req.params.id, {likes:newlikes}, {new: true})
        }
        else{
            //like
            post = await Post.findByIdAndUpdate(req.params.id, {likes:[...post.likes,req.user.id]}, {new: true})
        }
        //updating the Post
        res.status(200).json({ message: "Post is successfully updated", post });
      } catch (error) {
        res.status(500).json({ error: error });
        console.log(error);
        
      }
    }
  );
  //body will be{comment:"this is a comment"}
router.patch(
    "/commentadd/:id",
    authenticate,
    async (req, res) => {
      try {
        //checking the Post's user
        let post = await Post.findOne({ _id:req.params.id });
        if (!post) return res.status(401).json({ error: "Cannot find the Post" });
        // console.log(Post.user, req.user.id);
        let newCmt=[...post.comments,{
            comment:req.body.comment,
            commenterId:req.user.id,
            commenterName:req.user.name
        }]
        post = await Post.findByIdAndUpdate(req.params.id, {comments:[...newCmt]}, {new: true})
        res.status(200).json({ message: "Post is successfully updated", post });
      } catch (error) {
        res.status(500).json({ error: error });
        console.log(error);
      }
    }
  );



module.exports = router;
