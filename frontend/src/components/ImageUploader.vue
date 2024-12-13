<template>
  <div class="image-uploader">
    <h1>画像アップロード＆タグ付け</h1>
    <form @submit.prevent="handleUpload">
      <div>
        <label for="image">画像を選択</label>
        <input type="file" id="image" @change="handleFileChange" accept="image/*" />
      </div>

      <div>
        <label>タグを選択</label>
        <div>
          <select v-model="selectedTags.level1" @change="fetchLevel2Tags">
            <option disabled value="">-- 第1階層を選択 --</option>
            <option v-for="tag in tags.level1" :key="tag" :value="tag">{{ tag }}</option>
          </select>
        </div>

        <div v-if="selectedTags.level1">
          <select v-model="selectedTags.level2" @change="fetchLevel3Tags">
            <option disabled value="">-- 第2階層を選択 --</option>
            <option v-for="tag in tags.level2" :key="tag" :value="tag">{{ tag }}</option>
          </select>
        </div>

        <div v-if="selectedTags.level2">
          <select v-model="selectedTags.level3">
            <option disabled value="">-- 第3階層を選択 --</option>
            <option v-for="tag in tags.level3" :key="tag" :value="tag">{{ tag }}</option>
          </select>
        </div>
      </div>

      <button type="submit">アップロード</button>
    </form>

    <div v-if="preview">
      <h2>プレビュー</h2>
      <img :src="preview" alt="画像プレビュー" style="max-width: 100%; height: auto;" />
    </div>
  </div>
</template>

<script>
import { useImageStore } from '../stores/imageStore';

export default {
  data() {
    return {
      file: null,
      preview: null,
      selectedTags: {
        level1: '',
        level2: '',
        level3: '',
      },
      tags: {
        level1: ['動物', '植物', '鉱物'],
        level2: [],
        level3: [],
      },
    };
  },
  methods: {
    handleFileChange(event) {
      const selectedFile = event.target.files[0];
      if (selectedFile) {
        this.file = selectedFile;

        // プレビュー表示のためのBlob URL作成
        this.preview = URL.createObjectURL(selectedFile);
      }
    },
    fetchLevel2Tags() {
      const level2Options = {
        動物: ['哺乳類', '爬虫類', '鳥類'],
        植物: ['花', '木', '草'],
        鉱物: ['金属', '非金属', '宝石'],
      };
      this.tags.level2 = level2Options[this.selectedTags.level1] || [];
      this.selectedTags.level2 = '';
      this.tags.level3 = [];
      this.selectedTags.level3 = '';
    },
    fetchLevel3Tags() {
      const level3Options = {
        哺乳類: ['猫', '犬', '馬'],
        爬虫類: ['蛇', 'トカゲ', 'ワニ'],
        鳥類: ['カラス', 'スズメ', 'フクロウ'],
        花: ['バラ', 'チューリップ', 'ヒマワリ'],
        木: ['松', '桜', 'カエデ'],
        草: ['シロツメクサ', 'ススキ', 'クローバー'],
        金属: ['鉄', '銅', '金'],
        非金属: ['石炭', '硫黄', 'グラファイト'],
        宝石: ['ダイヤモンド', 'ルビー', 'サファイア'],
      };
      this.tags.level3 = level3Options[this.selectedTags.level2] || [];
      this.selectedTags.level3 = '';
    },
    handleUpload() {
      if (!this.file || !this.selectedTags.level1 || !this.selectedTags.level2 || !this.selectedTags.level3) {
        alert('画像とすべてのタグを選択してください');
        return;
      }

      const store = useImageStore();
      const image = {
        id: Date.now(),
        url: this.preview,
        tags: { ...this.selectedTags },
      };
      store.addImage(image); // Piniaストアに保存

      alert('画像がアップロードされました！');
      this.file = null;
      this.preview = null;
      this.selectedTags = { level1: '', level2: '', level3: '' };
    },
  },
};
</script>
