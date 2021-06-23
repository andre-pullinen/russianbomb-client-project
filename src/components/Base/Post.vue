<template>
  <v-card class="mt-2 mb-2">
    <v-card-title>
      <div v-if="!Edit">
        {{ post.title }}
      </div>
      <v-text-field
        v-if="Edit"
        :value="post.title"
        v-model="post.title"
      ></v-text-field>
    </v-card-title>
    <v-card-subtitle>
      Опубликовано {{ beautifyDate(post.created_at) }}
    </v-card-subtitle>
    <v-card-text>
      <div v-if="!Edit" v-html="parse(post.content)"></div>
      <v-textarea
        v-if="Edit"
        :value="post.content"
        v-model="post.content"
      ></v-textarea>
    </v-card-text>
    <v-card-actions
      v-if="hasAccess('posts.edit') || hasAccess('posts.delete')"
      class="justify-space-around"
    >
      <v-btn
        color="success"
        v-if="!Edit && hasAccess('posts.edit')"
        @click="editPost()"
        >Редактировать</v-btn
      >
      <v-btn
        color="success"
        v-if="Edit && hasAccess('posts.edit')"
        @click="savePost()"
        >Сохранить</v-btn
      >
      <v-btn
        color="error"
        v-if="hasAccess('posts.delete')"
        @click="deletePost(post.id)"
        >Удалить</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script>
import bbCodeParser from "js-bbcode-parser";

export default {
  name: "Post",
  props: {
    post: Object
  },
  data: function() {
    return {
      edit: false
    };
  },
  computed: {
    Edit() {
      return this.edit;
    }
  },
  methods: {
    editPost() {
      this.edit = true;
    },
    savePost() {
      this.edit = false;
      this.appServices.Api.post("posts/edit", this.post).then(r => {
        console.log(r.data);
      });
    },
    deletePost(id) {
      this.appServices.Api.post("posts/delete", { id }).then(r => {
        console.log(r.data);
      });
    },
    beautifyDate(date) {
      if (typeof date === "string") date = new Date(date);
      const seconds = Math.floor((new Date() - date) / 1000);

      let interval = seconds / 31536000;

      if (interval > 1) {
        return (
          Math.floor(interval) +
          this.pluralize(Math.floor(interval), [
            " год назад",
            " года назад",
            " лет назад"
          ])
        );
      }
      interval = seconds / 2592000;
      if (interval > 1) {
        return (
          Math.floor(interval) +
          this.pluralize(Math.floor(interval), [
            " месяц назад",
            " месяца назад",
            " месяцов назад"
          ])
        );
      }
      interval = seconds / 86400;
      if (interval > 1) {
        return (
          Math.floor(interval) +
          this.pluralize(Math.floor(interval), [
            " день назад",
            " дня назад",
            " дней назад"
          ])
        );
      }
      interval = seconds / 3600;
      if (interval > 1) {
        return (
          Math.floor(interval) +
          this.pluralize(Math.floor(interval), [
            " час назад",
            " часа назад",
            " часов назад"
          ])
        );
      }
      interval = seconds / 60;
      if (interval > 1) {
        return (
          Math.floor(interval) +
          this.pluralize(Math.floor(interval), [
            " минуту назад",
            " минуты назад",
            " минут назад"
          ])
        );
      }
      if (interval > 1) {
        return (
          Math.floor(interval) +
          this.pluralize(Math.floor(interval), [
            " секунду назад",
            " секунды назад",
            " секунд назад"
          ])
        );
      }
    },
    pluralize(val, forms) {
      return val % 10 === 1 && val % 100 !== 11
        ? forms[0]
        : val % 10 >= 2 && val % 10 <= 4 && (val % 100 < 10 || val % 100 >= 20)
        ? forms[1]
        : forms[2];
    },
    parse(content) {
      return bbCodeParser.parse(content);
    }
  }
};
</script>

<style scoped></style>
