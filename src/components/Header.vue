<script>
import { RouterLink } from 'vue-router';
export default {
    data() {
        return {
        }
    },
    mounted() {
    },

    methods: {

    },

    components: {
        RouterLink
    }
}
</script>

<template>
    <div class="header">
        <RouterLink class="routerLink" to="/Login">Log In</RouterLink>
        <RouterLink class="routerLink" to="/SignUp">Sign Up</RouterLink>
        <RouterLink class="routerLink" to="/Profile">Profile</RouterLink>
        <RouterLink class="routerLink" to="/edit_myArticle">edit_myArticle</RouterLink>
        <RouterLink class="routerLink" to="/pre_myArticle">pre_myArticle</RouterLink>
        <RouterLink class="routerLink" to="/PlatformEntrance">PlatformEntrance</RouterLink>
        <RouterLink class="routerLink" to="/ForumEntrance">ForumEntrance</RouterLink>
        <RouterLink class="routerLink" to="/mapSearch">mapSearch</RouterLink>
        <RouterLink class="routerLink" to="/view_Article">view_Article</RouterLink>
        <RouterLink class="routerLink" to="/create_Article">create_Article</RouterLink>
        <RouterLink class="routerLink" to="/MyPet">MyPet</RouterLink>
        <RouterLink class="routerLink" to="MyAdopt">MyAdopt</RouterLink>
        <RouterLink class="routerLink" to="notification">notification</RouterLink>
        <RouterLink class="routerLink" to="ProfileForOther">ProfileForOther</RouterLink>
    </div>
</template>

<style lang="scss" scoped>
.header {
    width: 100vw;
    height: 15vh;
    background-color: white;
    display: flex;
    flex-wrap: wrap;
    // justify-content: space-between;

    .routerLink {
        margin: 10px;
    }
}
</style>