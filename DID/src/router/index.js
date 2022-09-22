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
    { path: '/myReferrer', name: 'myReferrer', component: () => import('@/pages/setup/myReferrer') },//邀请码
    { path: '/locality', name: 'locality', component: () => import('@/pages/locality') },//所在地
    { path: '/nation', name: 'nation', component: () => import('@/pages/locality/nation') },//国家
    { path: '/setup/setPassword', name: 'setPassword', component: () => import('@/pages/setup/setPassword') },//修改密码
    { path: '/setup/setEmail', name: 'setEmail', component: () => import('@/pages/setup/setEmail') },//修改邮箱
    // 我的团队
    { path: '/team', name: 'team', component: () => import('@/pages/my/team') },
    // 申请创建社区
    { path: '/communityCreate', name: 'communityCreate', component: () => import('@/pages/my/community/create') },
    // 申请提交成功
    { path: '/communityCreateSuccess', name: 'communityCreateSuccess', component: () => import('@/pages/my/community/success') },
    // 申请审批进度
    { path: '/communityProcess', name: 'communityProcess', component: () => import('@/pages/my/community/process') },
    // 社区审核
    { path: '/communityApproval', name: 'communityApproval', component: () => import('@/pages/my/approval/community') },
    // 认证审批
    { path: '/authenticationApproval', name: 'authenticationApproval', component: () => import('@/pages/my/approval/authentication') },
    // 社区信息
    { path: '/communitySetting', name: 'communitySetting', component: () => import('@/pages/my/community/setting') },
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
