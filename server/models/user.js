const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const roleValidates = {
    values: ['RECRUITER_ROLE', 'USER_ROLE'],
    message: '{VALUE} is not role valid'
};

let Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: { type: String, required: [true, 'firstname is required'] },
    lastName: { type: String, required: [true, 'lastname is required'] },
    createdAt: { type: Date, default: new Date() },
    email: { type: String, unique: true, required: [true, 'email is required' ] },
    password: { type: String, required: [true, 'password is required' ] },
    img: { type: String, default: '' },
    role: { type: String, default: 'USER_ROLE', enum: roleValidates },
    state: { type: Boolean, default: true },
    google: { type: Boolean, default: false }
}, {timestamps: true});

userSchema.methods.toJSON = function() {
    const user = this;
    let userObject = user.toObject();
    delete userObject.password;
    return userObject;
}

userSchema.plugin(uniqueValidator, { message: '{PATH} must be unique' });

module.exports = mongoose.model('User', userSchema);
