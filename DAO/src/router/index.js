import Cookie from "js-cookie";
import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("@/views/HOME/home"),
  },
  {
    path: "/personage",
    name: "personage",
    component: () => import("@/views/HOME/personage"),
  },
  {
    path: "/Home_detail",
    name: "Home_detail",
    component: () => import("@/views/HOME/detail"),
  },
  {
    path: "/Bill_list",
    name: "Bill_list",
    component: () => import("@/views/Proposal/Bill_list"),
  },
  {
    path: "/Create",
    name: "Create",
    component: () => import("@/views/Proposal/Create"),
  },
  {
    path: "/detail",
    name: "detail",
    component: () => import("@/views/Proposal/detail"),
  },
  {
    path: "/pending",
    name: "pending",
    component: () => import("@/views/ticket_system/pending"),
  },
  {
    path: "/order_details",
    name: "order_details",
    component: () => import("@/views/ticket_system/order_details"),
  },
  {
    path: "/Destruction",
    name: "Destruction",
    component: () => import("@/views/destroy/Destruction"),
  },
  {
    path: "/blue-nav",
    name: "blue-nav",
    component: () => import("@/views/blue-nav/index"),
  },
  {
    path: "/pneumatic",
    name: "pneumatic",
    component: () => import("@/views/pneumatic/index"),
  },
  {
    path: "/relieve",
    name: "relieve",
    component: () => import("@/views/pneumatic/relieve"),
  },
  {
    path: "/check",
    name: "check",
    component: () => import("@/views/pneumatic/check"),
  },
  {
    path: "/examination",
    name: "examination",
    component: () => import("@/views/Arbitration/examination"),
  },
  {
    path: "/news",
    name: "news",
    component: () => import("@/views/Arbitration/news"),
  },
  {
    path: "/user/meetTheConditions",
    name: "meetTheConditions",
    component: () => import("@/views/Arbitration/meetTheConditions"),
  },
  {
    path: "/understandLearningRules",
    name: "understandLearningRules",
    component: () => import("@/views/Arbitration/understandLearningRules"),
  },
  {
    path: "/user/approval",
    name: "approval",
    component: () => import("@/views/approval"),
  },
  {
    path: "/user/approval/identity",
    name: "approvalIdentity",
    component: () => import("@/views/approval/identity"),
  },
  {
    path: "/user/approval/community",
    name: "approvalCommunity",
    component: () => import("@/views/approval/community"),
  },
  {
    path: "/user/approval/team",
    name: "approvalTeam",
    component: () => import("@/views/approval/team"),
  },
  {
    path: "/user/arbitration",
    name: "arbitration",
    component: () => import("@/views/Arbitration"),
  },
  {
    path: "/user/arbitration/case",
    name: "userArbitrationCase",
    component: () => import("@/views/Arbitration/case"),
  },
  {
    path: "/user/arbitration/case/detail",
    name: "arbitrationDetail",
    component: () => import("@/views/Arbitration/case/detail"),
  },
  {
    path: "/user/arbitration/publicity/personnel",
    name: "arbitrationPublicityPersonnel",
    component: () => import("@/views/Arbitration/publicity/personnel"),
  },
  {
    path: "/user/arbitration/publicity/case",
    name: "arbitrationPublicityCase",
    component: () => import("@/views/Arbitration/publicity/case"),
  },
  {
    path: "/user/arbitration/publicity/case/detail",
    name: "arbitrationCaseDetail",
    component: () => import("@/views/Arbitration/publicity/case/detail"),
  },
  {
    path: "/arbitration/arbitrationCase",
    name: "ArbitrationByFormula",
    component: () => import("@/views/Arbitration/arbitrationCase"),
  },
  {
    path: "/arbitrationCase",
    name: "arbitrationCase",
    component: () => import("@/views/Arbitration/arbitrationCase"),
  },
  {
    path: "/user/arbitration/case",
    name: "arbitrationCaseList",
    component: () => import("@/views/Arbitration/case"),
  },
  {
    path: "/user/arbitration/case/detail",
    name: "arbitrationCaseListDetail",
    component: () => import("@/views/Arbitration/case/detail"),
  },
  {
    path: "/user/arbitration/case/initiateNewProof",
    name: "arbitrationCaseInitiateNewProof",
    component: () => import("@/views/Arbitration/case/initiateNewProof"),
  },
  // ???????????????
  {
    path: "/user/arbitration/case/personnelInfo",
    name: "arbitrationCasePersonnelInfo",
    component: () => import("@/views/Arbitration/case/personnelInfo"),
  },
  // ????????????????????????????????????
  {
    path: "/arbitrationList",
    name: "arbitrationList",
    component: () => import("@/views/Arbitration/arbitrationMsg"),
  },
  //????????????????????????????????????
  {
    path: "/arbitrationMsg",
    name: "arbitrationMsg",
    component: () =>
      import("@/views/Arbitration/arbitrationMsg/arbitrationMsg"),
  },
  // ????????????
  {
    path: "/user/approval/auditNode/applicationConditions",
    name: "applicationConditions",
    component: () => import("@/views/approval/auditNode/applicationConditions"),
  },
  // ??????????????????
  {
    path: "/user/approval/auditNode/auditNodeExamination",
    name: "auditNodeExamination",
    component: () => import("@/views/approval/auditNode/auditNodeExamination"),
  },
  // ????????????????????????
  {
    path: "/user/approval/auditNode/examineUnderstandLearningRules",
    name: "examineUnderstandLearningRules",
    component: () =>
      import("@/views/approval/auditNode/examineUnderstandLearningRules"),
  },
  // ??????
  {
    path: "/notice",
    name: "notice",
    component: () =>
      import("@/views/notice"),
  },
  // ????????????
  {
    path: "/notice/detail",
    name: "noticeDetail",
    component: () => import("@/views/notice/detail"),
  },
];
// ??????????????????????????????????????????
const VueRouterPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(to) {
  return VueRouterPush.call(this, to).catch((err) => err);
};
const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (Cookie.get("riskLevel") * 1 !== 2) {
    next();
  } else {
    if (to.path === "/relieve") {
      next();
    } else {
      to.path === "/" ? next() : next("/");
    }
  }
});
export default router;
