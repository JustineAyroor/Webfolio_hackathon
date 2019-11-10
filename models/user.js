var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
    username: {type: String, required: "UserName cannot be blank"},
    password: String,
    firstName: {type: String, required: "FirstName cannot be blank"},
    lastName: {type: String, required: "LastName cannot be blank"},
    age: {type: Number, default: 15},
    email: {type: String, required: "Email cannot be blank"},
    avatar:{type: String, default: "https://cdn3.vectorstock.com/i/1000x1000/75/62/smiling-avatar-boy-graphic-vector-9437562.jpg"},
    phone: {type: String, default: "000-000-0000"},
    isAdmin: {type: Boolean, default: false}
});


UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);