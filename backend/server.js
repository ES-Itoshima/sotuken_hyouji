const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());

// アップロードディレクトリのパス
const uploadDir = path.join(__dirname, 'uploads');

// アップロードディレクトリが存在しない場合、作成
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// 画像保存用の設定
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// 画像アップロードエンドポイント
app.post('/upload', upload.single('image'), (req, res) => {
  const tags = req.body.tags;
  const filePath = req.file ? req.file.path : null;

  if (!filePath || !tags) {
    return res.status(400).json({ message: '画像またはタグが提供されていません' });
  }

  res.json({
    message: '画像が正常にアップロードされました',
    tags: tags.split(',').map((tag) => tag.trim()),
    filePath: `/uploads/${path.basename(filePath)}`, // クライアント用のパス
  });
});

// アップロードされた画像の一覧を取得
app.get('/images', (req, res) => {
  fs.readdir(uploadDir, (err, files) => {
    if (err) {
      return res.status(500).json({ message: '画像リストの取得に失敗しました' });
    }

    const images = files.map((file) => ({
      name: file,
      url: `http://localhost:3000/uploads/${file}`,
    }));

    res.json(images);
  });
});

// 静的ファイルの提供
app.use('/uploads', express.static(uploadDir));

// サーバー起動
app.listen(3000, () => {
  console.log('サーバーが http://localhost:3000 で起動しました');
});
