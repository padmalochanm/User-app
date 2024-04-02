import expressAsyncHandler from "express-async-handler";
import User from "../Schema/UserSchema.js";

const allUsers = expressAsyncHandler(async (req, res) => {
    try {
        const name = req.query.name;
        const uniqueGenders = await User.distinct("gender");
        const uniqueDomains = await User.distinct("domain");
        const filterQuery = {};
        let users = null;

        if (name) {
            users = await User.find({ $or: [{ first_name: { $regex: name, $options: 'i' } }, { last_name: { $regex: name, $options: 'i' } }] });
        } else {
            const filter = req.query || {};  
            if (filter.gender) {
                const genders = filter.gender.split(",");
                filterQuery.gender = { $in: genders };
            }
            if (filter.domain) {
                const domains = filter.domain.split(",");
                filterQuery.domain = { $in: domains };
            }
            if (filter.available !== undefined) {
                filterQuery.available = filter.available === 'true';
            }
            console.log(filterQuery);
            users = await User.find(filterQuery);
        }

        const page = parseInt(req.query.page) || 1;
        const limit = 20;
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const results = {};

        if (endIndex < users.length) {
            results.next = {
                page: page + 1,
            }
        }
        if (startIndex > 0) {
            results.previous = {
                page: page - 1,
            }
        }

        // Slice the users based on pagination limits
        results.results = users.slice(startIndex, endIndex);
        results.all = users;
        results.uniqueGenders = uniqueGenders;
        results.uniqueDomains = uniqueDomains;

        res.json(results);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

const searchUsers = expressAsyncHandler(async (req, res) => {
    const {id} = req.params;
    try {
        if (!isNaN(id)){ 
            const customId = parseInt(id);
            console.log(customId);
            const user = await User.findOne({ id: customId });
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json(user);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

const addUser = expressAsyncHandler(async (req, res) => {
    try {
        const {id, first_name, last_name, email, gender, domain, avatar, available} = req.body;
        const existingUser = await User.findOne({ id });
        if (existingUser) {
            console.log(`User with ID ${id} already exists in the database`);
            return res.status(400).json({ message: `User with ID ${id} already exists` });
        }
        const newUser = new User({
            id,
            first_name,
            last_name,
            email,
            gender,
            domain,
            avatar,
            available
          });
          const savedUser = await newUser.save();
        res.status(201).json(req.body);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

const deleteUser = expressAsyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findOneAndDelete({ id });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

const updateUser = expressAsyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findOneAndUpdate({ id }, req.body, { new: true });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export {allUsers, searchUsers, addUser, deleteUser, updateUser};