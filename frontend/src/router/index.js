import { createRouter, createWebHistory } from 'vue-router';
import ImageUploader from '../components/ImageUploader.vue';
import ImageGallery from '../components/ImageGallery.vue';
import Cropping from '../components/cropping.vue';
import ImageDetails from '../components/ImageDetails.vue';
import senjukou from '../components/senjukou.vue';
import gallery_intro from '../components/Introduce_Ga.vue';
import route from '../components/route.vue';
import Introduce_kenkyuu from '../components/introduce_kenkyuu.vue';



const routes = [
  {
    path: '/',
    name: 'Uploader',
    component: ImageUploader,
  },
  {
    path: '/introkenkyu',
    name: 'introkenkyu',
    component: Introduce_kenkyuu,
  },
  {
    path: '/route',
    name: 'route',
    component: route,
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
  {
    path: '/senjukou',
    name: 'senjukou',
    component: senjukou,
  },
  {
    path: '/gallery_intro',
    name: 'gyallery_intro',
    component: gallery_intro,
  },
  {
    path: '/image/:name',
    name: 'ImageDetails',
    component: ImageDetails,
    props: true, // パラメータをコンポーネントに渡す
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
