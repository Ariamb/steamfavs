const express = require('express')
const app = express()


const controller = require('./../controllers/controller')
//const favController = require('./../controllers/favController.js')

app.get('/', (req, res) => controller.getAll(req, res))
app.get('/:id', (req, res) => controller.getById(req, res))

app.get('/favorite/', (req, res) => favController.getAll(req, res))
app.post('/favorite/', (req, res) => favController.create(req, res))
app.delete('/favorite/:appid', (req, res) => favController.delete(req, res))

module.exports = app

