import entrance from "../index.vue";
const route = [
  {
    path: "/entrance",
    name: "entrance",
    component: entrance,
    meta: {
      requiresAuth: true, //有一些页面是否登录才能进去
      name: "首页",
      type: 'frameOut'
    },
  }
]
export default route
