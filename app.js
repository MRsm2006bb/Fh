const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.static('public'));

// إعداد التخزين
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'public/videos'),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const fileName = Date.now() + ext;
    cb(null, fileName);
  }
});

const upload = multer({ storage });

// رفع الفيديو
app.post('/upload', upload.single('video'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'لم يتم رفع أي ملف' });
  }
  const fileUrl = `${req.protocol}://${req.get('host')}/videos/${req.file.filename}`;
  res.json({ url: fileUrl });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
