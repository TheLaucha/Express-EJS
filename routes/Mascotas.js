const express = require("express")
const router = express.Router()

const Mascota = require("../models/mascota")

router.get("/", async (req, res) => {
  try {
    const arrayMascotas = await Mascota.find()
    res.render("mascotas", {
      listaMascotas: "Aqui iran todas las mascotas",
      arrayMascotas,
    })
  } catch (error) {
    console.log(error)
  }
})

router.get("/crear", (req, res) => {
  res.render("crear")
})

router.get("/:id", async (req, res) => {
  const id = req.params.id
  try {
    const mascotaDB = await Mascota.findOne({_id: id})
    console.log(mascotaDB)
    res.render("detalle", {
      mascota: mascotaDB,
      error: false,
    })
  } catch (error) {
    console.log("error:", error)
    res.render("detalle", {
      error: true,
      mensaje: "No se encuentra el documento...",
    })
  }
})

router.post("/", async (req, res) => {
  const body = req.body
  try {
    const mascotaDB = new Mascota(body)
    await mascotaDB.save()
    res.redirect("/mascotas")
  } catch (error) {
    console.log("error:", error)
  }
})

router.delete("/:id", async (req, res) => {
  const id = req.params.id

  try {
    const mascotaDB = await Mascota.findByIdAndDelete({_id: id})
    console.log(mascotaDB)

    if (!mascotaDB) {
      res.json({
        estado: false,
        mensaje: "No se puede eliminar",
      })
    } else {
      res.json({
        estado: true,
        mensaje: "Eliminado",
      })
    }
  } catch (error) {
    console.log(error)
  }
})

router.put("/:id", async (req, res) => {
  const id = req.params.id
  const body = req.body

  try {
    const mascotaDB = await Mascota.findByIdAndUpdate(id, body, {useFindAndModify: false})
    console.log(mascotaDB)
    res.json({
      estado: true,
      mensaje: "Editado",
    })
  } catch (error) {
    console.log(error)
    res.json({
      estado: false,
      mensaje: "Fallamos",
    })
  }
})

module.exports = router
