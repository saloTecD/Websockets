import express from "express"

import {Router as expressRouter} from "express"
import cartManager from "../cartManager.js"
import productManager from "../productManager.js"
const router= expressRouter()
router.post(`/carts`,async(req,res)=>{
    res.status(200).send(await cartManager.cart.createCart())
})

router.get(`/carts/:cid`,async(req,res)=>{
    let id=parseInt(req.params.cid)
    res.status(200).send(await cartManager.cart.listCartProducts(id))
})

router.post(`/carts/:cid/product/:pid`,async(req,res)=>{
    let cid=parseInt(req.params.cid)
    let pid=parseInt(req.params.pid)
    if(await productManager.store.getProductById(pid)==="Not Found"){
        
        res.status(200).send("El producto que quieres agregar no existe")
    }else{
    res.status(200).send(await cartManager.cart.addCartProduct(cid,pid))
    }
})

export default router