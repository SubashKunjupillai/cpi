var config = require('config.json');
var _ = require('lodash');
var express = require('express');
var jwt = require('express-jwt')({ secret: config.secret });
var router = express.Router();
var videoService = require('services/video.service');

// routes
router.get('/', getAll);
router.get('/:year/:month/:day/:slug', getByUrl);
router.get('/:_id', jwt, getById);
router.post('/', jwt, create);
router.put('/:_id', jwt, update);
router.delete('/:_id', jwt, _delete);

module.exports = router;

function getAll(req, res) {
    videoService.getAll()
        .then(function (videos) {
            // if admin user is logged in return all posts, otherwise return only published posts
            if (req.session.token) {
                res.send(videos);
            } else {
                res.send(_.filter(videos, { 'publish': true }));
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function getByUrl(req, res) {
    videoService.getByUrl(req.params.year, req.params.month, req.params.day, req.params.slug)
        .then(function (video) {
            // return post if it's published or the admin is logged in
            if (video.publish || req.session.token) {
                res.send(video);
            } else {
                res.status(404).send('Not found');
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function getById(req, res) {
    videoService.getById(req.params._id)
        .then(function (video) {
            res.send(video);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function create(req, res) {
    videoService.create(req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function update(req, res) {
    videoService.update(req.params._id, req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function _delete(req, res) {
    videoService.delete(req.params._id)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}
