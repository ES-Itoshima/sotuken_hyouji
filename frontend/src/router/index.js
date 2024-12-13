import { createRouter, createWebHistory } from 'vue-router';
import ImageUploader from '../components/ImageUploader.vue';
import ImageGallery from '../components/ImageGallery.vue';

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
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
