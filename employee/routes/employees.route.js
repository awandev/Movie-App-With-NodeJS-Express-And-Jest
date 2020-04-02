const express = require('express')
const router = express.Router()

const Employee = require('../models/employee.model')

router.get('/', (req, res) => {
    Employee.find({})
        .then(employees => {
            res.render('index', {employees : employees});
        })
        .catch(err => {
            console.log(err);
        })
})

router.get('/employee/new', (req, res) => {
    res.render('new');
})

router.post('/employee/new', (req, res) => {
    let newEmployee = {
        name : req.body.name,
        designation : req.body.designation,
        salary : req.body.salary
    }

    Employee.create(newEmployee)
        .then(employee => {
            // bila berhasil, kembali ke halaman root
            res.redirect('/');
        })
        .catch(err => {
            // bila gagal, tampilkan erorr di console
            console.log(err);
        })
})
module.exports = router;