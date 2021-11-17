const express = require("express");
const router = express.Router();
const db = require("../services/db");

const bcrypt = require("bcrypt");
const saltRounds = 10

const redirectLogin = (req, res, next) => {
    if (!req.session.id){
        res.redirect("/users/login")
    }else{
        next()
    }
}

const redirectDashboard = (req, res, next) => {
    if (req.session.id){
        res.redirect("/dashboard/getdata/active_trading_pairs")
    }else{
        next()
    }
}

//login
router.post("/login", (req, res) => {
    
    const email = req.body.email;
    const password = req.body.password;

    let sql = `SELECT * FROM users WHERE email = ?;`;
    let query = db.query(sql, [email], (err, result) => {
        if (err) throw err
        if (result.length > 0){
            bcrypt.compare(password, result[0].password, (err, response) => {
                if(response){
                    req.session.authenticated = true;
                    req.session.user = {
                        email
                    }
                    res.json(req.session)
                    console.log("login successful")
                    console.log(req.session.id)
                }
                else{
                    res.json({error: {message: "Wrong username/password combination!"}})
                }
            })
        }
        else{
            res.json({error: {message: "User doesn't exist"}})
        }
    })
})

//register
router.post("/register", redirectDashboard, (req, res) => {

    const email = req.body.email;
    const password = req.body.password;

    bcrypt.hash(password, saltRounds, (err, hash) => {

        if (err) throw err;

        let sql = `INSERT INTO users (email, password) VALUE (?,?)`;
        let query = db.query(sql, [email, hash], (err, result) => {
            if (err) throw err;
            console.log('Registered...');
        })
    })
})

router.post("/logout", redirectLogin, (req, res) => {

    req.session.destroy(err => {
        if(err){
            console.log(err)
        }
        else{
            res.clearCookie("id")
            console.log("logout successful...")
        }
    })
})

module.exports = router;