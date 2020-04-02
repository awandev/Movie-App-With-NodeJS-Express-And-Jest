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



// get router start here
router.get('/employee/new', (req, res) => {
    res.render('new');
})

router.get('/employee/search', (req,res) => {
    res.render('search',{employee:""});
})

router.get('/employee', (req, res) => {
    console.log('search result')
    let searchQuery = {name : req.query.name};
    Employee.findOne(searchQuery)
        .then(employee => {
            res.render('search', {employee : employee});
        })
        .catch(err => {
            console.log(err);
        })
})

// get router end here


// POST router starts here
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