<script>
import Sidebar from "./Sidebar.vue";
import Loader from "./Loader.vue";
import AddPostPopup from "./AddPostPopup.vue";
import EditPostPopup from "./EditPostPopup.vue";

export default {
  components: {
    Sidebar,
    Loader,
    AddPostPopup,
    EditPostPopup,
  },
  name: "PostsList",
  props: {
    posts: {
      type: Array,
      required: true,
    },
    isLoading: Boolean,
  },
  data() {
    return {
      selectedPostId: 0,
      addPopupOpened: false,
      editPopupOpened: false,
    };
  },
  emits: ["add", "delete", "edit"],

  methods: {
    toggleSelectedPost(id) {
      if (this.selectedPostId === id) {
        this.selectedPostId = 0;
      } else {
        this.selectedPostId = id;
      }

      if (this.addPopupOpened) {
        this.addPopupOpened = false;
      }
    },
    openAddPostPopup() {
      if (this.selectedPostId !== 0) {
        this.selectedPostId = 0;
      }

      if (this.addPopupOpened) {
        this.addPopupOpened = false;
      } else {
        this.addPopupOpened = true;
      }
    },
    openEditPostPopup() {
      this.editPopupOpened = true;
    },
    closeEditPostPopup() {
      this.editPopupOpened = false;
    },
    closeAddPopup() {
      this.addPopupOpened = false;
    },
    preDelete(postId) {
      this.$emit("delete", postId);
    },
    forwardAdd(postData) {
      this.$emit("add", postData, (newPost) => {
        this.selectedPostId = newPost.id;
      });
      this.openAddPostPopup();
    },
    preEdit(postData) {
      this.$emit("edit", {
        id: this.selectedPostId,
        title: postData.title,
        body: postData.body,
      });
      this.closeEditPostPopup();
    },
  },
  computed: {
    selectedPost() {
      return this.posts.find((p) => p.id === this.selectedPostId);
    },
  },
};
</script>

<template>
  <div class="tile is-parent">
    <div class="tile is-child box is-success">
      <div class="block">
        <div class="block is-flex is-justify-content-space-between">
          <p class="title">Posts</p>
          <button
            type="button"
            class="button is-link"
            @click="openAddPostPopup"
          >
            Add New Post
          </button>
        </div>

        <table class="table is-fullwidth is-striped is-hoverable is-narrow">
          <thead>
            <tr class="has-background-link-light">
              <th>ID</th>
              <th>Title</th>
              <th class="has-text-right">Actions</th>
            </tr>
          </thead>
          <tbody v-if="isLoading">
            <tr>
              <td colspan="3" class="has-text-centered" style="padding: 2rem">
                <Loader />
              </td>
            </tr>
          </tbody>

          <tbody v-else>
            <tr v-for="post in posts" :key="post.id">
              <td>{{ post.id }}</td>
              <td>{{ post.title }}</td>
              <td class="has-text-right is-vcentered">
                <button
                  type="button"
                  class="button is-link"
                  :class="{ 'is-light': post.id === selectedPostId }"
                  @click="toggleSelectedPost(post.id)"
                >
                  {{ post.id === selectedPostId ? "Close" : "Open" }}
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <AddPostPopup
    v-if="addPopupOpened"
    @add="forwardAdd"
    @close="closeAddPopup"
  />
  <Sidebar
    v-if="selectedPost && !editPopupOpened"
    :post="selectedPost"
    @delete="preDelete"
    @open="openEditPostPopup"
  />
  <EditPostPopup
    v-if="selectedPost && editPopupOpened"
    :post="selectedPost"
    @close="closeEditPostPopup"
    @edit="preEdit"
  />
</template>
<style></style>
