const {Teacher, Student} = require('../models')


class Controller{
    static home(req, res){
        res.render('index.ejs')
    }
    static getAllStudent(){
        Student.findAll({order: [['id', 'ASC']]})
        .then(data => {
            let pesan = req.query.pesan
            let id = req.params.id
            res.render("students.ejs", {data, pesan, id})
        })
        .catch(err => {
            res.send(err)
        })
    }

    static getAllTeacher(req, res){
        Teacher.findAll({order: [['id', 'ASC']]})
        .then(data => {
            let pesan = req.query.pesan
            let id = req.params.id
            res.render("teachers.ejs", {data, pesan, id})
        })
        .catch(err => {
            res.send(err)
        })
    }

    static formLogin(req, res){
        
    }
}


module.exports = Controller