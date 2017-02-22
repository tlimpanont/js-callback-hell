import {Meteor} from "meteor/meteor";
import {Mongo} from "meteor/mongo";
const faker = require("faker");


export class MessagingServer {
    static start() {
        let engine = require('engine.io');
        let server = engine.listen(3002);

        /*
         when someone is connected to the server
         */
        server.on('connection', function (socket) {
            console.log("CLIENT IS CONNECTED TO SERVER");

            socket.on('message', function (_message) {
                console.log("SERVER GET MESSAGE FROM CLIENT: " + _message);
            });

            socket.send(JSON.stringify({
                event: "connection"
            }));

            setInterval(function () {
                socket.send(JSON.stringify({
                    event: "insertUser",
                    data: {
                        name: faker.name.findName()
                    }
                }));
            }, 1000);
        });


    }
}
