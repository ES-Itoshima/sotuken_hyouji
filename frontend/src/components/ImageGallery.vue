<template>
  <div class="image-gallery">
    <div class="gallery-container">
      <!-- 左側: 検索フォームと画像ギャラリー -->
      <div class="gallery-left">
        <h1>画像ギャラリー</h1>

        <!-- タグ検索フォーム -->
        <div class="search-form">
          <label>テーマ:</label>
          <select v-model="searchTags.level1" @change="onLevel1Change">
            <option value="">-- 全て --</option>
            <option v-for="tag in level1Tags" :key="tag" :value="tag">{{ tag }}</option>
          </select>

          <label>サブカテゴリ:</label>
          <select v-model="searchTags.level2" @change="onLevel2Change">
            <option value="">-- 全て --</option>
            <option v-for="tag in level2Tags" :key="tag" :value="tag">{{ tag }}</option>
          </select>

          <label>詳細タグ:</label>
          <select v-model="searchTags.level3" @change="fetchImages">
            <option value="">-- 全て --</option>
            <option v-for="tag in level3Tags" :key="tag" :value="tag">{{ tag }}</option>
          </select>
        </div>

        <!-- 画像表示 -->
        <div class="gallery">
          <div 
          v-for="image in images" 
          :key="image.name" 
          class="gallery-item"
          @click="navigateToDetails(image.name)"
          >
            <img :src="image.url" :alt="image.name" />
            <p>{{ image.name }}</p>
            <p>{{ image.tags.level1 }} > {{ image.tags.level2 }} > {{ image.tags.level3 }}</p>
          </div>
        </div>
      </div>

      <!-- 右側: 現在のタグ構造 -->
      <div class="gallery-right">
  <h2>現在のタグ構造</h2>
  <div class="tag-markdown" v-html="generateTagMarkdown(tagHierarchy, searchTags)"></div>
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
    navigateToDetails(imageName) {
      this.$router.push({ name: 'ImageDetails', params: { name: imageName } });
    },
    generateTagMarkdown(hierarchy, selectedTags) {
    const buildMarkdown = (level, prefix = '') => {
      let markdown = '';
      for (const key in level) {
        const isSelected =
          (prefix === '' && key === selectedTags.level1) ||
          (prefix.includes('│') && key === selectedTags.level2) ||
          (prefix.includes('├') && level[key].includes(selectedTags.level3));

        const line = `${prefix}<span class="${isSelected ? 'selected-tag' : ''}">${key}</span>`;
        markdown += `${line}\n`;

        if (typeof level[key] === 'object' && !Array.isArray(level[key])) {
          markdown += buildMarkdown(level[key], `${prefix}│   `);
        } else if (Array.isArray(level[key])) {
          level[key].forEach((subTag) => {
            const subSelected = subTag === selectedTags.level3;
            markdown += `${prefix}├── <span class="${subSelected ? 'selected-tag' : ''}">${subTag}</span>\n`;
          });
        }
      }
      return markdown;
    };
    return buildMarkdown(hierarchy);
  },
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

.tag-markdown {
  background-color: #f4f4f4;
  border: 1px solid #ddd;
  padding: 10px;

  font-family: monospace;
  white-space: pre-wrap;
  overflow-x: auto;
}

.selected-tag {
  font-weight: bold;
  color: #ffffff;
  background-color: #4caf50;
  padding: 2px 4px;
  border-radius: 4px;
}

.image-gallery {
  padding: 20px;
}

.gallery-container {
  display: flex;
  gap: 20px;
}

.gallery-left {
  flex: 3;
}

.gallery-right {
  flex: 1;
  text-align: left;
  border-left: 1px solid #ddd;
  padding-left: 20px;
}

.search-form {
  display: flex;
  flex-direction: column;
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

.gallery-right ul {
  list-style-type: none;
  padding: 0;
}

.gallery-right li {
  margin-bottom: 10px;
}

.selected {
  font-weight: bold;
  color: #4caf50;
}
</style>
