var config = require('config.json');
var Q = require('q');
var mongo = require('mongoskin');
var db = mongo.db(config.connectionString, { native_parser: true });
db.bind('images');
var service = {};
// service.getImages = getImages;
// service.getImageById = getImageById;
service.addImages = addImages;
service.addImage = addImage;
module.exports = service;

// function getImages(){
//   var deferred = Q.defer();
//   db.files.find().toArray(function (err, files) {
//       if (err) deferred.reject(err.name + ': ' + err.message);
//
//       deferred.resolve(files);
//   });
//
//   return deferred.promise;
// }
// function getImageById(_id){
//   var deferred = Q.defer();
//
//   db.files.findById(_id, function (err, files) {
//       if (err) deferred.reject(err.name + ': ' + err.message);
//
//       deferred.resolve(files);
//   });
//
//   return deferred.promise;
// }
function addImages(images) {
    var deferred = Q.defer();
    for (image in images){
      addImage(image);
    }
    return deferred.promise;
}

function addImage(image) {
    var deferred = Q.defer();
    db.images.insert(
        image,
        function (err, doc) {
            if (err) deferred.reject(err.name + ': ' + err.message);
            deferred.resolve();
        });
    return deferred.promise;
}
