<template>
  <div class="image-gallery">
    <h1>画像ギャラリー</h1>

    <!-- タグ検索フォーム -->
    <div class="search-form">
      <label>レベル1:</label>
      <select v-model="searchTags.level1" @change="onLevel1Change">
        <option value="">-- 全て --</option>
        <option v-for="tag in level1Tags" :key="tag" :value="tag">{{ tag }}</option>
      </select>

      <label>レベル2:</label>
      <select v-model="searchTags.level2" @change="onLevel2Change">
        <option value="">-- 全て --</option>
        <option v-for="tag in level2Tags" :key="tag" :value="tag">{{ tag }}</option>
      </select>

      <label>レベル3:</label>
      <select v-model="searchTags.level3" @change="fetchImages">
        <option value="">-- 全て --</option>
        <option v-for="tag in level3Tags" :key="tag" :value="tag">{{ tag }}</option>
      </select>
    </div>

    <!-- 画像表示 -->
    <div class="gallery">
      <div v-for="image in images" :key="image.name" class="gallery-item">
        <img :src="image.url" :alt="image.name" />
        <p>{{ image.name }}</p>
        <p>{{ image.tags.level1 }} > {{ image.tags.level2 }} > {{ image.tags.level3 }}</p>
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
      searchTags: {
        level1: '',
        level2: '',
        level3: '',
      },
      level1Tags: [],
      level2Tags: [],
      level3Tags: [],
      tagHierarchy: {}, // タグの階層構造
    };
  },
  async mounted() {
    await this.fetchTagHierarchy();
    await this.fetchImages();
  },
  methods: {
    async fetchTagHierarchy() {
      try {
        const response = await axios.get('http://localhost:3000/tags/hierarchy');
        this.tagHierarchy = response.data;

        this.level1Tags = Object.keys(this.tagHierarchy);
      } catch (error) {
        console.error('タグ階層の取得に失敗しました', error);
      }
    },
    async fetchImages() {
      try {
        const { level1, level2, level3 } = this.searchTags;
        const response = await axios.get('http://localhost:3000/images/search', {
          params: { level1, level2, level3 },
        });
        this.images = response.data;
      } catch (error) {
        console.error('画像リストの取得に失敗しました', error);
      }
    },
    onLevel1Change() {
      this.searchTags.level2 = '';
      this.searchTags.level3 = '';
      this.level2Tags = this.searchTags.level1
        ? Object.keys(this.tagHierarchy[this.searchTags.level1] || {})
        : [];
      this.level3Tags = [];
      this.fetchImages();
    },
    onLevel2Change() {
      this.searchTags.level3 = '';
      this.level3Tags = this.searchTags.level2
        ? this.tagHierarchy[this.searchTags.level1][this.searchTags.level2] || []
        : [];
      this.fetchImages();
    },
  },
};
</script>

<style>
.image-gallery {
  padding: 20px;
}

.search-form {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 20px;
}

.gallery-item img {
  max-width: 100%;
  border-radius: 8px;
}
</style>
