import expressAsyncHandler from "express-async-handler";
import Team from "../Schema/TeamSchema.js";

const allTeams = expressAsyncHandler(async (req, res) => {
    try {
        const name = req.query.name;
        let teams = null;

        if (name) {
            users = await Team.find({ $or: [{ first_name: { $regex: name, $options: 'i' } }, { last_name: { $regex: name, $options: 'i' } }] });
        } else {
            teams = await Team.find();
        }
        res.json(teams);
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

const searchTeams = expressAsyncHandler(async (req, res) => {
    const {id} = req.params;
    try {
        if (!isNaN(id)){ 
            const customId = parseInt(id);
            console.log(customId);
            const team = await Team.findOne({ id: customId });
            if (!team) {
                return res.status(404).json({ message: 'Team not found' });
            }
            res.json(team);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

const addTeam = expressAsyncHandler(async (req, res) => {
    try {
        const {id, name, members} = req.body;
        const existingTeam = await Team.findOne({ id });
        if (existingTeam) {
            console.log(`Team with ID ${id} already exists in the database`);
            return res.status(400).json({ message: `Team with ID ${id} already exists` });
        }
        const newTeam = new Team({
            id,
            name,
            members
          });
          const savedTeam = await newTeam.save();
        res.status(201).json(req.body);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export {allTeams, searchTeams, addTeam};