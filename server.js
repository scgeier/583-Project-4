var express = require('express');
var bodyParser = require('body-parser');
var app = express();

//this routing method with a JSON API is based on a seed at https://github.com/btford/angular-express-seed
//it makes sense, you set up routes with exports; you route to one file (api.js) and use exports.whatever
//to get the JSON data; exports.whatever contains the res.json function
//you route to another file (index.js) and use exports.index to render the home page
//but I can't get it to work...and I don't understand why we would need to hard-code the JSON into the res.json function..
//any help would be greatly appreciated..I can't even chose a topic really until I know I can set up the project correctly. Thanks!

var routes = require('./routes');
var api = require('./routes/api');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static('public'));
app.set('view engine', 'ejs');

//this is where the magic is supposed to happen
app.get('/', routes.index);
app.get('/api/seats', api.seats);

app.listen(8080, function(){
    console.log("App is listening on port 8080...");
});