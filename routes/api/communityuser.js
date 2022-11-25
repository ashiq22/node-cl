var express = require('express');
const router = express.Router();
const CommunityUser =  require('../../models/communityuser');
const auth = require ('../../middleware/auth');

/**
 * @route   GET api/communityuser
 * @desc    show a list of communityuser info
 */

 router.get("/", auth, async (req, res)=> {
    try {
      const results = await CommunityUser.find({});
      if(!results) throw Error('No communityuser exist');
      res.status(200).json(results);
    }
    catch (e) {
      res.status(400).json({ msg: e.message });
    }
  });

  /**
   * @route   GET api/communityuser/query
   * @desc    show specific post info based on the query
   */

   router.get("/query",auth, async (req, res)=> {
      try {
        if(!req.query.user_id && req.query.community_id){
          const results = await CommunityUser.find({'community_id': req.query.community_id});
          if(!results) throw Error('No community user exists');
          res.status(200).json(results);

        }else if (req.query.user_id && !req.query.community_id) {
          const results = await CommunityUser.find({"user_id" : req.query.user_id});
          if(!results) throw Error('No community user exists');
          res.status(200).json(results);

        }else if (req.query.user_id && req.query.community_id) {
          const results = await CommunityUser.find({"user_id" : req.query.user_id ,"community_id": req.query.community_id});
          if(!results) throw Error('No community user exists');
          res.status(200).json(results);
        }

      }
      catch (e) {
        res.status(400).json({ msg: e.message });
      }
    });


  /**
   * @route   POST api/communityuser
   * @desc    perform communityuser creation
   */

router.post("/", auth, async (req, res)=> {
  var communityuserId = 1;
  var communityuser1 = await CommunityUser.findOne({}).sort({communityuser_id: -1});
  if (communityuser1) {
    communityuserId = communityuser1.communityuser_id + 1;
  }
  const {community_id, user_id} = req.body;
  if (!community_id || !user_id) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }
  try {
    const newCommunityUser = new CommunityUser({
      communityuser_id: communityuserId,
      community_id,
      user_id
    });
    const savedCommunityUser = await newCommunityUser.save();
    if (!savedCommunityUser) throw Error('saving error');
    res.status(200).json({
      savedCommunityUser
    });
  }
  catch (e) {
    res.status(400).json({ msg: e.message });
  }
});


/**
 * @route   DELETE api/communityuser
 * @desc    perform communityuser deletion
 */

router.delete("/", auth, async (req,res)=> {
  try {
    const {communityuser_id} = req.body;
    if (!communityuser_id) {
      return res.status(401).json({ msg: 'Please enter all fields' });
    }
    CommunityUser.remove({communityuser_id}).exec(function(err, result){
      if (result.n == 0) return res.status(400).json({msg: "communityuser does not exist"});
      res.status(200).json(result);
    });
  }
  catch (e) {
    res.status(401).json({ error: e.message });
  }
});


module.exports = router;
