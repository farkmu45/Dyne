var express = require('express');
var app = express();
var mongoose = require('mongoose');
var methodOverride = require('method-override');
var forceHTTPS = require("expressjs-force-https").forceHTTPS;

var Data = require('./models/task');


var taskerRoutes = require('./routes/tasker');
var lyricRoutes = require('./routes/lyric')

mongoose.connect('mongodb://fark5:maulana123@ds141320.mlab.com:41320/dyne');
// mongoose.connect('mongodb://localhost/dyne');
app.set('view engine', 'ejs');
app.use(forceHTTPS);
app.use(express.static(__dirname + '/public/'));
app.use(express.urlencoded({
  extended: true
}));
app.use(methodOverride('_method'));

app.get('/', function(req, res) {
  res.render('showcase/index');
});

app.use('/tasker', taskerRoutes);
app.use('/lyric', lyricRoutes);
app.get('*', function(req, res) {
  res.render('error');
});

app.listen(process.env.PORT, process.env.IP);
// app.listen(3000, function() {
//   console.log('Server starts on ' + 3000);
// });
