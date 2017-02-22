let socket = require('engine.io-client')('ws://localhost:3002');
let socketInMeteorEnv = {
    on: Meteor.wrapAsync(socket.on, socket),
    send: Meteor.wrapAsync(socket.send, socket)
};

export class MessageClient {

    static connect() {

        return new Promise(function (resolve, reject) {
            socketInMeteorEnv.on("open", function () {
                resolve(socketInMeteorEnv);
            });

            socketInMeteorEnv.on("error", function (err) {
                reject(err);
            });
        });
    }

    static send(data) {
        socketInMeteorEnv.send(data);
    }
}
