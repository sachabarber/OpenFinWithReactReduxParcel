function formatDate(date) {
    var d = new Date(date);
    return [(d.getMonth() + 1).padLeft(),
    d.getDate().padLeft(),
    d.getFullYear()].join('/') + ' ' +
        [d.getHours().padLeft(),
        d.getMinutes().padLeft(),
        d.getSeconds().padLeft()].join(':');
}

function createGuid() {

    var r = (new Date()).getTime().toString(16) + Math.random().toString(16).substring(2) + "0".repeat(16);
    return r.substr(0, 8) + '-' + r.substr(8, 4) + '-4000-8' + r.substr(12, 3) + '-' + r.substr(15, 12);
}

function formatTo2Places(theNum) {
    var result = Math.round(theNum * 100) / 100
    return parseFloat(result.toString(10)).toFixed(2);
}

Number.prototype.padLeft = function (base, chr) {
    var len = (String(base || 10).length - String(this).length) + 1;
    return len > 0 ? new Array(len).join(chr || '0') + this : this;
}

var blotterData = [
    { "pair": "BTCUSD", "price": 0.78, "dateCreated": formatDate(Date.now()), "internalId": createGuid() },
    { "pair": "USDEUR", "price": 0.89, "dateCreated": formatDate(Date.now()), "internalId": createGuid() }
];

var express = require('express')
    , http = require('http')
    , path = require('path')
    , openfinLauncher = require('openfin-launcher')
    , bodyParser = require("body-parser");


var app = express();
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('title','Express Parcel app');
app.use(express.static(path.join(__dirname, 'public/dist')));

/* serves main page  */
app.get('/', function (req, res) {
    res.sendFile("public/dist/launcher.html", { "root": __dirname });
});


app.get('/blotter', function (req, res) {
    res.sendFile("public/dist/blotter.html", { "root": __dirname });
});

app.post('/trade', function (req, res) {
    blotterData.push({ "pair": req.body.pair, "price": formatTo2Places(req.body.price), "dateCreated": formatDate(Date.now()), "internalId": createGuid() });
    res.sendStatus(200);
});


app.get('/chart', function (req, res) {
    res.sendFile("public/dist/chart.html", { "root": __dirname });
});

app.get('/tiles', function (req, res) {
    res.sendFile("public/dist/tiles.html", { "root": __dirname });
});


app.get('/tileInfos', function (req, res) {
    res.send(
        [
            { "tilePair": "USDGBP", "tilePrice": 0.78 },
            { "tilePair": "USDEUR", "tilePrice": 0.89 },
            { "tilePair": "USDCAN", "tilePrice": 1.32 },
            { "tilePair": "USDCHF", "tilePrice": 1.01 },
            { "tilePair": "GBPCAN", "tilePrice": 1.71 },
            { "tilePair": "GBPAUD", "tilePrice": 1.81 },
            { "tilePair": "GBPEUR", "tilePrice": 1.14 },
            { "tilePair": "GBPPLN", "tilePrice": 4.95 },
        ]
    );
});

app.get('/blotterInfos', function (req, res) {
    res.send(blotterData);
});



/* process.env.PORT is used in case you want to push to Heroku, for example, here the port will be dynamically allocated */
var port = process.env.PORT || 1234;


//const configPath = path.join(__dirname, 'public', 'app.json');
const configPath = path.join(__dirname, 'public','app.json');

const localServer = http.createServer(app).listen(port, function(){
    console.log('Express server listening on port ' + port);

   
    openfinLauncher.launchOpenFin({ configPath }).then(() => {
        localServer.close();
    });


});




