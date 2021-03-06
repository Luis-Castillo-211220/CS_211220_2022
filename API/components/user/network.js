const response = require("../../../network/response.js");
const express = require('express');
const { getConnection } = require('../../../model/db');
const { request } = require("express");
const { route } = require("express/lib/application");
const { get } = require("express/lib/request");
const { Pool } = require("pg/lib");


const router = express.Router();

router.get('/', function (req, res) {

    response.success(req, res, '', 200);
});

router.post('/login', function (req, res) {
    console.log(req.query);

    res.send({
        username: req.query.username,
        token: 'token',
        id_user: 'id_user',
        success: 'ok',
        metodo: 'login'
    });


});

router.get('/readme', async function(req, res){
    const client = await getConnection();

    const query_request = {
        text: 'SELECT * FROM tbl_usersdb'
    }

    client.query(query_request, (err, result) => {
        //if(err) throw err;
        res.send(result.rows); 
     });


});

router.post('/register', async function (req, res) {
    // Realiza la conexion a db
    const client = await getConnection();

    let username = req.query.username;
    let email = req.query.email;
    let password = req.query.password;
    let phone_number = req.query.phone_number;

    const query_request = {
        text: 'INSERT INTO tbl_usersdb(username, email, password, phone_number) VALUES ($1, $2, $3, $4)',
        values: [username, email, password, phone_number]
    }

    console.log("Yes");

    client.query(query_request)
        .then(r => { response.success(req, res, r, 200) })
        .catch(e => { response.success(req, res, e.detail, 200) });
});

router.delete('/delete', async function(req, res){
    const client = await getConnection();
    
    let id = req.query.id;
    console.log("id: " + req.query.id);

    const query_request = {
        text: 'DELETE from tbl_usersdb where id = $1',
        values: [id]
    }

    client.query(query_request)
    .then(r => { response.success(req, res, r, 200) })
    .catch(e => { response.success(req, res, e.detail, 200) });
});

router.put('/updateAll', async function(req, res){
    const client = await getConnection();

    let id = req.query.id;
    let username = req.query.username;
    let email = req.query.email;
    let password = req.query.password;
    let phone_number = req.query.phone_number;

    const query_request = {
        text: 'UPDATE tbl_usersdb SET username = $2, email = $3, password = $4, phone_number= $5 where id = $1',
        values: [id, username, email, password, phone_number]
    }

    client.query(query_request)
    .then(r => { response.success(req, res, r, 200) })
    .catch(e => { response.success(req, res, e.detail, 200) });

});

router.patch('/updateUser', async function(req, res){
    const client = await getConnection();

    let id = req.query.id;
    let username = req.query.username;

    const query_request = {
        text: 'UPDATE tbl_usersdb SET username = $2 where id = $1',
        values: [id, username]
    }

    client.query(query_request)
    .then(r => { response.success(req, res, r, 200) })
    .catch(e => { response.success(req, res, e.detail, 200) });
});

router.patch('/updateEmail', async function(req, res){
    const client = await getConnection();

    let id = req.query.id;
    let email = req.query.email;

    const query_request = {
        text: 'UPDATE tbl_usersdb SET email = $2 where id = $1',
        values: [id, email]
    }

    client.query(query_request)
    .then(r => { response.success(req, res, r, 200) })
    .catch(e => { response.success(req, res, e.detail, 200) });
});

router.patch('/updatePassword', async function(req, res){
    const client = await getConnection();

    let id = req.query.id;
    let password = req.query.password;

    const query_request = {
        text: 'UPDATE tbl_usersdb SET password = $2 where id = $1',
        values: [id, password]
    }

    client.query(query_request)
    .then(r => { response.success(req, res, r, 200) })
    .catch(e => { response.success(req, res, e.detail, 200) });
});

router.patch('/updatePhone', async function(req, res){
    const client = await getConnection();

    let id = req.query.id;
    let phone_number = req.query.phone_number;

    const query_request = {
        text: 'UPDATE tbl_usersdb SET phone_number = $2 where id = $1',
        values: [id, phone_number]
    }

    client.query(query_request)
    .then(r => { response.success(req, res, r, 200) })
    .catch(e => { response.success(req, res, e.detail, 200) });
});

module.exports = router;