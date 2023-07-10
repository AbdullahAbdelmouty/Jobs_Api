const Job = require('../Models/Job')
const getAllJobs = async(req,res)=>{
    res.status(200).json({msg:"get all jobs"});
}
const getJob = async(req,res)=>{
    res.status(200).send("get job");
}
const createJob = async(req,res)=>{
    console.log(req.body);
    req.body.createdBy = req.user.userId;
    const job = await Job.create(req.body);
    res.status(201).json({job});
}
const deleteJob = async(req,res)=>{
    res.status(200).send("delete job");
}
const updateJob = async(req,res)=>{
    res.status(200).send("update job");
}

module.exports = {
    getAllJobs,
    getJob,
    createJob,
    deleteJob,
    updateJob
}
