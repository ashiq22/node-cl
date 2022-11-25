var express = require('express');
const router = express.Router();
const Post =  require('../../models/post');
const auth = require ('../../middleware/auth');

/**
 * @route   GET api/post
 * @desc    show a list of post info
 */

 router.get("/", auth, async (req, res)=> {
    try {
      const results = await Post.find({});
      if(!results) throw Error('No post exist');
      res.status(200).json(results);
    }
    catch (e) {
      res.status(400).json({ msg: e.message });
    }
  });

  /**
   * @route   GET api/post/query
   * @desc    show specific post info
   */

   router.get("/query", auth, async (req, res)=> {
      try {
        if(!req.query.user_id && req.query.community_id){
          const results = await Post.find({'community_id': req.query.community_id}).sort({post_id: -1});
          if(!results) throw Error('No post exist');
          res.status(200).json(results);

        }else if (req.query.user_id && !req.query.community_id) {
          const results = await Post.find({"user_id" : req.query.user_id}).sort({post_id: -1});
          if(!results) throw Error('No post exist');
          res.status(200).json(results);

        }else if (req.query.user_id && req.query.community_id) {
          const results = await Post.find({"user_id" : req.query.user_id ,"community_id": req.query.community_id}).sort({post_id: -1});
          if(!results) throw Error('No post exist');
          res.status(200).json(results);
        }

      }
      catch (e) {
        res.status(400).json({ msg: e.message });
      }
    });
    /**
     * @route   GET api/postid
     * @desc    show post based on post_id
     */

     router.get("/postid",auth, async (req, res)=> {
        try {
            const results = await Post.find({'post_id': req.query.post_id});
            if(!results) throw Error('No post exist');
            res.status(200).json(results);
        }
        catch (e) {
          res.status(400).json({ msg: e.message });
        }
      });



  /**
   * @route   POST api/post
   * @desc    perform post creation
   */

router.post("/",auth, async (req, res)=> {
  var postId = 1;
  var post1 = await Post.findOne({}).sort({post_id: -1});
  if (post1) {
    postId = post1.post_id + 1;
  }
  const {user_id, community_id, username, avatar, title, content} = req.body;
  if (!user_id || !community_id || !username || !avatar || !title || !content ) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }
  try {
    const newPost = new Post({
      post_id: postId,
      user_id,
      community_id,
      username,
      avatar,
      title,
      content
    });
    const savedPost = await newPost.save();
    if (!savedPost) throw Error('saving error');
    res.status(200).json({
      savedPost
    });
  }
  catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

/**
 * @route   PATCH api/post
 * @desc    perform post update
 */

router.patch("/", auth, async (req, res)=> {
  try {
    const {post_id, user_id, community_id, title, content} = req.body;
    if (!post_id || !user_id || !community_id || !title || !content) {
      return res.status(400).json({ msg: 'Please enter all fields' });
    }
    Post.update({post_id}, {$set: {user_id, community_id, title , content}}).exec(function(err, result){
      if (result.n == 0) return res.status(400).json({msg: "post does not exist"});
      res.status(200).json(result);
    });
  }
  catch (e) {
    res.status(401).json({ error: e.message });
  }
});


      /**
       * @route   GET api/post/likesort
       * @desc    show post based on likes
       */


        router.get("/likesort", auth,  async (req, res)=> {
           try {
             const results = await Post.find({}).sort({likes:-1});
             if(!results) throw Error('No post exist');
             res.status(200).json(results);
           }
           catch (e) {
             res.status(400).json({ msg: e.message });
           }
         });

/**
 * @route   PATCH api/post/like
 * @desc    perform post likes update
 */

router.patch("/like", auth, async (req, res)=> {
  try {
    const {post_id, likes} = req.body;
    if (!post_id || !likes) {
      return res.status(400).json({ msg: 'Please enter all fields' });
    }
    Post.update({post_id}, {$set: {likes}}).exec(function(err, result){
      if (result.n == 0) return res.status(400).json({msg: "post does not exist"});
      res.status(200).json(result);
    });
  }
  catch (e) {
    res.status(401).json({ error: e.message });
  }
});


/**
 * @route   DELETE api/post
 * @desc    perform post deletion
 */

router.delete("/", auth, async (req,res)=> {
  try {
    const {post_id} = req.body;
    if (!post_id) {
      return res.status(401).json({ msg: 'Please enter all fields' });
    }
    Post.remove({post_id}).exec(function(err, result){
      if (result.n == 0) return res.status(400).json({msg: "post does not exist"});
      res.status(200).json(result);
    });
  }
  catch (e) {
    res.status(401).json({ error: e.message });
  }
});


module.exports = router;
