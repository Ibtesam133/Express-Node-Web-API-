const express = require('express');
const SQL = require('mssql');
const app = express();
const corss = require('cors');
const BodyParser = require('body-parser');
app.use(BodyParser.json()); // support json encoded bodies
let URLdecoder = BodyParser.urlencoded({ extended: true })
app.use(corss());

const config = {
    user: 'sa',
    password: 'admin123',
    server: '192.168.0.117', // You can use 'localhost\\instance' to connect to named instance
    database: 'TAXDB',
    options: {
        encrypt: true // Use this if you're on Windows Azure
    }
}
let course = [
    { id: 1, Name: "C language" },
    { id: 2, Name: "C++ language" },
    { id: 3, Name: "C-- language" },
    { id: 4, Name: "C00 language" },
]

app.get('/', (req, res) => {
    res.send('Hello World');
});

// Connection with SQL Server
let QUERY = "select * from tblCustomer"
let Conn = new SQL.ConnectionPool(config);
var request = new SQL.Request();

Conn.connect(err => {
    if (err) {
        return err;
    }
})
console.log(Conn);

// Insert Data Using Get
app.get('/InsertData', (req, res) => {
    console.log(req.query);
    const username = req.query.username;
    const pass = req.query.pass;
    const INSERT_QUERY = `insert into tblCustomer (UserName , Password) values ('${username}', '${pass}')`;
    Conn.query(INSERT_QUERY, (err, rec) => {
        if (err) {
            return res.send(err);
        } else {
            return res.send('Successfull');
        }
    });
})

// Get Data Using Get
app.get('/Getdata', (req, res) => {
    Conn.query(QUERY, (err, rec) => {
        if (err) {
            return res.send(err);
        } else {
            return res.json({
                data: rec
            })
        }
    })
});

// Where Data Using Get
app.get('/Getdata/:CusID', (req, res) => {
    console.log(req.params.CusID);
    Conn.query(`select * from tblCustomer where CustomerID = ${req.params.CusID}`, (err, rec) => {
        if (err) {
            return res.send(err);
        } else {
            return res.json({
                data: rec
            })
        }
    })
});

// Delete Data Using Get
app.get('/DataDelete/:CustomerID', (req, res) => {
    console.log(req.params.CustomerID);
    Conn.query(`delete from tblCustomer where CustomerID = ${req.params.CustomerID}`, (err, rec) => {
        if (err) {
            return res.send(err);
        } else {
            return res.send('Delete Successfully');
        }
    })
})

// Insert Data through POST
app.post('/SKpost',  function(req, res) {
    var user_name = req.body.id;
    var pass = req.body.token;
    const INSERT_QUERY = `insert into tblCustomer (UserName , Password) values ('${user_name}', '${pass}')`;
    Conn.query(INSERT_QUERY, (err, rec) => {
        if (err) {
            return res.send(err);
        } else {
            return res.send('Successfull');
        }
    });

});

// app.listen(1922, () => {
//     console.log('Port 1922 ');
// });
