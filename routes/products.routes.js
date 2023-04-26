import express from "express"

import {Router as expressRouter} from "express"
import productManager from "../productManager.js"
const router=expressRouter()
const camposObligatorios = ["title", "description", "code", "price", "status", "stock", "category"]

router.get(`/products`, async (req, res) => {

    if (req.query.limit) {
        let limit = parseInt(req.query.limit)
        res.status(200).send(await productManager.store.getProductsLimit(limit))
    }
    else {
        res.status(200).send(await productManager.store.getProducts())
    }
})
router.get(`/products/:pid`, async (req, res) => {

    let id = parseInt(req.params.pid)
    res.status(200).send(await productManager.store.getProductById(id))

})



router.post("/products", async (req, res) => {


    if (camposObligatorios.every(e => Object.prototype.hasOwnProperty.call(req.body, e) && req.body[e] !== "" && typeof (req.body.price) === "number" && typeof (req.body.stock) === "number" && typeof (req.body.status) === "boolean")) {
       let nuevoUsuario = req.body
        if (!req.body.thumbnails) {
            nuevoUsuario.thumbnails = []
        }


        res.status(200).send(await productManager.store.addProduct(nuevoUsuario.title, nuevoUsuario.description, nuevoUsuario.price, nuevoUsuario.thumbnails, nuevoUsuario.code, nuevoUsuario.stock))
    } else {
        res.status(200).send(`Se deben completar todos los campos Y/O con el tipo correcto de datos`)
    }
})

router.put("/products/:pid", async (req,res)=>{
    let id=parseInt(req.params.pid)
    update=req.body
    res.status(200).send(await productManager.store.updateProduct(id,update))
})

router.delete("/products/:pid",async (req,res)=>{
    let id=parseInt(req.params.pid)
    res.status(200).send(await productManager.store.deleteProduct(id))
})

export default router