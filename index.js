const express = require('express')
const app = express()
const alert = require('alert')
const PORT = 3000
let accArray = []

app.set('view-engine', 'ejs')
app.use(express.urlencoded({extended: false}))

app.get('/', (req, res) => {
    res.render('index.ejs')
})

app.get('/register', (req, res) => {
    res.render('register.ejs')
})

app.get('/login', (req, res) => {
    res.render('login.ejs')
})

app.get('/users', (req, res) => {
    res.render('users.ejs', {users: JSON.stringify(accArray)})
})

app.post('/register', (req, res) => {
    accArray.push({
        username: req.body.username,
        password: req.body.password
    })
    res.redirect('/login')
})

app.post('/auth', function (req, res) {
    let username = req.body.username
    let password = req.body.password
    if (accArray.some(acc => acc.username === username)) {
        let index = accArray.findIndex(acc => acc.username === username)
        if (accArray[index].password === password) {
            res.redirect('/users')
        } else {
            alert('Invalid username or password')
            res.redirect('/login')
        }
    } else {
        alert('Invalid username or password')
        res.redirect('/login')
    }
})

app.listen(PORT, function () {
    console.log(`Listening on port ${PORT}`)
})


let adminAcc = {
    username: 'admin',
    password: 'admin'
}
accArray.push(adminAcc)