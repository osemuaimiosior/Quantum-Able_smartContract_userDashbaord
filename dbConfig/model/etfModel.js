const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const etfSchema = new Schema({
    price: {type: Number, require: true},
    Date: {type: Date, require: true}
});

const model = mongoose.model('eftdb', etfSchema);