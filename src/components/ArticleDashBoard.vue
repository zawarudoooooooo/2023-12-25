<script>
export default {
    data() {
        return {
            foundUserInfo: JSON.parse(sessionStorage.getItem('foundUserInfo')),
        }
    },
    methods: {
        goTo(x) {
            this.$router.push(x);
        }
    },
}
</script>
<!-- 論壇首頁<br />科普版<br />閒聊版<br />MY ARTICLE -->
<template>
    <div class="dashboardArea">
        <div class="setting line">
            <p @click="goTo('/ForumEntrance/ForumHome')">論壇首頁</p>
        </div>
        <!-- <div class="article line">
            <p @click="goTo()">閒聊版</p>
        </div> -->
        <div class="adopt line">
            <button :style="{ color: foundUserInfo ? '#978989' : '#bfacac'}" style="background-color: transparent; font-weight: 700;" @click="goTo('/ForumEntrance/ForumMyArticle')" :disabled=" foundUserInfo == null">我的文章</button>
        </div>
        <button v-if="foundUserInfo" class="dashboard_btn"  @click="goTo('/ForumEntrance/create_Article')">
            <i class="fa-solid fa-plus plus_icon"></i>
            <div class="dashboard_btn_text">我要發文</div>
        </button>

    </div>
</template>

<style lang="scss" scoped>
.dashboardArea {
    width: 170px;
    height: auto;
    background-color: white;
    border-radius: 20px;
    color: #978989;
    font-size: 16pt;
    font-weight: 700;
    box-shadow: 0px 0px 8px 1px rgba(0, 0, 0, 0.28);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;


    .line {
        margin-bottom: 10px;
        cursor: pointer;
    }


    .setting {
        height: 5vh;
        display: flex;
        justify-content: start;
        align-items: center;
        margin-top: 35px;
    }

    .pet {
        height: 5vh;
        display: flex;
        justify-content: start;
        align-items: center;
    }

    .article {
        height: 5vh;
        display: flex;
        justify-content: start;
        align-items: center;
    }

    .adopt {
        height: 5vh;
        display: flex;
        justify-content: start;
        align-items: center;
    }

    .dashboard_btn {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 120px;
        height: 40px;
        color: white;
        background-color: #6E75A8;
        border-radius: 30px;
        font-weight: 700;
        padding: 0px 10px 0px 10px;
        font-size: 12pt;
        margin-bottom: 20px;
        border: none;
        i {
            margin-bottom: 10px;
            margin-right: 1vmin
        }


        .plus_icon {
            margin-top: 8px;
        }
    }


}
</style>