import jobsModel from "../models/jobsModel.js";
import mongoose from "mongoose";
import moment from 'moment';

export const createJobController = async (req, res, next) => {
    const { company, position } = req.body;

    if (!company || !position) {
        next("Please provide all fields");
    }

    req.body.createdBy = req.user.userId;
    const job = await jobsModel.create(req.body);
    res.status(201).json({ job });
};

export const getAllJobsController = async (req, res, next) => {
    const { status, workType, search, sort } = req.query

    // condition
    const queryObject = {
        createdBy: req.user.userId
    }
    // logic for query
    if (status && status !== 'all') {
        queryObject.status = status
    }
    if (workType && workType !== 'all') {
        queryObject.workType = workType
    }
    if (search) {
        queryObject.position = { $regex: search, $options: "i" };
    }
    let queryResult = jobsModel.find(queryObject);

    // sorting 
    if (sort === 'latest') {
        queryResult = queryResult.sort('-createdAt');
    }
    if (sort === 'oldest') {
        queryResult = queryResult.sort('createdAt');
    }
    if (sort === 'a-z') {
        queryResult = queryResult.sort('position');
    }

    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const skip = (page - 1) * limit;

    queryResult = queryResult.skip(skip).limit(limit)
    //job count
    const totalJobs = await jobsModel.countDocuments(queryResult)
    const numOfPage = Math.ceil(totalJobs / limit);

    const jobs = await queryResult;
    // const jobs = await jobsModel.find({ createdBy: req.user.userId });
    res.status(200).json({
        totalJobs,
        jobs,
        numOfPage,
    });
    console.log(req.user);
};

// update job
export const updateJobController = async (req, res, next) => {
    const { id } = req.params;
    const { company, position } = req.body;

    if (!company || !position) {
        next("Please Provide All Fields");
    }

    const job = await jobsModel.findOne({ _id: id });

    if (!job) {
        next(`No jobs found with this id ${id} `);
    }

    if (!req.user.userId === job.createdBy.toString()) {
        next("You Not Authorized to update this job");
        return;
    }

    const updateJob = await jobsModel.findOneAndUpdate({ _id: id }, req.body, {
        new: true,
        runValidators: true,
    });
    res.status(200).json({ updateJob });
};

// delete job
export const deleteJobController = async (req, res, next) => {
    const { id } = req.params;
    const job = await jobsModel.findOne({ _id: id });
    if (!job) {
        next(`No Job Found With this Id ${id}`);
    }
    if (req.user.userId !== job.createdBy.toString()) {
        return next("Your Not Authorize to delete this job");
    }

    await job.deleteOne();
    res.status(200).json({ message: "Success, job Deleted" });
};

//  jobs stats & filter
export const jobsStatsController = async (req, res) => {
    const stats = await jobsModel.aggregate([
        {
            $match: {
                createdBy: new mongoose.Types.ObjectId(req.user.userId),
            },
        },
        {
            $group: {
                _id: '$status', count: { $sum: 1 },
            }
        }
    ]);
    // default stats
    const defaultStats = {
        pending: stats.pending || 0,
        reject: stats.reject || 0,
        interview: stats.interview || 0
    }

    // monthly yearly stats
    let monthlyApplication = await jobsModel.aggregate([
        {
            $match: {
                createdBy: new mongoose.Types.ObjectId(req.user.userId)
            }
        },
        {
            $group: {
                _id: {
                    year: { $year: '$createdAt' },
                    month: { $month: '$createdAt' }
                },
                count: {
                    $sum: 1,
                },
            },
        },
    ]);

    monthlyApplication = monthlyApplication.map(item => {
        const { _id: { year, month }, count } = item;
        const date = moment().month(month - 1).year(year).format('MMM Y');
        return { date, count };
    }).reverse();

    res.status(200).json({ totalJobs: stats.length, stats, defaultStats, monthlyApplication });
};