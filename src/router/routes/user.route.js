import auth from "@/middlewares/auth";
import Settings from "@/components/Settings";
import Payment from "@/components/Payment";

export default [
  {
    path: "/settings",
    name: "settings",
    component: Settings,
    meta: {
      middleware: [auth]
    }
  },
  {
    path: "/payment",
    name: "payment",
    component: Payment,
    meta: {
      middleware: [auth]
    }
  }
];
