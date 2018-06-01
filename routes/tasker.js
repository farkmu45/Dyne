var express = require('express');
var router = express.Router();
var Data = require('./../models/task');

router.get('/', function(req, res) {
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

router.get('/new', function(req, res) {
  res.render('tasker/newtask');
});

router.get('/:task_id', function(req, res) {
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

router.post('/', function(req, res) {
  Data.create(req.body.newdata, function(err) {
    if (err) {
      res.render('error');
    } else {
      res.redirect('/tasker');
    }
  });
});

router.get('/:task_id/edit', function(req, res) {
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

router.put('/:task_id', function(req, res) {
  Data.findByIdAndUpdate(req.params.task_id, req.body.editeddata, function(err) {
    if (err) {
      res.render('error');
    } else {
      res.redirect('/tasker');
    }
  });
});

router.delete('/:task_id', function(req, res) {
  Data.findByIdAndRemove(req.params.task_id, function(err) {
    if (err) {
      res.render('error');
    } else {
      res.redirect('/tasker');
    }
  });
});

module.exports = router;
