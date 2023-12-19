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
    width: 17%;
    height: auto;
    background-color: white;
    border-radius: 15px;
    color: #978989;
    font-size: 16pt;
    box-shadow: 0 0 3px 2px lightgray;
    padding: 20px;
    

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
        margin-left: 30px;
    }

    .pet {
        height: 5vh;
        display: flex;
        justify-content: start;
        align-items: center;
        margin-left: 30px;
    }

    .article {
        height: 5vh;
        display: flex;
        justify-content: start;
        align-items: center;
        margin-left: 30px;
    }

    .adopt {
        height: 5vh;
        display: flex;
        justify-content: start;
        align-items: center;
        margin-left: 30px;
    }

    .dashboard_btn{
        display: flex;
        align-items: center;
        justify-content: center;
        width: 160px;
        height: 50px;
        color: white;
        background-color: #6E75A8;
        border-radius: 30px;
        font-weight: 700;
        

        .plus_icon{
            margin-top: 10px;
        }
    }


}
</style>