const express = require("express");
const session = require('express-session');
const flash = require('express-flash');
const path = require("path");
const collection = require("./config");
const bcrypt = require('bcrypt');

const app = express();

//tamplate session
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: false
}));

//data dalam bentuk JSON
app.use(express.json());

//static file pada folder public
app.use(express.static("public"));

app.use(flash());

// Middleware to parse urlencoded bodies
app.use(express.urlencoded({ extended: false }));

// mengatur ejs pada folder views
app.set("view engine", "ejs");

//Routing setiap ejs
app.get('/Bandar', (req, res) => {
    res.render("BeritaBandar", { title : "Bandar" })
});

app.get('/Bitcoin', (req,res) => {
    res.render('BeritaBitcoin', { title : 'Bitcoin'})
});

app.get('/Olimpiade', (req,res) => {
    res.render('BeritaOlimpiade', { title : 'Olimpiade'})
});

app.get('/', (req,res) => {
    res.render('MenuUtama', { title : 'Pemilu'})
});

app.get('/login', (req,res) => {
    res.render('Login', { title : 'Login'})
});

app.get('/Register', (req,res) => {
    res.render('Register', { title : 'Login'})
});

app.get('/resetpas', (req,res) =>{
    res.render('resetpas')
});
// Register User
app.post("/Register", async (req, res) => {
    const data = {
        name: req.body.username,
        password: req.body.password,
        email: req.body.email
    }

    try {
        //mengecek apakah sudah terdapat nama dan email yang ada di mongodb database
        const existingUser = await collection.findOne({ $or: [{ name: data.name }, { email: data.email }] });

        if (existingUser) {
            if (existingUser.name === data.name) {
                req.flash('error', 'Username sudah terpakai');
                return res.redirect('/Register');
            }
            if (existingUser.email === data.email) {
                req.flash('error', 'Email sudah terpakai');
                return res.redirect('/Register');
            }
        } else {
            // mengubah password menjadi bentuk hash/ random agar tidak dapat dilihat jika terjadi peretasan pada database
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(data.password, saltRounds);

            // mengubah password menjadi bentuk hash
            data.password = hashedPassword;

            // memasukan data yang sudah terbaru ke database
            await collection.insertMany(data);

            // mengarahkan langsung ke login ketika berhasil register akun
            res.redirect("/Login");
        }
    } catch (error) {
        console.error("Signup Error:", error);
        res.status(500).send("Internal Server Error");
    }
});

// Login user 
app.post("/Login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await collection.findOne({ email });

        if (!user) {
            req.flash('error', 'Email not found');
            return res.redirect('/Login');
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            req.flash('error', 'Wrong Password');
            return res.redirect('/Login');
        }

        // Set user data in session
        req.session.user = user;

        // Redirect to profile page
        res.redirect("/");
    } catch (error) {
        console.error("Login Error:", error);
        req.flash('error', 'Internal Server Error');
        res.redirect('/Login');
    }
});

// Reset Password
app.post("/resetpas", async (req, res) => {
    const { email, newPassword, confirmNewPassword } = req.body;

    try {
        // Check if new password matches confirmation password
        if (newPassword !== confirmNewPassword) {
            req.flash('error', 'Pasword tidak match');
            return res.redirect('/');
        }

        // Find user by email
        const user = await collection.findOne({ email });

        if (!user) {
            req.flash('error', 'Email tidak terdaftar');
                return res.redirect('/');
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update user's password in the database
        await collection.updateOne({ email }, { $set: { password: hashedPassword } });

        req.flash('error', 'Password berhasil diubah');
        res.redirect("/");
    } catch (error) {
        console.error("Reset Password Error:", error);
        res.status(500).send("Internal Server Error");
    }
});

// Profile Page
app.get("/profile", async (req, res) => {
    try {
        // Get user data from session
        const loggedInUser = req.session.user;

        if (!loggedInUser) {
            return res.redirect("/"); // kalau belum login dikirim ke menu login
        }

        // memasukan data user dengan email
        const user = await collection.findOne({ email: loggedInUser.email });

        if (!user) {
            return res.send("User not found");
        }

        res.render("profile", { user }); //menyisipkan data terbaru
    } catch (error) {
        console.error("Profile Page Error:", error);
        res.status(500).send("Internal Server Error");
    }
});

// main.js
app.post("/update-username", async (req, res) => {
    try {
        // Mendapatkan pengguna yang sedang login dari sesi
        const loggedInUser = req.session.user;

        // Perbarui username pengguna dalam database
        await collection.updateOne(
            { _id: loggedInUser._id },
            { $set: { name: req.body.newUsername } }
        );

        // Kirim respon dengan username yang diperbarui
        res.json({ newUsername: req.body.newUsername });
    } catch (error) {
        console.error("Update Username Error:", error);
        res.status(500).send("Internal Server Error");
    }
});


//port website
const port = 3000;
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});