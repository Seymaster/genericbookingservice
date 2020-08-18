let username = process.env.db_username
let password = process.env.db_password

module.exports = {
    dbUrl: `mongodb+srv://${username}:${password}@cluster0.2ip3w.mongodb.net/booking?retryWrites=true&w=majority`
}