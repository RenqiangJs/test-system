import home from "../index.vue";
const route = [
  {
    path: "/home",
    name: "home",
    component: home,
    meta: {
      requiresAuth: true, //有一些页面是否登录才能进去
      name: "首页",
    },
  }
]
export default route
