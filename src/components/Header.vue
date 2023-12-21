<script>
import { RouterLink } from 'vue-router';
export default {
    data() {
        return {
            foundUserInfo: JSON.parse(sessionStorage.getItem('foundUserInfo')),
        }
    },
    mounted() {
        
    },

    methods: {
        goLoginIn() {
            this.$router.push('/Login')
        },
        goProfile() {
            this.$router.push('/Profile')
        },
    },

    components: {
        RouterLink
    }
}
</script>

<template>
    <div class="header">
        <RouterLink class="routerLink" to="/">平台首頁</RouterLink>
        <RouterLink class="routerLink" to="/ForumEntrance">論壇首頁</RouterLink>
        <RouterLink class="routerLink" to="/mapSearch">mapSearch</RouterLink>
        <RouterLink class="routerLink" to="AdoptionSearch">AdoptionSearch</RouterLink>
        <RouterLink class="routerLink" to="ProfileForOther">ProfileForOther</RouterLink>
        <RouterLink class="routerLink" to="/Login">登入/註冊</RouterLink>

    </div>
</template>

<style lang="scss" scoped>
.header {
    width: 100vw;
    height: 15vh;

    background-color: rgb(255, 255, 255);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 50px;

    .links {
        display: flex;
        margin-left: 20px;
        /* 調整連結之間的間距 */
    }

    background-color: white;
    display: flex;
    flex-wrap: wrap;
    // justify-content: space-between;


    .routerLink {
        color: white;
        font-weight: 700;
        margin-right: 10px;
        /* 調整連結之間的間距 */
        text-decoration: none;
        z-index: 1;

                &:hover{
                    text-decoration:underline;
                    text-decoration-thickness: 3px;
                }
    }

    .loginOrProfile {
        display: flex;
        align-items: center;
        margin-right: 20px;
        /* 調整連結之間的間距 */
    }
}</style>