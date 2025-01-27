<template>
    <div class="image-cropper-container">
      <div class="upload-container">
        <input type="file" @change="onImageUpload" accept="image/*" />
      </div>
      <div class="cropper-wrapper" :style="{ width: `${width}px`, height: `${height}px` }">
        <img 
          ref="imageRef" 
          :src="currentImageUrl" 
          :style="{ width: `${width}px`, height: `${height}px`, objectFit: 'cover' }"
        />
      </div>
      <div class="button-group">
        <button @click="performCropping">クリッピング</button>
        <button 
          v-if="croppedImageUrl" 
          @click="downloadImage" 
          class="download-button"
        >
          次のクリッピング場所へ
        </button>
        <button 
          v-if="croppedImageUrl" 
          @click="downloadCoordinates" 
          class="coordinates-download-button"
        >
          アップロード
        </button>
        <button 
          v-if="croppedImageUrl" 
          @click="downloadCoordinates" 
          class="reset-button"
        >
          リセット
        </button>
      </div>
      <div class="preview-container">
        <img 
          v-if="croppedImageUrl" 
          :src="croppedImageUrl" 
          alt="Cropped Image" 
          class="preview-image"
        />
      </div>
      <div v-if="croppedImageInfo" class="image-info">
        <h3>画像情報</h3>
        <p>幅: {{ croppedImageInfo.width }}px</p>
        <p>高さ: {{ croppedImageInfo.height }}px</p>
        <h3>クリッピング座標</h3>
        <p>開始座標 (X1, Y1): 
          ({{ Math.round(cropCoordinates.x1) }}, 
           {{ Math.round(cropCoordinates.y1) }})
        </p>
        <p>終了座標 (X2, Y2): 
          ({{ Math.round(cropCoordinates.x2) }}, 
           {{ Math.round(cropCoordinates.y2) }})
        </p>
        <p>クロップサイズ: 
          {{ Math.round(cropCoordinates.x2 - cropCoordinates.x1) }}px × 
          {{ Math.round(cropCoordinates.y2 - cropCoordinates.y1) }}px
        </p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, onUnmounted, watch } from 'vue'
  import Cropper from 'cropperjs'
  import 'cropperjs/dist/cropper.css'
  
  // Props with default values
  const props = defineProps({
    imageUrl: {
      type: String,
      default: 'https://publicdomainq.net/images/201906/22s/publicdomainq-0035692dzs.jpg'
    },
    width: {
      type: Number,
      default: 1000
    },
    height: {
      type: Number,
      default: 600
    }
  })
  
  // Refs
  const imageRef = ref(null)
  const cropperInstance = ref(null)
  const croppedImageUrl = ref(null)
  const croppedImageInfo = ref(null)
  const cropCoordinates = ref({
    x1: 0,
    y1: 0,
    x2: 0,
    y2: 0
  })
  const currentImageUrl = ref(props.imageUrl)
  
  // Handle image upload
  const onImageUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        currentImageUrl.value = e.target.result
        if (cropperInstance.value) {
          cropperInstance.value.replace(currentImageUrl.value)
        }
      }
      reader.readAsDataURL(file)
    }
  }
  
  // Perform cropping
  const performCropping = () => {
    if (cropperInstance.value) {
      const cropBoxData = cropperInstance.value.getCropBoxData()
      const canvasData = cropperInstance.value.getCanvasData()
  
      cropCoordinates.value = {
        x1: cropBoxData.left - canvasData.left,
        y1: cropBoxData.top - canvasData.top,
        x2: cropBoxData.left - canvasData.left + cropBoxData.width,
        y2: cropBoxData.top - canvasData.top + cropBoxData.height
      }
  
      const canvas = cropperInstance.value.getCroppedCanvas()
      const dataUrl = canvas.toDataURL()
      croppedImageUrl.value = dataUrl
  
      croppedImageInfo.value = {
        width: canvas.width,
        height: canvas.height
      }
    }
  }
  
  // Download cropped image
  const downloadImage = () => {
    if (croppedImageUrl.value) {
      const link = document.createElement('a')
      link.href = croppedImageUrl.value
      const date = new Date()
      const filename = `cropped_image_${date.getFullYear()}${date.getMonth() + 1}${date.getDate()}_${date.getHours()}${date.getMinutes()}${date.getSeconds()}.png`
      link.download = filename
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }
  
  // Download coordinates as text file
  const downloadCoordinates = () => {
    if (cropCoordinates.value) {
      const coordinatesText = `クリッピング座標情報:
  開始座標 (X1, Y1): (${Math.round(cropCoordinates.value.x1)}, ${Math.round(cropCoordinates.value.y1)})
  終了座標 (X2, Y2): (${Math.round(cropCoordinates.value.x2)}, ${Math.round(cropCoordinates.value.y2)})
  クロップサイズ: ${Math.round(cropCoordinates.value.x2 - cropCoordinates.value.x1)}px × ${Math.round(cropCoordinates.value.y2 - cropCoordinates.value.y1)}px
  画像幅: ${croppedImageInfo.value.width}px
  画像高さ: ${croppedImageInfo.value.height}px
  ダウンロード日時: ${new Date().toLocaleString()}`
  
      const blob = new Blob([coordinatesText], { type: 'text/plain' })
      const link = document.createElement('a')
      link.href = URL.createObjectURL(blob)
      const date = new Date()
      const filename = `cropping_coordinates_${date.getFullYear()}${date.getMonth() + 1}${date.getDate()}_${date.getHours()}${date.getMinutes()}${date.getSeconds()}.txt`
      link.download = filename
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(link.href)
    }
  }
  
  // Initialize Cropper on component mount
  onMounted(() => {
    if (imageRef.value) {
      cropperInstance.value = new Cropper(imageRef.value, {
        aspectRatio: NaN,
        viewMode: 1,
        guides: true,
        background: false
      })
    }
  })
  
  // Clean up Cropper instance on component unmount
  onUnmounted(() => {
    if (cropperInstance.value) {
      cropperInstance.value.destroy()
    }
  })
  </script>
  
  <style scoped>
  .image-cropper-container {
    max-width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .cropper-wrapper {
    margin-bottom: 20px;
  }
  
  .button-group {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
  }
  
  .preview-container {
    margin-top: 20px;
    max-width: 100%;
  }
  
  .preview-image {
    max-width: 100%;
    height: auto;
  }
  
  .image-info {
    margin-top: 10px;
    text-align: center;
    background-color: #f4f4f4;
    padding: 15px;
    border-radius: 8px;
  }
  
  button {
    padding: 10px 20px;
    color: black;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .download-button {
    background-color: #2196F3;
  }
  
  .reset-button {
    background-color: #21f3bf;
  }
  .download-button:hover {
    background-color: #1976D2;
  }
  
  .coordinates-download-button {
    background-color: #4CAF50;
  }
  
  .coordinates-download-button:hover {
    background-color: #45a049;
  }
  </style>