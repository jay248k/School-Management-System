import express from 'express';
import { FeesApplication, FeesStructure } from '../Controller/Fees.Controller.js';

const FeesRouter=express.Router();

FeesRouter.post('/fees-structure',FeesStructure)
FeesRouter.post('/fees-application',FeesApplication);

export default FeesRouter;