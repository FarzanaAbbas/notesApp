const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  message: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    default: '#ffffff', 
  },
  category: {
    type: String,
    default: 'General', 
  },
  created: {
    type: Date,
    default: Date.now,
  },
  updated: {
    type: Date,
    default: Date.now,
  }
});


module.exports = mongoose.model('Note', noteSchema);



const Contact = require('../models/Contact');

// @desc    Get all contacts
// @route   GET /api/contacts
// @access  Public
const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

// @desc    Create a new contact
// @route   POST /api/contacts
// @access  Public
const createContact = async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    const newContact = new Contact({ name, email, phone });
    const savedContact = await newContact.save();
    res.status(201).json(savedContact);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create contact', error });
  }
};

// @desc    Update a contact
// @route   PUT /api/contacts/:id
// @access  Public
PUT /api/contacts/652f2a8b1c123abc456def00
req.params.id === "652f2a8b1c123abc456def00"
new: true tells Mongoose to return the updated document instead of the old one.

const updateContact = async (req, res) => {
  try {
    const updated = await Contact.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: 'Failed to update contact', error });
  }
};

// @desc    Delete a contact
// @route   DELETE /api/contacts/:id
// @access  Public
const deleteContact = async (req, res) => {
  try {
    const deleted = await Contact.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.json({ message: 'Contact deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Failed to delete contact', error });
  }
};

module.exports = {
  getAllContacts,
  createContact,
  updateContact,
  deleteContact,
};


const express = require('express');
const {
  getAllContacts,
  createContact,
  updateContact,
  deleteContact
} = require('../controllers/contactController');

const router = express.Router();

router.get('/', getAllContacts);
router.post('/', createContact);
router.put('/:id', updateContact);
router.delete('/:id', deleteContact);

module.exports = router;


const Note = require('../models/Note');

//  Create a new note
const createNote = async (req, res) => {
  try {
    const { title, message, color, category } = req.body;

    const newNote = new Note({
      title,
      message,
      color,
      category,
    });

    const savedNote = await newNote.save();
    res.status(201).json(savedNote);
  } catch (error) {
    res.status(500).json({ message: 'Error creating note', error });
  }
};

// Get all notes
const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find().sort({ updated: -1 }); // Latest first
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching notes', error });
  }
};

// Get a single note by ID
const getNoteById = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: 'Note not found' });
    res.json(note);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching note', error });
  }
};

// Update a note
const updateNote = async (req, res) => {
  try {

  const updatedNote = await Note.findByIdAndUpdate(
    req.params.id,  // which document to update
    req.body,       // what new data to update with
    { new: true }   // return the updated document instead of the old one
  );
    if (!updatedNote) {
      return res.status(404).json({ message: 'Note not found' });
    }

    res.json(updatedNote);
  } catch (error) {
    res.status(500).json({ message: 'Error updating note', error });
  }
};

// Delete a note
const deleteNote = async (req, res) => {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);
    if (!deletedNote) {
      return res.status(404).json({ message: 'Note not found' });
    }
    res.json({ message: 'Note deleted successfully', note: deletedNote });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting note', error });
  }
};

module.exports = {
  createNote,
  getAllNotes,
  getNoteById,
  updateNote,
  deleteNote
};
const express = require('express');
const {
  createNote,
  getAllNotes,
  getNoteById,
  updateNote,
  deleteNote
} = require('../controllers/noteController');

const router = express.Router();

router.get('/', getAllNotes);
router.post('/', createNote);
router.get('/:id', getNoteById);
router.put('/:id', updateNote);
router.delete('/:id', deleteNote);

module.exports = router;
