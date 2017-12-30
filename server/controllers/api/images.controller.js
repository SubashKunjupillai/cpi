var config = require('config.json');
var express = require('express');
var router = express.Router();
var path = require('path');
var multer = require('multer');
var imageService = require('services/image.service');
var jwt = require('express-jwt')({ secret: config.secret });
var storage = multer.diskStorage({
 destination: function(req, file, cb) {
   console.log("Inside Multer");
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

// router.post('/', upload.any('file'), function uploadFiles(req, res, next){
router.get('/', getAll);
router.post('/', upload.any(), jwt, create);

module.exports = router;

function getAll(req, res, next){
  imageService.getAll()
      .then(function (images) {
          // if admin user is logged in return all posts, otherwise return only published posts
          if (req.session.token) {
              res.send(images);
          } else {
              res.send(_.filter(images, { 'publish': true }));
          }
      })
      .catch(function (err) {
          res.status(400).send(err);
      });
}


function create(req, res){
  // console.log(req.body);
  res.send(req.body);

  for (var i=0; i<req.body.length; i++){
    // console.log(req.body[i]);
    imageService.addImage(req.body[i], function(err) {
    });
  }

  // imageService.addImage(imagepath, function(err) {
  // });
  // var files = req.vm.images;
  //
  // var images = []
  // for (var i=0; i<files.length; i++){
  //   var image = {}
  //   image.path = files[i].path;
  //   image.originalname = file.originalname;
  //   images.push(image);
  // }

  // var path = req.files[0].path;
  // var imageName = req.files[0].originalname;
  //
  // var imagepath = {};
  // imagepath['path'] = path;
  // imagepath['originalname'] = imageName;

  // console.log("Images : " + images)
  // imageService.addImages(images)
  //  .then(function () {
  // res.sendStatus(200);
  // })
  // .catch(function (err) {
  // res.status(400).send(err);
  // });
}

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
