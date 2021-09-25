const express = require('express');
const mysql = require('mysql');
const cors = require("cors")
const bodyParser = require('body-parser');
const jwt = require("jsonwebtoken");

const PORT = process.env.PORT || 3050;

const app = express();

app.use(bodyParser.json());
app.use(cors())

//My SQL
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'itrash'
  });
   
//rutas
  app.post('/Login', (req, res) => {
    //hashear contraseña 
    let {DireccionCorreo, Contraseña} = req.body

    let sqlStmt = `SELECT CodigoEmpleado FROM correoempleado WHERE DireccionCorreo = '${DireccionCorreo}' AND Activo = 1`

    //0. obtener id de empleado con correo electrónico
    connection.query(sqlStmt, (error, results) => {
        if (error) throw error;
        if (results.length > 0){            

            let codEmpleado = results[0].CodigoEmpleado
            sqlStmt = `SELECT Contraseña FROM bitacoracontraseña WHERE CodigoEmpleado = '${codEmpleado}' AND ISNULL(FechaFin)`
            
            //1. obtener contraseña actual del empleado
            connection.query(sqlStmt, (error, results) => {
                if (error) throw error;
                if (results.length > 0){
                    if(results[0].Contraseña == Contraseña) {

                        sqlStmt = `SELECT * FROM empleado WHERE CodigoEmpleado = '${codEmpleado}' AND Activo = 1`
                        
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
                                res.send('Fallo en la generación de Token');
                            }
                        });
                    } else {
                        res.send('Contraseña incorrecta');
                    }      
                } else {
                    res.send('Contraseña no válida');
                }
            });
        } else {
            res.send('Correo electrónico inválido');
        }
    });

    
    
  });

  connection.connect(error => {
      if (error) throw error;
      console.log('Database server running!');
  });

  app.listen(PORT, () => console.log(`Server running in port ${PORT}`));
