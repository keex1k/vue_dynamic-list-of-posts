<script>
import * as usersApi from "./api/users.js";
import * as postsApi from "./api/posts.js";
import AppHeader from "./components/Header.vue";
import PostsList from "./components/PostList.vue";
import Loader from "./components/Loader.vue";
import AddPostPopup from "./components/AddPostPopup.vue";

export default {
  components: { AppHeader, PostsList, Loader, AddPostPopup },

  data() {
    return {
      posts: [],
      user: null,
      isLoading: true,
    };
  },

  async mounted() {
    try {
      const [postsRes, userRes] = await Promise.all([
        postsApi.getPostsByUserId(3032),
        usersApi.getUserbyEmail("kowalski_1410@wp.pl"),
      ]);
      this.posts = postsRes.data;
      this.user = userRes.data?.[0] || null;
    } catch (e) {
      console.error(e);
    } finally {
      this.isLoading = false;
    }
  },

  methods: {
    async addPost(postData, done) {
      const res = await postsApi.createPost({
        title: postData.title,
        body: postData.body,
        userId: this.user.id,
      });

      this.posts.unshift(res.data);

      if (typeof done === "function") {
        done(res.data);
      }
    },

    async removePost(postId) {
      await postsApi.deletePost(postId);
      this.posts = this.posts.filter((post) => post.id !== postId);
    },

    async editPost(postData) {
      const res = await postsApi.updatePost(postData.id, {
        title: postData.title,
        body: postData.body,
      });

      // Zaktualizuj lokalnie listę postów
      this.posts = this.posts.map((post) =>
        post.id === postData.id ? { ...post, ...res.data } : post
      );
    },
  },
};
</script>

<template>
  <AppHeader :user="user" />

  <main class="section">
    <div class="container">
      <div class="tile is-ancestor is-flex is-flex-wrap-wrap">
        <PostsList
          :posts="posts"
          :isLoading="isLoading"
          @add="addPost"
          @delete="removePost"
          @edit="editPost"
        />
      </div>
    </div>
  </main>
</template>

<style></style>
