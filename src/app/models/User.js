const mongoose = require('mongoose')
const bcrypt = require('bcrypt')


const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        minLength: 3,
        maxLength: 20,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        minLength: 3,
        maxLength: 20,
    },
    userName: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        //index:true,
        lowercase: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
    },
    hash_password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    contactNumber: {
        type: String,
    },
    profilePicture: {
        type: String,
    }
}, { collection: 'User' }, { timestamps: true })

/* userSchema.virtual('password')
    .set(function(password){
        this.hashPassword=bcrypt.hashSync(password,10)
    }) */
userSchema.virtual('fullName')
    .get(function () {
        return `${this.firstName} ${this.lastName}`
    })
userSchema.methods = {
    authenticate: async function (password) {
        return await bcrypt.compare(password, this.hash_password);
    },
};

module.exports = mongoose.model('User', userSchema)