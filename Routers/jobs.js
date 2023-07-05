const express = require('express');
const { getAllJobs, createJob, deleteJob, updateJob } = require('../Controllers/jobs');

const route = express.Router();

route.route('/').get(getAllJobs).post(createJob);
route.route('/:id').delete(deleteJob).patch(updateJob);

module.exports = route;