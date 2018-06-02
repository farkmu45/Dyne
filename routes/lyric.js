var express = require('express');
var router = express.Router();
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

router.get('/s', function(req, res) {
  var query = req.query.words
  music.trackSearch({
      q: req.query.words,
      page: 1,
      f_has_lyrics: 1,
      page_size: 15
    })
    .then(function(data) {
      res.render('lyrics/result', {
        song: data,
        query: query
      });
    }).catch(function(err) {
      console.log(err);
    });
});


router.get('/:track_id', function(req, res) {
  music.track({
      track_id: req.params.track_id
    })
    .then(function(song) {
      music.trackLyrics({
          track_id: req.params.track_id
        })
        .then(function(data) {
          res.render('lyrics/lyric_details', {
            data: data.message.body.lyrics.lyrics_body.replace(/\n/g, "<br />"),
            track: song.message.body.track
          });
        }).catch(function(err) {
          console.log(err);
          res.render('error');
        });;
    }).catch(function(err) {
      console.log(err);
    });
});
module.exports = router;
