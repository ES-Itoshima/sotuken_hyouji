<template>
  <div class="image-gallery">
    <h1>画像ギャラリー</h1>

    <!-- タグ階層でのフィルタリング -->
    <div class="tag-hierarchy">
      <h2>タグでフィルタリング</h2>
      <div v-for="(tags, level) in tagHierarchy" :key="level" class="tag-level">
        <h3>Level {{ level }}</h3>
        <ul>
          <li
            v-for="tag in tags"
            :key="tag"
            :class="{ active: selectedTags[level] === tag }"
            @click="filterByTag(level, tag)"
          >
            {{ tag }}
          </li>
        </ul>
      </div>
    </div>

    <!-- ギャラリーの表示 -->
    <div class="gallery">
      <div v-for="image in filteredImages" :key="image.id" class="gallery-item">
        <img :src="image.url" :alt="image.tags.level3" />
        <p>
          {{ image.tags.level1 }} > {{ image.tags.level2 }} > {{ image.tags.level3 }}
        </p>
      </div>
    </div>

    <!-- フィルタが何もヒットしない場合 -->
    <p v-if="filteredImages.length === 0">該当する画像がありません。</p>
  </div>
</template>

<script>
import { useImageStore } from "../stores/imageStore";

export default {
  data() {
    return {
      tagHierarchy: {
        1: ["動物", "植物", "鉱物"],
        2: ["哺乳類", "爬虫類", "鳥類", "花", "木", "草"],
        3: ["猫", "犬", "馬", "カラス", "バラ", "松"],
      },
      selectedTags: {
        1: null,
        2: null,
        3: null,
      },
    };
  },
  computed: {
    // Piniaから画像データを取得
    images() {
      const store = useImageStore();
      return store.images;
    },
    // フィルタリングされた画像を計算
    filteredImages() {
      return this.images.filter((image) => {
        const { level1, level2, level3 } = this.selectedTags;
        return (
          (!level1 || image.tags.level1 === level1) &&
          (!level2 || image.tags.level2 === level2) &&
          (!level3 || image.tags.level3 === level3)
        );
      });
    },
  },
  methods: {
    filterByTag(level, tag) {
      this.selectedTags[level] = tag;

      // 選択した階層より下の階層をリセット
      for (let i = level + 1; i <= 3; i++) {
        this.selectedTags[i] = null;
      }
    },
  },
};
</script>

<style>
.image-gallery {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.tag-hierarchy {
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
}

.tag-level {
  flex: 1;
}

.tag-level ul {
  list-style: none;
  padding: 0;
}

.tag-level li {
  cursor: pointer;
  padding: 5px 10px;
  border: 1px solid #ccc;
  margin: 5px 0;
  border-radius: 5px;
  text-align: center;
  background-color: #f9f9f9;
}

.tag-level li.active {
  background-color: #42b983;
  color: white;
}

.tag-level li:hover {
  background-color: #e0e0e0;
}

.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 20px;
}

.gallery-item img {
  max-width: 100%;
  border-radius: 5px;
}

.gallery-item p {
  text-align: center;
  margin-top: 5px;
  font-size: 0.9rem;
}
</style>
