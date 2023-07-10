const Job = require('../Models/Job');
const {NotFoundError, BadRequestError} = require('../Errors')
const getAllJobs = async(req,res)=>{
    const jobs = await Job.find({createdBy: req.user.userId}).sort('createdAt');
    res.status(200).json({jobs});
}
const getJob = async(req,res)=>{
    const {user:{userId},params:{id: jobId}} = req;
    const job = await Job.findOne({_id:jobId,createdBy:userId});
    if(!job){
        throw new NotFoundError(`job by id ${jobId} not exist`);
    }
    res.status(200).json({job})
}
const createJob = async(req,res)=>{
    req.body.createdBy = req.user.userId;
    const job = await Job.create(req.body);
    res.status(201).json({job});
}
const deleteJob = async(req,res)=>{
    const {user:{userId},params:{id:jobId}} = req;
    const job = await Job.findByIdAndRemove({_id:jobId,createdBy:userId});
    if(!job){
        throw new NotFoundError(`job by id ${jobId} not exist`);
    }
    res.status(200).send('deleted');
}
const updateJob = async(req,res)=>{
    const {
        body: { company, position },
        user:{userId},
        params:{id:jobId}
        } = req;
        if(!company||!position){
            throw new BadRequestError('Company or Position fields cannot be empty');
        }
        const job = await Job.findOneAndUpdate({
        _id:jobId,createdBy:userId},
        req.body,{new:true,runValidators:true});


    if(!job){
        throw new NotFoundError(`job by id ${jobId} not exist`);
    }
    res.status(200).json({job});
}

module.exports = {
    getAllJobs,
    getJob,
    createJob,
    deleteJob,
    updateJob
}
