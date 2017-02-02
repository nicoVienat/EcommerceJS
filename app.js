var express    = require('express');
var db         = require('./config/db');
var bodyParser = require('body-parser');
var Kinder = require('./model/kinderModel');
var paiement       = require('./middlewares/paiement.js');

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var router = express.Router();

router.get('/', function(req, res) {

});

router.get('/kinders', function (req, res) {
    Kinder.find({}).then(function (kinders) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.json({ data: kinders});
    }, function (err) {
        res.send(err);
    })
});

router.get('/kinders/:kinder_id', function (req, res) {
    Kinder.find({ kinderId: req.params.kinder_id }).then(function (kinder) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.json({ data: kinder });
    }, function (err) {
        res.send(err);
    })
});

router.post('/paiement', paiement, function (req, res) {
    res.json({
        message: req.message,
        valid: req.valid
    });
});

app.use('/public', express.static(__dirname + '/public'));

app.use('/api', router);

app.listen(1337, function () {
    console.log('App running - OnlineShop');
});
