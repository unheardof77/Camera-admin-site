import { Agenda } from "@hokify/agenda";
import storeVideoJob from "./jobs/storevideo";

const connectOptions = { db: { address: 'localhost:27017/agenda-test', collection: 'agendaJobs' } };

const agenda = new Agenda(connectOptions);

const jobTypes = process.env.JOB_TYPES ? process.env.JOB_TYPES.split(',') : [];


storeVideoJob(agenda);

if (jobTypes.length) {
    agenda.start();
}

function isTemporaryError(err:any) {
    // Example: Check for network-related error codes or messages
    return err.message.includes('network') || err.code === 'ECONNREFUSED';
}

agenda.on('fail', (err:any, job) => {
    if(isTemporaryError(err)){
        job.schedule("10 seconds");
        job.save();
    }else{
        // Handle persistent errors (e.g., log the error, send notifications)
        console.error(`Job "${job.attrs.name}" failed permanently: ${err.message}`);
    }
})

export default agenda;