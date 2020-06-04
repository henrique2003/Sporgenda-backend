"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    location: {
        type: String,
        required: true,
        trim: true
    },
    month: {
        type: String,
        required: true,
        trim: true
    },
    day: {
        type: Number,
        required: true
    },
    time: {
        type: String,
        required: true,
        trim: true
    },
    limit: {
        type: Number,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    users: [{
            name: {
                type: String,
                trim: true
            },
            wordKey: {
                type: String,
                trim: true
            }
        }]
}, {
    timestamps: true
});
exports.default = mongoose_1.model('Schedule', UserSchema);
