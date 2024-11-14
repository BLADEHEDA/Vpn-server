import { Server } from "../models/servers.model.js";  // Assuming the correct model is "Server"

export const getAllServers = async (req, res) => {
    try {
        const servers = await Server.find({}); // Fetch all servers
        res.status(200).json(servers);    
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const addServers = async (req, res) => {    
    try {
        // Check if the request body is an array
        const servers = Array.isArray(req.body) ? req.body : [req.body];
        const addedServers = await Server.insertMany(servers); // Insert servers
        res.status(200).json(addedServers);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getSpecificServer = async (req, res) => { 
    try {
        const { id } = req.params;
        const server = await Server.findById(id); // Find server by ID
        if (!server) {
            return res.status(404).json(`Cannot find server with id ${id} in the database`);
        }
        res.status(200).json(server);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const deleteServer = async (req, res) => {  
    try {
        const { id } = req.params;
        const server = await Server.findByIdAndDelete(id); // Delete server by ID
        if (!server) {
            return res.status(404).json(`Cannot find server with id ${id} in the database`);
        }
        res.status(200).json(server);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const editServer = async (req, res) => {
    try {
        const { id } = req.params;
        const server = await Server.findByIdAndUpdate(id, req.body, { new: true }); // Update server by ID
        if (!server) {
            return res.status(404).json(`Cannot find server with id ${id} in the database`);
        }
        res.status(200).json(server);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
