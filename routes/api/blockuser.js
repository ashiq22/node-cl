var express = require('express');
const router = express.Router();
const BlockUser =  require('../../models/blockuser');
const auth = require ('../../middleware/auth');

/**
 * @route   GET api/blockuser
 * @desc    show a list of blockuser info
 */

 router.get("/", auth, async (req, res)=> {
    try {
      const results = await BlockUser.find({});
      if(!results) throw Error('No blockuser exist');
      res.status(200).json(results);
    }
    catch (e) {
      res.status(400).json({ msg: e.message });
    }
  });

  /**
   * @route   POST api/blockuser
   * @desc    perform blockuser creation
   */

router.post("/", auth, async (req, res)=> {
  var blockuserId = 1;
  var blockuser1 = await BlockUser.findOne({}).sort({blockuser_id: -1});
  if (blockuser1) {
    blockuserId = blockuser1.blockuser_id + 1;
  }
  const { user_id} = req.body;
  if (!user_id ) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }
  try {
    const newBlockUser = new BlockUser({
      blockuser_id: blockuserId,
      user_id
    });
    const savedBlockUser = await newBlockUser.save();
    if (!savedBlockUser) throw Error('saving error');
    res.status(200).json({
      savedBlockUser
    });
  }
  catch (e) {
    res.status(400).json({ msg: e.message });
  }
});


/**
 * @route   DELETE api/blockuser
 * @desc    perform blockuser deletion
 */

router.delete("/", auth, async (req,res)=> {
  try {
    const {blockuser_id} = req.body;
    if (!blockuser_id) {
      return res.status(401).json({ msg: 'Please enter all fields' });
    }
    BlockUser.remove({blockuser_id}).exec(function(err, result){
      if (result.n == 0) return res.status(400).json({msg: "blockuser does not exist"});
      res.status(200).json(result);
    });
  }
  catch (e) {
    res.status(401).json({ error: e.message });
  }
});


module.exports = router;
