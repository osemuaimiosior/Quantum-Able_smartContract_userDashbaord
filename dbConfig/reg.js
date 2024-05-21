const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const registrationSchema = new Schema({
    userName: {type: String, require: true},
    userEmail: {type: String, require: true},
    userPassword: {type: String, require: true}
});

module.exports = mongoose.model('reg', registrationSchema);
