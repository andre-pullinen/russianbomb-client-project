import Login from "@/components/Login";
import Home from "@/components/Home";
import Registration from "@/components/Registration";
import guest from "@/middlewares/guest";

export default [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: {
      middleware: [guest]
    }
  },
  {
    path: "/registration",
    name: "registration",
    component: Registration,
    meta: {
      middleware: [guest]
    }
  }
];
