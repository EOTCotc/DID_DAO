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
    // 推荐人绑定
    { path: '/bindRelation/community', name: 'bindRelationCommunity', component: () => import('@/pages/bindRelation/community') },
    // 我的团队
    { path: '/my/team', name: 'team', component: () => import('@/pages/my/team') },
    // 我的社区
    { path: '/my/community', name: 'community', component: () => import('@/pages/my/community') },
    // 申请创建社区
    { path: '/my/community/create', name: 'communityCreate', component: () => import('@/pages/my/community/create') },
    // 申请提交成功
    { path: '/my/community/create/success', name: 'communityCreateSuccess', component: () => import('@/pages/my/community/success') },
    // 申请审批进度
    { path: '/my/community/process', name: 'communityProcess', component: () => import('@/pages/my/community/process') },
    // 社区审核
    { path: '/my/approval/community', name: 'approvalCommunity', component: () => import('@/pages/my/approval/community') },
    // 认证审批
    { path: '/my/approval/authentication', name: 'approvalAuthentication', component: () => import('@/pages/my/approval/authentication') },
    // 社区信息
    { path: '/my/community/setting', name: 'communitySetting', component: () => import('@/pages/my/community/setting') },
  ]
});

router.beforeEach((to, from, next) => {
  if (!Cookies.get('token')) {//未登录
    if (to.path === '') {
      next('/login')
    } else {
      next()
    }
  } else {
    next()
  }
});

export default router;
