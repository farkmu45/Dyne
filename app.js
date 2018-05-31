var express = require('express');
var app = express();
var mongoose = require('mongoose');
var methodOverride = require('method-override');
var Data = require('./models/task');

mongoose.connect('mongodb://localhost/dyne');
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public/'));
app.use(express.urlencoded({
  extended: true
}));
app.use(methodOverride('_method'));

app.get('/', function(req, res) {
  res.render('showcase/index');
});



app.get('/tasker', function(req, res) {
  Data.find({}, function(err, task) {
    if (err) {
      res.render('error');
    } else {
      res.render('tasker/task', {
        data: task
      });
    }
  });
});

app.get('/tasker/new', function(req, res) {
  res.render('tasker/newtask');
});

app.get('/tasker/:task_id', function(req, res) {
  Data.findById(req.params.task_id, function(err, detaileddata) {
    if (err) {
      res.render('error');
    } else {
      res.render('tasker/details', {
        detaileddata: detaileddata
      });
    }
  });
});

app.post('/tasker', function(req, res) {
  Data.create(req.body.newdata, function(err) {
    if (err) {
      res.render('error');
    } else {
      res.redirect('/tasker');
    }
  });
});

app.get('/tasker/:task_id/edit', function(req, res) {
  Data.findById(req.params.task_id, function(err, data) {
    if (err) {
      res.render('error');
    } else {
      res.render('tasker/edittask', {
        data: data
      });
    }
  });
});

app.put('/tasker/:task_id', function(req, res) {
  Data.findByIdAndUpdate(req.params.task_id, req.body.editeddata, function(err) {
    if (err) {
      res.render('error');
    } else {
      res.redirect('/tasker');
    }
  });
});

app.delete('/tasker/:task_id', function(req, res) {
  Data.findByIdAndRemove(req.params.task_id, function(err) {
    if (err) {
      res.render('error');
    } else {
      res.redirect('/tasker');
    }
  });
});

app.get('*', function(req, res) {
  res.render('error');
});

app.listen(process.ENV.IP, process.ENV.PORT);
