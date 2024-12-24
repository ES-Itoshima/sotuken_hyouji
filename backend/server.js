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

// タグ解析関数
const parseTags = (filename) => {
  const baseName = path.basename(filename, path.extname(filename));
  const parts = baseName.split('_');
  return {
    level1: parts[0] || null,
    level2: parts[1] || null,
    level3: parts[2] || null,
  };
};

// 画像アップロードエンドポイント
app.post('/upload', upload.single('image'), (req, res) => {
  const filePath = req.file ? req.file.path : null;

  if (!filePath) {
    return res.status(400).json({ message: '画像が提供されていません' });
  }

  const tags = parseTags(req.file.filename);

  res.json({
    message: '画像が正常にアップロードされました',
    tags,
    filePath: `/uploads/${path.basename(filePath)}`,
  });
});

app.get('/images/search', (req, res) => {
  const { level1, level2, level3 } = req.query;

  fs.readdir(uploadDir, (err, files) => {
    if (err) {
      return res.status(500).json({ message: '画像リストの取得に失敗しました' });
    }

    const images = files
      .map((file) => {
        const tags = parseTags(file);
        return {
          name: file,
          tags,
          url: `http://localhost:3000/uploads/${file}`,
        };
      })
      .filter((image) => {
        return (
          (!level1 || image.tags.level1 === level1) &&
          (!level2 || image.tags.level2 === level2) &&
          (!level3 || image.tags.level3 === level3)
        );
      });

    res.json(images);
  });
});

// 全画像と階層化されたタグを取得
app.get('/tags/hierarchy', (req, res) => {
  fs.readdir(uploadDir, (err, files) => {
    if (err) {
      return res.status(500).json({ message: '画像リストの取得に失敗しました' });
    }

    const hierarchy = {};
    files.forEach((file) => {
      const tags = parseTags(file);
      if (!tags.level1) return;

      if (!hierarchy[tags.level1]) hierarchy[tags.level1] = {};
      if (tags.level2) {
        if (!hierarchy[tags.level1][tags.level2]) hierarchy[tags.level1][tags.level2] = [];
        if (tags.level3) hierarchy[tags.level1][tags.level2].push(tags.level3);
      }
    });

    res.json(hierarchy);
  });
});

// 静的ファイルの提供
app.use('/uploads', express.static(uploadDir));

// サーバー起動
app.listen(3000, () => {
  console.log('サーバーが http://localhost:3000 で起動しました');
});
