const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const fs = require('fs');
const collection = require('./config');

// Menghubungkan ke database
mongoose.connect('mongodb://localhost:27017/Berita_Crud', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Fungsi untuk mengimpor data admin
const importAdmin = async () => {
    try {
        // Baca JSON file
        const data = fs.readFileSync('account.json', 'utf-8');
        const adminData = JSON.parse(data);

        // Hash password admin
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(adminData.password, saltRounds);
        adminData.password = hashedPassword;

        // Simpan admin ke database
        const admin = new collection(adminData); // Gunakan nama variabel `collection`
        await admin.save();

        console.log('Admin berhasil diimpor ke database');
    } catch (error) {
        console.error('Gagal mengimpor admin:', error);
    } finally {
        
        mongoose.connection.close();
    }
};


importAdmin();
