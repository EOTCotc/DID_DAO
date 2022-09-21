import Vue from 'vue';
import VueRouter from 'vue-router';
import Cookies from 'js-cookie'
Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    { path: '/', name: 'home', component: () => import('@/pages/home') },
    { path: '/login', name: 'login', component: () => import('@/pages/login') },
    { path: '/my', name: 'my', component: () => import('@/pages/my') },
    { path: '/bindRelation', name: 'bindRelation', component: () => import('@/pages/bindRelation') },
    { path: '/bindNation', name: 'bindNation', component: () => import('@/pages/bindRelation/bindNation') },
    { path: '/community', name: 'community', component: () => import('@/pages/bindRelation/community') },
    { path: '/setup', name: 'setup', component: () => import('@/pages/setup') },
    { path: '/myReferrer', name: 'myReferrer', component: () => import('@/pages/setup/myReferrer') },
    { path: '/locality', name: 'locality', component: () => import('@/pages/locality') },//所在地
    { path: '/nation', name: 'nation', component: () => import('@/pages/locality/nation') },//国家
  ]
});

router.beforeEach((to, from, next) => {
  next()
});

export default router;
