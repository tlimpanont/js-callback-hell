import * as Rx from "rxjs/Rx";

let socket = require('engine.io-client')('ws://localhost:3002');
let socketInMeteorEnv = {
    on: Meteor.wrapAsync(socket.on, socket),
    send: Meteor.wrapAsync(socket.send, socket)
};

export class MessageClient {

    static connect$() {

        return new Rx.Observable(function (observer) {
            socketInMeteorEnv.on("open", function () {
                observer.next(socketInMeteorEnv);
            });

            socketInMeteorEnv.on("error", function (err) {
                observer.error(err);
            });
        });
    }

    static onMessage$() {
        let connect$ = MessageClient.connect$();
        return connect$.mergeMap(function (socket) {
            return new Rx.Observable(function (observer) {
                socket.on("message", function (_message) {
                    observer.next(_message);
                });
            });
        });
    }

    static send(data) {
        socketInMeteorEnv.send(data);
    }
}
