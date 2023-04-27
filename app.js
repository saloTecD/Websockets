import express from "express";
import { engine } from "express-handlebars"
import router from "./routes/products.routes.js"
import routerCart from "./routes/carts.routes.js"
import views from "./routes/views.routes.js"
import { __dirname } from './utils.js'
import { Server} from "socket.io" 
import productManager from "./productManager.js"

const server = express()
server.use(express.json())
server.use(express.urlencoded({ extended: true }))
const puerto = 8080
const wsPort=8081
const httpServer = server.listen(wsPort, () => {
    console.log(`Servidor webSocket activo en puerto:${wsPort}`)
})
const io = new Server(httpServer,{cors:{origin:"http://localhost:8080"}})

server.engine("handlebars", engine())
server.set("view engine", "handlebars")
server.set("views", "./views")

server.use("/public",express.static(`${__dirname}/public`))
server.use("/", views)
server.use("/api", router)
server.use("/api", routerCart)





server.listen(puerto, () => {
    console.log(`Servidor express activo en puerto:${puerto}`)})


    
io.on("connection",(socket)=>{
    console.log(`nuevo cliente conectado ${socket.id}`)

    socket.emit("confirmacion_Server","Conexion Aceptada")

    socket.on("eventTest",(data)=>{
        console.log(data)
    })

     socket.on("delProduct",async (data)=>{
        console.log(`el PID a borrar es ${data}`)
        await productManager.store.deleteProduct(parseInt(data))
        socket.emit("deleteProduct",data)
    })

    socket.on("addProduct",async(data)=>{
        console.log(`dato recibido ${data}`)
        await productManager.store.addProduct(data.title,data.description,data.price,data.thumbnails,data.code,data.stock)
        let ultimoProducto=await productManager.store.getProducts()
        let prodAgregar=ultimoProducto[ultimoProducto.length-1]
        console.log(prodAgregar)
        socket.emit("addNewProd",prodAgregar)
    })
})