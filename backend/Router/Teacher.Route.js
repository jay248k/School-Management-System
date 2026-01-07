import express from 'express';
import { TeacherDelete, TeacherLogin, TeacherRegistration, TeacherUpdate } from '../Controller/Teacher.Controller.js';

const TeacherRouter=express.Router();

TeacherRouter.post('/register',TeacherRegistration)
TeacherRouter.post('/login',TeacherLogin)
TeacherRouter.put('/:id/update',TeacherUpdate)
TeacherRouter.delete('/:id/delete',TeacherDelete)

export default TeacherRouter;