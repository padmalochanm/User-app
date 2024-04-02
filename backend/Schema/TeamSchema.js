import mongoose from "mongoose";
import User from "./UserSchema.js";

const TeamSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true, unique: true, trim: true },   
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
});

const Team = mongoose.model('Team', TeamSchema);

export default Team;
