<script>
    export default{
        data(){
            return{

            }
        },
        methods:{
            goTo(x) {
                this.$router.push(x);
            }
        }
    }
</script>

<template>
    <div class="dashboardArea">
        <div class="notification line">
            <i class="fa-solid fa-bell"></i>
            <p>Notification</p>
        </div>
        <div class="setting line">
            <i class="fa-solid fa-user-gear"></i>
            <p @click="goTo('/ProfileSetting')">Settings</p>
        </div>
        <div class="pet line">
            <i class="fa-solid fa-dog"></i>
            <p @click="goTo('/MyPet')">My Pet</p>
        </div>
        <div class="article line">
            <i class="fa-solid fa-pencil"></i>
            <p>My Articles</p>
        </div>
        <div class="adopt line">
            <i class="fa-solid fa-user-tie"></i>
            <p>My Adopt</p>
        </div>
        <div class="chat line">
            <i class="fa-brands fa-rocketchat"></i>
            <p>Chat</p>
            </div>
        </div>
</template>

<style lang="scss" scoped>
    .dashboardArea{
        width: 160px;
        height: 300px;
        background-color: white;
        border-radius: 10px;
        color: #978989;
        font-size: 13pt;
        box-shadow: 3px 3px 3px gray;
        padding: 20px;
        padding-left: 30px;
        i{
            margin-bottom: 10px;
            margin-right: 1vmin
        }
        .line{
            margin-bottom: 10px;
        }
        .notification{
            height: 5vh;
            display: flex;
            justify-content: start;
            align-items: center;
            margin-top: 2vmin;
        }

        .setting{
            height: 5vh;
            display: flex;
            justify-content: start;
            align-items: center;
        }

        .pet{
            height: 5vh;
            display: flex;
            justify-content: start;
            align-items: center;
        }

        .article{
            height: 5vh;
            display: flex;
            justify-content: start;
            align-items: center;
        }

        .adopt{
            height: 5vh;
            display: flex;
            justify-content: start;
            align-items: center;
        }

        .chat{
            height: 5vh;
            display: flex;
            justify-content: start;
            align-items: center;
        }
    }
</style>