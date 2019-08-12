const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const { ObjectId } = Schema.Types;

const vacancySchema = new Schema({
  title: { type: String, required: [ true, 'title vacancy is required' ] },
  enterprise: { type: String, required: [ true, 'enterprise is required' ] },
  city: { type: String, required: [ true, 'city name is required' ] },
  salary: { type: Array, default: [] },
  salaryPeriod: { type: String },
  description: { type: String, required: [ true, 'description is required' ] },
  experience: { type: Array, required: [ true, 'experience is required' ] },
  email: { type: String, required: [ true, 'email contact is required' ] },
  phone: { type: String, default: '' },
  expire: { type: Date },
  createdAt: { type: Date, default: new Date() },
  status: {
    open: { type: Boolean, required: [ true, 'Status open is required' ], default: true },
    description: { type: String },
    another: { type: String }
  },
  user: { type: ObjectId, ref: 'User', required: true },
  postulate: [{ type: ObjectId, ref: 'Postulate', required: true, default: [] }],
  views: { type: Number, default: 0 }
}, {
  usePushEach: true
}, {
  timestamps: true
})

module.exports = mongoose.model('Vacancie', vacancySchema);
