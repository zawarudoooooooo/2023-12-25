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
    <div class="header " id="transColor">

        <div class="notification line" @click="goTo('/')">
            <i class="fa-solid fa-house" style="color: white;"></i>
        </div>
        <RouterLink class="routerLink" to="/ForumEntrance">論壇</RouterLink>
        <RouterLink class="routerLink" to="/mapSearch">其他地點</RouterLink>
        <RouterLink class="routerLink" to="AdoptionSearch">領養區</RouterLink>

        <RouterLink class="routerLink" to="/Login" v-if="!foundUserInfo">登入/註冊</RouterLink>
        <div class="setting line" @click="goTo('/Profile')" v-if="foundUserInfo">
            <i class="fa-solid fa-user" style="color: white;"></i>
        </div>


    </div>
</template>

<style lang="scss">
.header {
    width: 120vw;
    height: 15vh;

    display: flex;
    justify-content: space-evenly;
    align-items: center;

    .links {
        display: flex;
        margin-left: 20px;
        /* 調整連結之間的間距 */

    }


    .routerLink {
        font-size: 1vw;
        color: white;
        font-weight: 700;
        margin-right: 10px;
        /* 調整連結之間的間距 */
        text-decoration: none;
        background-image: linear-gradient(#ffffff, #ffffff);
        background-position: left bottom;
        background-size: 0 2.5px;
        background-repeat: no-repeat;
        transition: background-size 0.15s linear;
        z-index: 100;

        &:hover {
            background-size: 100% 2.5px;

        }
    }

    .line {
        font-size: 1.3vw;
        color: white;
        font-weight: 700;
        margin-right: 10px;
        /* 調整連結之間的間距 */
        text-decoration: none;
        z-index: 100;

        &:hover {
            cursor: pointer;
        }

    }

    .loginOrProfile {
        display: flex;
        align-items: center;
        margin-right: 20px;
        /* 調整連結之間的間距 */
    }

    //轉變header顏色
    #transColor {
        background: #C79CA4;
        animation: mymove 5s infinite;
        -webkit-animation: mymove 5s infinite;
    }

    @keyframes mymove {
        from {
            background-color: #C79CA4;
        }

        to {
            background-color: #E9D2A6;
        }

    }
}</style>