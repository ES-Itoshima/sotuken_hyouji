<template>
    <div class="image-details">
      <h1>画像詳細</h1>
      <div class="details-left">
        <img src='@\components\images\美艶仙女香_説明_1.jpg' width="30%" height="30%">
      </div>
      <div class="details-right">
        <div>
            <p><strong>発行年:</strong> 不明</p>
            <p><strong>著者:</strong> 勇斎（歌川）国芳</p>
            <p><strong>タイトル:</strong> 片岡市蔵 仙女香 引札</p>
            <p><strong>アノテーション:</strong> 引札に書くという形で仙女香の宣伝がなされている</p>
            <p><strong>クリッピング</strong> 引札に書くという形で仙女香の宣伝がなされている</p>
            <img src='@\components\images\crip.png' width="30%" height="30%">
        </div>
      </div>
      <button @click="$router.back()">戻る</button>
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
  
