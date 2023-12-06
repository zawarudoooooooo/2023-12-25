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