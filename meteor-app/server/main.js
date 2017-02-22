import {Meteor} from 'meteor/meteor';
let mongoose = require('mongoose');
let userSchema, User, db;

/** ACTION FLOWS FROM TOP TO BOTTOM **/

/* CALLBACK #1 */
function meteorStartedUp() {

    mongoose.connect('mongodb://localhost:3001/local');
    userSchema = mongoose.Schema({
        name: String
    });
    User = mongoose.model('users', userSchema);
    db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));

    db.once('open', mongooseDBOpened);
}

/* CALLBACK #2 */
function mongooseDBOpened() {
    User.remove({}, allUsersRemoved);
}

/* CALLBACK #3 */
function allUsersRemoved(err, users) {
    if (err) {
        throw new Error(err);
    }
    let theuy = new User({name: "Theuy Limpanont"});
    let hans = new User({name: "Hans Kramer"});
    User.collection.insert([theuy, hans], testUsersInserted);
}

/* CALLBACK #4 */
function testUsersInserted(err, docs) {
    if (err) {
        throw new Error(err);
    }
    User.find({}, allUsersFound);
}

/* CALLBACK #5 */
function allUsersFound(err, users) {
    if (err) {
        throw new Error(err);
    }
    console.log(users);
}
/** END FLOWS FROM TOP TO BOTTOM **/

Meteor.startup(meteorStartedUp);
