import {Meteor} from 'meteor/meteor';
let mongoose = require('mongoose');
/**
 * The node function should conform to node.js convention of accepting a callback as last argument and calling that callback
 * with error as the first argument and success value on the second argument.
 */
let Promise = require('bluebird');
let userSchema, User, db;

function connectToMongooseDB() {
    return new Promise(function (resolve, reject) {
        mongoose.connect('mongodb://localhost:3001/local');
        userSchema = mongoose.Schema({
            name: String
        });
        User = mongoose.model('users', userSchema);
        db = mongoose.connection;
        db.on('error', function (error) {
            reject(error);
        });
        db.once('open', function () {
            resolve(db);
        });
    });
}

function removeAllUsers() {
    return Promise.promisify(User.remove)
        .call(User, {});
}

function insertTestUsers() {
    let theuy = new User({name: "Theuy Limpanont"});
    let hans = new User({name: "Hans Kramer"});
    return Promise.promisify(User.collection.insert)
        .call(User.collection, [theuy, hans]);
}

function findAllUsers() {
    return Promise.promisify(User.find)
        .call(User, {});
}

function meteorStartUp() {
    return new Promise(function(resolve, reject) {
        Meteor.startup(function () {
            resolve();
        });
    });
}

/** ACTION FLOWS FROM TOP TO BOTTOM **/
meteorStartUp()
    .then(connectToMongooseDB)
    .then(removeAllUsers)
    .then(insertTestUsers)
    .then(findAllUsers)
    .then(function(users) {
        console.log(users);
    })
    .catch(function(error) {
        console.error("error from promise catch: ", error);
    });
/** END FLOWS FROM TOP TO BOTTOM **/
