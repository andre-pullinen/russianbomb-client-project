import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store"; // ...or wherever your `vuex` store is defined
import routes from "./routes";
import pipeline from "@/middlewares/pipeline";

Vue.use(VueRouter);

let router = new VueRouter({
  mode: process.env.IS_ELECTRON ? "hash" : "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach(async (to, from, next) => {
  await store.dispatch("init");

  //region Если нету то далее
  if (!to.meta.middleware) {
    return next();
  }
  //endregion

  //region Запускаем конвеер защитников
  const middleware = to.meta.middleware;
  const context = {
    to,
    from,
    next,
    store,
    router
  };
  return middleware[0]({
    ...context,
    nextMiddleware: pipeline(context, middleware, 1)
  });
  //endregion
});

export default router;
