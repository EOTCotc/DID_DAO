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
    { path: '/site', name: 'site', component: () => import('@/pages/site') },//定位
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
    { path: '/setup/logout/logoutCountdown', name: 'logoutCountdown', component: () => import('@/pages/logout/logoutCountdown') },//注销倒计时
    { path: '/my/credit', name: 'credit', component: () => import('@/pages/my/credit') },//信用分记录
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
    // 社区信息
    { path: '/my/community/setting', name: 'communitySetting', component: () => import('@/pages/my/community/setting') },
    // 身份认证
    { path: '/my/identity', name: 'identity', component: () => import('@/pages/my/identity') },
    // 身份认证审批
    { path: '/my/identity/approval', name: 'identityApproval', component: () => import('@/pages/my/identity/approval') },
    // 身份认证失败
    { path: '/my/identity/fail', name: 'identityFail', component: () => import('@/pages/my/identity/fail') },
    // 身份认证成功
    { path: '/my/identity/success', name: 'identitySuccess', component: () => import('@/pages/my/identity/success') },
    // 收付款
    { path: '/my/payment', name: 'payment', component: () => import('@/pages/my/payment') },
    // 收付款
    { path: '/my/payment/create', name: 'paymentCreate', component: () => import('@/pages/my/payment/create') },
    // 邀请好友
    { path: '/my/invite', name: 'invite', component: () => import('@/pages/my/invite') },
    // 绑定各公链地址
    { path: '/my/wallets', name: 'wallets', component: () => import('@/pages/my/wallets') },
    // DID绑定各项目
    { path: '/my/projects', name: 'projects', component: () => import('@/pages/my/projects') },
    // 风险解除
    { path: '/risk', name: 'risk', component: () => import('@/pages/risk') },
  ]
});

// 解决重复点击同一各路由会报错
const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(to) {
  return VueRouterPush.call(this, to).catch(err => err)
}

router.beforeEach((to, from, next) => {
  if (!Cookies.get('token')) {//未登录
    if (to.path === '/') {
      next('/login')
    } else {
      next()
    }
  } else {
    if (Cookies.get('riskLevel') * 1 !== 2) {
      next()
    } else {
      if (to.path === '/risk') {
        next()
      } else {
        to.path === '/' ? next() : next('/')
      }
    }
  }
});

export default router;
