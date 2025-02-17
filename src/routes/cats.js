const express = require('express')
const router = new express.Router()
const cats = require('../controllers/cats')

router.get('/', cats.all)
router.get('/add', cats.addPage)
router.get('/:id', cats.get)
router.get('/delete/:id', cats.delete)
router.get('/edit/:id', cats.edit)
router.post('/', cats.add)
router.post('/update/:id', cats.update)

module.exports = router
