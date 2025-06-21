import{ Schema, model, Model } from "mongoose";
import bcrypt from 'bcrypt';

import { AdminInt, AdminMethods } from "../utils/types";



type AdminModel = Model<AdminInt, {}, AdminMethods>;

const adminSchema = new Schema({
    username:{
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password:{
        type: String,
        required: true,
        minLength: 7,
    },
});

adminSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }
    next();
});

adminSchema.method('isCorrectPassword', async function isCorrectPassword(password:string) {
    return await bcrypt.compare(password, this.password);
});

adminSchema.virtual('isAdmin').get(function(){
    return true
})

const Admin = model<AdminInt, AdminModel>('Admin', adminSchema);

export default Admin;