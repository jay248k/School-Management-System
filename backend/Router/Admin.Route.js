import express from 'express';
import { AdminLogin } from '../Controller/Admin.Controller.js';
import isAdmin from '../Middleware/isAdmin.js';
import { RollnoCreater } from '../Controller/Student.Controller.js';

const AdminRouter=express.Router();

AdminRouter.post('/login',AdminLogin);
AdminRouter.post('/create-rollno',RollnoCreater);

export default AdminRouter;