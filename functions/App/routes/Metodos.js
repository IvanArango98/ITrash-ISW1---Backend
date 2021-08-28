const express = require('express')
const router = express.Router()


router.use(express.json())
router.use(express.urlencoded({extended : false}))


router.post("/Api-Post",function(req,res){
    let data = req.body
    let mensaje_prueba = data.mensaje

        res.status(200).json(`${mensaje_prueba}`)
    })

router.get("/Api-Get",function(req,res) {
    let data = req.query
    let mensaje_prueba = data.mensaje

    res.status(200).json(`${mensaje_prueba}`)
})

module.exports = router;