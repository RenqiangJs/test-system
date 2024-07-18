/*
 * @Descripttion: 
 * @version: 
 * @Author: ankeji
 * @Date: 2024-03-13 14:05:36
 * @LastEditors: ankeji
 * @LastEditTime: 2024-03-15 10:50:56
 */
import service from "@api/request.js";

const baseUrl = "/dy_admin";

export function noticeLists(query) {
  return service({
    method: "get",
    url: "/permission/noticeLists",
    data: query,
  });
}

export function getUsersLists(query) {
  return service({
    method: "get",
    url: baseUrl + "/users",
    params: query,
  });
}

export function delUsers(id) {
  return service({
    method: "get",
    url: baseUrl + "/delete/" + id
  });
}

export function updateUsers(data) {
  const body = JSON.parse(JSON.stringify(data));
  delete body.id;
  return service({
    method: "post",
    url: baseUrl + "/update/" + data.id,
    data: body
  });
}

export function addUsers(data) {
  return service({
    method: "post",
    url: baseUrl + "/storeData",
    data: data
  });
}