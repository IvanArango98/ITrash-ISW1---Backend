const express = require('express')
const router = express.Router()
const mysql = require('mysql');
const cors = require("cors")

router.use(express.json())
router.use(express.urlencoded({extended : false}))
router.use(cors())

const configurate = {
    host: '35.226.226.12'    ,
    user: 'root',
    password: '123abc',
    database: 'itrash',    
}

const db = mysql.createConnection(configurate);

router.post("/ApiCreate",function(req,res) {
    //Proceso para hacer create    

    let Tabla = req.body.Tabla
    let sqlInsert = ""
    let CodigoEmpleado = req.body.CodigoEmpleado
    let CodigoTipoEmpleado = req.body.CodigoTipoEmpleado 
    
    switch((Opcion))
    {
        case "TipoEmpleado": 
        //TipoEmpleado

        //deben de ser int
                       

        //debe de ser string
        let NombrePuesto = req.body.NombrePuesto

        sqlInsert = 
        "INSERT INTO TipoEmpleado (CodigoTipoEmpleado,CodigoEmpleado,NombrePuesto ) VALUES (?,?,?)";             
        db.query(sqlInsert,[CodigoTipoEmpleado,CodigoEmpleado,NombrePuesto],(err,result) =>{
            if(err !== undefined)
            {            
                res.send(JSON.stringify({resultado: result, mensaje: "INSERT EXITOSO en tabla TipoEmpleado"}))      
            }
            else
            {
                res.send(JSON.stringify({error: err}))
            }            
        });
        break;

        case "Empleado": 
        //Empleado

        //Debe de ser int y es llave primaria
        //CodigoEmpleado = req.body.CodigoEmpleado        

        //Deben de ser string
        let PrimerNombre = req.body.PrimerNombre
        let SegundoNombre = req.body.SegundoNombre
        let PrimerApellido = req.body.PrimerApellido
        let SegundoApellido = req.body.SegundoApellido
        let ApellidoDeCasada = req.body.ApellidoDeCasada

        //Debe de ser int
        let CodigoDocumentoIdentificacion = req.body.CodigoDocumentoIdentificacion

        //Debe de ser booleano
        let Activo = req.body.Activo

        //Debe de ser int y es llave fornea de codigotipoempleado de la tabla TipoEmpleado
        //let CodigoTipoEmpleado = req.body.CodigoTipoEmpleado

        sqlInsert = 
        "INSERT INTO Empleado (CodigoEmpleado,PrimerNombre,SegundoNombre, PrimerApellido,SegundoApellido,ApellidoDeCasada,CodigoDocumentoIdentificacion,CodigoTipoEmpleado) VALUES (?,?,?,?,?,?,?,?)";                          
        db.query(sqlInsert,[CodigoEmpleado,PrimerNombre,SegundoNombre, PrimerApellido,SegundoApellido,ApellidoDeCasada,CodigoDocumentoIdentificacion,CodigoTipoEmpleado],(err,result) =>{
            if(err !== undefined)
            {            
                res.send(JSON.stringify({resultado: result, mensaje: "INSERT EXITOSO en tabla Empleado"}))      
            }
            else
            {
                res.send(JSON.stringify({error: err}))
            }            
        });
        break;

        case "BitacoraContraseña": 
        //BitacoraContraseña

        //debe de ser int y es llave primaria
        let CodigoContraseña = req.body.CodigoContraseña

        //debe de ser int y llave fornea de la tabla Empleado
        //let CodigoEmpleado = req.body.CodigoEmpleado

        //debe de ser string
        let Contraseña = req.body.Contraseña

        //deben de ser date
        let FechaInicio = req.body.FechaInicio
        let FechaFin = req.body.FechaFin

        sqlInsert = 
        "INSERT INTO BitacoraContraseña (CodigoContraseña,CodigoEmpleado,Contraseña, FechaInicio,FechaFin) VALUES (?,?,?,?,?)";                          
        db.query(sqlInsert,[CodigoContraseña,CodigoEmpleado,Contraseña, FechaInicio,FechaFin],(err,result) =>{
            if(err !== undefined)
            {            
                res.send(JSON.stringify({resultado: result, mensaje: "INSERT EXITOSO en tabla BitacoraContraseña"}))      
            }
            else
            {
                res.send(JSON.stringify({error: err}))
            }            
        });
    	
        break;

        case 4: 
        //TelefonoEmpleado

        //Debe de ser int y es llave primaria
        let CodigoTelefono = req.body.CodigoTelefono
        
        //Debe de ser int y es la llave foranea de Empleado
        //let CodigoEmpleado = req.body.CodigoEmpleado

        //Debe de ser int
        let NumeroDeTelefono = req.body.NumeroDeTelefono

        //Debe de ser boleano
        //let Activo = req.body.Activo

        sqlInsert = 
        "INSERT INTO TelefonoEmpleado (CodigoTelefono,CodigoEmpleado,NumeroDeTelefono, Activo) VALUES (?,?,?,?)";                          
        db.query(sqlInsert,[CodigoTelefono,CodigoEmpleado,NumeroDeTelefono, Activo],(err,result) =>{
            if(err !== undefined)
            {            
                res.send(JSON.stringify({resultado: result, mensaje: "INSERT EXITOSO en tabla TelefonoEmpleado"}))      
            }
            else
            {
                res.send(JSON.stringify({error: err}))
            }            
        });    
    
        break;

        case "CorreoEmpleado": 

        //CorreoEmpleado

        //Debe de ser de tipo entero y es llave primaria
        let CodigoCorreo = req.body.CodigoCorreo

        //Debe de ser tipo entero y es llave fornea de la tabla Empleado
        //let CodigoEmpleado = req.body.CodigoEmpleado
        
        //Debe de ser string    
        let DireccionCorreo = req.body.DireccionCorreo

        //Debe de ser boleana
        //let Activo = req.body.Activo
        
        sqlInsert = 
        "INSERT INTO CorreoEmpleado (CodigoCorreo,CodigoEmpleado,DireccionCorreo, Activo) VALUES (?,?,?,?)";                          
        db.query(sqlInsert,[CodigoCorreo,CodigoEmpleado,DireccionCorreo, Activo],(err,result) =>{
            if(err !== undefined)
            {            
                res.send(JSON.stringify({resultado: result, mensaje: "INSERT EXITOSO en tabla CorreoEmpleado"}))      
            }
            else
            {
                res.send(JSON.stringify({error: err}))
            }            
        });        
        break;

        case "LicenciaConducir": 
        //LicenciaConducir

        //Debe de ser entero y es la llave primaria
        let CodigoLicencia = req.body.CodigoLicencia

        //Debe de ser entero y es llave foranea de la tabla Empleado
        //let CodigoEmpleado = req.body.CodigoEmpleado

        //Debe de ser string
        let TipoLicencia = req.body.TipoLicencia

        //Debe de ser int
        let NumeroDocumento = req.body.NumeroDocumento

        //Debe de ser date
        let FechaVencimiento = req.body.FechaVencimiento
    
        sqlInsert = 
        "INSERT INTO LicenciaConducir (CodigoLicencia,CodigoEmpleado,TipoLicencia, NumeroDocumento,FechaVencimiento) VALUES (?,?,?,?,?)";                          
        db.query(sqlInsert,[CodigoLicencia,CodigoEmpleado,TipoLicencia, NumeroDocumento,FechaVencimiento],(err,result) =>{
            if(err !== undefined)
            {            
                res.send(JSON.stringify({resultado: result, mensaje: "INSERT EXITOSO en tabla LicenciaConducir"}))      
            }
            else
            {
                res.send(JSON.stringify({error: err}))
            }            
        });     

        break;

        case "Ruta": 
        //Ruta

        //Debe de ser entero y es la llave primaria          
        let CodigoRuta = req.body.CodigoRuta

        //Debe de ser entero y es llave foranea de la tabla Empleado
        //let CodigoEmpleado = req.body.CodigoEmpleado

        //Debe de ser double
        let Distancia = req.body.Distancia
        
        //Debe de ser date
        let FechaCreacion = req.body.FechaCreacion

        //Deben de time formate horas:minutos:segundos
        let HoraInicio = req.body.HoraInicio
        let HoraFin = req.body.HoraFin
        
        //Debe de ser boleano
        let Estado = req.body.Estado

        sqlInsert = 
        "INSERT INTO Ruta (CodigoRuta,CodigoEmpleado,Distancia, FechaCreacion,HoraInicio,HoraFin,Estado) VALUES (?,?,?,?,?,?,?)";                          
        db.query(sqlInsert,[CodigoRuta,CodigoEmpleado,Distancia, FechaCreacion,HoraInicio,HoraFin,Estado],(err,result) =>{
            if(err !== undefined)
            {            
                res.send(JSON.stringify({resultado: result, mensaje: "INSERT EXITOSO en tabla Ruta"}))      
            }
            else
            {
                res.send(JSON.stringify({error: err}))
            }            
        });     
    
        break;
        
        case "Basurero": 
        //Basurero

        //Debe de ser entero y es la llave primaria 
        let CodigoBasurero = req.body.CodigoBasurero

        //Debe de ser double
        let VolumenActualBasura = req.body.VolumenActualBasura

        //Debe de ser double
        let Direccion = req.body.Direccion
    
        //Deben de ser double
        let Latitud = req.body.Latitud
        let Longitud = req.body.Longitud
        let Capacidad = req.body.Capacidad
        
        //Debe de ser boleano    
        //let Activo = req.body.Activo   
        
        sqlInsert = 
        "INSERT INTO Basurero (CodigoBasurero,VolumenActualBasura, Direccion,Latitud,Longitud,Capacidad,Activo) VALUES (?,?,?,?,?,?,?)";                          
        db.query(sqlInsert,[CodigoBasurero,VolumenActualBasura, Direccion,Latitud,Longitud,Capacidad,Activo],(err,result) =>{
            if(err !== undefined)
            {            
                res.send(JSON.stringify({resultado: result, mensaje: "INSERT EXITOSO en tabla Basurero"}))      
            }
            else
            {
                res.send(JSON.stringify({error: err}))
            }            
        });

        break;

           
    case "BitacoraRuta":
        //BitacoraRuta

        //Debe de ser entero y es llave primaria
        //let CodigoRuta = req.body.CodigoRuta

        //Debe de entero y es llave fornea de de la tabla ruta
        let CodigoBitacoraRuta = req.body.CodigoBitacoraRuta

        //Debe de ser entero y es llave foranea de la tabla Basurero
        //let CodigoBasurero = req.body.CodigoBasurero

        //Debe de ser time horas:minutos:segundis        
        let HoraRecoleccion = req.body.HoraRecoleccion

        //Debe de ser string
        let PosicionRuta = req.body.PosicionRuta
        
        sqlInsert = 
        "INSERT INTO BitacoraRuta (CodigoRuta,CodigoBitacoraRuta,CodigoBasurero, HoraRecoleccion,PosicionRuta) VALUES (?,?,?,?,?,)";                          
        db.query(sqlInsert,[CodigoRuta,CodigoBitacoraRuta,CodigoBasurero, HoraRecoleccion,PosicionRuta],(err,result) =>{
            if(err !== undefined)
            {            
                res.send(JSON.stringify({resultado: result, mensaje: "INSERT EXITOSO en tabla BitacoraRuta"}))      
            }
            else
            {
                res.send(JSON.stringify({error: err}))
            }            
        });

        break;

        default:
            res.send(JSON.stringify({mensaje: "Debe de ingresar una opción valida"}))
            break;
    }  
    
})

