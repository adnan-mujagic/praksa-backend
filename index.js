let express = require("express")
let mongoose = require("mongoose")
let port = process.env.PORT || 3000;
let config = require("./config.js");
let cors = require("cors")

//Import routes
let userRoutes = require("./backend/routes/usersRoutes.js")
let postRoutes = require("./backend/routes/postsRoutes.js")
let storeRoutes = require("./backend/routes/storesRoutes.js")

const app = express()

app.use(cors())

app.listen(port, function(){
    console.log("Listening on port "+port )
})

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json())
//Tell app which routes to use!
app.use("/api",userRoutes)
app.use("/api",postRoutes)
app.use("/api",storeRoutes);

const mongo = mongoose.connect(config.DB_PATH, config.DB_OPTIONS);

mongo.then(() => {
    console.log('connected')
}, error => {
    console.log(error, 'error')
})