<template>
  <div class="image-uploader">
    <h1>画像アップロード</h1>
    <form @submit.prevent="handleUpload">
      <input type="file" @change="handleFileChange" accept="image/*" />
      <input type="text" v-model="tags" placeholder="タグ (カンマ区切り)" />
      <button type="submit">アップロード</button>
    </form>
    <div v-if="uploadResponse">
      <p>{{ uploadResponse.message }}</p>
      <img v-if="uploadResponse.filePath" :src="uploadResponse.filePath" alt="アップロード画像" />
    </div>
  </div>
</template>

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
