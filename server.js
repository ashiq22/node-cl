//access mongodb atlas through terminal:
//mongo "mongodb+srv://cluster0.oss8k.mongodb.net/3100projectDB" --username dbUser
require("dotenv").config();
const express = require("express"); //connect to server
const mongoose = require("mongoose"); // connect to database
const bodyParser = require("body-parser"); // get body content from a form
const cors = require("cors"); //enable CORS
require('body-parser-xml')(bodyParser);
const port = process.env.PORT || 8080;
// const corsOptions ={
//   origin:"*", 
//   credentials:true,            //access-control-allow-credentials:true
//   optionSuccessStatus:200,
// }
// app.use(cors(corsOptions)) // Use this after the variable declaration

// routes
//import authRoutes from './routes/api/auth';
const authRoutes = require("./routes/api/auth");
const commRoutes = require("./routes/api/community");
const postRoutes = require("./routes/api/post");
const commentRoutes = require("./routes/api/comment");
const likepostRoutes = require("./routes/api/likepost");
const messageRoutes = require("./routes/api/message");
const communityuserRoutes = require("./routes/api/communityuser");
const notificationRoutes = require("./routes/api/notification");
const blockuserRoutes = require("./routes/api/blockuser");

const app = express();
app.use(bodyParser.json());
// const db = config.get('mongoURI');
app.use(cors({credentials: true, origin: '*', crossorigin:true}));
app.options('*', cors());
app.use(bodyParser.xml());
app.use(function(req, res, next) {
  next();
  });
app.get('/', (req,res)=>{
  res.header("Access-Control-Allow-Origin", "true");
   res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    
  
  res.json("Server Started")
 })

 

mongoose.set('useUnifiedTopology', true); // get rid of the Deprecation Warning
const db = process.env.DATABASE
mongoose
  .connect(db , {useNewUrlParser: true}) //get rid of the warning
  .then(() => console.log("MongoDB connected..."))
  .catch(err => console.log(err));

// Use Routes
app.use('/api/auth', authRoutes);
app.use('/api/community', commRoutes);
app.use('/api/post', postRoutes);
app.use('/api/comment', commentRoutes);
app.use('/api/likepost', likepostRoutes);
app.use('/api/message', messageRoutes);
app.use('/api/communityuser', communityuserRoutes);
app.use('/api/notification', notificationRoutes);
app.use('/api/blockuser', blockuserRoutes);
app.use(bodyParser.xml());

 
const server = app.listen(port, '0.0.0.0', () => console.log(`Server started on port ${port}`));
