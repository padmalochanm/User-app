import express from 'express';
import { config } from 'dotenv';
import {connectDB, insertRecords, readJSONFile} from './db.js';
import User from './Schema/UserSchema.js';
import userRoutes from './Routes/userRoutes.js';
import teamRoutes from './Routes/teamRoutes.js';

config();
connectDB();
const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const data = readJSONFile('backend/data.json');
insertRecords(User, data);

app.use('/api/users', userRoutes);
app.use('/api/teams', teamRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

