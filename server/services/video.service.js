var config = require('config.json');
var _ = require('lodash');
var Q = require('q');
var slugify = require('helpers/slugify');
var mongo = require('mongoskin');
var db = mongo.db(config.connectionString, { native_parser: true });
db.bind('videos');

var service = {};

service.getAll = getAll;
service.getByUrl = getByUrl;
service.getById = getById;
service.create = create;
service.update = update;
service.delete = _delete;

module.exports = service;

function getAll() {
    var deferred = Q.defer();

    db.videos.find().sort({ publishDate: -1 }).toArray(function (err, videos) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        deferred.resolve(videos);
    });

    return deferred.promise;
}

function getByUrl(year, month, day, slug) {
    var deferred = Q.defer();

    db.videos.findOne({
        publishDate: year + '-' + month + '-' + day,
        slug: slug
    }, function (err, video) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        deferred.resolve(video);
    });

    return deferred.promise;
}

function getById(_id) {
    var deferred = Q.defer();

    db.videos.findById(_id, function (err, video) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        deferred.resolve(video);
    });

    return deferred.promise;
}

function create(videoParam) {
    var deferred = Q.defer();

    db.videos.insert(
        videoParam,
        function (err, doc) {
            if (err) deferred.reject(err.name + ': ' + err.message);

            deferred.resolve();
        });

    return deferred.promise;
}

function update(_id, videoParam) {
    var deferred = Q.defer();

    // fields to update
    var set = _.omit(videoParam, '_id');

    db.videos.update(
        { _id: mongo.helper.toObjectID(_id) },
        { $set: set },
        function (err, doc) {
            if (err) deferred.reject(err.name + ': ' + err.message);

            deferred.resolve();
        });

    return deferred.promise;
}

function _delete(_id) {
    var deferred = Q.defer();

    db.videos.remove(
        { _id: mongo.helper.toObjectID(_id) },
        function (err) {
            if (err) deferred.reject(err.name + ': ' + err.message);

            deferred.resolve();
        });

    return deferred.promise;
}
