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
    component: () =>
      import(/* webpackChunkName: "about" */ "@/views/HOME/home"),
  },
  {
    path: "/personage",
    name: "personage",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "@/views/HOME/personage"),
  },
  {
    path: "/Home_detail",
    name: "Home_detail",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "@/views/HOME/detail"),
  },
  {
    path: "/Bill_list",
    name: "Bill_list",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "@/views/Proposal/Bill_list"),
  },
  {
    path: "/Create",
    name: "Create",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "@/views/Proposal/Create"),
  },
  {
    path: "/detail",
    name: "detail",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "@/views/Proposal/detail"),
  },
  {
    path: "/pending",
    name: "pending",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "@/views/ticket_system/pending"),
  },
  {
    path: "/order_details",
    name: "order_details",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "about" */ "@/views/ticket_system/order_details"
      ),
  },
  {
    path: "/Destruction",
    name: "Destruction",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "@/views/destroy/Destruction"),
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
    component: () =>
      import(/* webpackChunkName: "about" */ "@/views/Arbitration/examination"),
  },
  {
    path: "/news",
    name: "news",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "@/views/Arbitration/news"),
  },
  {
    path: "/meetTheConditions",
    name: "meetTheConditions",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "about" */ "@/views/Arbitration/meetTheConditions"
      ),
      import(/* webpackChunkName: "about" */ "@/views/Arbitration/meetTheConditions"),
  },
  {
    path: "/understandLearningRules",
    name: "understandLearningRules",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "@/views/Arbitration/understandLearningRules"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
