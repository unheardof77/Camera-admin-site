import mongoose from "mongoose";

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/Camera-Admin-DB');

const connection = mongoose.connection;

export default connection;
