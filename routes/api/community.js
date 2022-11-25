var express = require('express');
const router = express.Router();
const Community =  require('../../models/community');
const Teacher =  require('../../models/teacher');
const auth = require ('../../middleware/auth');

/**
 * @route   GET api/community
 * @desc    show a list of community info
 */

 router.get("/", auth, async (req, res)=> {
    try {
      const results = await Community.find({});
      if(!results) throw Error('No community exist');
      res.status(200).json(results);
    }
    catch (e) {
      res.status(400).json({ msg: e.message });
    }
  });

  /**
   * @route   GET api/community/query
   * @desc    show a list of community info based on the query
   */

     router.get("/query",auth, async (req, res)=> {
        try {
          if(!req.query.name && req.query.community_id){
            const results = await Community.find({'community_id': req.query.community_id});
            if(!results) throw Error('No community exist');
            res.status(200).json(results);

          }else if (req.query.name && !req.query.community_id) {
            const results = await Community.find({"name" : req.query.name});
            if(!results) throw Error('No community exist');
            res.status(200).json(results);

          }else if (req.query.name && req.query.community_id) {
            const results = await Community.find({"name" : req.query.name ,"community_id": req.query.community_id});
            if(!results) throw Error('No community exist');
            res.status(200).json(results);
          }

        }
        catch (e) {
          res.status(400).json({ msg: e.message });
        }
      });


  /**
   * @route   POST api/community
   * @desc    perform community creation
   */

router.post("/",auth,  async (req, res)=> {
  var communityId = 1;
  var community1 = await Community.findOne({}).sort({community_id: -1});
  if (community1) {
    communityId = community1.community_id + 1;
  }
  const {name, description, verification} = req.body;
  if (!name || !description || !verification ) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }
  try {
    const newCommunity = new Community({
      community_id: communityId,
      name,
      description,
      verification
    });
    const savedCommunity = await newCommunity.save();
    if (!savedCommunity) throw Error('saving error');
    res.status(200).json({
      savedCommunity
    });
  }
  catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

/**
 * @route   PATCH api/community
 * @desc    perform community info update
 */

router.patch("/", auth, async (req, res)=> {
  try {
    const {community_id, name, description, verification} = req.body;
    if (!community_id || !name || !description || !verification) {
      return res.status(400).json({ msg: 'Please enter all fields' });
    }
    Community.update({community_id}, {$set: {name, description, verification}}).exec(function(err, result){
      if (result.n == 0) return res.status(400).json({msg: "community does not exist"});
      res.status(200).json(result);
    });
  }
  catch (e) {
    res.status(401).json({ error: e.message });
  }
});

/**
 * @route   DELETE api/community
 * @desc    perform community deletion
 */

router.delete("/", auth, async (req,res)=> {
  try {
    const {community_id} = req.body;
    if (!community_id) {
      return res.status(401).json({ msg: 'Please enter all fields' });
    }
    Community.remove({community_id}).exec(function(err, result){
      if (result.n == 0) return res.status(400).json({msg: "community does not exist"});
      res.status(200).json(result);
    });
  }
  catch (e) {
    res.status(401).json({ error: e.message });
  }
});

  /**
   * @route   GET api/community/teachers
   * @desc    show a list of teachers
   */

   router.get("/teachers", async (req, res)=> {
    try {
      const results = await Teacher.find({});
      if(!results) throw Error('No tutors exist');
      res.status(200).json(results);
    }
    catch (e) {
      res.status(400).json({ msg: e.message });
    }
  });


module.exports = router;
