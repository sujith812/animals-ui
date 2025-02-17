require('dotenv').config()
const Horses = require('../services/horses')
const horses = new Horses(process.env.API_URL)

exports.all = function (req, res) {
  horses.all().then((data) => {
    res.render('horses', { horses: data })
  })
}

exports.addPage = function (req, res) {
  res.render('add-horse')
}

exports.add = function (req, res) {
  horses.create(req.body).then(() => {
    res.redirect('/horses')
  })
}

exports.get = function (req, res) {
  horses.get(req.params.id).then((data) => {
    res.render('view-horse', { horse: data })
  })
}

exports.delete = function (req, res) {
  horses.delete(req.params.id).then(() => {
    res.redirect('/horses')
  })
}

exports.edit = function (req, res) {
  horses.get(req.params.id).then((data) => {
    res.render('edit-horse', { horse: data })
  })
}

exports.update = function (req, res) {
  horses.update(req.params.id, req.body).then(() => {
    res.redirect('/horses')
  })
}

