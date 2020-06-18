const express = require('express')
const router = express.Router();
const {getUsers,Login,Register} = require('./../controllers/authController');
const multer = require('multer')
const path = require('path')
const DIR = './public/uploads';

router.post('/login',Login)
router.post('/register',Register)
router.get('/users',getUsers)

module.exports = router;






let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        if (ext !== '.jpg' && ext !== '.png' && ext !== '.mp4') {
            return cb(res.status(400).end('only jpg, png, mp4 is allowed'), false);
        }
        cb(null, true)
    }
  });
  
  
  const upload = multer({ storage: storage }).single("file");
  
  //For Upload files
  router.post("/uploadfiles", (req, res) => {
      console.log(req.body)
    upload(req, res, err => {
        if (err) {
            return res.json({ success: false, err });
        }
        console.log(res.req.file.path,res.req.file.filename)
        return res.json({ success: true, url: res.req.file.path, fileName: res.req.file.filename });
    });
  });





//   router.post('/uploadBase',(req,res,next)=>{
  
//   })