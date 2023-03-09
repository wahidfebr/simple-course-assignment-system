class Controller {
    static home(req, res) {
        res.render("index");
    }

    static loginForm(req, res) {
        res.render("login-form");
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