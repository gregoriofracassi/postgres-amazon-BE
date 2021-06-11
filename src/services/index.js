import express from "express"
const route = express.Router()

import productsRoute from "./products/index.js"
import cartsRoute from "./carts/index.js"
import reviewsRoute from "./reviews/index.js"
import usersRoute from "./users/index.js"

route.use("/products", productsRoute)
route.use("/carts", cartsRoute)
route.use("/reviews", reviewsRoute)
route.use("/users", usersRoute)

export default route
