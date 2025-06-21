import db from "../config/connection";
import Admin from "../models/Admin";
import Group from "../models/Group";
import User from '../models/User'


db.once('open', async ()=>{
    try{
        await User.deleteMany({});
        await Group.deleteMany({});
        await Admin.deleteMany({});
        console.log("Deleted Users, Groups, and Admins")
    } catch(err){
        console.error("something went wrong", err)
    }
    try{
        const adminInfo = {
            username: "testAdmin",
            password:"123admin"
        }
        await Admin.create(adminInfo);
        console.log("created admin");
    } catch(err){
        console.error("something went wrong", err)
    }
    process.exit(0);
})