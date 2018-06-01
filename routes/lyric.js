var express = require('express');
var router = express.Router();
var request = require('request');
var music = require('musicmatch')({
  apikey: "284838eacaf69ef9809891afbd8e427b"
});

router.get('/', function(req, res) {
  music.chartTracks({
      page: 1,
      page_size: 7,
      country: "us",
      f_has_lyrics: 1
    })
    .then(function(data) {
      res.render('lyrics/lyric', {
        data: data
      });
    }).catch(function(err) {
      res.render('error');
      res.redirect('/lyric');
    });
});

router.get('/:artist/:title', function(req, res) {
  request('https://api.lyrics.ovh/v1/' + req.params.artist + '/' + req.params.title, function(error, response, body) {
    if (error) {
      res.render('error');
      res.redirect('/lyric');
    } else {
      var data = JSON.parse(body);
      var track_title = req.params.title;
      var track_artist = req.params.artist
      res.render('lyrics/lyric_details', {
        data: data.lyrics.replace(/\n/g, "<br />"),
        artist: track_artist,
        title: track_title
      });
    }
  })
});

router.get('/s', function(req, res) {
  var query = req.query.words
  music.trackSearch({
      q: req.query.words,
      page: 1,
      page_size: 15
    })
    .then(function(data) {
      res.render('lyrics/result', {
        song: data,
        query: query
      });
    }).catch(function(err) {
      res.render('error');
      res.redirect('/lyric');
    });
});

module.exports = router;
