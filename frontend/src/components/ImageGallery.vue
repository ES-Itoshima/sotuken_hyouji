<template>
  <div class="image-gallery">
    <h1>画像ギャラリー</h1>
    <div class="gallery">
      <div v-for="image in images" :key="image.name" class="gallery-item">
        <img :src="image.url" :alt="image.name" />
        <p>{{ image.name }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      images: [],
    };
  },
  async mounted() {
    try {
      const response = await axios.get('http://localhost:3000/images');
      this.images = response.data;
    } catch (error) {
      console.error('画像リストの取得に失敗しました', error);
    }
  },
};
</script>

<style>
.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 20px;
}

.gallery-item img {
  max-width: 100%;
  border-radius: 5px;
}
</style>
