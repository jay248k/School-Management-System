import express from 'express';
import { TeacherDelete, TeacherLogin, TeacherRegistration, TeacherUpdate } from '../Controller/Teacher.Controller.js';
import isAuthenticated from '../middleware/isAutheticated.js';
import isAdmin from '../middleware/isAdmin.js';

const TeacherRouter = express.Router();

TeacherRouter.post('/register', isAuthenticated, isAdmin, TeacherRegistration)
TeacherRouter.post('/login', TeacherLogin)
TeacherRouter.put('/:id/update', isAuthenticated, isAdmin, TeacherUpdate)
TeacherRouter.delete('/:id/delete', isAuthenticated, isAdmin, TeacherDelete)

export default TeacherRouter;