router.get("/Api-Read",function(req,res){

    //Metodo get simple
    let NombreTabla =  req.query.NombreTabla        

    let sqlSelect = `SELECT * FROM ${NombreTabla}`
    
        db.query(sqlSelect,(err,result) => {

            if(err !== undefined)
            {            
                res.send(JSON.stringify({resultado: result, mensaje: `GET EXITOSO DE LA TABLA ${NombreTabla}`}))      
            }
            else
            {
                res.send(JSON.stringify({error: err}))
            }    
        });        
})


router.delete("/Api-Delete",function(req,res){
    let NombreTabla = req.body.NombreTabla
    let PrimaryKey = req.body.PrimaryKey
    let PrimaryKeyName = req.body.PrimaryKeyName

    let sqlDelete = `DELETE FROM ${NombreTabla} WHERE ${PrimaryKeyName} = ?`

    db.query(sqlDelete,PrimaryKey, (err, result) => {
        if(err !== undefined)
            {            
                res.send(JSON.stringify({resultado: result, mensaje: `Registro eliminado exitoso de la tabla ${NombreTabla}`}))      
            }
            else
            {
                res.send(JSON.stringify({error: err}))
            }   
    })
})

router.put("/Api-Update",function(req,res){

    //VARIABLES DE ENTRADAS
    let NombreTabla = req.body.NombreTabla
    let PrimaryKey = req.body.PrimaryKey
    let PrimaryKeyName = req.body.PrimaryKeyName

    //Este sera un array - Entrada de prueba [{Columna: "Campo 1", "Valor" : "Valor nuevo"}]
    let Campos = req.body.Campos
    
    //VARIABLES DE CODIGO
    let Valores = ""
    Object.keys(Campos).forEach( index => {
        Valores += `${Campos[index].Columna} = ${Campos[index].Valor} ,`
    })    

    //Para quitar la ultima ,
    Valores = Valores.substring(0,Valores.length - 1)
    

    let sqlUpdate = `UPDATE ${NombreTabla} SET ${Valores} WHERE ${PrimaryKeyName} = ${PrimaryKey}`
    console.log(sqlUpdate)

    db.query(sqlUpdate, (err, result) => {
        if(err !== undefined)
        {            
            res.send(JSON.stringify({resultado: result, mensaje: `Registro actualizado exitosamente de la tabla ${NombreTabla}`}))      
        }
        else
        {
            res.send(JSON.stringify({error: err}))
        } 
    })

})
module.exports = router;
