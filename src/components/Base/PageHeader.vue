<template>
  <v-layout align-center>
    <h2><slot></slot></h2>
    <v-spacer></v-spacer>
    <v-breadcrumbs :items="breadcrumbs">
      <template v-slot:item="{ item }">
        <v-breadcrumbs-item :disabled="item.disabled">
          <router-link
            :to="{ name: item.href }"
            :class="`breadcrumbs-item ${item.disabled ? 'disabled' : ''}`"
          >
            {{ item.text }}
          </router-link>
        </v-breadcrumbs-item>
      </template>
    </v-breadcrumbs>
  </v-layout>
</template>

<script>
export default {
  name: "PageHeader",
  computed: {
    breadcrumbs() {
      let breadcrumbs = [];
      console.log(this.$router.currentRoute.path);
      this.$router.currentRoute.path
        .split("/")
        .forEach((item, index, array) => {
          let props = this.$router.resolve({
            name: item === "" ? "home" : item
          });
          const breadcrumb = {
            text: this.$vuetify.lang.t(`$vuetify.routes.${props.route.name}`),
            disabled: index === array.length - 1,
            href: props.route.name
          };
          if (breadcrumbs.find(element => element.href === props.route.name))
            breadcrumbs.pop();
          breadcrumbs.push(breadcrumb);
        });
      return breadcrumbs;
    }
  }
};
</script>

<style>
.breadcrumbs-item {
  color: var(--v-anchor-base) !important;
  text-decoration: none;
}
.disabled {
  color: inherit !important;
  pointer-events: none;
}
</style>
