// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/timestamp/", (req, res) => {
  res.json({unix: Date.now(), utc: Date()});
})

app.get("/api/timestamp/:date", function (req, res, next) {
  var date = req.params.date;
  console.log(date);
  if (date > 9999 && !isNaN(date)){
    var utcS =  new Date(Number(date)).toUTCString();
    console.log("utcs is" + utcS);
    res.json({'unix': Number(date), 'utc': utcS});
  } else if (new Date(date).toString() === "Invalid Date"){
      res.json({'error': "Invalid Date"});
  } else {
    var convertedDate = new Date(date);
    res.json({'unix': convertedDate.valueOf(), 'utc': convertedDate.toUTCString()});
    }
  
});


app.get("/now", function(req, res, next){
  req.time = new Date().toString();
  next();
  }, function(req, res){
    res.json({time: req.time});
  });


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
