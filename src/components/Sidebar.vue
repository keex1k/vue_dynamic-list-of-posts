<script>
import * as commentsApi from '../api/comments.js'
import CommentForm from './CommentForm.vue'

export default {
  components: {
    CommentForm
  },
  props: {
    post: Object,
  },
  emits: ["delete", "open"],

  data() {
    return {
      comments: [],
      isCommentsLoading: false,
      isCommentFormOpened: false,
    }
  },

  watch: {
    post: {
      immediate: true,
      handler(newPost) {
        if (newPost?.id) {
          this.fetchComments(newPost.id);
        }
      },
    },
  },

  methods: {
    deletePost() {
      this.$emit("delete", this.post.id);
    },
    editPost() {
      this.$emit("open");
    },
    toggleCommentForm() {
      this.isCommentFormOpened = !this.isCommentFormOpened;
    },
    async fetchComments(postId) {
      this.isCommentsLoading = true;
      try {
        const res = await commentsApi.getCommentsByPostId(postId);
        this.comments = res.data;
      } catch (err) {
        console.error(err);
        this.comments = [];
      } finally {
        this.isCommentsLoading = false;
      }
    },
    async deleteComment(commentId) {
      await commentsApi.deleteComment(commentId);
      this.comments = this.comments.filter((comment) => comment.id !== commentId);
    },
    async createComment(commentData) {
      try {
        const res = await commentsApi.createComment({
          name: commentData.name,
          body: commentData.body,
          email: commentData.email,
          postId: this.post.id,
        });

        this.comments.unshift(res.data);
        this.toggleCommentForm();
      } catch (err) {
        console.error("Nie udało się dodać komentarza", err);
      }
    }
  },
};
</script>

<template>
  <div class="tile is-parent is-8-desktop Sidebar Sidebar--open">
    <div class="tile is-child box is-success">
      <div class="content">
        <div class="block">
          <div class="is-flex is-justify-content-space-between is-align-items-center">
            <h2>{{ `#${post.id}: ${post.title}` }}</h2>
            <div class="is-flex">
              <span class="icon is-small is-right is-clickable" @click="editPost"><i
                  class="fas fa-pen-to-square"></i></span><span
                class="icon is-small is-right has-text-danger is-clickable ml-3" @click="deletePost"><i
                  class="fas fa-trash"></i></span>
            </div>
          </div>
          <p data-cy="PostBody">{{ `${post.title}` }}</p>
        </div>
        <div class="block">
          <div class="block">
            <p v-if="comments.length === 0 && !isCommentsLoading" class="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
            <article v-else v-for="comment in comments" class="message is-small" data-cy="Comment">
              <div class="message-header">
                <a href="mailto:a@a.pl" data-cy="CommentAuthor">{{ comment.name }}</a><button data-cy="CommentDelete"
                  type="button" class="delete is-small" aria-label="delete" @click="deleteComment(comment.id)">
                  delete button
                </button>
              </div>
              <div class="message-body" data-cy="CommentBody">{{ comment.body }}</div>
            </article>
          </div>
          <CommentForm v-if="isCommentFormOpened" @close="toggleCommentForm" @add="createComment" />
          <button v-if="!isCommentFormOpened" data-cy="WriteCommentButton" type="button" class="button is-link"
            @click="toggleCommentForm">
            Write a comment
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.Sidebar {
  overflow: hidden;
  opacity: 0;
  transition-property: max-width, opacity;
  transition-duration: 0.5s;
  transition-timing-function: ease-in-out;

  @media (min-width: 769px) {
    max-width: 0;
  }
}

.Sidebar--open {
  opacity: 1;

  @media (min-width: 769px) {
    max-width: 50%;
  }
}
</style>
