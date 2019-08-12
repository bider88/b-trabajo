const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const { ObjectId } = Schema.Types;

const userInfoSchema = new Schema({
  user: { type: ObjectId, ref: 'User' },
  bio: {
    titleProfessional: { type: String },
    professionalObjective: { type: String },
    birthday: { type: Date },
    gender: { type: String, enum: ['Male', 'Female'] },
    phone: { type: String },
    address: {
      cp: { type: Number },
      country: { type: String },
      city: { type: ObjectId, ref: 'Citie' }
    },
    skills: { type: Array },
    webSite: { type: String },
    twitter: { type: String },
    facebook: { type: String }
  },
  professionalExperience: [ { type: ObjectId, ref: 'ProfessionalExperience' } ],
  educations: [ { type: ObjectId, ref: 'Education' } ],
}, {
  timestamps: true
})

const professionalExpSchema = new Schema({
  jobFunctions: { type: String, required: ['Job functions is required'] },
  company: { type: String, required: ['Company is required'] },
  workCategory: { type: String, required: ['Work category is required'] },
  activities: { type: String, required: ['Activities is required'] },
  startDate: { type: String, required: ['Start date is required'] },
  endDate: { type: String, required: ['End date is required'] },
  createdAt: { type: Date, default: new Date }
}, {
  timestamps: true
})

const educationSchema = new Schema({
  schoolName: { type: String, required: ['School name is required'] },
  academicDegree: { type: String, required: ['Academic degree is required'] },
  degree: { type: String, required: ['Degree is required'] },
  startDate: { type: String, required: ['Start date is required'] },
  endDate: { type: String, required: ['End date is required'] },
  createdAt: { type: Date, default: new Date }
}, {
  timestamps: true
})

module.exports = {
  UserInfo: mongoose.model('UserInfo', userInfoSchema),
  ProfessionalExperience: mongoose.model('ProfessionalExperience', professionalExpSchema),
  Education: mongoose.model('Education', educationSchema)
}
