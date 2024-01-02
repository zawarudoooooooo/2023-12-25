<script>
import { RouterLink } from 'vue-router';
import { mapState, mapActions } from "pinia";
import indexState from "../stores/indexState";
import headerState from '../stores/headerState';
export default {
    data() {
        return {

        }
    },

    computed: {
        ...mapState(indexState, ["foundUserInfo"]),
        ...mapState(headerState, ['headerColor']),
    },

    methods: {

        ...mapActions(indexState, ["updateUserInfo", "clearUserInfo"]),
        ...mapActions(headerState, ['updateHeaderColor']),

        goTo(x) {
            this.$router.push(x);
            // 根據不同的連結更新 headerColor
            switch (x) {
                case '/ForumEntrance':
                    this.updateHeaderColor('#ebc26f'); // 例如，設置為藍色
                    break;
                case '/mapSearch':
                    console.log('Updating header color to: #df4a4a');
                    this.updateHeaderColor('#DCB770'); // 設置黃色
                    break;
                case '/AdoptionSearch':
                    this.updateHeaderColor('#A86D71'); // 例如，設置為紅色
                    break;
                default:
                    this.updateHeaderColor('#DCB770'); // 默認顏色
            }
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

        $route(to, from) {
            const currentPath = to.path;

            if (currentPath.includes('/AdoptionSearch')) {
                this.updateHeaderColor('#A86D71'); // 例如，設置為紅色
            } else if(currentPath.includes('/ForumEntrance')) {
                this.updateHeaderColor('#6E75A8'); // 例如，設置為藍色
            }else{
                this.updateHeaderColor('#DCB770'); // 默認顏色
            }
        }
    },
    components: {
        RouterLink,
    },


}
</script>

<template>
    <div class="header " id="transColor" :style="{ backgroundColor: headerColor }" style="transition: all 0.5s;">

        <div class="notification line" @click="goTo('/')">
            <img src="../../public/logo只有圖案.png" alt="">
            <!-- <i class="fa-solid fa-house" style="color: white;"></i> -->
        </div>
        <RouterLink class="routerLink" to="/ForumEntrance" @click="goTo('/ChatTest')">ChatTest</RouterLink>

        <RouterLink class="routerLink" to="/ForumEntrance" @click="goTo('/ForumEntrance')">論壇</RouterLink>
        <RouterLink class="routerLink" to="/mapSearch" @click="goTo('/mapSearch')">其他地點</RouterLink>
        <RouterLink class="routerLink" to="AdoptionSearch" @click="goTo('/AdoptionSearch')">領養區</RouterLink>

        <RouterLink class="routerLink" to="/Login" v-if="!foundUserInfo">登入/註冊</RouterLink>
        <div class="setting line" @click="goTo('/Profile')" v-if="foundUserInfo">
            <!-- <i class="fa-solid fa-user" style="color: white;"></i> -->
            <img style="width: 50px; height: 50px; border-radius: 50%;" :src="'data:image/jpeg;base64,' + foundUserInfo.userPhoto" alt="">
            <i v-if="foundUserInfo.userPhoto==null" class="fa-solid fa-user" style="color: white;"></i>
        </div>
    </div>
</template>

<style lang="scss">
.header {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    font-size: 25pt;



    .links {
        display: flex;
        margin-left: 20px;
        /* 調整連結之間的間距 */

    }


    .routerLink {
        // font-size: 25pt;
        color: white;
        font-weight: 700;
        margin-right: 10px;
        /* 調整連結之間的間距 */
        text-decoration: none;
        background-image: linear-gradient(#ffffff, #ffffff);
        background-position: left bottom;
        background-size: 0 3px; // 設定漸變的大小，一開始為 0
        background-repeat: no-repeat;
        transition: background-size 0.15s linear; //背景的大小會在 0.15 秒內以線性方式變成 100%
        z-index: 100;

        &:hover {
            background-size: 100% 3px;

        }
    }

    img{
        width: 5vw;
    }

    .line {
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


}
</style>