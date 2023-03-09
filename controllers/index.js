class Controller {
    static home(req, res) {
        res.send("home");
    }

    static loginForm(req, res) {
        res.send("loginForm");
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