<template>
    <div class="image-details">
      <h1>画像詳細</h1>
      <div class="details-left">
        <img src='@\components\images\cropped_image_20241211_14304.png' width="10%" height="10%">
        <img src='@\components\images\cropped_image_20241211_14820.png' width="10%" height="10%">   
        <img src='@\components\images\cropped_image_20241211_142346.png' width="10%" height="10%">

      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
//   export default {
//     props: ['name'], // URL パラメータを受け取る
//     data() {
//       return {
//         image: null,
//       };
//     },
//     async created() {
//       try {
//         const response = await axios.get('http://localhost:3000/images');
//         const images = response.data;
//         this.image = images.find((img) => img.name === this.name);
//       } catch (error) {
//         console.error('画像詳細の取得に失敗しました', error);
//       }
//     },
//   };
  </script>
  
  <style>
  .image-details {
    padding: 20px;
  }
  
  .image-details img {
    max-width: 100%;
    margin-bottom: 20px;
  }
  .gallery-container {
  display: flex;
  gap: 20px;
}
  </style>