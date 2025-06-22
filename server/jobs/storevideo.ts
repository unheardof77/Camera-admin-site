import { Agenda } from "@hokify/agenda";
import connection from "../config/connection";
import mongoose from "mongoose";
import FS from 'fs'
export default function storeVideoJob(agenda:Agenda){
    agenda.define('Store_Video', async (job)=>{
        const {filepath, filename} = job.attrs.data;
        const db = connection.db;
        if(!db){
            console.log("No DB Connection");
            return
        }
        try{
            const bucket = new mongoose.mongo.GridFSBucket(db, {bucketName:"Video-files"});
            const stream = FS.createReadStream(filepath)
            const uploadStream = bucket.openUploadStream(filename);
            stream.pipe(uploadStream);
            uploadStream.on('finish', ()=>{
                console.log("finished")
                FS.unlinkSync(filepath)
            })
        } catch(err){
            console.error(err);
        }


    })
}