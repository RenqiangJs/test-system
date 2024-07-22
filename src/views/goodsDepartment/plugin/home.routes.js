import goodsDepartment from "../index.vue";
import goodsDepartmentEdit from "../edit.vue";
const route = [
  {
    path: "/goodsDepartment",
    name: "goodsDepartment",
    component: goodsDepartment,
    meta: {
      requiresAuth: true, //有一些页面是否登录才能进去
      name: "商品管理",
    },
  },
  {
    path: "/goodsDepartmentEdit",
    name: "goodsDepartmentEdit",
    component: goodsDepartmentEdit,
    meta: {
      requiresAuth: true, //有一些页面是否登录才能进去
      name: "商品管理",
    },
  }
]
export default route
