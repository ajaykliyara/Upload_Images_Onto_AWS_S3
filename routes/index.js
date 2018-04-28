var express = require('express');
var multer = require('multer');
var multerS3 = require('multer-s3');           /* upload files to s3 */
var aws = require('aws-sdk');                  /* aws sdk module */
var router = express.Router();

var conf = require("../config.json");          /* configuration file */
aws.config.update(conf);                       /* set credentials */

const s3 = new aws.S3();                       /* connect to S3 */

/* multer s3 setting */
//ref : https://github.com/zishon89us/node-cheat/blob/master/aws/express_multer_s3/app_es8.js
const upload = multer({
    storage: multerS3({
        s3: s3,
        acl: 'public-read',
        bucket: 'cs31-projectspotlight',
        key: function (req, file, cb) {
            console.log(file);
            var img_array = file.originalname.split('.');
            cb(null, img_array[0] +'_'+Date.now() + '.' + img_array[1]);
        }
    })
});

/* GET default home page with a hardcoded image the first time */
router.get('/', function(req, res, next) {
  res.render('index', { image_url: 'https://s3.amazonaws.com/cs31-projectspotlight/1521690685645-crime_scene_roc.png', image_title:'Crime Scene Rochester' });
});

/* GET impage upload page. */
router.get('/login', function(req, res, next) {
  res.render('image_upload');
});

/* display uploaded image on home page */
router.post('/', upload.single('image'), function(req, res, next) {
    console.log("image uploaded");
    res.render('index', { image_url: req.file.location , image_title: req.body.title });
});

module.exports = router;
