import { getAllServers, addServers, getSpecificServer, deleteServer, editServer } from '../controllers/servers.controller.js';
import express from 'express';

const router = express.Router();

// Route to get all servers
router.get('/', getAllServers);
router.post('/', addServers);
router.get('/:id', getSpecificServer);
router.put('/:id', editServer);
router.delete('/:id', deleteServer);

export default router;
