export default function auth({ store, router, nextMiddleware }) {
  if (!store.getters["User/getIsAuth"]) {
    router.push({ name: "login" });
  }
  return nextMiddleware();
}
