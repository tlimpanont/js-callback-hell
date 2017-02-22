import {MessageClient} from "./message-client";

export class UsersMessageListener {
    static listen$() {
        return MessageClient.onMessage$()
            .filter(function (_message) {
                let message = JSON.parse(_message);
                return (message.event === "insertUser");
            })
            .map(function (_message) {
                return JSON.parse(_message).data;
            })
    }
}
