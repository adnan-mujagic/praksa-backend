let express = require("express")
let mongoose = require("mongoose")
let port = 3000

//Import routes
let userRoutes = require("./backend/routes/usersRoutes.js")

const app = express()

app.listen(port, function(){
    console.log("Listening on port "+port )
})

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json())
//Tell app which routes to use!
app.use("/api",userRoutes)

const dbPath = 'mongodb+srv://ado:ado@trying.p1yho.mongodb.net/social_sell?retryWrites=true&w=majority';
const options = {useNewUrlParser: true, useUnifiedTopology: true}
const mongo = mongoose.connect(dbPath, options);

mongo.then(() => {
    console.log('connected')
}, error => {
    console.log(error, 'error')
})