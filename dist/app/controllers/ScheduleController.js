"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Schedule_1 = __importDefault(require("../models/Schedule"));
class ScheduleController {
    async index(req, res) {
        try {
            const schedule = await Schedule_1.default.find({});
            return res.status(200).json(schedule);
        }
        catch (error) {
            return res.status(500).json('Server Error');
        }
    }
    async store(req, res) {
        try {
            const { day, month, time, limit, location } = req.body;
            const fields = ['day', 'month', 'time', 'limit', 'location'];
            for (const field of fields) {
                if (typeof req.body[field] === 'string') {
                    req.body[field] = req.body[field].trim();
                }
            }
            if (!day || !time || !limit || !month || !location) {
                return res.status(400).json('Campo em branco');
            }
            if (parseInt(day) < 1 || parseInt(day) > 31) {
                return res.status(400).json('Dia inválido');
            }
            const schedule = await Schedule_1.default.create(req.body);
            return res.status(200).json(schedule);
        }
        catch (error) {
            console.log(error.message);
            return res.status(500).json('Server Error');
        }
    }
    async registerPeople(req, res) {
        try {
            const { body, params } = req;
            const { name, wordKey } = body;
            const { id } = params;
            if (!name && !wordKey) {
                return res.status(400).json('Campo em branco');
            }
            const lastSchedule = await Schedule_1.default.findById(id);
            const { users, limit } = lastSchedule;
            if (!(users.length <= limit)) {
                return res.status(400).json('Sem vagas neste período');
            }
            if (users.length + 1 >= limit) {
                lastSchedule.completed = true;
            }
            lastSchedule.users.push(body);
            const schedule = await Schedule_1.default.findByIdAndUpdate({
                _id: id
            }, {
                $set: lastSchedule
            }, {
                upsert: true
            });
            return res.status(200).json(schedule);
        }
        catch (error) {
            console.log(error.message);
            return res.status(500).json('Server Error');
        }
    }
}
exports.default = new ScheduleController();
