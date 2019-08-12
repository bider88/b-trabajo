const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const citiesSchema = new Schema({
    inegi_id: { type:  Number },
    id: { type:  Number },
    state_id: { type:  Number },
    key_state: { type:  String },
    state: { type:  String },
    name: { type:  String }
});

module.exports = mongoose.model('Citie', citiesSchema);
