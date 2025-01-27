<template>
  <div class="image-uploader">
    <h1>メタデータアップロードページ</h1>
    <div class="uploader-container">
      <div class="image-preview">
        <h2>プレビュー</h2>
          <img src='@\components\images\美艶仙女香_説明_1.jpg' width="80%" height="80%">
          <div class="clip-buttons">
          <button @click="selectClip(1)">クリッピング1</button>
          <button @click="selectClip(2)">クリッピング2</button>
          <button @click="selectClip(3)">クリッピング3</button>
        </div>
      </div>
      <form @submit.prevent="handleUpload" class="upload-form">
        <div class="form-group">
          <label for="title">タイトル:</label>
          <input id="title" type="text" v-model="title" placeholder="タイトル" />
        </div>
        <div class="form-group">
          <label for="theme">テーマ:</label>
          <input id="theme" type="text" v-model="themeTag" placeholder="テーマを入力" />
        </div>
        <div class="form-group">
          <label for="subcategory">サブカテゴリ:</label>
          <input id="subcategory" type="text" v-model="subCategoryTag" placeholder="サブカテゴリを入力" />
        </div>
        <div class="form-group">
          <label for="detailed-tags">詳細タグ:</label>
          <input id="detailed-tags" type="text" v-model="detailedTags" placeholder="詳細タグを入力" />
        </div>
        <div class="form-group">
          <label for="year">発行年:</label>
          <input id="year" type="text" v-model="year" placeholder="発行年" />
        </div>

        <div class="form-group">
          <label for="author">作者:</label>
          <input id="author" type="text" v-model="author" placeholder="作者" />
        </div>
        <div class="form-group">
          <label for="annotation">アノテーション:</label>
          <textarea id="annotation" v-model="annotation" placeholder="アノテーションを入力"></textarea>
        </div>
        <button type="submit">アップロード</button>
      </form>
    </div>
    <div v-if="uploadResponse" class="upload-response">
      <p>{{ uploadResponse.message }}</p>
      <img v-if="uploadResponse.filePath" :src="uploadResponse.filePath" alt="アップロード画像" />
    </div>
    <div class="back-to-top">
      <button @click="scrollToTop">クリッピングに戻る</button>
    </div>
  </div>
</template>

<style scoped>
.back-to-top {
  margin-top: 20px;
  text-align: center;
}

.back-to-top button {
  padding: 10px 20px;
  font-size: 1em;
  color: white;
  background-color: gray;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.back-to-top button:hover {
  background-color: #0056b3;
}
.clip-buttons {
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  gap: 10px;
}

.clip-buttons button {
  flex: 1;
  padding: 10px;
  font-size: 1em;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.clip-buttons button:hover {
  background-color: #0056b3;
}
.image-uploader {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h1 {
  font-size: 1.5em;
  margin-bottom: 20px;
  text-align: center;
}

.uploader-container {
  display: flex;
  gap: 20px;
}

.image-preview {
  flex: 1;
  text-align: center;
}

.image-preview-box {
  margin-top: 10px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #fff;
}

.image-preview img {
  max-width: 100%;
  height: auto;
  border-radius: 4px;
}

.upload-form {
  flex: 1;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input, textarea, button {
  width: 100%;
  padding: 8px;
  font-size: 1em;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

textarea {
  resize: vertical;
  height: 80px;
}

button {
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

.upload-response {
  margin-top: 20px;
  text-align: center;
}

.upload-response img {
  max-width: 100%;
  height: auto;
  border: 1px solid #ddd;
  border-radius: 4px;
}
</style>



<script>
import axios from 'axios';

export default {
  data() {
    return {
      file: null,
      tags: '',
      uploadResponse: null,
    };
  },
  methods: {
    handleFileChange(event) {
      this.file = event.target.files[0];
    },
    async handleUpload() {
      if (!this.file || !this.tags) {
        alert('画像とタグを入力してください');
        return;
      }

      const formData = new FormData();
      formData.append('image', this.file);
      formData.append('tags', this.tags);

      try {
        const response = await axios.post('http://localhost:3000/upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        this.uploadResponse = response.data;
      } catch (error) {
        console.error(error);
        alert('アップロードに失敗しました');
      }
    },
  },
};
</script>
