const fs = require('fs');
const phos = "http://localhost:5000/api/images/photo-1710501873506.jpg"
const photoPath = `uploads/photos/${contact.id}.jpg`; // Atur path foto sesuai dengan struktur penyimpanan Anda
        if (fs.existsSync(photoPath)) {
            fs.unlinkSync(photoPath); // Hapus foto dari penyimpanan
        }