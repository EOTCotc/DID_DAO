import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  // {
  //   path: "/",
  //   name: "Home",
  //   component: Home,
  // },
  {
    path: "/",
    name: "home",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("@/views/HOME/home"),
  },
  {
    path: "/personage",
    name: "personage",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("@/views/HOME/personage"),
  },
  {
    path: "/Home_detail",
    name: "Home_detail",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("@/views/HOME/detail"),
  },
  {
    path: "/Bill_list",
    name: "Bill_list",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("@/views/Proposal/Bill_list"),
  },
  {
    path: "/Create",
    name: "Create",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("@/views/Proposal/Create"),
  },
  {
    path: "/detail",
    name: "detail",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("@/views/Proposal/detail"),
  },
  {
    path: "/pending",
    name: "pending",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("@/views/ticket_system/pending"),
  },
  {
    path: "/order_details",
    name: "order_details",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        "@/views/ticket_system/order_details"
      ),
  },
  {
    path: "/Destruction",
    name: "Destruction",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("@/views/destroy/Destruction"),
  },
  {
    path: "/blue-nav",
    name: "blue-nav",
    component: () => import("@/views/blue-nav/index"),
    children: [
      {
        // 反馈
        path: "feedback",
        name: "feedback",
        component: () => import("@/components/feedback/index.vue"),
      },
    ],
  },
  {
    path: "/pneumatic",
    name: "pneumatic",
    component: () => import("@/views/pneumatic/index"),
    children: [
      {
        path: "pneumatic_control",
        name: "pneumatic_control",
        component: () => import("@/components/pneumatic_control/index.vue"),
      },
    ],
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
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("@/views/Arbitration/examination"),
  },
  {
    path: "/news",
    name: "news",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("@/views/Arbitration/news"),
  },
  {
    path: "/user/meetTheConditions",
    name: "meetTheConditions",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        "@/views/Arbitration/meetTheConditions"
      ),
  },
  {
    path: "/understandLearningRules",
    name: "understandLearningRules",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        "@/views/Arbitration/understandLearningRules"
      ),
  },
  {
    path: "/user/approval",
    name: "approval",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        "@/views/approval"
      ),
  },
  {
    path: "/user/approval/identity",
    name: "approvalIdentity",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("@/views/approval/identity"),
  },
  {
    path: "/user/approval/community",
    name: "approvalCommunity",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("@/views/approval/community"),
  },
  {
    path: "/user/arbitration",
    name: "arbitration",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("@/views/Arbitration"),
  },
  {
    path: "/user/arbitration/personnel",
    name: "arbitrationPersonnel",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("@/views/Arbitration/personnel"),
  },
  {
    path: "/user/arbitration/case",
    name: "arbitrationCase",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("@/views/Arbitration/case"),
  },
  {
    path: "/arbitration/arbitrationCase",
    name: "ArbitrationByFormula",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("@/views/Arbitration/arbitrationCase"),
  },
  {
    path: "/user/arbitration/case/detail",
    name: "arbitrationCaseDetail",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("@/views/Arbitration/case/detail"),
  },


];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
