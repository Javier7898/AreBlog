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

app.get('/Emas', (req,res) => {
    res.render('BeritaEmas', { title : 'Emas'})
});

app.get('/Gerhana', (req,res) => {
    res.render('BeritaGerhana', { title : 'Gerhana'})
});

app.get('/IKN', (req,res) => {
    res.render('BeritaIKN', { title : 'IKN'})
});

app.get('/Kebakaran', (req,res) => {
    res.render('BeritaKebakaran', { title : 'Kebakaran'})
});

app.get('/Korupsi', (req,res) => {
    res.render('BeritaKorupsi', { title : 'Korupsi'})
});

app.get('/Mudik', (req,res) => {
    res.render('BeritaMudik', { title : 'Mudik'})
});

app.get('/Pangan', (req,res) => {
    res.render('BeritaPangan', { title : 'Pangan'})
});

app.get('/Paskah', (req,res) => {
    res.render('BeritaPangan', { title : 'Paskah'})
});

app.get('/PLTU', (req,res) => {
    res.render('BeritaPLTU', { title : 'PLTU'})
});

app.get('/Timnas', (req,res) => {
    res.render('BeritaTimnas', { title : 'Timnas'})
});

app.get('/', (req,res) => {
    res.render('MenuUtama', { title : 'Utama'})
});

app.use(express.static('Public'))



app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});