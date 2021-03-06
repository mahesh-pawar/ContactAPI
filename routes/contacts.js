const express = require('express');
const { Mongoose } = require('mongoose');
const router = express.Router();
const Contacts = require('../models/Contacts');
const { contactValidation } = require('../validation');

// List Contacts
router.get('/', async (req, res) => {
    try {
        const contacts = await Contacts.find();
        res.json({ success: true, data: contacts })
    } catch (error) {
        res.json({ success: false, message: error })
    }
})

// Get Contact by ID
router.get('/:contact_id', async (req, res) => {
    try {
        const singleContact = await Contacts.findById(req.params.contact_id);
        res.json({ success: true, data: singleContact })
    } catch (error) {
        res.json({ success: false, message: error })
    }
})

// Create a new Contact
router.post('/', async (req, res) => {

    const { error } = contactValidation(req.body);
    if (error) {
        return res.status(400).json({ success: false, message: error.details[0].message });
    }

    // Check contact email already exist.
    const emailExist = await Contacts.findOne({ email: req.body.email })
    if (emailExist) {
        return res.status(400).json({ success: false, message: 'Email already exist.' });
    }

    const contact = Contacts({
        name: req.body.name,
        email: req.body.email
    });

    try {
        const newContact = await contact.save();
        res.status(201).json({ success: true, data: newContact });
    } catch (error) {
        res.json({ success: false, message: error });
    }

})

// Update a Contact
router.put('/:contact_id', async (req, res) => {

    const { error } = contactValidation(req.body);
    if (error) {
        return res.status(400).json({ success: false, message: error.details[0].message });
    }

    try {
        await Contacts.updateOne(
            { _id: req.params.contact_id },
            {
                $set: {
                    name: req.body.name,
                    email: req.body.email
                }
            }
        );

        const singleContact = await Contacts.findById(req.params.contact_id);
        res.json({ success: true, data: singleContact })
    } catch (error) {
        res.json({ success: false, message: error })
    }
})

// Delete a Contact
router.delete('/:contact_id', async (req, res) => {

    // Check whehter contact id is exist or not.
    const contactExist = await Contacts.findOne({ _id: req.params.contact_id })
    if (!contactExist) {
        return res.status(400).json({ success: false, message: 'Bad request.' });
    }

    try {
        const deletedContact = await Contacts.deleteOne({ _id: { $eq: req.params.contact_id } })
        res.json({ success: true, data: 'Contact is deleted' })
    } catch (error) {
        res.json({ success: false, message: error })
    }
})

module.exports = router;