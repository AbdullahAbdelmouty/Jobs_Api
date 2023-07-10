const express = require('express');
const { getAllJobs, createJob, deleteJob, updateJob, getJob } = require('../Controllers/jobs');

const route = express.Router();

route.route('/').get(getAllJobs).post(createJob);
route.route('/:id').get(getJob).delete(deleteJob).patch(updateJob);

module.exports = route;