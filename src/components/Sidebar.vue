<script>
export default {
    props: {
        post: Object
    }
}
</script>

<template>
    <div class="tile is-parent is-8-desktop Sidebar Sidebar--open">
        <div class="tile is-child box is-success ">
            <div class="content">
                <div class="block">
                    <div class="is-flex is-justify-content-space-between is-align-items-center">
                        <h2>{{ `#${post.id}: ${post.title}` }}</h2>
                        <div class="is-flex"><span class="icon is-small is-right is-clickable"><i
                                    class="fas fa-pen-to-square"></i></span><span
                                class="icon is-small is-right has-text-danger is-clickable ml-3"><i
                                    class="fas fa-trash"></i></span></div>
                    </div>
                    <p data-cy="PostBody">{{ `${post.title}` }}</p>
                </div>
                <div class="block">
                    <div class="block">
                        <p class="title is-4" data-cy="NoCommentsMessage">No comments yet</p>
                    </div><button data-cy="WriteCommentButton" type="button" class="button is-link">Write a
                        comment</button>
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