const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postulateSchema = new Schema({
    user: { type:  Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: new Date() },
}, {timestamps: true});

module.exports = mongoose.model('Postulate', postulateSchema);
