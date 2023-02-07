const express = require('express')
const app = express()
const mysql = require('mysql')
const cors = require('cors')

app.use(cors())
app.use(express.json())


var pool = mysql.createPool({

    host: "**.**.***.***",
    user: "username",
    password: "password",
    database: "databasename",

});

pool.getConnection(function (err, connection) {
    // connected! (unless `err` is set)
});

app.get('/', (req, res) => {
    res.send("hello sena")
})

app.post("/create", (req, res) => {
    const cariadi = req.body.cariadi;
    const vno = req.body.vno;
    const vergidairesi = req.body.vergidairesi;
    const adres = req.body.adres;
    const telefon = req.body.telefon;
    const sehir = req.body.sehir;
    pool.query(
        "INSERT INTO musteri(cariadi,vno,vergidairesi,adres,telefon,sehir) VALUES(?,?,?,?,?,?)", [cariadi, vno, vergidairesi, adres, telefon, sehir], (err, result) => {
            if (err) {
                console.log(err)

            } else {
                res.send("Values Inserted")
            }
        }
    )
})

app.get('/all', (req, res) => {
    pool.query('SELECT * from musteri', (err, rows) => {
        if (err) {
            console.log(err)
        } else {
            res.send(rows)
        }
    });
})

app.delete("/delete/:id", (req, res) => {
    const id = req.params.id;
    pool.query("DELETE FROM musteri WHERE id=?", id, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result)
        }
    })
})

app.put("/update", (req, res) => {
    const id = req.body.id;
    const cariadi = req.body.cariadi;
    const vno = req.body.vno;
    const vergidairesi = req.body.vergidairesi;
    const adres = req.body.adres;
    const telefon = req.body.telefon;
    const sehir = req.body.sehir

    pool.query(
        "UPDATE musteri SET cariadi = ?, vno = ?,vergidairesi = ?, adres = ?, telefon = ?,sehir = ? WHERE id = ?",
        [cariadi, vno, vergidairesi, adres, telefon, sehir, id],
        (err, rows) => {
            if (err) {
                console.log(err)
            } else {
                res.send(rows)
            }
        }
    )
})

app.listen(8080, () => {
    console.log("your server is runnning on port 8080")
})
