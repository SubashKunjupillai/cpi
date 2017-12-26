(function () {
    'use strict';

    angular
        .module('app')
        .controller('Images.AddController', Controller);

    angular.module("app").directive("filesInput", function() {
      return {
        require: "ngModel",
        link: function postLink(scope,elem,attrs,ngModel) {
          elem.on("change", function(e) {
            var files = elem[0].files;
            ngModel.$setViewValue(files);
          })
        }
      }
    });

    function Controller($stateParams, $location, ImageService, AlertService) {
        var vm = this;

        vm.image = {};
        vm.images = [];
        vm.saveImages = saveImages;
        // vm.deleteImage = deleteImage;

        // initController();
        //
        // function initController() {
        //     vm.loading = 0;
        //     if ($stateParams._id) {
        //         vm.loading += 1;
        //         ImageService.GetById($stateParams._id)
        //             .then(function (image) {
        //                 vm.loading -= 1;
        //                 vm.image = image;
        //             });
        //     }
        //         // initialise with defaults
        //     // else {
        //     //     vm.image = {
        //     //         publishDate: moment().format('YYYY-MM-DD'),
        //     //         publish: true
        //     //     };
        //     // }
        // }

        function saveImages() {
            ImageService.Save(vm.images)
                .then(function () {
                    AlertService.Success('Image uploaded', true);
                    $location.path('/images');
                })
                .catch(function (error) {
                    AlertService.Error(error);
                });
        }

        // function deleteImage() {
        //     ImageService.Delete(vm.image._id)
        //         .then(function () {
        //             AlertService.Success('Image deleted', true);
        //             $location.path('/images');
        //         })
        //         .catch(function (error) {
        //             AlertService.Error(error);
        //         });
        // }
    }
})();




// var express = require('express');
// var router = express.Router();
// var path = require('path');
// var multer = require('multer');
// var imageService = require('../service/image.service');
//
// var storage = multer.diskStorage({
//  destination: function(req, file, cb) {
//  cb(null, 'uploads/')
//  },
//  filename: function(req, file, cb) {
//  cb(null, file.originalname);
//  }
// });
//
// var upload = multer({
//  storage: storage
// });
//
// router.get('/', function(req, res, next) {
//  res.render('index.ejs');
// });
//
// router.post('/', upload.any(), function(req, res, next) {
//
//  res.send(req.files);
//  console.log(req.files);
//
// /*req.files has the information regarding the file you are uploading...
// from the total information, i am just using the path and the imageName to store in the mongo collection(table)
// */
//  var path = req.files[0].path;
//  var imageName = req.files[0].originalname;
//
//  var imagepath = {};
//  imagepath['path'] = path;
//  imagepath['originalname'] = imageName;
//
//  //imagepath contains two objects, path and the imageName
//
//  //we are passing two objects in the addImage method.. which is defined above..
//  imageService.addImage(imagepath, function(err) {
//
//  });
//
// });
//
// module.exports = router;
