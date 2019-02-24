var   express = require('express')
    , http = require('http')
    , path = require('path')
    , openfinLauncher = require('openfin-launcher');


var app = express();

app.set('title','Express Parcel app');
app.use(express.static(path.join(__dirname, 'public/dist')));

/* serves main page  */
app.get('/', function (req, res) {
    res.sendFile("public/dist/launcher.html", { "root": __dirname });
});

app.get('/blotter', function (req, res) {
    res.sendFile("public/dist/blotter.html", { "root": __dirname });
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
    res.send(
        [
            { "pair": "USDGBP", "price": 0.78, "dateCreated": formatDate(Date.now()) },
            { "pair": "USDEUR", "price": 0.89, "dateCreated": formatDate(Date.now()) }
        ]
    );
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

Number.prototype.padLeft = function (base, chr) {
    var len = (String(base || 10).length - String(this).length) + 1;
    return len > 0 ? new Array(len).join(chr || '0') + this : this;
}

function formatDate(date) {
    //var d = new Date(date),
    //    month = '' + (d.getMonth() + 1),
    //    day = '' + d.getDate(),
    //    year = d.getFullYear();

    //if (month.length < 2) month = '0' + month;
    //if (day.length < 2) day = '0' + day;

    //return [year, month, day].join('-');


    var d = new Date(date);
    return [(d.getMonth() + 1).padLeft(),
    d.getDate().padLeft(),
    d.getFullYear()].join('/') + ' ' +
        [d.getHours().padLeft(),
        d.getMinutes().padLeft(),
        d.getSeconds().padLeft()].join(':');


}



