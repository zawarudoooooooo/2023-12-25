<script>
    export default{
        data(){
            return{

            }
        },
        methods:{
            goProfileSetting() {
                this.$router.push('/ProfileSetting');
            }
        }
    }
</script>

<template>
    <div class="dashboardArea">
        <div class="notification">
            <i class="fa-solid fa-bell"></i>
            <p>Notification</p>
        </div>
        <div class="setting">
            <i class="fa-solid fa-user-gear"></i>
            <p @click="goProfileSetting">Settings</p>
        </div>
        <div class="pet">
            <i class="fa-solid fa-dog"></i>
            <p>My Pet</p>
        </div>
        <div class="article">
            <i class="fa-solid fa-pencil"></i>
            <p>My Articles</p>
        </div>
        <div class="adopt">
            <i class="fa-solid fa-user-tie"></i>
            <p>My Adopt</p>
        </div>
        <div class="chat">
            <i class="fa-brands fa-rocketchat"></i>
            <p>Chat</p>
            </div>
        </div>
</template>

<style lang="scss" scoped>
    .dashboardArea{
        width: 10vw;
        height: 35vh;
        background-color: white;
        border-radius: 10px;
        color: #978989;
        font-size: 13pt;
        box-shadow: 3px 3px 3px gray;

        i{
            margin-right: 1vmin
        }
        .notification{
            height: 5vh;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: 2vmin;
        }

        .setting{
            height: 5vh;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .pet{
            height: 5vh;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .article{
            height: 5vh;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .adopt{
            height: 5vh;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .chat{
            height: 5vh;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
</style>