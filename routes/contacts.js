const express = require('express');
const router = express.Router();
const Contacts = require('../models/Contacts');

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
        const single_contact = await Contacts.findById(req.params.contact_id);
        res.json({ success: true, data: single_contact })
    } catch (error) {
        res.json({ success: false, message: error })
    }
})

// Create a new Contact
router.post('/', async (req, res) => {
    const contact = Contacts({
        name: req.body.name,
        email: req.body.email
    });

    try {
        const new_contact = await contact.save();
        res.status(201).json({ success: true, data: new_contact });
    } catch (error) {
        res.json({ success: false, message: error });
    }

})

// Update a Contact
router.put('/:contact_id', async (req, res) => {
    try {
        const update_contact = await Contacts.updateOne(
            { _id: req.params.contact_id },
            {
                $set: {
                    name: req.body.name,
                    email: req.body.email
                }
            }
        );
        res.json({ success: true, data: update_contact });
    } catch (error) {
        res.json({ success: false, message: error })
    }
})

// Delete a Contact
router.delete('/:contact_id', async (req, res) => {
    try {
        const deleted_contact = await Contacts.deleteOne({ _id: { $eq: req.params.contact_id } })
        res.json({ success: true, data: deleted_contact })
    } catch (error) {
        res.json({ success: false, message: error })
    }
})

module.exports = router;