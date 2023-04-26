import express from "express";
import { engine } from "express-handlebars"
import router from "./routes/products.routes.js"
import routerCart from "./routes/carts.routes.js"
import views from "./routes/views.routes.js"
import { __dirname } from './utils.js'
import { Server} from "socket.io" 

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
})