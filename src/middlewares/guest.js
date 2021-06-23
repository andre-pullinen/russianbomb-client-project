export default function guest({ next, store, nextMiddleware }) {
  if (store.getters["User/getIsAuth"]) {
    return next({
      name: "home"
    });
  }
  return nextMiddleware();
}
