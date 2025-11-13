const express = require('express')
const { createNotes, getAllNotes, updateNotes, deleteNotes } = require('../controllers/notesCtrl')

const noteRoutes = express.Router()

noteRoutes.post('/createNote', createNotes)
noteRoutes.get('/getNotes', getAllNotes)
noteRoutes.put('/updateNote/:id', updateNotes)
noteRoutes.delete('/deleteNote/:id', deleteNotes)

module.exports = noteRoutes