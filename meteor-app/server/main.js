import {Meteor} from 'meteor/meteor';
import {MessagingServer} from '/imports/server/messaging-server';
import {MessageClient} from '/imports/server/message-client';
import {UsersMessageListener} from '/imports/server/users-message-listener';

/* CALLBACK #1 */
Meteor.startup(function () {
    MessagingServer.start();
    UsersMessageListener.subscribe(function (data) {
        Users.insert(data);
        MessageClient.send("USER INSERTERD: " + JSON.stringify(data, null, 4));
    });
});
