<template>
  <v-container fluid>
    <Page>
      <template v-slot:title>{{
        $vuetify.lang.t("$vuetify.registration.title")
      }}</template>
      <v-card>
        <v-card-text>
          <validation-observer ref="observer" v-slot="{ invalid }">
            <v-form ref="form">
              <validation-provider
                v-slot="{ errors }"
                name="login"
                rules="required|max:32"
              >
                <v-text-field
                  v-model="credential.login"
                  :label="$vuetify.lang.t('$vuetify.common.login.text')"
                  :error-messages="errors"
                ></v-text-field>
              </validation-provider>

              <validation-provider
                v-slot="{ errors }"
                name="email"
                rules="required|email"
              >
                <v-text-field
                  v-model="credential.email"
                  :label="$vuetify.lang.t('$vuetify.common.email.text')"
                  :error-messages="errors"
                ></v-text-field>
              </validation-provider>

              <validation-provider
                v-slot="{ errors }"
                name="password"
                :rules="{
                  required: true,
                  regex: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*)(+=._-]{8,}$/
                }"
              >
                <v-text-field
                  v-model="credential.password"
                  :append-icon="!passwordHidden ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="!passwordHidden ? 'text' : 'password'"
                  :error-messages="errors"
                  name="input-10-1"
                  :label="$vuetify.lang.t('$vuetify.common.password.text')"
                  :hint="$vuetify.lang.t('$vuetify.common.password.tip')"
                  counter
                  @click:append="passwordHidden = !passwordHidden"
                ></v-text-field>
              </validation-provider>

              <validation-provider
                v-slot="{ errors }"
                name="password confirmation"
                rules="required|confirmed:password"
              >
                <v-text-field
                  v-model="credential.password_confirmation"
                  :append-icon="!passwordHidden ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="!passwordHidden ? 'text' : 'password'"
                  name="input-10-1"
                  :error-messages="errors"
                  :label="
                    $vuetify.lang.t(
                      '$vuetify.common.password_confirmation.text'
                    )
                  "
                  :hint="
                    $vuetify.lang.t('$vuetify.common.password_confirmation.tip')
                  "
                  @click:append="passwordHidden = !passwordHidden"
                ></v-text-field>
              </validation-provider>
              <v-divider class="mt-2 mb-2" />
              <v-btn
                color="primary"
                class="mr-4"
                :disabled="invalid"
                @click="validate"
              >
                {{ $vuetify.lang.t("$vuetify.registration.do") }}
              </v-btn>
            </v-form>
          </validation-observer>
        </v-card-text>
      </v-card>
    </Page>
  </v-container>
</template>

<script>
import Page from "@/components/Base/Page";
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode
} from "vee-validate";
import {
  required,
  regex,
  email,
  max,
  confirmed
} from "vee-validate/dist/rules";
import isElectron from "is-electron";

setInteractionMode("eager");

extend("required", {
  ...required,
  message: "{_field_} can not be empty"
});
extend("email", {
  ...email,
  message: "{_field_} must be valid"
});
extend("regex", {
  ...regex,
  message: "{_field_} {_value_} does not match {regex}"
});
extend("max", {
  ...max,
  message: "{_field_} may not be greater than {length} characters"
});

extend("confirmed", {
  ...confirmed,
  message: "The {_field_} field confirmation does not match"
});

export default {
  name: "Registration",
  data: function() {
    return {
      passwordHidden: true,
      credential: {
        login: "",
        email: "",
        password: "",
        password_confirmation: ""
      }
    };
  },

  methods: {
    validate() {
      if (this.$refs.observer.validate()) this.login();
    },
    login: function() {
      this.appServices.Api.post("users/registration", this.credential)
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
  components: { Page, ValidationObserver, ValidationProvider }
};
</script>
