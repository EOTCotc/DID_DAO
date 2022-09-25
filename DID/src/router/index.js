import Vue from 'vue';
import VueRouter from 'vue-router';
import Cookies from 'js-cookie'
Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    { path: '/', name: 'home', component: () => import('@/pages/home') },//首页
    { path: '/login', name: 'login', component: () => import('@/pages/login') },//登录
    { path: '/my', name: 'my', component: () => import('@/pages/my') },//我的
    { path: '/bindRelation', name: 'bindRelation', component: () => import('@/pages/bindRelation') },//绑定位置
    { path: '/bindNation', name: 'bindNation', component: () => import('@/pages/bindRelation/bindNation') },//绑定国家
    { path: '/setup', name: 'setup', component: () => import('@/pages/setup') },//账号设置
    { path: '/bindRelation/bindCommunity', name: 'bindCommunity', component: () => import('@/pages/bindRelation/bindCommunity') },// 推荐人绑定
    { path: '/myReferrer', name: 'myReferrer', component: () => import('@/pages/setup/myReferrer') },//邀请码
    { path: '/locality', name: 'locality', component: () => import('@/pages/locality') },//所在地
    { path: '/nation', name: 'nation', component: () => import('@/pages/locality/nation') },//国家
    { path: '/setup/setPassword', name: 'setPassword', component: () => import('@/pages/setup/setPassword') },//修改密码
    { path: '/setup/setEmail', name: 'setEmail', component: () => import('@/pages/setup/setEmail') },//修改邮箱
    {
      path: '/setup/logout', name: 'logout', redirect: '/setup/logout/confInfo', component: () => import('@/pages/logout'),//注销
      children: [
        { path: 'confInfo', name: 'confInfo', component: () => import('@/pages/logout/confInfo') },//确定信息
        { path: 'remind', name: 'remind', component: () => import('@/pages/logout/remind') },//重要提醒
        { path: 'reason', name: 'reason', component: () => import('@/pages/logout/reason') },//注销原因
      ]
    },
    { path: '/setup/logout/verifyLogout', name: 'verifyLogout', component: () => import('@/pages/logout/verifyLogout') },//注销验证邮箱
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
