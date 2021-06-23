<template>
  <v-container fluid>
    <Page>
      <template v-slot:title>
        {{ $vuetify.lang.t("$vuetify.settings.title") }}
      </template>
      <v-row class="mh-100">
        <v-col>
          <v-row>
            <v-col>
              <v-card>
                <v-card-title>{{
                  $vuetify.lang.t("$vuetify.settings.notification-title")
                }}</v-card-title>
                <v-card-subtitle>{{
                  $vuetify.lang.t("$vuetify.settings.notification-subtitle")
                }}</v-card-subtitle>
                <v-card-text>
                  <v-switch
                    v-model="notification"
                    :label="$vuetify.lang.t('$vuetify.settings.notification')"
                    color="red darken-3"
                    class=""
                    hide-details
                  ></v-switch>
                </v-card-text>
              </v-card>
            </v-col>
            <v-col>
              <v-card>
                <v-card-title>{{
                  $vuetify.lang.t("$vuetify.settings.game.title")
                }}</v-card-title>
                <v-card-subtitle>{{
                  $vuetify.lang.t("$vuetify.settings.game.subtitle")
                }}</v-card-subtitle>
                <v-card-text>
                  <v-row>
                    <v-col>
                      <v-switch
                        v-model="music"
                        :label="$vuetify.lang.t('$vuetify.settings.game.music')"
                        color="red darken-3"
                        class=""
                        hide-details
                      ></v-switch>
                      <v-slider
                        v-model="musicVol"
                        :label="`${musicVol}%`"
                        hide-details
                        max="100"
                        :disabled="!music"
                        inverse-label
                        :prepend-icon="
                          music && musicVol !== 0
                            ? 'mdi-volume-high'
                            : 'mdi-volume-off'
                        "
                      ></v-slider>
                      <v-switch
                        v-model="sound"
                        :label="$vuetify.lang.t('$vuetify.settings.game.sound')"
                        color="red darken-3"
                        class=""
                        hide-details
                      ></v-switch>
                      <v-slider
                        v-model="soundVol"
                        :label="`${soundVol}%`"
                        hide-details
                        max="100"
                        :disabled="!sound"
                        inverse-label
                        :prepend-icon="
                          sound && soundVol !== 0
                            ? 'mdi-volume-high'
                            : 'mdi-volume-off'
                        "
                      ></v-slider>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <v-card>
                <v-card-title>{{
                  $vuetify.lang.t("$vuetify.settings.other-title")
                }}</v-card-title>
                <v-card-subtitle>{{
                  $vuetify.lang.t("$vuetify.settings.other-subtitle")
                }}</v-card-subtitle>
                <v-card-text>
                  <v-switch
                    v-model="fixedSize"
                    :label="$vuetify.lang.t('$vuetify.settings.size')"
                    color="red darken-3"
                    class=""
                    hide-details
                  ></v-switch>

                  <v-switch
                    v-model="meter"
                    :label="$vuetify.lang.t('$vuetify.settings.meter')"
                    color="red darken-3"
                    class=""
                    hide-details
                  ></v-switch>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </Page>
  </v-container>
</template>

<script>
import Page from "@/components/Base/Page";
export default {
  name: "Settings",
  components: { Page },
  data: function() {
    return {
      musicEnabled: localStorage.getItem("game.allowMusic") === "true",
      musicVolume: localStorage.getItem("game.musicVolumn"),
      soundEnabled: localStorage.getItem("game.allowSound") === "true",
      soundVolume: localStorage.getItem("game.soundVolumn")
    };
  },
  computed: {
    music: {
      get() {
        return this.musicEnabled;
      },
      set(value) {
        this.musicEnabled = value;
        localStorage.setItem("game.allowMusic", value);
      }
    },
    sound: {
      get() {
        return this.soundEnabled;
      },
      set(value) {
        this.soundEnabled = value;
        localStorage.setItem("game.allowSound", value);
      }
    },
    musicVol: {
      get() {
        return this.musicVolume;
      },
      set(value) {
        this.musicVolume = value;
        localStorage.setItem("game.musicVolumn", value);
      }
    },
    soundVol: {
      get() {
        return this.soundVolume;
      },
      set(value) {
        this.soundVolume = value;
        localStorage.setItem("game.soundVolumn", value);
      }
    },
    notification: {
      get() {
        return this.$store.state.Settings.notification;
      },
      set(value) {
        this.$store.dispatch("Settings/setNotification", value);
      }
    },
    fixedSize: {
      get() {
        return this.$store.state.Settings.fixedSize;
      },
      set(value) {
        this.$store.dispatch("Settings/setSize", value);
      }
    },
    meter: {
      get() {
        return this.$store.state.Settings.sectorMeter;
      },
      set(value) {
        this.$store.dispatch("Settings/setMeterEnabled", value);
      }
    }
  }
};
</script>
