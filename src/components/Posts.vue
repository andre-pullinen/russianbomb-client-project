<template>
  <v-container class="pa-0 mt-n2 mb-n2" fluid>
    <v-expansion-panels v-if="hasAccess('posts.create')">
      <v-expansion-panel>
        <v-expansion-panel-header>
          Создание новости
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-text-field
            label="Название поста"
            v-model="newPost.title"
          ></v-text-field>
          <v-textarea
            label="Текст поста"
            rows="3"
            v-model="newPost.content"
          ></v-textarea>
          <v-btn color="primary" large block class="mt-2" @click="createPost"
            >Создать</v-btn
          >
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <post v-for="post in this.Posts" :key="post.id" :post="post"></post>
  </v-container>
</template>

<script>
import Post from "@/components/Base/Post";
export default {
  name: "Posts",
  components: { Post },
  data: function() {
    return {
      posts: [],
      newPost: {
        title: "",
        content: ""
      }
    };
  },
  created() {
    this.updatePost();
    this.$eventBus.$on("posts.update", this.updatePost);
  },
  beforeDestroy() {
    this.$eventBus.$off("posts.update");
  },
  methods: {
    updatePost() {
      this.appServices.Api.get("posts").then(r => {
        this.posts = r.data;
        console.log(this.posts);
      });
    },
    createPost() {
      this.appServices.Api.post("posts/create", this.newPost).then(r => {
        console.log(r.data);
      });
    }
  },
  computed: {
    Posts() {
      return this.posts;
    }
  }
};
</script>
