import store from "../store";

const access = {
  methods: {
    hasAccess: permission => {
      const permissions = store.getters["User/getPermissions"];

      return permissions.includes(permission);
    },
    isAuth: () => {
      return store.getters["User/getIsAuth"];
    }
  }
};

export default access;
