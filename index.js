const express = require('express')
const app = express()
const port = 3000
const ejs = require('ejs')

app.set('view engine', 'ejs')

app.get('/Bandar', (req, res) => {
    res.render("BeritaBandar", { title : "Bandar" })
});

app.get('/Bitcoin', (req,res) => {
    res.render('BeritaBitcoin', { title : 'Bitcoin'})
});

app.get('/Olimpiade', (req,res) => {
    res.render('BeritaOlimpiade', { title : 'Olimpiade'})
});

app.get('/Presiden', (req,res) => {
    res.render('BeritaPresiden', { title : 'Pemilu'})
});

app.get('/login', (req,res) => {
    res.render('Login', { title : 'Login'})
});

app.get('/', (req,res) => {
    res.render('MenuUtama', { title : 'Utama'})
});

app.use(express.static('Public'))



app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});