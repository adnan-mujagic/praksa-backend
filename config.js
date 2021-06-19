const JWT_KEY = "MY_KEY";
const DB_PATH = 'mongodb+srv://ado:ado@trying.p1yho.mongodb.net/social_sell?retryWrites=true&w=majority';
const DB_OPTIONS = {useNewUrlParser: true, useUnifiedTopology: true};


const forExport = {
    JWT_KEY,
    DB_PATH,
    DB_OPTIONS
}

module.exports = forExport;