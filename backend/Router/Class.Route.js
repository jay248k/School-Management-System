import express from 'express';
import { fetchclass } from '../Controller/Classes.Controller.js';

const ClassRoute=express.Router();

ClassRoute.post('/fetch-student',fetchclass)

export default ClassRoute;