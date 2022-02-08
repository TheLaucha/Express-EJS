require('dotenv').config()
const bodyParser = require('body-parser')

// ==== USO DE MONGOOSE ====
const mongoose = require('mongoose');
const user = 'laucha_test'
const password = '7oDKstZrJuBk7eUL'
const dbName = 'veterinariadb'

const uri = `mongodb+srv://${process.env.USER}:${process.env.PASS}@cluster0.tzfea.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(()=> console.log('conectado a mongodb'))
  .catch(e => console.log('error de conexión', e))

// ==== USO DE EXPRESS ====
const express = require("express")
const app = express()
const PORT = process.env.PORT || 3000

// ==== USO DE BODY-PARSER ====

// Parse application /x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:false}))
// Parse application/json
app.use(bodyParser.json())

// ==== MOTOR DE PLANTILLAS ====

app.set("view engine", "ejs")
app.set("views", __dirname + "/views")

// ==== MIDDLEWARE / ARCHIVOS ESTATICOS ====

app.use(express.static(__dirname + "/public"))

// ==== ROUTES ====

app.use('/',require('./routes/RutasWeb'))

app.use('/mascotas', require('./routes/Mascotas'))

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
