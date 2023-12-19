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
        },
        logout(){
            sessionStorage.removeItem('foundUserInfo');
            sessionStorage.removeItem('petInfo');
            alert("成功登出")
            this.$router.push('/Login')
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
            <i class="fa-solid fa-user"></i>
            <p @click="goTo('/Profile')">Profile</p>
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
            <p @click="goTo('/MyAdopt')">My Adopt</p>
        </div>
        <div class="chat line">
            <i class="fa-brands fa-rocketchat"></i>
            <p>Chat</p>
        </div>
        <div class="chat line">
            <i class="fa-solid fa-arrow-right-from-bracket"></i>
            <p @click="logout()">登出</p>
        </div>

    </div>
</template>

<style lang="scss" scoped>
.dashboardArea {
    width: 100%;
    min-width: 175px;
    height: auto;
    background-color: white;
    border-radius: 20px;
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

    .notification {
        height: 5vh;
        display: flex;
        justify-content: start;
        align-items: center;
        margin-top: 2vmin;
    }

    .setting {
        height: 5vh;
        display: flex;
        justify-content: start;
        align-items: center;
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

    .chat {
        height: 5vh;
        display: flex;
        justify-content: start;
        align-items: center;
    }

    .BE{
        height: 5vh;
        display: flex;
        justify-content: start;
        align-items: center;

        .router-link-custom {
            text-decoration: none;
            color: blue;
            transition: text-decoration-color 0.3s;
            border-bottom: 1px solid transparent;

            &:hover {
                text-decoration-color: blue;
                border-bottom: 1px solid blue;
            }
        }
    }
}</style>