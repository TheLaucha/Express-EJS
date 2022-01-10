const express = require('express')
const router = express.Router()

router.get("/", (req, res) => {
  // res.send("Respuesta desde directorio raiz en express") --> Antes de plantillas dinamicas
  res.render("index", { titulo: "Mi titulo dinamico" })
})

router.get("/servicios", (req, res) => {
  // res.send("Estas en la pagina de servicios")
  res.render("servicios", { tituloServicios: "Mi pagina de servicios" })
})

module.exports = router