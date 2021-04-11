import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const ArtistDetail = ()=> import('@/views/pages/ArtistDetail')
const AlbumDetail = ()=> import('@/views/pages/AlbumDetail')
const SearchDetail = () => import('@/views/pages/SearchDetail')

const routes = [
  {  path: '/',  redirect: '/artist' },

  { path: '/artist' , component: ArtistDetail },

  { path: '/album/:name' , component: AlbumDetail },
  
  { path: '/search' , component: SearchDetail },

  {
    path: '/test',
    component: () => import('@/test')
  },

]

const router = new VueRouter({
  routes,
  mode: 'hash'
})

export default router
