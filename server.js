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

app.get('/chart', function (req, res) {
    res.sendFile("public/dist/chart.html", { "root": __dirname });
});

app.get('/tiles', function (req, res) {
    res.sendFile("public/dist/tiles.html", { "root": __dirname });
});



/* process.env.PORT is used in case you want to push to Heroku, for example, here the port will be dynamically allocated */
var port = process.env.PORT || 1234;


//const configPath = path.join(__dirname, 'public', 'app.json');
const configPath = path.join(__dirname, 'public','app.json');

const localServer = http.createServer(app).listen(port, function(){
    console.log('Express server listening on port ' + port);
    
    openfinLauncher.launchOpenFin({ configPath }).then(() => {
        localServer.close()
    });
	
});
