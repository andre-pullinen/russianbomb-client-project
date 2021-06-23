<template>
  <v-tooltip right>
    <template v-slot:activator="{ on, attrs }">
      <v-flex class="mt-1 mb-1">
        <router-link
          class="router-link"
          :to="href ? { name: href } : ''"
          tag="button"
          :disabled="isActive || disabled"
        >
          <v-btn
            icon
            x-large
            color="primary"
            v-bind="attrs"
            v-on="on"
            :class="`mt-1 mb-1 ${isActive ? 'sidebar--active-button' : ''}`"
            :disabled="isActive || disabled"
            @click="dispatch"
          >
            <v-icon><slot></slot></v-icon>
          </v-btn>
        </router-link>
      </v-flex>
    </template>
    <span>{{ $vuetify.lang.t(`$vuetify.sidebar.${type}`) }}</span>
  </v-tooltip>
</template>

<script>
export default {
  name: "SideButton",
  props: {
    type: String,
    href: String,
    disabled: Boolean
  },
  methods: {
    redirect: function() {
      if (!this.href) return;
      if (this.isActive) return;
      this.$router.push({ name: this.href });
    },
    getHref: function(name) {
      let props = this.$router.resolve({
        name: name
      });

      return props.href;
    },
    dispatch: function() {
      this.$eventBus.$emit(`side-button.${this.type}`);
    }
  },
  computed: {
    isActive: function() {
      return this.currentRoute === this.href;
    },
    currentRoute: function() {
      return this.$route.name;
    }
  }
};
</script>

<style>
.router-link {
  outline: none;
}
</style>
