const {User, Profile, Category, Course, StudentCourse} = require("../models");
const {bcrypt} = require("../helpers");
class Controller {
    static home(req, res) {
        res.render("index");
    }

    static loginForm(req, res) {
        res.render("login-form");
    }

    static verifyUser(req, res) {
        const {email, password, saveSession} = req.body;
        User.findOne({where: {email}})
            .then(user => {
                if (!user) throw "User not found";
                if (!bcrypt.compareSync(password, user.password)) {
                    throw "Wrong password"
                }

                req.session.UserId = user.id;
                req.session.role = user.role;

                if (user.role === "Teacher") res.redirect("/teacher");
                if (user.role === "Student") res.redirect("/student");
            })
            .catch(err => res.send(err))
    }

    static registerForm(req, res) {
        res.render("register-form");
    }

    static createUser(req, res) {
        const {email, password, role, fullName, gender, phone} = req.body;

        User.create({email, password, role})
            .then((user) => {
                return Profile.create({fullName, gender, phone, UserId: user.id});
            })
            .then(() => {
                res.redirect("/login");
            })
            .catch((err) => {
                res.send(err);
            })
    }

    static student(req, res) {
        const id = req.session.UserId;
        User.findByPk(id, {
            include: "StudentCourses"
        })
            .then(student => {
                res.render("student", {student});
            })
            .catch((err) => {
                res.send(err);
            })

    }

    static teacher(req, res) {
        const id = req.session.UserId;
        User.findByPk(id, {
            include: ["TeacherCourses", "StudentCourses"]
        })
            .then(teacher => {
                // res.send(teacher)
                res.render("teacher", {teacher});
                // return StudentCourse.findAll({where: {CourseId: teacher.TeacherCourses.id}})
            })
            .catch((err) => {
                res.send(err);
            })
    }

    static logout(req, res) {
        res.redirect("/");
    }
}

module.exports = Controller;