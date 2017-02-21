import {Meteor} from 'meteor/meteor';

/* #1 */
Meteor.startup(function() {
  var mongoose = require('mongoose');
  mongoose.connect('mongodb://localhost:3001/local');
  var userSchema = mongoose.Schema({
    name: String
  });
  var User = mongoose.model('users', userSchema);
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  /* #2 */
  db.once('open', function() {
    /* #3 */
    User.remove({}, function(err, users) {
      if(err) {
        throw new Error(err);
      }
      let theuy = new User({name: "Theuy Limpanont"});
      let hans = new User({name: "Hans Kramer"});
      /* #4 */
      User.collection.insert([theuy, hans], function(err, docs) {
        if(err) {
          throw new Error(err);
        }
        /* #5 */
        User.find({}, function(err, users) {
          if(err) {
            throw new Error(err);
          }
          console.log(users);
        });
      });
    });
  });
});
