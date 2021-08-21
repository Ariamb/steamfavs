const express = require('express')
const app = express()

app.use(express.json());

const controller = require('./../controllers/controller')
const favController = require('./../controllers/favController')

app.get('/favorite/', (req, res) => favController.getAllFavorites(req, res))
app.post('/favorite/', (req, res) => favController.create(req, res))
app.delete('/favorite/:appid', (req, res) => favController.delete(req, res))

app.get('/', (req, res) => controller.getAll(req, res))
app.get('/:id', (req, res) => controller.getById(req, res))

module.exports = app

//routes aren't numerous or complex enough to justify splitting into multiple files.