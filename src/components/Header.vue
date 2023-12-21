<script>
import { RouterLink } from 'vue-router';
import { mapState, mapActions } from "pinia";
import indexState from "../stores/indexState";
export default {
    data() {
        return {

        }
    },

    computed: {
        ...mapState(indexState, ["foundUserInfo"]),
    },

    methods: {

        ...mapActions(indexState, ["updateUserInfo", "clearUserInfo"]),

        goTo(x) {
            this.$router.push(x);
        },

        goLoginIn() {
            this.$router.push('/Login')
        },
        goProfile() {
            this.$router.push('/Profile')
        },

    },

    watch: {
        foundUserInfo(newValue, oldValue) {
            // 在状态更新时触发
            if (newValue !== oldValue) {
                // 更新 sessionStorage
                sessionStorage.setItem('foundUserInfo', JSON.stringify(newValue));
            }
        },
    },
    components: {
        RouterLink,
    },


}
</script>

<template>
    <div class="header">
        <div class="notification line" @click="goTo('/')">
            <i class="fa-solid fa-house"></i>
        </div>
        <RouterLink class="routerLink" to="/ForumEntrance">論壇首頁</RouterLink>
        <RouterLink class="routerLink" to="/mapSearch">mapSearch</RouterLink>
        <RouterLink class="routerLink" to="AdoptionSearch">AdoptionSearch</RouterLink>
        <RouterLink class="routerLink" to="ProfileForOther">ProfileForOther</RouterLink>
        <RouterLink class="routerLink" to="/Login" v-if="!foundUserInfo">登入/註冊</RouterLink>
        <div class="setting line" @click="goTo('/Profile')" v-if="foundUserInfo">
            <i class="fa-solid fa-user"></i>
        </div>

    </div>
</template>

<style lang="scss" scoped>
.header {
    width: 100vw;
    height: 15vh;

    background-color: rgb(255, 255, 255);
    display: flex;
    justify-content: space-evenly;
    align-items: center;

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
        margin-right: 10px;
        /* 調整連結之間的間距 */
    }

    .loginOrProfile {
        display: flex;
        align-items: center;
        margin-right: 20px;
        /* 調整連結之間的間距 */
    }
}
</style>