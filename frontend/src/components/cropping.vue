<template>
    <div id="app">
      <h1>画像トリミングアプリケーション</h1>
      <ImageCropper 
        :image-url="selectedImage"
        :width="400"
        :height="300"
      />
      <div class="image-selection">
        <h2>サンプル画像を選択</h2>
        <div class="image-buttons">
          <button 
            v-for="(image, index) in sampleImages" 
            :key="index"
            @click="selectImage(image)"
            :class="{ active: selectedImage === image }"
          >
            画像 {{ index + 1 }}
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import ImageCropper from '@/components/cropping.vue'
  
  // サンプル画像のURL配列
  const sampleImages = [
    'https://cdn.pixabay.com/photo/2023/03/25/09/51/cat-7875506_960_720.jpg',
    'https://cdn.pixabay.com/photo/2024/01/12/14/18/bird-8505120_960_720.jpg',
    'https://cdn.pixabay.com/photo/2024/02/20/16/40/ai-generated-8584294_960_720.jpg'
  ]
  
  </script>