import {Meteor} from 'meteor/meteor';
import Rx from 'rxjs/Rx';
let mongoose = require('mongoose');
let userSchema = mongoose.Schema({name: String});
let User = mongoose.model('users', userSchema);

let connectToMongooseDB$ = new Rx.Observable(function (observer) {
    mongoose.connect('mongodb://localhost:3001/local');
    let db = mongoose.connection;
    db.on('error', function (err) {
        observer.error(err);
    });
    db.once('open', function () {
        observer.next(db);
    });
});

let removeAllUsers$ = new Rx.Observable(function (observer) {
    User.remove({}, function (err, users) {
        if (err) {
            observer.error(err);
        }
        observer.next(users);
    });
});


let insertTestUsers$ = new Rx.Observable(function (observer) {
    let theuy = new User({name: "Theuy Limpanont"});
    let hans = new User({name: "Hans Kramer"});
    User.collection.insert([theuy, hans], function (err, result) {
        if (err) {
            observer.error(err);
        }
        observer.next(result);
    });
});


let findAllUsers$ = new Rx.Observable(function (observer) {
    User.find({}, function (err, users) {
        if (err) {
            observer.error(err);
        }
        observer.next(users);
    });
});

let meteorStartUp$ = new Rx.Observable(function (observer) {
    Meteor.startup(function () {
        observer.next();
    });
});


/** ACTION FLOWS FROM TOP TO BOTTOM **/
Rx.Observable.combineLatest(
    meteorStartUp$,
    connectToMongooseDB$,
    removeAllUsers$,
    insertTestUsers$,
    findAllUsers$
)
    .subscribe(function ([meteorStartup, db, removeUsers, insertedUsers, allUsers]) {
        console.log("dbHost: ", db.host);
        console.log("dbPort: ", db.port);
        console.log("allUsers: ", allUsers);
    }, function (error) {
        console.error("error from observable catch: ", error);
    }, function () {
        console.log("stream completed!");
    });
/** END FLOWS FROM TOP TO BOTTOM **/
