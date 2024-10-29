import { application } from "express";
import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
      required : true,
  },
  requiremensts: [{
    type: String,
    required: true,
  }],
  salary: {
    type: Number,
    required: true,
  },
  experienceLevel: {
    type: Number,
    required: true,
  },
  location: {
        type: String,
        required: true,
    },
  jobType: {
        type: String,
        required: true,
    },
  postion: {
        type: String,
        required: true,

    },
  totalApplicants: {
        type: Number,
        default: 0,
    },
   company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: true,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    application: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Application",
    }]
},{timestamps: true});

const Job = mongoose.model("Job", jobSchema);
export default Job;

