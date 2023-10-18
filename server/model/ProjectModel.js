const mongoose = require('mongoose');
const { Schema } = mongoose;

const projectScheme = new Schema(
    {
        id: Number,
        userId: Number,

        title: String,
        description: String,
        budget: Number,
        status: String,
    },
    { versionKey: false }
);

const Project = mongoose.model('Project', projectScheme);

module.exports = Project;
