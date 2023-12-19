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
    }
}
</script>
<!-- 論壇首頁<br />科普版<br />閒聊版<br />MY ARTICLE -->
<template>
    <div class="dashboardArea">
        <div class="setting line">
            <p>論壇首頁</p>
        </div>
        <div class="pet line">
            <p>科普版</p>
        </div>
        <div class="article line">
            <p>閒聊版</p>
        </div>
        <div class="adopt line">
            <p>MY ARTICLE</p>
        </div>
        <button class="dashboard_btn">
            <i class="fa-solid fa-plus plus_icon"></i>
            <div class="dashboard_btn_text">我要發文</div>
        </button>

    </div>
</template>

<style lang="scss" scoped>
.dashboardArea {
    width: 100%;
    height: 22%;
    background-color: white;
    border-radius: 35px;
    color: #978989;
    font-size: 16pt;
    font-weight: 700;
    box-shadow: 0px 0px 8px 1px rgba(0, 0, 0, 0.28);
    padding: 10px;


    i {
        margin-bottom: 10px;
        margin-right: 1vmin
    }

    .line {
        margin-bottom: 10px;
    }


    .setting {
        height: 5vh;
        display: flex;
        justify-content: start;
        align-items: center;
        margin-left: 45px;
        margin-top: 35px;
    }

    .pet {
        height: 5vh;
        display: flex;
        justify-content: start;
        align-items: center;
        margin-left: 45px;
    }

    .article {
        height: 5vh;
        display: flex;
        justify-content: start;
        align-items: center;
        margin-left: 45px;
    }

    .adopt {
        height: 5vh;
        display: flex;
        justify-content: start;
        align-items: center;
        margin-left: 45px;
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
        margin: 30px 50px;
        padding: 0px 10px 0px 10px;
        font-size: 12pt;


        .plus_icon {
            margin-top: 8px;
        }
    }


}
</style>