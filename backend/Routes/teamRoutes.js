import express from 'express';
import {allTeams, searchTeams, addTeam} from '../Controllers/TeamControllers.js';

const router = express.Router();

router.get('/', allTeams);
router.get('/:id', searchTeams);
router.post('/', addTeam);


export default router;
