var express = require('express');
const router = express.Router();
const Message =  require('../../models/message');
const Conversation =  require('../../models/conversation');
const GlobalMessage =  require('../../models/globalmessage');
const auth = require ('../../middleware/auth');
const mongoose = require('mongoose');
var bodyParser = require('body-parser')


/**
 * @route   GET api/message
 * @desc    show a list of globalmessage info
 */
 router.get("/message",  auth, async (req, res)=> {
try {
    console.log(req.query, res.query)
        if(req.query.to && req.query.from){
            
          const results = await Message.find({$or:[{"from":req.query.from, "to":req.query.to},{"from":req.query.to, "to":req.query.from}]}).sort({date: -1});
          if(!results) throw Error('No message exist');
          res.status(200).json(results);

        }
      }
      catch (e) {
        res.status(400).json({ msg: e.message });
      }
    });

  /**
   * @route   POST api/message
   * @desc    perform globalmessage creation
   */


   router.post("/message", auth, async (req, res)=> {

    const {body, from, to} = req.body;
    if (!body|| !from || !to) {
      return res.status(400).json({ msg: 'Please enter all fields' });
    }
  
  
    try {
        console.log(to, from, body)
      const newMessage = new Message({
        to,
        from,
        body
      });
      //console.log(req.user);
      const savedPost = await newMessage.save();
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
 * @route   GET api/global
 * @desc    show a list of globalmessage info
 */
router.get("/global", auth, async (req, res)=> {
  GlobalMessage.aggregate([
       {
           $lookup: {
               from: 'users',
               localField: 'from',
               foreignField: '_id',
               as: 'fromObj',
           },
       },
   ]).sort({date: -1})
       .project({
           'fromObj.password': 0,
           'fromObj.__v': 0,
           'fromObj.date': 0,
       })
       .exec((err, messages) => {
           if (err) {
               console.log(err);
               res.setHeader('Content-Type', 'application/json');
               res.end(JSON.stringify({ message: 'Failure' }));
               res.sendStatus(400);
           } else {
               res.send(messages);
           }
       });
 });



  /**
   * @route   POST api/global
   * @desc    perform globalmessage creation
   */


router.post("/global", auth, async (req, res)=> {

  const {body, from} = req.body;
  if (!body|| !from) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }



  try {
    const newGlobalMessage = new GlobalMessage({
      from,
      body
    });
    //console.log(req.user);
    const savedPost = await newGlobalMessage.save();
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
 * @route   GET api/getmessage
 * @desc    show a list of globalmessage info
 */
 router.get("/getmessage", async (req, res)=> {
  try {
      console.log(req.query, res.query)
          if(req.query.for){
              
            const results = await Message.find({$or:[{"from":req.query.for},{"to":req.query.for}]}).sort({date: -1});
            if(!results) throw Error('No message exist');
            res.status(200).json(results);
  
          }
        }
        catch (e) {
          res.status(400).json({ msg: e.message });
        }
      });

/**
 * @route   GET api/conversation
 * @desc    show a list of conversation info of the user
 */

router.get("/conversation", auth, async (req, res)=> {
  let from = mongoose.Types.ObjectId(req.user.user_object_id);
    Conversation.aggregate([
        {
            $lookup: {
                from: 'users',
                localField: 'recipients',
                foreignField: '_id',
                as: 'recipientObj',
            },
        },
    ])
        .match({ recipients: { $all: [{ $elemMatch: { $eq: from } }] } })
        .project({
            'recipientObj.password': 0,
            'recipientObj.__v': 0,
            'recipientObj.date': 0,
        })
        .exec((err, conversations) => {
            if (err) {
                console.log(err);
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ message: 'Failure' }));
                res.sendStatus(400);
            } else {
                res.status(200).send(conversations);
            }
        });
 });

 /**
  * @route   GET api/conversation/query
  * @desc    show particular conversation info
  */

 router.get('/conversation/query', auth, async(req, res) => {
     let user1 = mongoose.Types.ObjectId(req.user.user_object_id);
     let user2 = mongoose.Types.ObjectId(req.query.userId);
     Message.aggregate([
         {
             $lookup: {
                 from: 'users',
                 localField: 'to',
                 foreignField: '_id',
                 as: 'toObj',
             },
         },
         {
             $lookup: {
                 from: 'users',
                 localField: 'from',
                 foreignField: '_id',
                 as: 'fromObj',
             },
         },
     ])
         .match({
             $or: [
                 { $and: [{ to: user1 }, { from: user2 }] },
                 { $and: [{ to: user2 }, { from: user1 }] },
             ],
         })
         .project({
             'toObj.password': 0,
             'toObj.__v': 0,
             'toObj.date': 0,
             'fromObj.password': 0,
             'fromObj.__v': 0,
             'fromObj.date': 0,
         })
         .exec((err, messages) => {
             if (err) {
                 console.log(err);
                 res.setHeader('Content-Type', 'application/json');
                 res.end(JSON.stringify({ message: 'Failure' }));
                 res.sendStatus(400);
             } else {
                 res.status(200).send(messages);
             }
         });
 });

 
module.exports = router;
