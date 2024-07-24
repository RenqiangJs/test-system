const route = [
  {
    path: "/goodsDesign",
    name: "goodsDesign",
    component: () => import("../Department/index.vue"),
    meta: {
      requiresAuth: true, //有一些页面是否登录才能进去
      name: "商品设计",
    },
  },
]
export default route
