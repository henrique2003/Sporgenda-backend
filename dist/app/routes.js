"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ScheduleController_1 = __importDefault(require("./controllers/ScheduleController"));
const { index, store, registerPeople, show } = ScheduleController_1.default;
const routes = express_1.Router();
routes.post('/agenda', store);
routes.get('/agenda', index);
routes.get('/agenda/:id', show);
routes.put('/agenda/:id', registerPeople);
exports.default = routes;
