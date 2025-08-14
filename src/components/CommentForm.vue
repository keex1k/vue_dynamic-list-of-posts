<script>
  export default {
    data() {
      return {
        newName: "",
        newEmail: "",
        newBody: "",
      }
    },
    emits: ['add'],
    methods: {
      add() {
        this.$emit("add", {
        name: this.newName.trim(),
        email: this.newEmail.trim(),
        body: this.newBody.trim(),
      });

      this.newName = "";
      this.newEmail = "";
      this.newBody = "";
      }
    }
  }
</script>

<template>
  <form @submit.prevent="add">
    <div class="field" data-cy="NameField">
      <label class="label" for="comment-author-name-name">Author Name</label>
      <div class="control has-icons-left has-icons-right">
        <input
          type="text"
          name="name"
          id="comment-author-name-name"
          placeholder="Name Surname"
          class="input"
          v-model="newName"
        /><span class="icon is-small is-left"
          ><i class="fas fa-user fa-user"></i
        ></span>
      </div>
    </div>
    <div class="field" data-cy="NameField">
      <label class="label" for="comment-author-name-email">Author Email</label>
      <div class="control has-icons-left has-icons-right">
        <input
          type="text"
          name="email"
          id="comment-author-name-email"
          placeholder="Your Email"
          class="input"
          v-model="newEmail"
        /><span class="icon is-small is-left"
          ><i class="fas fa-user fa-envelope"></i
        ></span>
      </div>
    </div>
    <div class="field" data-cy="BodyField">
      <label class="label" for="comment-body">Write Post Body</label>
      <div class="control">
        <textarea
          id="comment-body"
          name="body"
          placeholder="Comment"
          class="textarea"
          v-model="newBody"
        ></textarea>
      </div>
    </div>
    <div class="field is-grouped">
      <div class="control">
        <button type="submit" class="button is-link">Add Comment</button>
      </div>
      <div class="control">
        <button type="reset" class="button is-link is-light">Cancel</button>
      </div>
    </div>
  </form>
</template>

<style></style>
