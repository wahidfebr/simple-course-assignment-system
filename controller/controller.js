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
        const userTeacher = Teacher.findOne({ where : {email : req.body.email }});
        const userStudent = Student.findOne({ where : {email : req.body.email }});
        if(user){
            const password_valid = bcrypt.compare(req.body.password,user.password);
            if(password_valid){
                token = jwt.sign({ "id" : user.id,"email" : user.email,"first_name":user.first_name },process.env.SECRET);
                res.status(200).json({ token : token });
            } else {
              res.status(400).json({ error : "Password Incorrect" });
            }
          
          }else{
            res.status(404).json({ error : "User does not exist" });
          }
    }
}


module.exports = Controller