<script>
export default {
  data() {
    return {
      newName: "",
      newEmail: "",
      newBody: "",
      errors: {},
      emailPattern: /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/,
    }
  },
  emits: ['add', 'close'],
  methods: {
    clearError(field) {
      if(this.errors[field]) {
        delete this.errors[field];
      }
    },
    validateForm() {
      const newErrors = {};

      if(!this.newName.trim()) {
        newErrors.name = "Name is required!"
      }

      if (!this.newEmail.trim()) {
        newErrors.email = "Email is required!";
      } else if (!this.emailPattern.test(this.newEmail.trim())) {
        newErrors.email = "Email is not valid!";
      }

      if (!this.newBody.trim()) {
        newErrors.body = "Comment is required!";
      }

      this.errors = newErrors;
      return Object.keys(newErrors).length === 0;
    },
    add() {
      if (!this.validateForm()) {
        return;
      }

      this.$emit("add", {
        name: this.newName.trim(),
        email: this.newEmail.trim(),
        body: this.newBody.trim(),
      });

      this.newName = "";
      this.newEmail = "";
      this.newBody = "";
    },
    close() {
      this.newName = "";
      this.newEmail = "";
      this.newBody = "";
      this.$emit('close');
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
          :class="{ 'is-danger': errors.name }"
          v-model="newName"
          @input="clearError('name')"
        />
        <span class="icon is-small is-left">
          <i class="fas fa-user"></i>
        </span>
      </div>
      <p class="help is-danger" v-if="errors.name">{{ errors.name }}</p>
    </div>

    <div class="field" data-cy="EmailField">
      <label class="label" for="comment-author-name-email">Author Email</label>
      <div class="control has-icons-left has-icons-right">
        <input
          type="text"
          name="email"
          id="comment-author-name-email"
          placeholder="Your Email"
          class="input"
          :class="{ 'is-danger': errors.email }"
          v-model="newEmail"
          @input="clearError('email')"
        />
        <span class="icon is-small is-left">
          <i class="fas fa-envelope"></i>
        </span>
      </div>
      <p class="help is-danger" v-if="errors.email">{{ errors.email }}</p>
    </div>

    <div class="field" data-cy="BodyField">
      <label class="label" for="comment-body">Write Post Body</label>
      <div class="control">
        <textarea
          id="comment-body"
          name="body"
          placeholder="Comment"
          class="textarea"
          :class="{ 'is-danger': errors.body }"
          v-model="newBody"
          @input="clearError('body')"
        ></textarea>
      </div>
      <p class="help is-danger" v-if="errors.body">{{ errors.body }}</p>
    </div>

    <!-- Buttons -->
    <div class="field is-grouped">
      <div class="control">
        <button type="submit" class="button is-link">Add Comment</button>
      </div>
      <div class="control">
        <button type="reset" class="button is-link is-light" @click="close">
          Cancel
        </button>
      </div>
    </div>
  </form>
</template>

<style></style>
