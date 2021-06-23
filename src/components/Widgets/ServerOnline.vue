<template>
  <v-card class="mx-auto">
    <v-card-text class="pt-1 pb-1">
      <v-layout>
        <v-progress-circular
          :rotate="-90"
          :size="130"
          :width="17"
          :value="percent"
          :color="circleColor"
        >
          <div v-html="circleText"></div>
        </v-progress-circular>
        <div
          class="justify-center align-center d-flex flex-column"
          style="width: 100%"
        >
          <div>
            <h1 class="text-center text-h4">
              Сервер {{ this.status ? "онлайн" : "оффлайн" }}
            </h1>
            <p class="ma-1 text-center text-h6">
              В онлайне <span class="">{{ this.online }}</span> человек
            </p>
          </div>
        </div>
      </v-layout>
    </v-card-text>
  </v-card>
</template>

<script>
import axios from "axios";

export default {
  name: "ServerOnline",
  created() {
    this.update();
    this.timer = setInterval(() => {
      this.update();
    }, 15000);
  },
  beforeDestroy() {
    if (this.timer) clearInterval(this.timer);
  },
  methods: {
    update() {
      axios.get("https://request.bumz.space/ServerList.ashx?rnd=13").then(r => {
        let item, hasItem, parser, xmlDoc, result;
        parser = new DOMParser();
        xmlDoc = parser.parseFromString(r.data, "text/xml");
        result = xmlDoc.getElementsByTagName("Result")[0];
        hasItem = result.getAttribute("value") === "true";
        if (hasItem) item = xmlDoc.getElementsByTagName("Item")[0];
        this.online = result.getAttribute("total");
        this.status = hasItem ? item.getAttribute("State") === "2" : false;
      });
    }
  },
  data: function() {
    return {
      status: false,
      online: 0,
      timer: null
    };
  },
  computed: {
    circleColor() {
      return this.online > 100 ? "red" : this.online > 50 ? "yellow" : "green";
    },
    circleText() {
      return this.online > 100
        ? "<p class='text-center ma-0'>Высокая <br> нагрузка</p>"
        : this.online > 50
        ? "<p class='text-center ma-0'>Средняя <br> нагрузка</p>"
        : "<p class='text-center ma-0'>Низкая <br> нагрузка</p>";
    },
    percent() {
      console.log(Math.ceil((this.online / 50) * 100));
      return this.online > 100
        ? Math.ceil((this.online / 150) * 100)
        : this.online > 50
        ? Math.ceil((this.online / 100) * 100)
        : Math.ceil((this.online / 50) * 100);
    }
  }
};
</script>
