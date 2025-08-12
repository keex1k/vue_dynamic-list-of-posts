<script>
import Sidebar from './Sidebar.vue'

export default {
    components: {
        Sidebar
    },
    name: 'PostsList',
    props: {
        posts: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            selectedPostId: 0
        }
    },
    methods: {
        toggleSelectedPost(id) {
            if(this.selectedPostId === id) {
                this.selectedPostId = 0
            } else {
                this.selectedPostId = id;
            }
        }
    },
    computed: {
        selectedPost() {
            return this.posts.find(p => p.id === this.selectedPostId);
        }
    }
}
</script>

<template>
    <div class="tile is-parent">
        <div class="tile is-child box is-success">
            <div class="block">
                <div class="block is-flex is-justify-content-space-between">
                    <p class="title">Posts</p>
                    <button type="button" class="button is-link">Add New Post</button>
                </div>

                <table class="table is-fullwidth is-striped is-hoverable is-narrow">
                    <thead>
                        <tr class="has-background-link-light">
                            <th>ID</th>
                            <th>Title</th>
                            <th class="has-text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="post in posts" :key="post.id">
                            <td>{{ post.id }}</td>
                            <td>{{ post.title }}</td>
                            <td class="has-text-right is-vcentered">
                                <button 
                                type="button" 
                                class="button is-link"
                                :class="{ 'is-light': post.id === selectedPostId }"
                                @click="toggleSelectedPost(post.id)">
                                    {{post.id === selectedPostId ? 'Close' : 'Open'}}
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <Sidebar v-if="selectedPost" :post="selectedPost" />
</template>
