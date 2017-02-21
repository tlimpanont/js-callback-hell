import {Meteor} from 'meteor/meteor';

/* CALLBACK #1 */
Meteor.startup(function () {
    let mongoose = require('mongoose');
    mongoose.connect('mongodb://localhost:3001/local');
    let userSchema = mongoose.Schema({
        name: String
    });
    let User = mongoose.model('users', userSchema);
    let db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    /* CALLBACK #2 */
    db.once('open', function () {
        /* CALLBACK #3 */
        User.remove({}, function (err, users) {
            if (err) {
                throw new Error(err);
            }
            let theuy = new User({name: "Theuy Limpanont"});
            let hans = new User({name: "Hans Kramer"});
            /* CALLBACK #4 */
            User.collection.insert([theuy, hans], function (err, docs) {
                if (err) {
                    throw new Error(err);
                }
                /* CALLBACK #5 */
                User.find({}, function (err, users) {
                    if (err) {
                        throw new Error(err);
                    }
                    console.log(users);
                });
            });
        });
    });
});
