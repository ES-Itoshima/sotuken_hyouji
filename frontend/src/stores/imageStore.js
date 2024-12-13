import { defineStore } from 'pinia';

export const useImageStore = defineStore('imageStore', {
  state: () => ({
    images: [], // アップロードされた画像データ
  }),
  actions: {
    addImage(image) {
      this.images.push(image); // 新しい画像をストアに追加
    },
  },
});
