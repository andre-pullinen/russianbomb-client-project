import auth from "@/middlewares/auth";
import Game from "@/components/Game";

export default [
  {
    path: "/game",
    name: "game",
    component: Game,
    meta: {
      middleware: [auth]
    }
  }
];
