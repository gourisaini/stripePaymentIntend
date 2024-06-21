import 'dotenv/config';
import express from 'express'
import "./model/index.js"
import router from './routes/user.js'
import ProductRoute from './routes/product.js'
import paymentRoute from './routes/payment.js'
import bodyParser from 'body-parser'
import cors from "cors"

const app = express()

app.use(cors())
app.use(bodyParser.json())

app.use("/user", router)
app.use("/product", ProductRoute)
app.use("/", paymentRoute)

app.listen(process.env.PORT, () => {
    console.log(`server listening on ${process.env.PORT}`)
})