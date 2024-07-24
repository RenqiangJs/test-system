/*
 * @Descripttion: 
 * @version: 
 * @Author: ankeji
 * @Date: 2024-03-13 14:05:36
 * @LastEditors: ankeji
 * @LastEditTime: 2024-03-29 16:53:57
 */
const route = [
  {
    path: "/unLike",
    name: "unLike",
    component: () => import("../unlike/index.vue"),
    meta: {
      requiresAuth: true, //有一些页面是否登录才能进去
      name: "取消喜欢",
    },
  },{
    path: "/uncollection",
    name: "uncollection",
    component: () => import("../uncollection/index.vue"),
    meta: {
      requiresAuth: true, //有一些页面是否登录才能进去
      name: "取消收藏",
    },
  },{
    path: "/unrecommend",
    name: "unrecommend",
    component: () => import("../unrecommend/index.vue"),
    meta: {
      requiresAuth: true, //有一些页面是否登录才能进去
      name: "取消推荐",
    },
  },
]
export default route
