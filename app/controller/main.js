var async = require('async');

exports.main = function(req, res) {

  async.parallel([

    function(callback) { //This is the first task, and callback is its callback task
      res.render('index', {
        title: 'Express',
        layout: 'layout'
      });
    }
  ], function(err) { //This is the final callback
  });

}