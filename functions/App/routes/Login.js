const express = require('express');
const router = express.Router()
const cors = require("cors")
const mysql = require('mysql');
const crypto = require("crypto");
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
    
    let Contraseña = crypto.createHash("sha512").update(req.body.Contraseña).digest("hex")

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
                                        token,status:"200"
                                    });
                                });
                            } else {
                                res.send(JSON.stringify({msg:'Fallo en la generación de Token',status:"500"}));
                            }
                        });
                    } else {
                        res.send(JSON.stringify({msg:'Contraseña incorrecta',status:"200"}));
                    }      
                } else {
                    res.send(JSON.stringify({msg:'Contraseña no válida',status:"200"}));
                }
            });
        } else {
            res.send(JSON.stringify({msg:'Correo electrónico inválido',status:"200"}));
        }
    });

    
    
  });

  router.put('/ChangePassword', (req, res) =>{
  let {DireccionCorreo} = req.body;
  let contraseñaNueva = crypto.createHash("sha512").update(req.body.contraseñaNueva).digest("hex")
  let ContraseñaActual = crypto.createHash("sha512").update(req.body.ContraseñaActual).digest("hex")
  //Obtener contraseña actual para comparar con la ingresada por el usuario y permitir la actualización si coincide
  let sqlStmt = `SELECT CodigoEmpleado FROM correoempleado WHERE DireccionCorreo = '${DireccionCorreo}' AND Activo = 1`
  connection.query(sqlStmt, (error, results)=>{
      
      if(error) throw error;
      if (results.length > 0){
          var codigoEmpleado = results[0].CodigoEmpleado;
          sqlStmt = `SELECT Contraseña FROM bitacoracontraseña WHERE CodigoEmpleado = '${codigoEmpleado}' AND ISNULL(FechaFin)`;
          
          connection.query(sqlStmt, (error, results) => {
              if (error) throw error;
              if (results.length > 0){
                          //validar con todas las contraseñas, solo se está validando 
                  if(results[0].Contraseña == ContraseñaActual){
                      if(ContraseñaActual != contraseñaNueva){
                          //Finalizar contraseña previa
                          sqlStmt = `UPDATE BitacoraContraseña SET FechaFin = NOW() WHERE CodigoEmpleado = '${codigoEmpleado}' AND FechaFin IS NULL`;
                          connection.query(sqlStmt, (error, results) =>{
                              if (error) throw error;
                                  sqlStmt = "INSERT INTO BitacoraContraseña (CodigoEmpleado, Contraseña, FechaInicio) VALUES (?,?,NOW())";
                                  connection.query(sqlStmt,[codigoEmpleado, contraseñaNueva] , (error, results) =>{
                                      if (error) {                                            
                                        res.send(JSON.stringify({msg:'Ocurrrio un error actualizando su contraseña, vuelva a intentarlo',status:"500"}));
                                          throw error
                                      } else {
                                        res.send(JSON.stringify({msg:'Contraseña actualizada exitosamente',status:"200"}));
                                      }
                                  });
                          });

                         
                      }
                      else {
                          res.send(JSON.stringify({msg:'a contraseña actual no puede ser igual que la nueva',status:"200"}));
                      }
                  } else {
                      res.send(JSON.stringify({msg:'Contraseña incorrecta',status:"200"}));
                  }
              }
          });
      } else {
        res.send(JSON.stringify({msg:'Correo electrónico inválido',status:"200"}));
      }
  });
});

  connection.connect(error => {
      if (error) throw error;
      console.log('Database server running!');
  });


  module.exports = router;