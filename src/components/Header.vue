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
        <div class="links">
            <RouterLink class="routerLink" to="/">首頁</RouterLink>
            <RouterLink class="routerLink" to="/ForumEntrance">論壇入口</RouterLink>
            <RouterLink class="routerLink" to="/mapSearch">地圖搜尋</RouterLink>
        </div>
        <div class="loginOrProfile">
            <img v-if="foundUserInfo" loading="lazy" @click="goProfile()" style="cursor: pointer;"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/7f6a9979fd53f3c5e64a665bf4a1149a8417ec48b188721f0113d7eeb7427e2f?"
                class="img" />
            <p v-if="!foundUserInfo" @click="goLoginIn()" style="cursor: pointer; font-size: 18pt;">登入/註冊</p>
        </div>
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

    .links {
        display: flex;
        margin-left: 20px;
        /* 調整連結之間的間距 */
    }

    .routerLink {
        margin-right: 10px;
        /* 調整連結之間的間距 */
    }

    .loginOrProfile {
        display: flex;
        align-items: center;
        margin-right: 20px;
        /* 調整連結之間的間距 */
    }
}</style>