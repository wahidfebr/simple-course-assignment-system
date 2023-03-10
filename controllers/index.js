const {User, Profile, Category, Course, StudentCourse} = require("../models");
const {bcrypt, formatDate} = require("../helpers");
const {Op} = require("sequelize");
class Controller {
    static home(req, res) {
        let isLogin = false;

        if (req.session.UserId) isLogin = true;

        Category.categories()
            .then(categories => {
                res.render("index", {isLogin, categories});
            })
            .catch(err => res.send(err))
    }

    static loginForm(req, res) {
        res.render("login-form");
    }

    static verifyUser(req, res) {
        const {email, password} = req.body;
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
                res.render("student", {student, isLogin: true});
            })
            .catch((err) => {
                res.send(err);
            })

    }

    static teacher(req, res) {
        const id = req.session.UserId;
        const {courseName} = req.query;

        // const options = {
        //     include: ["TeacherCourses", "StudentCourses", Profile],
        //     where: {role: "Teacher"}
        // }

        const options = {
            include: [
              { model: Course, as: "TeacherCourses", where: {}},
              { model: Course, as: "StudentCourses" },
              { model: Profile }
            ],
            where: { role: "Teacher" }
        };

        if (courseName) {
            options.include[0].where.name = {
                [Op.iLike]: `%${courseName}%`
            }
        }

        User.findByPk(id, options)
            .then(teacher => {
                // res.send(teacher)
                res.render("teacher", {teacher, isLogin: true, formatDate});
                // return StudentCourse.findAll({where: {CourseId: teacher.TeacherCourses.id}})
            })
            .catch((err) => {
                res.send(err);
            })
    }

    static logout(req, res) {
        req.session.destroy((err) => {
            // cannot access session here
            if (err) res.send(err)
            else res.redirect("/login");
        })
    }
}

module.exports = Controller;