var express = require('express');
var router = express.Router();
var path = require('path');
var multer = require('multer');
var imageService = require('services/image.service');
var storage = multer.diskStorage({
 destination: function(req, file, cb) {
 cb(null, 'uploads/')
 },
 filename: function(req, file, cb) {
 cb(null, file.originalname);
 }
});

var upload = multer({
 storage: storage
});

// router.get('/', getAll);

router.post('/', upload.any(), function uploadFiles(req, res, next){
  res.send(req.files);

  var images = []
  for (file in req.files){
    var image = {}
    image.path = file.path;
    image.originalname = file.originalname;
    images.push(image);
  }
  // var path = req.files[0].path;
  // var imageName = req.files[0].originalname;
  //
  // var imagepath = {};
  // imagepath['path'] = path;
  // imagepath['originalname'] = imageName;

  console.log("Images : " + images)
  imageService.addImages(images)
   .then(function () {
  res.sendStatus(200);
  })
  .catch(function (err) {
  res.status(400).send(err);
  });
})

// function getAll(req, res) {
//     imageService.getImages()
//         .then(function (image) {
//             // if admin user is logged in return all posts, otherwise return only published posts
//             // if (req.session.token) {
//                 res.send(image);
//             // } else {
//             //     res.send(_.filter(posts, { 'publish': true }));
//             // }
//         })
//         .catch(function (err) {
//             res.status(400).send(err);
//         });
// }
module.exports = router;
