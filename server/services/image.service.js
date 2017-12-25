var Q = require('q');
var mongo = require('mongoskin');
var db = mongo.db('mongodb://localhost:27017/imageapp', { native_parser: true });
db.bind('files');
var service = {};
service.getImages = getImages;
service.getImageById = getImageById;
service.addImage = addImage;

module.exports = service;

function getImages(){
  var deferred = Q.defer();
  db.files.find().toArray(function (err, files) {
      if (err) deferred.reject(err.name + ': ' + err.message);

      deferred.resolve(files);
  });

  return deferred.promise;
}
function getImageById(_id){
  var deferred = Q.defer();

  db.files.findById(_id, function (err, files) {
      if (err) deferred.reject(err.name + ': ' + err.message);

      deferred.resolve(files);
  });

  return deferred.promise;
}
function addImage(imageParam) {
    var deferred = Q.defer();

    // generate slug from title if empty

    db.files.insert(
        imageParam,
        function (err, doc) {
            if (err) deferred.reject(err.name + ': ' + err.message);

            deferred.resolve();
        });

    return deferred.promise;
}
