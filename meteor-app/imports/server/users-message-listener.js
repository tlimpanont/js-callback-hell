import {MessageClient} from "./message-client";

export class UsersMessageListener {
    static subscribe(onMessageCallback) {
        MessageClient.connect().then(function (connectedSocket) {
            connectedSocket.on("message", function (_message) {
                let message = JSON.parse(_message);
                if (message.event === "insertUser") {
                    onMessageCallback(message.data);
                }
            });
        });
    }
}
