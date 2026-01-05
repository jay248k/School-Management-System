import express from 'express';
import { AdminLogin } from '../Controller/Admin.Controller.js';

const AdminRouter=express.Router();

AdminRouter.post('/login',AdminLogin);

export default AdminRouter;