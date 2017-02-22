import {Meteor} from "meteor/meteor";
import {Mongo} from "meteor/mongo";

if (Meteor.isServer) {
    Users = new Mongo.Collection("users");
}
