<template>
  <div id="app">
    <h1>画像トリミングアプリケーション</h1>
    <ImageCropper 
      :image-url="selectedImage"
      :width="400"
      :height="300"
    />
    <div class="image-selection">
      </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import ImageCropper from '@/components/components/cropping.vue'

</script>