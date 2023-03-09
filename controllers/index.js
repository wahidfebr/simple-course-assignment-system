const {User} = require("../models");
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

                if (user.role === "Teacher") res.redirect("/teacher");
                if (user.role === "Student") res.redirect("/student");
            })
            .catch(err => res.send(err))
    }

    static registerForm(req, res) {
        res.send("registerForm");
    }

    static student(req, res) {
        res.send("student");
    }

    static teacher(req, res) {
        res.send("teacher");
    }
}

module.exports = Controller;