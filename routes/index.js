const Controller = require("../controllers");
const router = require("express").Router();

const routerLogin = require("./login");
const routerLogout = require("./logout");
const routerRegister = require("./register");
const routerStudent = require("./student");
const routerTeacher = require("./teacher");

const isLogin = (req, res, next) => {
    if (!req.session.UserId) {
        res.redirect("/login");
    } else {
        next();
    }
}

const isStudent = (req, res, next) => {
    if (req.session.role !== "Student") {
        res.send("unauthorized access");
    } else {
        next();
    }
}

const isTeacher = (req, res, next) => {
    if (req.session.role !== "Teacher") {
        res.send("unauthorized access");
    } else {
        next();
    }
}

router.get("/", Controller.home);

router.use("/login", routerLogin);
router.use("/logout", routerLogout);
router.use("/register", routerRegister);
router.use("/student", isLogin, isStudent, routerStudent);
router.use("/teacher", isLogin, isTeacher, routerTeacher);

module.exports = router;