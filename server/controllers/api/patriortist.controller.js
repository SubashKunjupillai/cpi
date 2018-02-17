var config = require('config.json');
var nodemailer = require('nodemailer');
var express = require('express');
var router = express.Router();
var patriortistService = require('services/patriortist.service');
// routes
router.post('/', send);

module.exports = router;

function send(req, res) {
    console.log("Inside patriortist controller");
    patriortistService.create(req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });


}
