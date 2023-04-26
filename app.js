import express from "express";
import { engine } from "express-handlebars"
import router from "./routes/products.routes.js"
import routerCart from "./routes/carts.routes.js"
import views from "./routes/views.routes.js"
import { __dirname } from "./utils.js"
import { Server } from "socket.io";

const server = express()
server.use(express.json())
server.use(express.urlencoded({ extended: true }))
const puerto = 8080
const wsPort=8081
const httpServer = server.listen(puerto, () => {
    console.log(`Servidor express activo en puerto:${puerto}`)
})
const socketServer = new Server(httpServer)

server.engine("handlebars", engine())
server.set("view engine", "handlebars")
server.set("views", __dirname+"./views")

server.use(express.static(__dirname+"/public"))
server.use("/", views)
server.use("/api", router)
server.use("/api", routerCart)

