<template>
  <v-container fluid>
    <Page>
      <template v-slot:title>{{
        $vuetify.lang.t("$vuetify.login.authRequired")
      }}</template>
      <v-card>
        <v-card-text>
          <v-form ref="form" v-model="valid" validation>
            <v-text-field
              v-model="credential.login"
              :rules="[rules.required, rules.min]"
              :label="$vuetify.lang.t('$vuetify.common.identity.text')"
            ></v-text-field>

            <v-text-field
              v-model="credential.password"
              :append-icon="!passwordHidden ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[rules.required, rules.password]"
              :type="!passwordHidden ? 'text' : 'password'"
              name="input-10-1"
              :label="$vuetify.lang.t('$vuetify.common.password.text')"
              :hint="$vuetify.lang.t('$vuetify.common.password.tip')"
              counter
              @click:append="passwordHidden = !passwordHidden"
            ></v-text-field>
            <v-checkbox
              v-model="credential.remember"
              :label="$vuetify.lang.t('$vuetify.common.remember.text')"
            ></v-checkbox>
            <v-divider class="mt-2 mb-2" />
            <v-btn
              :disabled="!valid"
              color="primary"
              class="mr-4"
              @click="validate"
            >
              {{ $vuetify.lang.t("$vuetify.login.enter") }}
            </v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </Page>
  </v-container>
</template>

<script>
import Page from "@/components/Base/Page";
import isElectron from "is-electron";
export default {
  name: "Login",
  data: function() {
    return {
      valid: false,
      passwordHidden: true,
      credential: {
        login: "",
        password: "",
        remember: false
      },
      rules: {
        email: v =>
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            v
          ) || this.$vuetify.lang.t("$vuetify.common.rules.invalid", "E-mail"),
        password: v =>
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*)(+=._-]{8,}$/.test(
            v
          ) ||
          this.$vuetify.lang.t("$vuetify.common.rules.invalid", "Password"),
        required: value =>
          !!value || this.$vuetify.lang.t("$vuetify.common.rules.required"),
        min: v =>
          v.length >= 4 || this.$vuetify.lang.t("$vuetify.common.rules.min", 4)
      }
    };
  },

  methods: {
    validate() {
      if (this.$refs.form.validate()) this.login();
    },
    login: function() {
      this.appServices.Api.post("users/login", this.credential)
        .then(res => {
          this.appServices.Auth.login(res);
          this.$router.push({ name: "home" });
        })
        .catch(error => {
          let swalOptions = {
            title: "Oops... Something goes wrong",
            text: "Hups.. undefined error",
            allowOutsideClick: true,
            type: "error",
            showCancelButton: false,
            backdrop: `rgba(0,0,0,0.0)`
          };
          switch (error.response.status) {
            case 401: {
              swalOptions.text = error.response.data.error;

              break;
            }
            case 422: {
              let message = "";
              Object.entries(error.response.data.errors).forEach(entry => {
                const [key, value] = entry;
                //message += `The ${key} field has error... \n`;
                value.forEach(val => {
                  message += val + "<br>";
                });
                console.log(key, value);
              });

              swalOptions.html = message;

              break;
            }
            default: {
              swalOptions.text = error.response.data;
            }
          }

          let bwOptions = {
            frame: true,
            transparent: true,
            thickFrame: true,
            closable: false,
            backgroundColor: "#00000000",
            hasShadow: true
          };

          if (isElectron()) {
            require("electron").ipcRenderer.send("alert", {
              swalOptions,
              bwOptions
            });
          }
        });
    }
  },
  components: { Page }
};
</script>
