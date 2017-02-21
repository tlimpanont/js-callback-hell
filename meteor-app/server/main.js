import {Meteor} from 'meteor/meteor';
let mongoose = require('mongoose');
let userSchema = mongoose.Schema({name: String});
let User = mongoose.model('users', userSchema);

function connectToMongooseDB() {
    return new Promise(function (resolve, reject) {
        mongoose.connect('mongodb://localhost:3001/local');
        let db = mongoose.connection;
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
    return new Promise(function (resolve, reject) {
        Meteor.startup(function () {
            resolve();
        });
    });
}

/** ACTION FLOWS FROM TOP TO BOTTOM **/
Promise.all([
    meteorStartUp(),
    connectToMongooseDB(),
    removeAllUsers(),
    insertTestUsers(),
    findAllUsers()
])
    .then(function ([meteorStartup, db, removeUsers, insertedUsers, allUsers]) {
        console.log("dbHost: ", db.host);
        console.log("dbPort: ", db.port);
        console.log("allUsers: ", allUsers);
    })
    .catch(function (error) {
        console.error("error from promise catch: ", error);
    });
/** END FLOWS FROM TOP TO BOTTOM **/
