<script>
import axios from 'axios';
export default {
    data() {
        return {
            userInfo: {},
            petInfo: {},
            notifi_arr: [],
            selectedFileName: null,
            // noti_state:null,
        }
    },
    methods: {
        /*
        1.領養人對送養人發請求，user是送養人，send是領養人，送養人接訊息，跳轉到自己的petDetail
        2.領養人收回他的請求，user是送養人，send是領養人，不用跳
        3.送養人同意領養人請求，user是領養人，send是送養人，領養人接訊息，跳轉到自己領養頁面myAdopt
        4.送養人拒絕領養人請求，user是領養人，send是送養人，不用跳
        5.領養人同意送養人的同意，user是送養人，send領養人，送養人接訊息，跳轉到對方頁面
        6.領養人拒絕送養人的同意，user是送養人，send領養人，不用跳
        */
        get_notification_data(id) {
            console.log(id);
            axios.get(`http://localhost:8080/api/notification/getNoti?userId=${id}`,
            )
                .then(response => {
                    this.notifi_arr = response.data.notifiReq
                    console.log(this.notifi_arr.reverse())//反轉了就整個反轉了
                })
                .catch(error => {
                    console.error(error);
                })

        },
        getData(petId, type, sendId) {
            this.userId = this.userInfo.userId;
            this.pets = [];
            console.log("emit id", this.userId)
            // console.log(petId);
            // console.log(type)
            switch (type) {
                case 1:
                    axios.get(`http://localhost:8080/api/adoption/petInfo/getAdoptPetInfoAndUserInfo?petId=${petId}`)
                        .then(response => {
                            console.log(response.data.vo.petInfo)
                            this.emitGo("petInfo", response.data.vo.petInfo)
                            this.$router.push('/PetDetail');
                        })
                        .catch(error => {
                            console.error(error);
                        })
                    break;

                case 3:
                    this.$router.push('/MyAdopt');
                    break;

                case 5:
                    console.log(sendId);
                    this.$router.push({ name: 'ProfileForOther', params: { sendId } });
                    break;

                default:
                    break;
            }

        },
        emitGo(item) {
            //item是全部寵物資訊，依照ID去撈
            this.$emit("petInfo", item);
            this.$router.push('/PetDetail');
        },
        /*
        state1(type) {
            axios.post(`http://localhost:8080/api/notification/Noti`, {
                notification: {
                    userId: 54,
                    sendId: 57,
                    petId: "P5402",
                    notifiType: type
                }
            }
            )
                .then(response => {
                    console.log(response.data)
                    // this.notifi_arr = response.data.notifiReq
                    // console.log(this.notifi_arr.reverse())//反轉了就整個反轉了
                })
                .catch(error => {
                    console.error(error);
                })
        },
        state2(type) {
            axios.post(`http://localhost:8080/api/notification/Noti`, {
                notification: {
                    userId: 54,
                    sendId: 57,
                    petId: "P5402",
                    notifiType: type
                }
            }
            )
                .then(response => {
                    console.log(response.data)
                    // this.notifi_arr = response.data.notifiReq
                    // console.log(this.notifi_arr.reverse())//反轉了就整個反轉了
                })
                .catch(error => {
                    console.error(error);
                })
        },
        state3(type) {
            axios.post(`http://localhost:8080/api/notification/Noti`, {
                notification: {
                    userId: 57,
                    sendId: 54,
                    petId: "P5402",
                    notifiType: type
                }
            }
            )
                .then(response => {
                    console.log(response.data)
                    // this.notifi_arr = response.data.notifiReq
                    // console.log(this.notifi_arr.reverse())//反轉了就整個反轉了
                })
                .catch(error => {
                    console.error(error);
                })
        },
        state4(type) {
            axios.post(`http://localhost:8080/api/notification/Noti`, {
                notification: {
                    userId: 57,
                    sendId: 54,
                    petId: "P5402",
                    notifiType: type
                }
            }
            )
                .then(response => {
                    console.log(response.data)
                    // this.notifi_arr = response.data.notifiReq
                    // console.log(this.notifi_arr.reverse())//反轉了就整個反轉了
                })
                .catch(error => {
                    console.error(error);
                })
        },
        state5(type) {
            axios.post(`http://localhost:8080/api/notification/Noti`, {
                notification: {
                    userId: 54,
                    sendId: 57,
                    petId: "P5402",
                    notifiType: type
                }
            }
            )
                .then(response => {
                    console.log(response.data)
                    // this.notifi_arr = response.data.notifiReq
                    // console.log(this.notifi_arr.reverse())//反轉了就整個反轉了
                })
                .catch(error => {
                    console.error(error);
                })
        },
        state6(type) {
            axios.post(`http://localhost:8080/api/notification/Noti`, {
                notification: {
                    userId: 54,
                    sendId: 57,
                    petId: "P5402",
                    notifiType: type
                }
            }
            )
                .then(response => {
                    console.log(response.data)
                    // this.notifi_arr = response.data.notifiReq
                    // console.log(this.notifi_arr.reverse())//反轉了就整個反轉了
                })
                .catch(error => {
                    console.error(error);
                })
        },
*/

    },
    props: [
        'noti_state'
    ],
    mounted() {
        this.userInfo = JSON.parse(sessionStorage.getItem("foundUserInfo"))
        console.log(this.userInfo)
        this.petInfo = JSON.parse(sessionStorage.getItem("petInfo"))
        console.log(this.petInfo);
        this.get_notification_data(this.userInfo.userId)
        console.log(this.noti_state);
    },
}

</script>

<template>
    <ul class="notifi_area" :class="{'notifi_area':noti_state,'notifi_off':!noti_state}">
        <div v-for="no, index in this.notifi_arr">
            <li class="notifi_text" v-if="no.read == true" @click="getData(no.petId, no.notifiType,no.sendId)"
                style="cursor: pointer;">
                <span>{{ no.notifiContain }}</span>
                <p style="font-size: 12pt;">{{ no.dateTime.replace("T", " ") }}</p>
            </li>
            <li class="notifi_text" v-if="no.read == false" @click="getData(no.petId, no.notifiType,no.sendId)"
                style="background-color: rgb(255 228 196 / 37%);cursor: pointer;">
                <span>{{ no.notifiContain }}</span>
                <p style="font-size: 12pt;">{{ no.dateTime.replace("T", " ") }}</p>
            </li>
        </div>
    </ul>
    <!-- <div class="text">
        <button @click="state1(1)">領養人對送養人發請求</button>
            <button @click="state2(2)">領養人收回領養請求</button>

            <button @click="state3(3)">送養人同意領養請求</button>
            <button @click="state4(4)">送養人拒絕領養請求</button>

            <button @click="state5(5)">領養人同意領養請求</button>
            <button @click="state6(6)">領養人拒絕領養請求</button>
        </div> -->
</template>

<style lang="scss" scoped>
.notifi_area {
    width: 170%;
    height: 100%;
    border: 5px solid #d8d2c3;
    font-size: 16pt;
    overflow: auto;
    position: absolute;
    left: 250px;
    top: 0px;
    z-index: 1;
    background-color: white;
    transition: all 0.5s; 
    // transition: width 0.5s , height 0.5s;

    .notifi_text {
        border: 1px solid black;
        padding: 20px;
    }

}

.notifi_off{
    width: 0;
    height: 0;
    opacity: 0;
    transition: all 0.5s;    
}

.text {
    margin: 85px;
    display: flex;
    width: 35%;
    align-items: center;
    flex-direction: column;
    justify-content: space-evenly;
}
</style>