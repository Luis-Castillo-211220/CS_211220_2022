import { success as _success } from "../../../network/response.js";
import { Router } from 'express';
import  { getData} from '../../../model/db.js';
import { getUser } from "../../../model/Users.js";

const router = Router();

router.get('/', function (req, res) {

    _success(req, res, '', 200);
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
    const client = await getData();

    const query_request = {
        text: 'SELECT * FROM tbl_usersdb'
    }

    client.query(query_request, (err, result) => {
        res.send(result.rows); 
     });


});

router.post('/register', async function (req, res) {
    // Realiza la conexion a db
    const client = await getData();

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
        .then(r => { _success(req, res, r, 200) })
        .catch(e => { _success(req, res, e.detail, 200) });
});

router.delete('/delete', async function(req, res){
    const client = await getData();
    
    let id = req.query.id;
    console.log("id: " + req.query.id);

    const query_request = {
        text: 'DELETE from tbl_usersdb where id = $1',
        values: [id]
    }

    client.query(query_request)
    .then(r => { _success(req, res, r, 200) })
    .catch(e => { _success(req, res, e.detail, 200) });
});

router.put('/updateAll', async function(req, res){
    const client = await getData();

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
    .then(r => { _success(req, res, r, 200) })
    .catch(e => { _success(req, res, e.detail, 200) });

});

router.patch('/updateUser', async function(req, res){
    const client = await getData();

    let id = req.query.id;
    let username = req.query.username;

    const query_request = {
        text: 'UPDATE tbl_usersdb SET username = $2 where id = $1',
        values: [id, username]
    }

    client.query(query_request)
    .then(r => { _success(req, res, r, 200) })
    .catch(e => { _success(req, res, e.detail, 200) });
});

router.patch('/updateEmail', async function(req, res){
    const client = await getData();

    let id = req.query.id;
    let email = req.query.email;

    const query_request = {
        text: 'UPDATE tbl_usersdb SET email = $2 where id = $1',
        values: [id, email]
    }

    client.query(query_request)
    .then(r => { _success(req, res, r, 200) })
    .catch(e => { _success(req, res, e.detail, 200) });
});

router.patch('/updatePassword', async function(req, res){
    const client = await getData();

    let id = req.query.id;
    let password = req.query.password;

    const query_request = {
        text: 'UPDATE tbl_usersdb SET password = $2 where id = $1',
        values: [id, password]
    }

    client.query(query_request)
    .then(r => { _success(req, res, r, 200) })
    .catch(e => { _success(req, res, e.detail, 200) });
});

router.patch('/updatePhone', async function(req, res){
    const client = await getData();

    let id = req.query.id;
    let phone_number = req.query.phone_number;

    const query_request = {
        text: 'UPDATE tbl_usersdb SET phone_number = $2 where id = $1',
        values: [id, phone_number]
    }

    client.query(query_request)
    .then(r => { _success(req, res, r, 200) })
    .catch(e => { _success(req, res, e.detail, 200) });
});


router.get('/all_users_orm', async function(req, res){
    getUser.findAll({attributes: ['id','name']})
    .then(users =>{
      res.send(users)
    })
    .catch(err => {
      console.log(err)
    })
  });

  router.delete('/delete_user_orm', async function(req, res){
  let id = req.query.id;
  console.log("id:" + req.query.id);
   getUser.destroy({
    where: {
      id: id
    }
  })
      .then((r) => {
        _success(req, res, r, 200);
      })
      .catch((e) => {
        _success(req, res, e, 200);
      });
  });
  

  router.put('/update_user_orm', async function(req,res){
    let id= req.query.id;
    let newDatas=req.query;
    getUser.findOne({where:{id:id}})
    .then((r) => {
      r.update(newDatas)
      _success(req, res, r, 200);
      console.log('simon')
    })
    .catch((e) => {
      _success(req, res, e, 400);
      console.log('mal')
    });
  })
  
  router.post('/register_user_orm', async function(req,res){
    getUser.create({
        id: req.query.id,
        username: req.query.username,
        email:req.query.email,
        password:req.query.password,
        phone_number: req.query.phone_number
    })  .then((r) => {
      _success(req, res, r, 200);
      console.log('simon')
    })
    .catch((e) => {
      _success(req, res, e, 400);
    });
    });


export default router;