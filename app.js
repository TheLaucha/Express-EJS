const express = require("express")
const app = express()
const PORT = process.env.PORT || 3000

// ==== MOTOR DE PLANTILLAS ====

app.set("view engine", "ejs")
app.set("views", __dirname + "/views")

// ==== MIDDLEWARE / ARCHIVOS ESTATICOS ====

app.use(express.static(__dirname + "/public"))

// ==== ROUTES ====

app.get("/", (req, res) => {
  // res.send("Respuesta desde directorio raiz en express") --> Antes de plantillas dinamicas
  res.render("index", { titulo: "Mi titulo dinamico" })
})

app.get("/servicios", (req, res) => {
  // res.send("Estas en la pagina de servicios")
  res.render("servicios", { tituloServicios: "Mi pagina de servicios" })
})

// MIDDLEWARE 404 --> Si no encuentra ninguna ruta se ejecuta el 404

app.use((req, res, next) => {
  // res.status(404).sendFile(__dirname + "/public/404.html") Antes de plantillas dinamicas
  res.status(404).render("404", {
    titulo: "404",
    descripcion: "Descripcion del sitio web",
  })
})

app.listen(PORT, () => {
  console.log("Servidor a su servicio en el puerto: ", PORT)
})
