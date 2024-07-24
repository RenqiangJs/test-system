import service from "@api/request.js";

const baseUrl = "/dy_admin";

export function userlogin(data) {
  return service({
    method: "post",
    url: baseUrl + "/login",
    data,
  });
}