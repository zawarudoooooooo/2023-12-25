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
    <div class="header " >

        <div class="notification line" @click="goTo('/')">
            <i class="fa-solid fa-house"  style="color: white;"></i>
        </div>
        <RouterLink class="routerLink" to="/ForumEntrance">論壇</RouterLink>
        <RouterLink class="routerLink" to="/mapSearch">mapSearch</RouterLink>
        <RouterLink class="routerLink" to="AdoptionSearch">AdoptionSearch</RouterLink>
        <RouterLink class="routerLink" to="ProfileForOther">ProfileForOther</RouterLink>

        <RouterLink class="routerLink" to="/Login" v-if="!foundUserInfo">登入/註冊</RouterLink>
        <div class="setting line" @click="goTo('/Profile')" v-if="foundUserInfo">
            <i class="fa-solid fa-user"  style="color: white;"></i>
        </div>


    </div>
</template>

<style lang="scss">
.header {
    width: 100vw;
    height: 15vh;
    background-color: blueviolet;


    display: flex;
    justify-content: space-evenly;
    align-items: center;
    padding: 0 50px;

    .links {
        display: flex;
        margin-left: 20px;
        /* 調整連結之間的間距 */
    }


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
}
</style>