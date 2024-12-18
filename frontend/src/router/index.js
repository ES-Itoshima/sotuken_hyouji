import { createRouter, createWebHistory } from 'vue-router';
import ImageUploader from '../components/ImageUploader.vue';
import ImageGallery from '../components/ImageGallery.vue';
import Cropping from '../components/cropping.vue';


const routes = [
  {
    path: '/',
    name: 'Uploader',
    component: ImageUploader,
  },
  {
    path: '/gallery',
    name: 'Gallery',
    component: ImageGallery,
  },
  {
    path: '/cropping',
    name: 'cropping',
    component: Cropping,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
