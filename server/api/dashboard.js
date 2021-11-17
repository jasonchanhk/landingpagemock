const express = require("express");
const router = express.Router();
const db = require("../services/db")

const redirectLogin = (req, res, next) => {
    if (!req.session.id){
        res.redirect("/users/login")
    }else{
        next()
    }
}

//Delete row
router.delete("/deletepair/:id", (req, res) => {
    let sql = `DELETE FROM active_trading_pairs WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if (err) throw err;
        console.log('Pair deleted...');
        res.send(result)
    })
})

//Update row
router.put("/updatepair/:id", (req, res) => {
    let sql = `UPDATE active_trading_pairs SET pair = '${req.body.pair}', 
    bought_volume = '${req.body.bought_volume}', 
    bought_amount = '${req.body.bought_amount}', 
    date = '${req.body.date}', 
    time = '${req.body.time}' 
    WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, results) => {
        if(err) throw err;
        console.log(`Active trading pair ${req.params.id} updated...`)
        res.send(results)
    })
})

//Insert row
router.post("/addpair", (req, res) => {
    let tradingPair = { 
        pair: req.body.pair, 
        bought_volume: req.body.bought_volume, 
        bought_amount: req.body.bought_amount, 
        date: req.body.date, 
        time: req.body.time
    };
    let sql = 'INSERT INTO active_trading_pairs SET ?';
    let query = db.query(sql, tradingPair, (err, results) => {
        if(err) throw err;
        console.log('Active trading pair added...')
        res.send(results)
    })
})

//Read table
router.get("/getdata/:name", redirectLogin, (req, res) => {
    let sql = `SELECT * FROM ${req.params.name} `;
    let query = db.query(sql, (err, results) => {
        if(err) throw err;
        console.log(`${req.params.name} fetched...`)
        res.send(results)
    })
})

//Read row
router.get("/getdata/:name/id/:id", (req, res) => {
    let sql = `SELECT * FROM ${req.params.name} WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, results) => {
        if(err) throw err;
        console.log(`${req.params.name} ${req.params.id} fetched...`)
        res.send(results)
    })
})

module.exports = router;
