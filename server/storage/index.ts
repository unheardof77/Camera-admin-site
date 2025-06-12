import connection from '../config/connection';
import mongoose from 'mongoose';

const db = connection.db
let bucket: mongoose.mongo.GridFSBucket | null = null;
if(db){
    bucket = new mongoose.mongo.GridFSBucket(db, {bucketName: "Video-files"});
}

export default bucket;
