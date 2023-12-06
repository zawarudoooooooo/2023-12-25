<script>
import { RouterLink } from 'vue-router';
export default{
    date(){
        return{

        }
    },
    components: {
        RouterLink
    }
}
</script>

<template>
    <div class="header">
        <RouterLink to="/Login">Log In</RouterLink>
        <RouterLink to="/SignUp">Sign Up</RouterLink>
        <RouterLink to="/Profile">Profile</RouterLink>
        <RouterLink to="/edit_myArticle">edit_myArticle</RouterLink>
        <RouterLink to="/pre_myArticle">pre_myArticle</RouterLink>
        <RouterLink to="/PlatformEntrance">PlatformEntrance</RouterLink>
        <RouterLink to="/ForumEntrance">ForumEntrance</RouterLink>
    </div>
</template>

<style lang="scss" scoped>
    .header{
        width: 100vw;
        height: 15vh;
        background-color: white;
        justify-content: space-between;
    }
</style>