const express = require('express');
const router = express.Router()
const cors = require("cors")
const mysql = require('mysql');
const crypto = require("crypto");
const bodyParser = require('body-parser');
const jwt = require("jsonwebtoken");

router.use(express.json())
router.use(express.urlencoded({extended : false}))
router.use(cors())

//My SQL
const connection = mysql.createConnection({
    host: '35.226.226.12'    ,
    user: 'root',
    password: '123abc',
    database: 'itrash',  
  });
   
//rutas
  router.post('/Login', (req, res) => {
    //hashear contraseña 
    let DireccionCorreo = req.body.DireccionCorreo
    
    Contraseña = crypto.createHash("sha512").update(req.body.Contraseña).digest("hex")

    let sqlStmt = `SELECT CodigoEmpleado FROM CorreoEmpleado WHERE DireccionCorreo = '${DireccionCorreo}' AND Activo = 1`

    //0. obtener id de empleado con correo electrónico
    connection.query(sqlStmt, (error, results) => {
        if (error) throw error;
        if (results.length > 0){            

            let codEmpleado = results[0].CodigoEmpleado
            sqlStmt = `SELECT Contraseña FROM BitacoraContraseña WHERE CodigoEmpleado = '${codEmpleado}' AND ISNULL(FechaFin)`
            
            //1. obtener contraseña actual del empleado
            connection.query(sqlStmt, (error, results) => {
                if (error) throw error;
                if (results.length > 0){
                    if(results[0].Contraseña == Contraseña) {

                        sqlStmt = `SELECT * FROM Empleado WHERE CodigoEmpleado = '${codEmpleado}' AND Activo = 1`
                        
                        //2. obtener datos el empleado
                        connection.query(sqlStmt, (error, results) => {
                            if (error) throw error;
                            if (results.length > 0){

                                //3.generar token para el empleado
                                let user = results[0]
                                jwt.sign({user}, 'secretkey', {expiresIn: '24h'}, (err, token) => {
                                    if(err) throw err
                                    res.json({
                                        token
                                    });
                                });
                            } else {
                                res.send(JSON.stringify({msg:'Fallo en la generación de Token'}));
                            }
                        });
                    } else {
                        res.send(JSON.stringify({msg:'Contraseña incorrecta'}));
                    }      
                } else {
                    res.send(JSON.stringify({msg:'Contraseña no válida'}));
                }
            });
        } else {
            res.send(JSON.stringify({msg:'Correo electrónico inválido'}));
        }
    });

    
    
  });

  connection.connect(error => {
      if (error) throw error;
      console.log('Database server running!');
  });


  module.exports = router;