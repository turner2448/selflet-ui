/*!

=========================================================
* Argon Dashboard React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import CreateUser from "views/examples/CreateUser.jsx";
import ListUser from "views/examples/ListUser.jsx";

var routes = [
  {
    path: "/people/adduser",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: CreateUser,
    layout: "/admin"
  },
  {
    path: "/people/listuser",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: ListUser,
    layout: "/admin"
  }
];
export default routes;
