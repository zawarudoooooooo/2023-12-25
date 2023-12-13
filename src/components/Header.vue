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
        <RouterLink class="routerLink" to="/Login">Log In</RouterLink>
        <RouterLink class="routerLink" to="/SignUp">Sign Up</RouterLink>
        <RouterLink class="routerLink" to="/Profile">Profile</RouterLink>
        <RouterLink class="routerLink" to="/check">check</RouterLink>
    </div>
</template>

<style lang="scss" scoped>
    .header{
        width: 100vw;
        height: 15vh;
        background-color: white;
        justify-content: space-between;
        .routerLink{
            margin: 10px;
        }
    }
</style>