const express = require('express');
const { Mongoose } = require('mongoose');
const router = express.Router();
const Users = require('../models/Users');
const { userValidation } = require('../validation');

// User Registration.
router.post('/registration', async (req, res) => {

    const { error } = userValidation(req.body);
    if (error) {
        return res.status(400).json({ success: false, message: error.details[0].message });
    }

    const userExist = await Users.findOne({ email: req.body.email });
    if (userExist) {
        return res.status(400).json({ success: false, message: 'Email already exist.' })
    }

    const newUser = Users({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });

    try {
        const { name, email } = await newUser.save();
        res.status(201).json({ success: true, data: { name, email } })
    } catch (error) {
        res.json({ success: false, message: error })
    }
});

module.exports = router;