//https://medium.freecodecamp.org/introduction-to-mongoose-for-mongodb-d2a7aa593c57
const mongoose = require("mongoose");
// Mongoose Schema
const emailSchema = mongoose.Schema({
    email: { type: String, required: true },
    content: { type: String, required: true }
});
// Declare Schema
let userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String
});
//Virtual Method
userSchema.virtual('fullName').get(function () {
    return this.firstName + ' ' + this.lastName
});
userSchema.virtual('fullName').set(function (name) {
    let str = name.split(' ')
    this.firstName = str[0]
    this.lastName = str[1]
});
//Static Method
userSchema.statics.getUsers = function () {
    return new Promise((resolve, reject) => {
        this.find((err, docs) => {
            if (err) {
                console.error(err)
                return reject(err)
            }
            resolve(docs)
        })
    })
}
// Declare Model
UserModel = mongoose.model('User', userSchema)
EmailModel = mongoose.model('Email', emailSchema);
// Connect Mongoose
mongoose
    .connect(
        "mongodb+srv://admin:admin@cluster0-uicrg.mongodb.net/node-angular?retryWrites=true", { useNewUrlParser: true }
    )
    .then(() => {
        console.log("Connected to database!");
    })
    .catch((err) => {
        console.log("Connection failed!", err);
    });

let email = new EmailModel({
    email: "HeyEmail",
    content: "test2"
});

email.save().then(res =>
    console.log(res)).catch(err =>
        console.log(err)
    );
let model = new UserModel()
model.fullName = 'Thomas Anderson'
console.log(model.toJSON())  // Output model fields as JSON
console.log()
console.log('%s, %s', "Logout", model.fullName)  // Output the full name
UserModel.getUsers();