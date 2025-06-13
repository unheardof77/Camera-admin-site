import mongoose from "mongoose";

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/Camera-Admin-DB');

const connection = mongoose.connection;
const db = connection.db;
export const bucket = db ? new mongoose.mongo.GridFSBucket(db, { bucketName: "Video-files" }) : null;
export default connection;
