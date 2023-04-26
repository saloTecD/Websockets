import {Router as expressRouter} from "express"
import productManager from "../productManager.js"
const router= expressRouter()




router.get(`/realtimeproducts`,async(req,res)=>{
    
    
})

router.get(`/`,async(req,res)=>{
    let productos =[]
    productos=await productManager.store.getProducts()
    // console.log(productos)
    res.render("index",{showProducts:productos})
    
})

export default router