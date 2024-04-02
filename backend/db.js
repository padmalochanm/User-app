import mongoose from "mongoose";
import chalk from "chalk";
import fs from "fs";

const connectDB = async () => {
    try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(chalk.cyan.underline(`MongoDB Connected: ${conn.connection.host}`));
  } catch (error) {
    console.error(chalk.red.underline.bold(`Error: ${error.message}`));
    process.exit(1);
  }
}

const insertRecords = async (Model, data) => {
    try {
        const existingData = await Model.find();

        if (existingData.length === 0) {
            await Model.insertMany(data);
            console.log('Data inserted successfully.');
        } else {
            console.log('Data already exists in the database. Skipping insertion.');
        }
    } catch (error) {
        console.error(chalk.red.bold(`Error inserting records: ${error.message}`));
    }
}

const readJSONFile = (filePath) => {
    try {
        const jsonData = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(jsonData);
    } catch (error) {
        console.error(chalk.red.bold(`Error reading JSON file: ${error.message}`));
        return [];
    }
}


export {connectDB, insertRecords, readJSONFile};