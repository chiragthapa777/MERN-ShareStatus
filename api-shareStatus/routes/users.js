//get users
//update following and followed by
const router = require("express").Router();
const Post = require("../models/Post");
const User=require("../models/User")
const authenticate = require("../middleware/authenticate");

// =============================================================================
//fetch all users======================================================
// =============================================================================
router.get("/getallusers", authenticate, async (req, res) => {
  try {
      const user = await User.find().sort({userName:-1});
      res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

//params id: id of the user you want to follow ie, friendUser
//need to update following of user along with follwedBy of friend user
router.put(
    "/updatefollow/:id",
    authenticate,
    async (req, res) => {
      try {
        //checking the Post's user
        let friendUser = await User.findOne({ _id:req.params.id });
        if (!friendUser) return res.status(401).json({ error: "Cannot find the User" });
        // console.log(Post.user, req.user.id);
        let meUser= await User.findOne({ _id:req.user.id })
        
        if(meUser.following.includes(req.params.id)){   
            //unfollowing
            let newfollowedby=friendUser.followedBy.filter((item)=>item!==req.user.id)
            let newfollowing=meUser.following.filter((item)=>item!==req.params.id)
            friendUser = await User.findByIdAndUpdate(req.params.id, {followedBy:[...newfollowedby]}, {new: true})
            meUser = await User.findByIdAndUpdate(req.user.id, {following:[...newfollowing]}, {new: true})
            
            res.status(200).json({ message: "user unfollowed is successfully", meUser, friendUser });
        }
        else{
            //following
            friendUser = await User.findByIdAndUpdate(req.params.id, {followedBy:[...friendUser.followedBy,req.user.id]}, {new: true})
            meUser = await User.findByIdAndUpdate(req.user.id, {following:[...meUser.following,req.params.id]}, {new: true})
            res.status(200).json({ message: "user followed is successfully", meUser, friendUser });
        }
        //updating the Post
      } catch (error) {
        res.status(500).json({ error: error });
      }
    }
  );

module.exports = router;
