const route = [
  {
    path: "/Department",
    name: "Department",
    component: () => import("../Department/index.vue"),
    meta: {
      requiresAuth: true, //有一些页面是否登录才能进去
      name: "机构管理",
    },
  },
]
export default route
