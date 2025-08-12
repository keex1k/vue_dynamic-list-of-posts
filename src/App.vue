<script>
import * as usersApi from './api/users.js'
import * as postsApi from './api/posts.js'
import AppHeader from './components/Header.vue';
import PostsList from './components/PostList.vue';

export default {
  components: {
    AppHeader,
    PostsList
  },

  data() {
    return {
      posts: [],
      user: null,
    }
  },

  mounted() {
  postsApi.getPostsByUserId(589)
    .then(res => {
      this.posts = res.data; 
    })
  
  usersApi.getUserbyEmail("kowalski_1410@wp.pl")
    .then(res => {
      this.user = res.data[0]
    })
  }
};

</script>

<template>
  <AppHeader :user="user"/>

  <main class="section">
    <div class="container">
      <div class="tile is-ancestor is-flex is-flex-wrap-wrap">
        <PostsList :posts="posts"/>
      </div>
    </div>
  </main>
</template>

<style></style>