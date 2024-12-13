const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// 画像保存用の設定
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// アップロード処理のエンドポイント
app.post('/upload', upload.single('image'), (req, res) => {
  const tags = req.body.tags;
  const filePath = req.file ? req.file.path : null;

  if (!filePath || !tags) {
    return res.status(400).json({ message: '画像またはタグが提供されていません' });
  }

  res.json({
    message: '画像が正常にアップロードされました',
    tags: tags.split(',').map((tag) => tag.trim()),
    filePath,
  });
});

// サーバー起動
app.listen(3000, () => {
  console.log('サーバーが http://localhost:3000 で起動しました');
});
