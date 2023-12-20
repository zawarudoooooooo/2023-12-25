<script>
import axios from 'axios';
export default {
    data() {
        return {
            userInfo: {},
            petInfo: {},
            notifi_arr:[],
            selectedFileName: null,
        }
    },
    methods: {
        get_notification_data(id){
            console.log(id);
            axios.get(`http://localhost:8080/api/notification/getNoti?userId=${id}`, 
            )
            .then( response => {
                this.notifi_arr = response.data.notifiReq
                console.log(this.notifi_arr.reverse())
            })
            .catch( error => {
                console.error(error);
            })

        }
    },
    mounted() {
        this.userInfo = JSON.parse( sessionStorage.getItem("foundUserInfo"))
        console.log(this.userInfo)
        this.petInfo = JSON.parse(sessionStorage.getItem("petInfo"))
        console.log(this.petInfo);
        this.get_notification_data(this.userInfo.userId)
    },
}

</script>

<template>
    <div class="notifi_area">
        <div class="notifi_text" v-for="no in this.notifi_arr">
        {{ no.notifiContain }}
        </div>
        <!-- <div class="notifi_text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam, blanditiis.</div> -->

    </div>
    <div class="text">
        <button>領養人對送養人發請求</button>
        <button>領養人收回領養請求</button>

        <button>送養人同意領養請求</button>
        <button>送養人拒絕領養請求</button>

        <button>領養人同意領養請求</button>
        <button>領養人拒絕領養請求</button>
    </div>

</template>

<style lang="scss" scoped>
.notifi_area {
    width: 35%;
    height: 60%;
    border: 5px solid #d8d2c3;
    margin: 85px;
    padding: 20px;
    font-size: 16pt;

    .notifi_text {
        border: 1px solid black;
        padding: 20px;
    }
}

.text {
    margin: 85px;
    display: flex;
    justify-content: space-around;
    width: 35%;
}
</style>