const mongoose = require("mongoose");


const messageSchema = new mongoose.Schema({
    role: {
        type: String,
        enum: ["user", "ai"],
        require: true
    },


    content: {
        type: String,
        require: true,
    }



}, { timestamps: true })





const websiteSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    title: {
        type: String,
        default: "Untitled Website"
    },

    latestCode: {
        type: String,
        require: true,
    },
    conversation: {
        type: [messageSchema],
        default: [],
    },

    deployed: { type: Boolean, default: false },

    deploymentUrl: { type: String },
    slug: {
        type: String,
        unique: true,
        sparse: true,

    }





} , {timestamps: true})

const Website = mongoose.model("Website", websiteSchema);

module.exports = Website;