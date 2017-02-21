import {Meteor} from 'meteor/meteor';
let mongoose = require('mongoose');
let userSchema, User, db;

/** ACTION FLOWS FROM TOP TO BOTTOM **/
function meteorStartedUp() {

    mongoose.connect('mongodb://localhost:3001/local');
    userSchema = mongoose.Schema({
        name: String
    });
    User = mongoose.model('users', userSchema);
    db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));

    /* CALLBACK #2 */
    db.once('open', mongooseDBOpened);
}

function mongooseDBOpened() {
    /* CALLBACK #3 */
    User.remove({}, allUsersRemoved);
}

function allUsersRemoved(err, users) {
    if (err) {
        throw new Error(err);
    }
    let theuy = new User({name: "Theuy Limpanont"});
    let hans = new User({name: "Hans Kramer"});
    /* CALLBACK #4 */
    User.collection.insert([theuy, hans], testUsersInserted);
}

function testUsersInserted(err, docs) {
    if (err) {
        throw new Error(err);
    }
    /* CALLBACK #5 */
    User.find({}, allUsersFound);
}

function allUsersFound(err, users) {
    if (err) {
        throw new Error(err);
    }
    console.log(users);
}
/** END FLOWS FROM TOP TO BOTTOM **/

/* CALLBACK #1 */
Meteor.startup(meteorStartedUp);
