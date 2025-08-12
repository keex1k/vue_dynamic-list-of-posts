<script>
import * as usersApi from './api/users.js'
import * as postsApi from './api/posts.js'
import AppHeader from './components/Header.vue';
import PostsList from './components/PostList.vue';
import Loader from './components/Loader.vue'

export default {
  components: {
    AppHeader,
    PostsList,
    Loader
  },

  data() {
    return {
      posts: [],
      user: null,
      isLoading: true,
    }
  },

  mounted() {
  postsApi.getPostsByUserId(589)
    .then(res => {
      this.posts = res.data; 
      this.isLoading = false;
    })
  
  usersApi.getUserbyEmail("kowalski_1410@wp.pl")
    .then(res => {
      this.user = res.data[0]
    })
  },
};

</script>

<template>
  <AppHeader :user="user"/>

  <main class="section">
    <div class="container">
      <div class="tile is-ancestor is-flex is-flex-wrap-wrap">
        <PostsList :posts="posts" :isLoading="isLoading"/>
      </div>
    </div>
  </main>
</template>

<style></style>