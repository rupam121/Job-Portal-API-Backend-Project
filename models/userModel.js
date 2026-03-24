import mongoose from "mongoose";
import validator from "validator";
import bcrypt from 'bcryptjs';
import JWT from 'jsonwebtoken';

// schema design
const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is Required']
        },
        lastName: {
            type: String
        },
        email: {
            type: String,
            required: [true, 'Email is require'],
            unique: true,
            validate: [validator.isEmail, "Invalid email"]
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            minLength: [6, "Password Length should be greater than 6 character"],
            select: true,
        },
        location: {
            type: String,
            default: "india"
        }
    },
    { timestamps: true }
); // save-real time when its created in dbms

userSchema.pre('save', async function () {
    if (!this.isModified) return;
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// compare password
userSchema.methods.comparePassword = async function (userPassword) {
    const isMatch = await bcrypt.compare(userPassword, this.password);
    return isMatch;
}

// json-webtoken
userSchema.methods.createJWT = function () {
    return JWT.sign({ userId: this._id }, process.env.JWT_SECRET, {
        expiresIn: '1d'
    });
}

export default mongoose.model('User', userSchema);