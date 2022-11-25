var express = require('express');
const router = express.Router();
const LikePost =  require('../../models/likepost');
const auth = require ('../../middleware/auth');

/**
 * @route   GET api/likepost
 * @desc    show a list of likepost info
 */

 router.get("/", auth, async (req, res)=> {
    try {
      const results = await LikePost.find({});
      if(!results) throw Error('No likepost exist');
      res.status(200).json(results);
    }
    catch (e) {
      res.status(400).json({ msg: e.message });
    }
  });

/**
   * @route   GET api/likepost/query
   * @desc    show specific post info based on the query
   */

   router.get("/query",auth, async (req, res)=> {
      try {
        if(!req.query.post_id && req.query.user_id){
          const results = await LikePost.find({'user_id': req.query.user_id});
          if(!results) throw Error('No likepost exist');
          res.status(200).json(results);

        }else if (req.query.post_id && !req.query.user_id) {
          const results = await LikePost.find({"post_id" : req.query.post_id});
          if(!results) throw Error('No likepost exist');
          res.status(200).json(results);

        }else if (req.query.user_id && req.query.post_id) {
          const results = await LikePost.find({"user_id" : req.query.user_id ,"post_id": req.query.post_id});
          if(!results) throw Error('No likepost exist');
          res.status(200).json(results);
        }

      }
      catch (e) {
        res.status(400).json({ msg: e.message });
      }
    });



  /**
   * @route   POST api/likepost
   * @desc    perform likepost creation
   */

router.post("/", auth, async (req, res)=> {
  var likepostId = 1;
  var likepost1 = await LikePost.findOne({}).sort({likepost_id: -1});
  if (likepost1) {
    likepostId = likepost1.likepost_id + 1;
  }
  const {post_id, user_id, } = req.body;
  if (!post_id || !user_id ) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }
  try {
    const newLikePost = new LikePost({
      likepost_id: likepostId,
      post_id,
      user_id
    });
    const savedLikePost = await newLikePost.save();
    if (!savedLikePost) throw Error('saving error');
    res.status(200).json({
      savedLikePost
    });
  }
  catch (e) {
    res.status(400).json({ msg: e.message });
  }
});


/**
 * @route   DELETE api/likepost
 * @desc    perform likepost deletion
 */

router.delete("/", auth, async (req,res)=> {
  try {
    const {likepost_id} = req.body;
    if (!likepost_id) {
      return res.status(401).json({ msg: 'Please enter all fields' });
    }
    LikePost.remove({likepost_id}).exec(function(err, result){
      if (result.n == 0) return res.status(400).json({msg: "likepost does not exist"});
      res.status(200).json(result);
    });
  }
  catch (e) {
    res.status(401).json({ error: e.message });
  }
});


/**
 * @route   DELETE api/likepost/post
 * @desc    perform deletion of all likes on a post
 */

 router.delete("/post", async (req,res)=> {
  try {
    const {post_id} = req.body;
    if (!post_id) {
      return res.status(401).json({ msg: 'Please enter all fields' });
    }
    LikePost.remove({post_id}).exec(function(err, result){
//       if (result.n == 0) return res.status(400).json({msg: "likepost does not exist"});
      res.status(200).json(result);
    });
  }
  catch (e) {
    res.status(401).json({ error: e.message });
  }
});



module.exports = router;
