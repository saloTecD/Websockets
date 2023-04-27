import productManager from "./productManager.js"



let ultimoProducto=await productManager.store.getProducts()
        console.log(ultimoProducto.length-1)