const express = require("express")
const app = express()
const env = require("dotenv")
const cors = require("cors")
const pdfRoute = require("./PdfRoutes")
env.config()

const port = 8000;

app.use(express.json())
app.use(cors())
app.use(pdfRoute)

app.listen(port, ()=>{
    console.log(`Server running on ${port}`);
})

