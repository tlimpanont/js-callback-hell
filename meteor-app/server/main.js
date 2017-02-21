import {Meteor} from 'meteor/meteor';
let mongoose = require('mongoose');
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
    return new Promise(function (resolve, reject) {
        User.remove({}, function (err, users) {
            if (err) {
                reject(err);
            }
            resolve(users)
        });
    });
}

function insertTestUsers() {
    return new Promise(function (resolve, reject) {
        let theuy = new User({name: "Theuy Limpanont"});
        let hans = new User({name: "Hans Kramer"});
        User.collection.insert([theuy, hans], function (err, result) {
            if (err) {
                reject(err);
            }
            resolve(result)
        });
    });
}

function findAllUsers() {
    return new Promise(function (resolve, reject) {
        User.find({}, function (err, users) {
            if (err) {
                reject(err);
            }
            resolve(users)
        });
    });
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
